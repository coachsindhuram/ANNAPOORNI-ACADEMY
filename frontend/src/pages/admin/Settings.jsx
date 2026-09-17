import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import API from '../../services/api';
import { Toast } from '../../components/Toast';
import { 
  Settings as SettingsIcon, ShieldCheck, User, Database, Server, Key, Lock, 
  MapPin, Navigation, Compass, Globe, Smartphone, ExternalLink, Save, CheckCircle2, RotateCcw
} from 'lucide-react';
import { getMapUrl } from '../../utils/mapUtils';

export const Settings = () => {
  const { admin } = useAdminAuth();
  const { fetchSiteDetails } = useSiteSettings();
  const [toastMsg, setToastMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [savingLocation, setSavingLocation] = useState(false);

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  // Centralized Academy Location & Maps Form State
  const [locationForm, setLocationForm] = useState({
    location_name: 'Cognova',
    address: 'Coach Sindhu Ram Academy, Tamil Nadu, India',
    latitude: '11.0168445',
    longitude: '76.9558321',
    google_maps_url: '',
    apple_maps_url: '',
    maps_embed_url: 'https://maps.google.com/maps?q=Cognova%20Academy%20Coach%20Sindhu%20Ram&t=&z=15&ie=UTF8&iwloc=&output=embed'
  });

  // Load current website settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await API.get('/api/website/settings');
        if (res.data) {
          setLocationForm({
            location_name: res.data.location_name || 'Cognova',
            address: res.data.address || 'Coach Sindhu Ram Academy, Tamil Nadu, India',
            latitude: res.data.latitude || '11.0168445',
            longitude: res.data.longitude || '76.9558321',
            google_maps_url: res.data.google_maps_url || '',
            apple_maps_url: res.data.apple_maps_url || '',
            maps_embed_url: res.data.maps_embed_url || 'https://maps.google.com/maps?q=Cognova%20Academy%20Coach%20Sindhu%20Ram&t=&z=15&ie=UTF8&iwloc=&output=embed'
          });
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    loadSettings();
  }, []);

  // Handle Location Form Submission
  const handleLocationSave = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      setSavingLocation(true);
      const res = await API.put('/api/admin/website/settings', {
        ...locationForm
      });

      if (fetchSiteDetails) {
        await fetchSiteDetails();
      }

      setToastMsg('Academy Location & Map Routing settings updated successfully! All public location components updated.');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to update academy location settings.');
    } finally {
      setSavingLocation(false);
    }
  };

  // Handle Password Change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!passwordForm.current_password || !passwordForm.new_password) {
      setErrorMsg('Please enter both your current and new password.');
      return;
    }

    if (passwordForm.new_password.length < 8) {
      setErrorMsg('New password must be at least 8 characters long.');
      return;
    }

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setErrorMsg('New password and confirmation password do not match.');
      return;
    }

    try {
      setLoading(true);
      await API.post('/api/admin/change-password', {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password
      });

      setToastMsg('Password changed successfully! Keep your new credentials safe.');
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to update password. Please verify your current password.');
    } finally {
      setLoading(false);
    }
  };

  // Preview Generated URLs for Platform Simulation
  const previewIOSUrl = getMapUrl(locationForm, 'ios');
  const previewAndroidUrl = getMapUrl(locationForm, 'android');
  const previewDesktopUrl = getMapUrl(locationForm, 'desktop');

  return (
    <div style={{ maxWidth: '850px' }}>
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>System & Location Settings</h2>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
          Manage centralized academy campus location, device map routing (Apple/Google Maps), and administrative security.
        </p>
      </div>

      {errorMsg && (
        <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* 1. Centralized Academy Location & Maps Integration Card */}
      <div className="table-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Academy Location & Interactive Maps</h3>
              <p style={{ color: '#64748B', fontSize: '0.85rem' }}>
                Centralized coordinates and routing. Public visitors are automatically routed to Apple Maps (iOS) or Google Maps (Android/Desktop).
              </p>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '4px 10px', borderRadius: '999px', fontWeight: 700 }}>
            ● Centralized Single Source
          </span>
        </div>

        <form onSubmit={handleLocationSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Location / Campus Name */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>Place / Campus Name *</label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="e.g. Cognova"
              value={locationForm.location_name}
              onChange={e => setLocationForm({ ...locationForm, location_name: e.target.value })}
            />
            <small style={{ color: '#64748B', fontSize: '0.8rem' }}>Displayed as the primary destination title on interactive cards and Apple/Google Maps searches.</small>
          </div>

          {/* Physical Address */}
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600 }}>Campus Physical Address *</label>
            <textarea
              rows="3"
              required
              className="form-control"
              placeholder="e.g. Coach Sindhu Ram Academy, Tamil Nadu, India"
              value={locationForm.address}
              onChange={e => setLocationForm({ ...locationForm, address: e.target.value })}
            />
            <small style={{ color: '#64748B', fontSize: '0.8rem' }}>Complete readable address shown across the website header, contact page, and footer.</small>
          </div>

          {/* Latitude & Longitude Coordinates */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={16} style={{ color: 'var(--primary-color)' }} /> Latitude Coordinates *
              </label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. 11.0168445"
                value={locationForm.latitude}
                onChange={e => setLocationForm({ ...locationForm, latitude: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={16} style={{ color: 'var(--secondary-color)' }} /> Longitude Coordinates *
              </label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. 76.9558321"
                value={locationForm.longitude}
                onChange={e => setLocationForm({ ...locationForm, longitude: e.target.value })}
              />
            </div>
          </div>

          {/* Optional Custom Destination Overrides */}
          <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Navigation size={16} style={{ color: 'var(--primary-color)' }} /> Custom Maps Destination Overrides (Optional)
            </h4>
            <p style={{ color: '#64748B', fontSize: '0.8rem', marginBottom: '1rem' }}>
              Leave blank to automatically construct high-precision universal links from coordinates & place name.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  Custom Google Maps URL (Android & Desktop)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://www.google.com/maps/search/?api=1&query=..."
                  value={locationForm.google_maps_url}
                  onChange={e => setLocationForm({ ...locationForm, google_maps_url: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  Custom Apple Maps URL (iPhone & iPad)
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://maps.apple.com/?q=..."
                  value={locationForm.apple_maps_url}
                  onChange={e => setLocationForm({ ...locationForm, apple_maps_url: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  Google Maps Embed Iframe Source URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://maps.google.com/maps?q=...&output=embed"
                  value={locationForm.maps_embed_url}
                  onChange={e => setLocationForm({ ...locationForm, maps_embed_url: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Live Device Routing Simulation & Verification Sandbox */}
          <div style={{ background: '#F1F5F9', padding: '1.25rem', borderRadius: '12px', border: '1px dashed #CBD5E1' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🧪 Live Device Routing Test Sandbox
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1rem' }}>
              Test how user devices will interactively launch their respective map applications when tapping anywhere on the location block:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {/* iPhone / iPad Test */}
              <a
                href={previewIOSUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ justifyContent: 'center', gap: '6px', fontSize: '0.8rem', background: '#FFFFFF', fontWeight: 600 }}
                title={previewIOSUrl}
              >
                <Smartphone size={14} style={{ color: '#007AFF' }} /> Test iPhone (Apple Maps) <ExternalLink size={12} />
              </a>

              {/* Android Test */}
              <a
                href={previewAndroidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ justifyContent: 'center', gap: '6px', fontSize: '0.8rem', background: '#FFFFFF', fontWeight: 600 }}
                title={previewAndroidUrl}
              >
                <Smartphone size={14} style={{ color: '#059669' }} /> Test Android (Google Maps) <ExternalLink size={12} />
              </a>

              {/* Desktop Test */}
              <a
                href={previewDesktopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ justifyContent: 'center', gap: '6px', fontSize: '0.8rem', background: '#FFFFFF', fontWeight: 600 }}
                title={previewDesktopUrl}
              >
                <Globe size={14} style={{ color: 'var(--primary-color)' }} /> Test Desktop (Google Maps Tab) <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.5rem' }}
            disabled={savingLocation}
          >
            <Save size={18} /> {savingLocation ? 'Saving Location...' : 'Save Location & Routing Settings'}
          </button>
        </form>
      </div>

      {/* 2. Platform Profile & Engine Details Card */}
      <div className="table-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Administrator Profile</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Logged in as: <strong>{admin?.username}</strong> ({admin?.email || 'coach.sindhuram@gmail.com'})</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '0.4rem' }}>
              <Server size={18} /> Backend Service
            </div>
            <div style={{ fontSize: '0.9rem', color: '#334155' }}>Flask 3.0 REST API (Modular Blueprints)</div>
            <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, marginTop: '4px' }}>● Status: Operational</div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--secondary-color)', marginBottom: '0.4rem' }}>
              <Database size={18} /> Database Engine
            </div>
            <div style={{ fontSize: '0.9rem', color: '#334155' }}>Relational SQLite / MySQL (Auto-Migrated)</div>
            <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, marginTop: '4px' }}>● Status: Connected</div>
          </div>
        </div>
      </div>

      {/* 3. Change Password Card */}
      <div className="table-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
          <Key size={22} style={{ color: 'var(--primary-color)' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Change Administrator Password</h3>
        </div>

        <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Current Password *</label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="Enter your current password"
              value={passwordForm.current_password}
              onChange={e => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">New Password * (Min 8 characters)</label>
              <input
                type="password"
                required
                minLength={8}
                className="form-control"
                placeholder="Enter new password"
                value={passwordForm.new_password}
                onChange={e => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password *</label>
              <input
                type="password"
                required
                minLength={8}
                className="form-control"
                placeholder="Re-type new password"
                value={passwordForm.confirm_password}
                onChange={e => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}
            disabled={loading}
          >
            <Lock size={16} /> {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};
