/**
 * Cognova — Platform-Aware Maps Routing & Utilities
 * 
 * Supports dynamic routing across:
 * - iPhone / iPad / iPadOS -> Apple Maps (maps.apple.com)
 * - Android -> Google Maps (google.com/maps/search/?api=1&query=...)
 * - Desktop (Windows, macOS, Linux) -> Google Maps in new browser tab
 */

/**
 * Detect the current device platform.
 * Supports iOS, iPadOS (including modern iPad Pro reporting MacIntel with touch), Android, and Desktop.
 * 
 * @param {string} [customUserAgent] - Optional user agent string for testing/simulation
 * @returns {'ios' | 'android' | 'desktop'}
 */
export const detectPlatform = (customUserAgent) => {
  if (typeof window === 'undefined' && !customUserAgent) {
    return 'desktop';
  }

  const ua = customUserAgent || (typeof navigator !== 'undefined' ? navigator.userAgent || navigator.vendor || window.opera : '');
  const platform = typeof navigator !== 'undefined' ? navigator.platform || '' : '';
  const maxTouchPoints = typeof navigator !== 'undefined' ? navigator.maxTouchPoints || 0 : 0;

  // 1. Detect iOS (iPhone, iPad, iPod, iPadOS Safari)
  const isIOSDevice = /iPhone|iPad|iPod/i.test(ua);
  const isIPadOS = platform === 'MacIntel' && maxTouchPoints > 1;

  if (isIOSDevice || isIPadOS) {
    return 'ios';
  }

  // 2. Detect Android
  if (/Android/i.test(ua)) {
    return 'android';
  }

  // 3. Default to Desktop (Windows, macOS, Linux, etc.)
  return 'desktop';
};

/**
 * Normalizes location properties from any incoming data structure.
 * 
 * @param {Object} loc - Location or settings object
 * @returns {Object} normalized location object
 */
export const normalizeLocation = (loc = {}) => {
  const academyLoc = loc.academy_location || loc.academyLocation || {};
  
  const rawLat = loc.latitude !== undefined ? loc.latitude : academyLoc.latitude;
  const rawLng = loc.longitude !== undefined ? loc.longitude : academyLoc.longitude;

  return {
    name: loc.location_name || academyLoc.name || loc.name || loc.site_name || 'Cognova',
    address: loc.address !== undefined ? (loc.address || '') : (academyLoc.address !== undefined ? academyLoc.address : 'Coach Sindhu Ram Academy, Tamil Nadu, India'),
    latitude: rawLat !== undefined && rawLat !== null ? String(rawLat).trim() : '11.0168445',
    longitude: rawLng !== undefined && rawLng !== null ? String(rawLng).trim() : '76.9558321',
    google_maps_url: loc.google_maps_url || academyLoc.google_maps_url || academyLoc.googleMapsUrl || '',
    apple_maps_url: loc.apple_maps_url || academyLoc.apple_maps_url || academyLoc.appleMapsUrl || '',
    maps_embed_url: loc.maps_embed_url || academyLoc.maps_embed_url || 'https://maps.google.com/maps?q=Cognova%20Academy%20Coach%20Sindhu%20Ram&t=&z=15&ie=UTF8&iwloc=&output=embed'
  };
};

/**
 * Generate platform-appropriate map URL.
 * 
 * @param {Object} rawLocation - Location object or settings
 * @param {'ios' | 'android' | 'desktop'} [platformOverride] - Optional platform override
 * @returns {string} Fully qualified destination URL
 */
export const getMapUrl = (rawLocation = {}, platformOverride) => {
  const loc = normalizeLocation(rawLocation);
  const platform = platformOverride || detectPlatform();
  const hasCoords = loc.latitude && loc.longitude && !isNaN(Number(loc.latitude)) && !isNaN(Number(loc.longitude));

  // --- iOS / iPadOS -> Apple Maps ---
  if (platform === 'ios') {
    if (loc.apple_maps_url && loc.apple_maps_url.trim()) {
      return loc.apple_maps_url.trim();
    }

    if (hasCoords) {
      const queryName = encodeURIComponent(loc.name || 'Cognova');
      return `https://maps.apple.com/?q=${queryName}&ll=${loc.latitude},${loc.longitude}`;
    }

    if (loc.address) {
      const fullQuery = encodeURIComponent(`${loc.name ? loc.name + ', ' : ''}${loc.address}`);
      return `https://maps.apple.com/?q=${fullQuery}`;
    }

    return 'https://maps.apple.com/?q=Cognova%20Academy';
  }

  // --- Android & Desktop -> Google Maps ---
  if (loc.google_maps_url && loc.google_maps_url.trim()) {
    return loc.google_maps_url.trim();
  }

  if (hasCoords) {
    return `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
  }

  if (loc.address) {
    const fullQuery = encodeURIComponent(`${loc.name ? loc.name + ' ' : ''}${loc.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${fullQuery}`;
  }

  return 'https://maps.google.com/maps?q=Cognova%20Academy%20Coach%20Sindhu%20Ram';
};

/**
 * Get visual presentation details for the platform.
 * 
 * @param {'ios' | 'android' | 'desktop'} [platformOverride] 
 * @returns {Object} platform details
 */
export const getPlatformInfo = (platformOverride) => {
  const platform = platformOverride || detectPlatform();
  
  if (platform === 'ios') {
    return {
      platform: 'ios',
      appTitle: 'Apple Maps',
      badgeText: 'Opens in Apple Maps',
      iconType: 'apple',
      isMobile: true,
      isDesktop: false,
      target: '_blank'
    };
  }

  if (platform === 'android') {
    return {
      platform: 'android',
      appTitle: 'Google Maps',
      badgeText: 'Opens in Google Maps',
      iconType: 'google',
      isMobile: true,
      isDesktop: false,
      target: '_blank'
    };
  }

  return {
    platform: 'desktop',
    appTitle: 'Google Maps',
    badgeText: 'Opens in Google Maps (New Tab)',
    iconType: 'google',
    isMobile: false,
    isDesktop: true,
    target: '_blank'
  };
};

/**
 * Interactive click handler to open the location in the platform's map application.
 * 
 * @param {Object} rawLocation - Location object
 * @param {Object} [options] - Additional options
 * @param {'ios' | 'android' | 'desktop'} [options.platform] - Optional platform override
 * @param {Event} [options.e] - Synthetic click event
 */
export const openMapLocation = (rawLocation = {}, options = {}) => {
  if (options.e && typeof options.e.preventDefault === 'function') {
    options.e.preventDefault();
  }

  const loc = normalizeLocation(rawLocation);
  const platform = options.platform || detectPlatform();
  const url = getMapUrl(loc, platform);

  if (typeof window === 'undefined') return url;

  // On Desktop: Always open in new browser tab
  if (platform === 'desktop') {
    window.open(url, '_blank', 'noopener,noreferrer');
    return url;
  }

  // On iOS / Android mobile devices:
  // Use universal link navigation which prompts native maps or opens default browser
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  } catch (err) {
    // Graceful fallback to direct navigation
    window.location.href = url;
  }

  return url;
};
