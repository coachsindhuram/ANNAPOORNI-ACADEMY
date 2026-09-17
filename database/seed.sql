-- Initial Seed Data for Cognova V1.0

-- Admin (password: admin123)
INSERT INTO admins (username, email, password_hash)
VALUES ('admin', 'shinoansonanand@gmail.com', 'pbkdf2:sha256:260000$sQj9u3tW$b6118d3b84ca2557e4e0b0439c0d3fa78d2b271d4b6ec340d04c4146db796f63');

-- Website Settings
INSERT INTO website_settings (site_name, tagline, site_description, dark_mode_default)
VALUES (
    'Cognova',
    'Think Better. Learn Faster. Grow Smarter.',
    'Cognova is a premium educational platform providing world-class courses, subjects, lessons, and interactive learning assessments focusing on cognitive growth.',
    FALSE
);

-- Theme Settings
INSERT INTO theme_settings (
    active_preset, primary_color, secondary_color, accent_color, background_color, text_color, card_color, button_color, header_color, footer_color, font_heading, font_body, is_published
) VALUES (
    'Cognova Premium', '#552B7A', '#F2B84B', '#F2B84B', '#FFF9EF', '#24202A', '#FFFFFF', '#552B7A', '#FFFFFF', '#24202A', 'Outfit', 'Inter', TRUE
);

-- Homepage Sections
INSERT INTO homepage_sections (section_key, section_name, is_enabled, display_order, title, subtitle, cta_text, cta_url, secondary_cta_text, secondary_cta_url, background_style)
VALUES 
('hero', 'Hero Section', TRUE, 1, 'Think Better. Learn Faster. Grow Smarter.', 'Discover world-class educational courses, interactive subjects, structured lessons, and real-time cognitive assessments.', 'Explore Courses', '/courses', 'Browse Subjects', '/subjects', 'gradient'),
('about', 'About Section', TRUE, 2, 'Welcome to Cognova', 'Committed to educational innovation, cognitive development, and comprehensive knowledge mastery.', 'Learn More About Us', '/about', NULL, NULL, 'default'),
('featured_courses', 'Featured Courses', TRUE, 3, 'Featured Courses', 'Handpicked premium courses designed by leading educators.', NULL, NULL, NULL, NULL, 'default'),
('benefits', 'Learning Benefits', TRUE, 4, 'Why Learn With Cognova?', 'We provide an unmatched educational experience built for modern, intelligent learners.', NULL, NULL, NULL, NULL, 'default'),
('testimonials', 'Testimonials', TRUE, 5, 'What Our Learners Say', 'Real feedback from students thriving at Cognova.', NULL, NULL, NULL, NULL, 'default'),
('announcements', 'Announcements', TRUE, 6, 'Cognova News & Updates', 'Stay informed with the latest notifications, workshops, and exam alerts.', NULL, NULL, NULL, NULL, 'default'),
('cta', 'Call To Action', TRUE, 7, 'Ready to Begin Your Educational Journey?', 'Explore our extensive library of subjects and take your knowledge to the next level today.', 'Get Started Free', '/courses', NULL, NULL, 'dark');

-- Navigation Items
INSERT INTO navigation_items (label, destination, display_order, is_enabled, is_external, location)
VALUES 
('Home', '/', 1, TRUE, FALSE, 'both'),
('About', '/about', 2, TRUE, FALSE, 'both'),
('Courses', '/courses', 3, TRUE, FALSE, 'both'),
('Subjects', '/subjects', 4, TRUE, FALSE, 'both'),
('Announcements', '/announcements', 5, TRUE, FALSE, 'both'),
('Contact', '/contact', 6, TRUE, FALSE, 'both');

-- Social Links
INSERT INTO social_links (platform, url, icon, display_order, is_enabled, show_in_header, show_in_footer, show_in_contact, show_in_homepage)
VALUES 
('Instagram', 'https://www.instagram.com/coachsindhuram?igsh=MXR4cmdvaHZveHZleA%3D%3D', 'Instagram', 1, TRUE, TRUE, TRUE, TRUE, TRUE),
('YouTube', 'https://youtube.com/@cognova', 'Youtube', 2, FALSE, FALSE, FALSE, FALSE, FALSE),
('LinkedIn', 'https://www.linkedin.com/in/coach-sindhuram/', 'Linkedin', 3, TRUE, TRUE, TRUE, TRUE, TRUE),
('Facebook', 'https://facebook.com/cognova', 'Facebook', 4, TRUE, TRUE, TRUE, TRUE, TRUE),
('X', 'https://x.com/cognova', 'Twitter', 5, FALSE, FALSE, TRUE, TRUE, FALSE);

-- Contact Settings
INSERT INTO contact_settings (email, phone, whatsapp, location_name, address, latitude, longitude, google_maps_url, apple_maps_url, maps_embed_url, working_hours, contact_form_recipient)
VALUES ('coach.sindhuram@gmail.com', '+91 90803 85589', '+919080385589', 'Cognova', 'Cognova Academy, Tamil Nadu, India', '11.0168445', '76.9558321', 'https://www.google.com/maps/search/?api=1&query=11.0168445,76.9558321', 'https://maps.apple.com/?q=Cognova&ll=11.0168445,76.9558321', 'https://maps.google.com/maps?q=Cognova&t=&z=15&ie=UTF8&iwloc=&output=embed', 'Monday - Saturday: 8:30 AM - 6:30 PM', 'coach.sindhuram@gmail.com');

-- SEO Settings
INSERT INTO seo_settings (site_title, meta_description, keywords, og_title, og_description)
VALUES ('Cognova — Think Better. Learn Faster. Grow Smarter.', 'Empowering minds with structured courses, subjects, video lessons, and interactive cognitive quizzes.', 'education, academy, courses, subjects, lessons, quizzes, cognova', 'Cognova — Think Better. Learn Faster. Grow Smarter.', 'Explore premium educational content and test your cognitive skills with interactive quizzes.');

