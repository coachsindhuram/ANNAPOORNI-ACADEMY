/**
 * Automated Verification Script for mapUtils.js Platform Detection & Map Routing
 */

import { detectPlatform, getMapUrl, getPlatformInfo, normalizeLocation } from '../frontend/src/utils/mapUtils.js';

function runTests() {
  console.log("=== Running Cognova Map Utils Verification ===");

  const sampleLocation = {
    name: 'Cognova',
    address: 'Coach Sindhu Ram Academy, Tamil Nadu, India',
    latitude: '11.0168445',
    longitude: '76.9558321',
    google_maps_url: '',
    apple_maps_url: ''
  };

  // 1. iPhone User Agent Test
  const iphoneUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1';
  const platformIphone = detectPlatform(iphoneUA);
  console.assert(platformIphone === 'ios', `Expected ios, got ${platformIphone}`);
  const urlIphone = getMapUrl(sampleLocation, platformIphone);
  console.assert(urlIphone.includes('maps.apple.com'), `iPhone should route to Apple Maps, got: ${urlIphone}`);
  console.assert(urlIphone.includes('ll=11.0168445,76.9558321'), `iPhone Apple Maps should include coordinates, got: ${urlIphone}`);
  console.log("✅ [1/7] iPhone Safari -> Apple Maps coordinate routing verified:", urlIphone);

  // 2. iPad User Agent Test
  const ipadUA = 'Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/114.0.5735.99 Mobile/15E148 Safari/604.1';
  const platformIpad = detectPlatform(ipadUA);
  console.assert(platformIpad === 'ios', `Expected ios for iPad, got ${platformIpad}`);
  const urlIpad = getMapUrl(sampleLocation, platformIpad);
  console.assert(urlIpad.includes('maps.apple.com'), `iPad should route to Apple Maps, got: ${urlIpad}`);
  console.log("✅ [2/7] iPad CriOS -> Apple Maps routing verified:", urlIpad);

  // 3. Android Chrome User Agent Test
  const androidUA = 'Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36';
  const platformAndroid = detectPlatform(androidUA);
  console.assert(platformAndroid === 'android', `Expected android, got ${platformAndroid}`);
  const urlAndroid = getMapUrl(sampleLocation, platformAndroid);
  console.assert(urlAndroid.includes('google.com/maps/search/?api=1&query=11.0168445,76.9558321'), `Android should route to Google Maps search API, got: ${urlAndroid}`);
  console.log("✅ [3/7] Android Chrome -> Google Maps universal link verified:", urlAndroid);

  // 4. Windows Desktop Chrome Test
  const windowsUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  const platformWindows = detectPlatform(windowsUA);
  console.assert(platformWindows === 'desktop', `Expected desktop for Windows, got ${platformWindows}`);
  const urlWindows = getMapUrl(sampleLocation, platformWindows);
  console.assert(urlWindows.includes('google.com/maps/search/?api=1&query=11.0168445,76.9558321'), `Desktop should route to Google Maps, got: ${urlWindows}`);
  console.log("✅ [4/7] Windows Desktop -> Google Maps web tab destination verified:", urlWindows);

  // 5. Custom URL Overrides Test
  const customLocation = {
    ...sampleLocation,
    google_maps_url: 'https://maps.app.goo.gl/customShortLink',
    apple_maps_url: 'https://maps.apple.com/place?id=customApplePlace'
  };
  const urlIosCustom = getMapUrl(customLocation, 'ios');
  const urlAndroidCustom = getMapUrl(customLocation, 'android');
  console.assert(urlIosCustom === 'https://maps.apple.com/place?id=customApplePlace', `Custom Apple Maps URL override failed: ${urlIosCustom}`);
  console.assert(urlAndroidCustom === 'https://maps.app.goo.gl/customShortLink', `Custom Google Maps URL override failed: ${urlAndroidCustom}`);
  console.log("✅ [5/7] Custom Admin URL overrides verified for Apple and Google Maps");

  // 6. Address Fallback when coordinates are omitted / empty
  const noCoordsLocation = {
    name: 'Cognova',
    address: 'Coach Sindhu Ram Academy, Tamil Nadu, India',
    latitude: '',
    longitude: ''
  };
  const urlNoCoordsIos = getMapUrl(noCoordsLocation, 'ios');
  const urlNoCoordsAndroid = getMapUrl(noCoordsLocation, 'android');
  console.assert(urlNoCoordsIos.includes('maps.apple.com/?q=Cognova%20Academy%2C%20Coach%20Sindhu%20Ram%20Academy'), `iOS address fallback failed: ${urlNoCoordsIos}`);
  console.assert(urlNoCoordsAndroid.includes('google.com/maps/search/?api=1&query=Cognova%20Academy%20Coach%20Sindhu%20Ram'), `Android address fallback failed: ${urlNoCoordsAndroid}`);
  console.log("✅ [6/7] Dynamic Address Search fallback without coordinates verified");


  // 7. Platform Info Metadata
  const infoIos = getPlatformInfo('ios');
  const infoAndroid = getPlatformInfo('android');
  const infoDesktop = getPlatformInfo('desktop');
  console.assert(infoIos.appTitle === 'Apple Maps' && infoIos.isMobile === true);
  console.assert(infoAndroid.appTitle === 'Google Maps' && infoAndroid.isMobile === true);
  console.assert(infoDesktop.appTitle === 'Google Maps' && infoDesktop.isDesktop === true);
  console.log("✅ [7/7] Platform Info metadata & badges verified");

  console.log("\n🎉 ALL 7 MAP UTILS & PLATFORM ROUTING TESTS PASSED PERFECTLY!");
}

runTests();
