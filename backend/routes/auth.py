from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity
from models.admin import Admin
from utils.auth import admin_required

auth_bp = Blueprint('auth', __name__, url_prefix='/api/admin')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json(force=True, silent=True) or request.form or {}
    username_or_email = data.get('username') or data.get('email') or data.get('username_or_email')
    password = data.get('password')

    if not username_or_email or not password:
        return jsonify({'error': 'Username/email and password are required'}), 400

    admin = Admin.query.filter(
        (Admin.username == username_or_email) | (Admin.email == username_or_email)
    ).first()

    if not admin or not admin.check_password(password):
        return jsonify({'error': 'Invalid credentials'}), 401

    token = create_access_token(identity=str(admin.id))
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'admin': admin.to_dict()
    }), 200

@auth_bp.route('/me', methods=['GET'])
@admin_required()
def me():
    identity = get_jwt_identity()
    admin = Admin.query.get(identity)
    if not admin:
        return jsonify({'error': 'Admin not found'}), 404
    return jsonify(admin.to_dict()), 200

@auth_bp.route('/change-password', methods=['POST'])
@admin_required()
def change_password():
    identity = get_jwt_identity()
    admin = Admin.query.get(int(identity))
    if not admin:
        return jsonify({'error': 'Admin not found'}), 404

    data = request.get_json(force=True, silent=True) or request.form or {}
    current_password = data.get('current_password', '').strip()
    new_password = data.get('new_password', '').strip()

    if not current_password or not new_password:
        return jsonify({'error': 'Current password and new password are required'}), 400

    if len(new_password) < 8:
        return jsonify({'error': 'New password must be at least 8 characters long'}), 400

    if not admin.check_password(current_password):
        return jsonify({'error': 'Incorrect current password'}), 400

    from extensions import db
    admin.set_password(new_password)
    db.session.commit()

    return jsonify({'message': 'Password updated successfully'}), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'Logged out successfully'}), 200

