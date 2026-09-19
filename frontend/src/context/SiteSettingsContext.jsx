import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const SiteSettingsContext = createContext();

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    site_name: 'Cognova',
    tagline: 'Empowering Minds, Shaping Futures',
    site_description: 'Cognova is a premier educational platform.',
    logo_url: '',
    favicon_url: ''
  });
  const [navigation, setNavigation] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [seoInfo, setSeoInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSiteDetails = async () => {
    try {
      const [resSet, resNav, resSoc, resCon, resSeo] = await Promise.all([
        API.get('/api/website/settings'),
        API.get('/api/navigation'),
        API.get('/api/social-links'),
        API.get('/api/contact'),
        API.get('/api/seo')
      ]);

      if (resSet.data && typeof resSet.data === 'object') setSettings(resSet.data);
      if (resNav.data && Array.isArray(resNav.data)) setNavigation(resNav.data);
      if (resSoc.data && Array.isArray(resSoc.data)) setSocialLinks(resSoc.data);
      if (resCon.data && typeof resCon.data === 'object') setContactInfo(resCon.data);
      if (resSeo.data && typeof resSeo.data === 'object') setSeoInfo(resSeo.data);
    } catch (err) {
      console.error('Error loading site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  const academyLocation = {
    name: settings.location_name || contactInfo.location_name || settings.site_name || 'Cognova',
    address: settings.address || contactInfo.address || 'Coach Sindhu Ram Academy, Tamil Nadu, India',
    latitude: settings.latitude || contactInfo.latitude || '11.0168445',
    longitude: settings.longitude || contactInfo.longitude || '76.9558321',
    google_maps_url: settings.google_maps_url || contactInfo.google_maps_url || '',
    apple_maps_url: settings.apple_maps_url || contactInfo.apple_maps_url || '',
    maps_embed_url: settings.maps_embed_url || contactInfo.maps_embed_url || 'https://maps.google.com/maps?q=Cognova%20Academy%20Coach%20Sindhu%20Ram&t=&z=15&ie=UTF8&iwloc=&output=embed'
  };

  return (
    <SiteSettingsContext.Provider value={{
      settings,
      navigation,
      socialLinks,
      contactInfo,
      seoInfo,
      academyLocation,
      fetchSiteDetails,
      loading
    }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
