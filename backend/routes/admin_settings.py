from flask import Blueprint, request, jsonify
from extensions import db
from models.website_settings import WebsiteSetting
from models.contact import ContactSetting
from utils.auth import admin_required

admin_settings_bp = Blueprint('admin_settings', __name__, url_prefix='/api/admin/website/settings')

@admin_settings_bp.route('', methods=['PUT'])
@admin_required()
def update_website_settings():
    data = request.get_json() or {}
    setting = WebsiteSetting.query.first()
    if not setting:
        setting = WebsiteSetting()
        db.session.add(setting)

    # Basic Settings
    if 'site_name' in data:
        setting.site_name = data['site_name']
    if 'logo_url' in data:
        setting.logo_url = data['logo_url']
    if 'favicon_url' in data:
        setting.favicon_url = data['favicon_url']
    if 'site_description' in data:
        setting.site_description = data['site_description']
    if 'tagline' in data:
        setting.tagline = data['tagline']
    if 'dark_mode_default' in data:
        setting.dark_mode_default = bool(data['dark_mode_default'])

    # Handle structured academy_location or direct fields
    loc_data = data.get('academy_location') or {}
    
    if 'location_name' in data or 'name' in loc_data:
        setting.location_name = data.get('location_name') or loc_data.get('name')
    if 'address' in data or 'address' in loc_data:
        setting.address = data.get('address') or loc_data.get('address')
    if 'latitude' in data or 'latitude' in loc_data:
        setting.latitude = str(data.get('latitude') if 'latitude' in data else loc_data.get('latitude'))
    if 'longitude' in data or 'longitude' in loc_data:
        setting.longitude = str(data.get('longitude') if 'longitude' in data else loc_data.get('longitude'))
    if 'google_maps_url' in data or 'google_maps_url' in loc_data:
        setting.google_maps_url = data.get('google_maps_url') or loc_data.get('google_maps_url')
    if 'apple_maps_url' in data or 'apple_maps_url' in loc_data:
        setting.apple_maps_url = data.get('apple_maps_url') or loc_data.get('apple_maps_url')
    if 'maps_embed_url' in data or 'maps_embed_url' in loc_data:
        setting.maps_embed_url = data.get('maps_embed_url') or loc_data.get('maps_embed_url')

    # Also synchronize to ContactSetting
    contact = ContactSetting.query.first()
    if contact:
        if setting.location_name:
            contact.location_name = setting.location_name
        if setting.address:
            contact.address = setting.address
        if setting.latitude:
            contact.latitude = setting.latitude
        if setting.longitude:
            contact.longitude = setting.longitude
        if setting.google_maps_url is not None:
            contact.google_maps_url = setting.google_maps_url
        if setting.apple_maps_url is not None:
            contact.apple_maps_url = setting.apple_maps_url
        if setting.maps_embed_url:
            contact.maps_embed_url = setting.maps_embed_url

    db.session.commit()
    return jsonify({'message': 'Website settings updated successfully', 'settings': setting.to_dict()}), 200

