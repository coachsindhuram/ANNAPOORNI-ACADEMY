-- Update existing database with Cognova branding
UPDATE website_settings 
SET site_name = 'Cognova',
    tagline = 'Think Better. Learn Faster. Grow Smarter.',
    site_description = 'Cognova is a premium educational platform providing world-class courses, subjects, lessons, and interactive learning assessments focusing on cognitive growth.',
    location_name = 'Cognova',
    address = 'Cognova Academy, Tamil Nadu, India',
    maps_embed_url = 'https://maps.google.com/maps?q=Cognova&t=&z=15&ie=UTF8&iwloc=&output=embed',
    apple_maps_url = 'https://maps.apple.com/?q=Cognova&ll=11.0168445,76.9558321'
WHERE id = 1;

UPDATE theme_settings
SET active_preset = 'Cognova Premium',
    primary_color = '#552B7A',
    secondary_color = '#F2B84B',
    accent_color = '#F2B84B',
    background_color = '#FFF9EF',
    text_color = '#24202A',
    button_color = '#552B7A',
    footer_color = '#24202A'
WHERE id = 1;

UPDATE seo_settings
SET site_title = 'Cognova — Think Better. Learn Faster. Grow Smarter.',
    meta_description = 'Empowering minds with structured courses, subjects, video lessons, and interactive cognitive quizzes.',
    keywords = 'education, academy, courses, subjects, lessons, quizzes, cognova',
    og_title = 'Cognova — Think Better. Learn Faster. Grow Smarter.',
    og_description = 'Explore premium educational content and test your cognitive skills with interactive quizzes.'
WHERE id = 1;

UPDATE homepage_sections
SET title = 'Think Better. Learn Faster. Grow Smarter.',
    subtitle = 'Discover world-class educational courses, interactive subjects, structured lessons, and real-time cognitive assessments.'
WHERE section_key = 'hero';

UPDATE homepage_sections
SET title = 'Welcome to Cognova',
    subtitle = 'Committed to educational innovation, cognitive development, and comprehensive knowledge mastery.'
WHERE section_key = 'about';

UPDATE homepage_sections
SET title = 'Why Learn With Cognova?',
    subtitle = 'We provide an unmatched educational experience built for modern, intelligent learners.'
WHERE section_key = 'benefits';

UPDATE homepage_sections
SET subtitle = 'Real feedback from students thriving at Cognova.'
WHERE section_key = 'testimonials';

UPDATE homepage_sections
SET title = 'Cognova News & Updates'
WHERE section_key = 'announcements';

UPDATE contact_settings
SET location_name = 'Cognova',
    address = 'Cognova Academy, Tamil Nadu, India'
WHERE id = 1;

UPDATE social_links
SET url = 'https://youtube.com/@cognova'
WHERE platform = 'YouTube';

UPDATE social_links
SET url = 'https://facebook.com/cognova'
WHERE platform = 'Facebook';

UPDATE social_links
SET url = 'https://x.com/cognova'
WHERE platform = 'X';
