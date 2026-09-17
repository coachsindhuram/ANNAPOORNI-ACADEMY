from flask import Blueprint, request, jsonify
from extensions import db
from models.contact import ContactSetting
from utils.auth import admin_required

admin_contact_bp = Blueprint('admin_contact', __name__, url_prefix='/api/admin/contact')

from models.website_settings import WebsiteSetting

@admin_contact_bp.route('', methods=['PUT'])
@admin_required()
def update_contact_settings():
    data = request.get_json() or {}
    contact = ContactSetting.query.first()
    if not contact:
        contact = ContactSetting()
        db.session.add(contact)

    # Handle structured academy_location or direct fields
    loc_data = data.get('academy_location') or {}

    fields = [
        'email', 'phone', 'whatsapp', 'address', 'location_name',
        'latitude', 'longitude', 'google_maps_url', 'apple_maps_url',
        'maps_embed_url', 'working_hours', 'contact_form_recipient'
    ]
    for f in fields:
        if f in data:
            setattr(contact, f, data[f])

    if 'name' in loc_data:
        contact.location_name = loc_data['name']
    if 'address' in loc_data:
        contact.address = loc_data['address']
    if 'latitude' in loc_data:
        contact.latitude = str(loc_data['latitude'])
    if 'longitude' in loc_data:
        contact.longitude = str(loc_data['longitude'])
    if 'google_maps_url' in loc_data:
        contact.google_maps_url = loc_data['google_maps_url']
    if 'apple_maps_url' in loc_data:
        contact.apple_maps_url = loc_data['apple_maps_url']
    if 'maps_embed_url' in loc_data:
        contact.maps_embed_url = loc_data['maps_embed_url']

    # Sync location fields to WebsiteSetting
    site = WebsiteSetting.query.first()
    if site:
        if contact.location_name:
            site.location_name = contact.location_name
        if contact.address:
            site.address = contact.address
        if contact.latitude:
            site.latitude = contact.latitude
        if contact.longitude:
            site.longitude = contact.longitude
        if contact.google_maps_url is not None:
            site.google_maps_url = contact.google_maps_url
        if contact.apple_maps_url is not None:
            site.apple_maps_url = contact.apple_maps_url
        if contact.maps_embed_url:
            site.maps_embed_url = contact.maps_embed_url

    db.session.commit()
    return jsonify({'message': 'Contact settings updated successfully', 'contact': contact.to_dict()}), 200

from models.inquiry import ContactInquiry

@admin_contact_bp.route('/inquiries', methods=['GET'])
@admin_required()
def get_inquiries():
    status = request.args.get('status')
    search = request.args.get('search')

    query = ContactInquiry.query
    if status:
        query = query.filter_by(status=status)
    if search:
        query = query.filter(
            (ContactInquiry.name.ilike(f'%{search}%')) |
            (ContactInquiry.email.ilike(f'%{search}%')) |
            (ContactInquiry.phone.ilike(f'%{search}%')) |
            (ContactInquiry.subject.ilike(f'%{search}%')) |
            (ContactInquiry.message.ilike(f'%{search}%'))
        )

    items = query.order_by(ContactInquiry.created_at.desc()).all()
    return jsonify([i.to_dict() for i in items]), 200

@admin_contact_bp.route('/inquiries/<int:id>', methods=['PUT'])
@admin_required()
def update_inquiry_status(id):
    inquiry = ContactInquiry.query.get_or_404(id)
    data = request.get_json() or {}

    if 'status' in data:
        valid_statuses = ['New', 'Contacted', 'Interested', 'Closed', 'Enrolled']
        if data['status'] not in valid_statuses:
            return jsonify({'error': f"Invalid status '{data['status']}'. Must be one of {valid_statuses}"}), 400
        inquiry.status = data['status']

    db.session.commit()
    return jsonify(inquiry.to_dict()), 200

@admin_contact_bp.route('/inquiries/<int:id>', methods=['DELETE'])
@admin_required()
def delete_inquiry(id):
    inquiry = ContactInquiry.query.get_or_404(id)
    db.session.delete(inquiry)
    db.session.commit()
    return jsonify({'message': 'Inquiry deleted successfully.'}), 200
