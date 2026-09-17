from flask import Blueprint, request, jsonify
import json
from extensions import db
from models.page import Page, PageSection, PageVersion
from models.admin import Admin
from utils.auth import admin_required
from datetime import datetime

admin_pages_bp = Blueprint('admin_pages', __name__, url_prefix='/api/admin/pages')

# ---------------------------------------------------------
# Pages CRUD
# ---------------------------------------------------------

@admin_pages_bp.route('', methods=['GET'])
@admin_pages_bp.route('/', methods=['GET'])
@admin_required()
def get_all_pages():
    pages = Page.query.order_by(Page.created_at.desc()).all()
    return jsonify([p.to_dict() for p in pages])

@admin_pages_bp.route('/<int:page_id>', methods=['GET'])
@admin_required()
def get_page(page_id):
    page = Page.query.get_or_404(page_id)
    return jsonify(page.to_dict())

@admin_pages_bp.route('', methods=['POST'])
@admin_pages_bp.route('/', methods=['POST'])
@admin_required()
def create_page():
    data = request.json
    
    if 'name' not in data or 'slug' not in data:
        return jsonify({'error': 'Name and slug are required'}), 400
        
    existing = Page.query.filter_by(slug=data['slug']).first()
    if existing:
        return jsonify({'error': 'Slug already exists'}), 400

    new_page = Page(
        name=data['name'],
        slug=data['slug'],
        status=data.get('status', 'draft'),
        seo_title=data.get('seo_title'),
        seo_description=data.get('seo_description'),
        is_home=data.get('is_home', False)
    )
    
    if new_page.is_home:
        # Unset previous home if needed
        old_home = Page.query.filter_by(is_home=True).first()
        if old_home:
            old_home.is_home = False

    db.session.add(new_page)
    db.session.commit()
    
    return jsonify(new_page.to_dict()), 201

@admin_pages_bp.route('/<int:page_id>', methods=['PUT'])
@admin_required()
def update_page(page_id):
    page = Page.query.get_or_404(page_id)
    data = request.json
    
    if 'name' in data:
        page.name = data['name']
    if 'slug' in data:
        existing = Page.query.filter(Page.slug == data['slug'], Page.id != page_id).first()
        if existing:
            return jsonify({'error': 'Slug already exists'}), 400
        page.slug = data['slug']
    if 'status' in data:
        page.status = data['status']
    if 'seo_title' in data:
        page.seo_title = data['seo_title']
    if 'seo_description' in data:
        page.seo_description = data['seo_description']
    if 'is_home' in data:
        if data['is_home'] and not page.is_home:
            old_home = Page.query.filter_by(is_home=True).first()
            if old_home:
                old_home.is_home = False
        page.is_home = data['is_home']

    db.session.commit()
    return jsonify(page.to_dict())

@admin_pages_bp.route('/<int:page_id>', methods=['DELETE'])
@admin_required()
def delete_page(page_id):
    page = Page.query.get_or_404(page_id)
    if page.is_home:
        return jsonify({'error': 'Cannot delete the homepage. Change the homepage first.'}), 400
        
    db.session.delete(page)
    db.session.commit()
    return jsonify({'message': 'Page deleted successfully'})


# ---------------------------------------------------------
# Page Drafts, Saves, and Publishing (Visual Builder APIs)
# ---------------------------------------------------------

@admin_pages_bp.route('/<int:page_id>/save', methods=['POST'])
@admin_required()
def save_page_sections(page_id):
    """
    Saves the sections from the visual builder to the database.
    Replaces all existing sections for this page.
    """
    page = Page.query.get_or_404(page_id)
    data = request.json # Expects a list of section objects
    
    if not isinstance(data, list):
        return jsonify({'error': 'Expected an array of sections'}), 400

    # Clear existing sections
    PageSection.query.filter_by(page_id=page_id).delete()
    
    # Add new sections
    for index, s_data in enumerate(data):
        section = PageSection(
            page_id=page_id,
            type=s_data.get('type', 'generic'),
            display_order=index,
            content_json=json.dumps(s_data.get('content', {})),
            styles_json=json.dumps(s_data.get('styles', {})),
            responsive_json=json.dumps(s_data.get('responsive', {})),
            animation_json=json.dumps(s_data.get('animation', {}))
        )
        db.session.add(section)

    page.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({'message': 'Sections saved successfully', 'page': page.to_dict()})

@admin_pages_bp.route('/<int:page_id>/publish', methods=['POST'])
@admin_required()
def publish_page(page_id):
    """
    Publishes the page (changes status to published) and generates a snapshot version.
    """
    page = Page.query.get_or_404(page_id)
    data = request.json or {}
    
    page.status = 'published'
    
    # Create snapshot of current sections
    sections = [s.to_dict() for s in page.sections]
    snapshot_data = {
        'page': {
            'name': page.name,
            'slug': page.slug,
            'seo_title': page.seo_title,
            'seo_description': page.seo_description
        },
        'sections': sections
    }
    
    version = PageVersion(
        page_id=page_id,
        version_name=data.get('version_name', f"Published {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')}"),
        admin_id=1,
        snapshot_json=json.dumps(snapshot_data)
    )
    
    db.session.add(version)
    db.session.commit()
    
    return jsonify({'message': 'Page published successfully', 'version_id': version.id, 'page': page.to_dict()})

@admin_pages_bp.route('/<int:page_id>/versions', methods=['GET'])
@admin_required()
def get_page_versions(page_id):
    versions = PageVersion.query.filter_by(page_id=page_id).order_by(PageVersion.created_at.desc()).all()
    return jsonify([v.to_dict() for v in versions])

@admin_pages_bp.route('/<int:page_id>/rollback/<int:version_id>', methods=['POST'])
@admin_required()
def rollback_page(page_id, version_id):
    """
    Rolls back the page to a previous version snapshot.
    """
    page = Page.query.get_or_404(page_id)
    version = PageVersion.query.filter_by(id=version_id, page_id=page_id).first_or_404()
    
    snapshot = version.get_snapshot()
    
    # Optional: rollback page meta (seo, name) if desired. Let's just rollback sections.
    sections_data = snapshot.get('sections', [])
    
    # Clear existing sections
    PageSection.query.filter_by(page_id=page_id).delete()
    
    # Restore sections from snapshot
    for index, s_data in enumerate(sections_data):
        section = PageSection(
            page_id=page_id,
            type=s_data.get('type', 'generic'),
            display_order=index,
            content_json=json.dumps(s_data.get('content', {})),
            styles_json=json.dumps(s_data.get('styles', {})),
            responsive_json=json.dumps(s_data.get('responsive', {})),
            animation_json=json.dumps(s_data.get('animation', {}))
        )
        db.session.add(section)

    db.session.commit()
    
    return jsonify({'message': f'Rolled back to {version.version_name}', 'page': page.to_dict()})
