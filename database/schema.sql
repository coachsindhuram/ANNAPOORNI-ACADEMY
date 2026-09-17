-- Database Schema for Cognova V1.0 (MySQL Compatible)

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS website_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_name VARCHAR(150) NOT NULL DEFAULT 'Cognova',
    logo_url VARCHAR(500),
    favicon_url VARCHAR(500),
    site_description TEXT,
    tagline VARCHAR(255) DEFAULT 'Empowering Minds, Shaping Futures',
    dark_mode_default BOOLEAN DEFAULT FALSE,
    location_name VARCHAR(150) DEFAULT 'Cognova',
    address TEXT,
    latitude VARCHAR(50) DEFAULT '11.0168445',
    longitude VARCHAR(50) DEFAULT '76.9558321',
    google_maps_url TEXT,
    apple_maps_url TEXT,
    maps_embed_url TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS theme_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    active_preset VARCHAR(50) DEFAULT 'Academic',
    primary_color VARCHAR(20) DEFAULT '#1E3A8A',
    secondary_color VARCHAR(20) DEFAULT '#0D9488',
    accent_color VARCHAR(20) DEFAULT '#F59E0B',
    background_color VARCHAR(20) DEFAULT '#F8FAFC',
    text_color VARCHAR(20) DEFAULT '#0F172A',
    card_color VARCHAR(20) DEFAULT '#FFFFFF',
    button_color VARCHAR(20) DEFAULT '#1E3A8A',
    header_color VARCHAR(20) DEFAULT '#FFFFFF',
    footer_color VARCHAR(20) DEFAULT '#0F172A',
    font_heading VARCHAR(100) DEFAULT 'Outfit',
    font_body VARCHAR(100) DEFAULT 'Inter',
    font_scale VARCHAR(20) DEFAULT 'medium',
    heading_weight VARCHAR(20) DEFAULT '700',
    body_weight VARCHAR(20) DEFAULT '400',
    border_radius VARCHAR(20) DEFAULT '12px',
    shadow_style VARCHAR(20) DEFAULT 'modern',
    is_published BOOLEAN DEFAULT TRUE,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS homepage_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_key VARCHAR(50) NOT NULL UNIQUE,
    section_name VARCHAR(100) NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    title VARCHAR(255),
    subtitle TEXT,
    content TEXT,
    image_url VARCHAR(500),
    background_style VARCHAR(50) DEFAULT 'default',
    cta_text VARCHAR(100),
    cta_url VARCHAR(255),
    secondary_cta_text VARCHAR(100),
    secondary_cta_url VARCHAR(255),
    meta_json TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS navigation_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_enabled BOOLEAN DEFAULT TRUE,
    is_external BOOLEAN DEFAULT FALSE,
    location VARCHAR(20) DEFAULT 'both',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS social_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(500) NOT NULL,
    icon VARCHAR(50),
    display_order INT DEFAULT 0,
    is_enabled BOOLEAN DEFAULT TRUE,
    show_in_header BOOLEAN DEFAULT TRUE,
    show_in_footer BOOLEAN DEFAULT TRUE,
    show_in_contact BOOLEAN DEFAULT TRUE,
    show_in_homepage BOOLEAN DEFAULT TRUE,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) DEFAULT 'coach.sindhuram@gmail.com',
    phone VARCHAR(50) DEFAULT '+91 90803 85589',
    whatsapp VARCHAR(50) DEFAULT '+919080385589',
    location_name VARCHAR(150) DEFAULT 'Cognova',
    address TEXT,
    latitude VARCHAR(50) DEFAULT '11.0168445',
    longitude VARCHAR(50) DEFAULT '76.9558321',
    google_maps_url TEXT,
    apple_maps_url TEXT,
    maps_embed_url TEXT,
    working_hours VARCHAR(150),
    contact_form_recipient VARCHAR(120) DEFAULT 'coach.sindhuram@gmail.com',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS seo_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_title VARCHAR(255),
    meta_description TEXT,
    keywords TEXT,
    og_title VARCHAR(255),
    og_description TEXT,
    og_image VARCHAR(500),
    favicon_url VARCHAR(500),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size INT DEFAULT 0,
    alt_text VARCHAR(255),
    category VARCHAR(50) DEFAULT 'general',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    icon VARCHAR(50) DEFAULT 'BookOpen',
    status VARCHAR(20) DEFAULT 'published',
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    thumbnail_url VARCHAR(500),
    category VARCHAR(100) DEFAULT 'General',
    subject_id INT,
    difficulty VARCHAR(50) DEFAULT 'Beginner',
    duration VARCHAR(50) DEFAULT '4 Weeks',
    status VARCHAR(20) DEFAULT 'published',
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS course_modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    module_id INT,
    subject_id INT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    content TEXT,
    video_url VARCHAR(500),
    duration VARCHAR(50) DEFAULT '15 mins',
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE SET NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    resource_type VARCHAR(50) DEFAULT 'PDF',
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    lesson_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    time_limit_minutes INT DEFAULT 15,
    passing_score INT DEFAULT 70,
    is_published BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'multiple_choice',
    points INT DEFAULT 10,
    display_order INT DEFAULT 0,
    explanation TEXT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    user_identifier VARCHAR(100) DEFAULT 'Guest Student',
    score INT DEFAULT 0,
    max_score INT DEFAULT 0,
    percentage FLOAT DEFAULT 0.0,
    is_passed BOOLEAN DEFAULT FALSE,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quiz_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option_id INT,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    content TEXT,
    image_url VARCHAR(500),
    event_date DATETIME,
    category VARCHAR(50) DEFAULT 'General',
    status VARCHAR(20) DEFAULT 'published',
    is_featured BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    ip_address VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
);
C R E A T E   T A B L E   I F   N O T   E X I S T S   p a g e s   ( 
         i d   I N T   A U T O _ I N C R E M E N T   P R I M A R Y   K E Y , 
         n a m e   V A R C H A R ( 1 5 0 )   N O T   N U L L , 
         s l u g   V A R C H A R ( 1 5 0 )   N O T   N U L L   U N I Q U E , 
         s t a t u s   V A R C H A R ( 2 0 )   D E F A U L T   ' d r a f t ' , 
         s e o _ t i t l e   V A R C H A R ( 2 5 5 ) , 
         s e o _ d e s c r i p t i o n   T E X T , 
         i s _ h o m e   B O O L E A N   D E F A U L T   F A L S E , 
         c r e a t e d _ a t   D A T E T I M E   D E F A U L T   C U R R E N T _ T I M E S T A M P , 
         u p d a t e d _ a t   D A T E T I M E   D E F A U L T   C U R R E N T _ T I M E S T A M P   O N   U P D A T E   C U R R E N T _ T I M E S T A M P 
 ) ; 
 
 C R E A T E   T A B L E   I F   N O T   E X I S T S   p a g e _ s e c t i o n s   ( 
         i d   I N T   A U T O _ I N C R E M E N T   P R I M A R Y   K E Y , 
         p a g e _ i d   I N T   N O T   N U L L , 
         t y p e   V A R C H A R ( 5 0 )   N O T   N U L L , 
         d i s p l a y _ o r d e r   I N T   D E F A U L T   0 , 
         c o n t e n t _ j s o n   T E X T , 
         s t y l e s _ j s o n   T E X T , 
         r e s p o n s i v e _ j s o n   T E X T , 
         a n i m a t i o n _ j s o n   T E X T , 
         F O R E I G N   K E Y   ( p a g e _ i d )   R E F E R E N C E S   p a g e s ( i d )   O N   D E L E T E   C A S C A D E 
 ) ; 
 
 C R E A T E   T A B L E   I F   N O T   E X I S T S   p a g e _ v e r s i o n s   ( 
         i d   I N T   A U T O _ I N C R E M E N T   P R I M A R Y   K E Y , 
         p a g e _ i d   I N T   N O T   N U L L , 
         v e r s i o n _ n a m e   V A R C H A R ( 1 0 0 ) , 
         a d m i n _ i d   I N T , 
         s n a p s h o t _ j s o n   L O N G T E X T   N O T   N U L L , 
         c r e a t e d _ a t   D A T E T I M E   D E F A U L T   C U R R E N T _ T I M E S T A M P , 
         F O R E I G N   K E Y   ( p a g e _ i d )   R E F E R E N C E S   p a g e s ( i d )   O N   D E L E T E   C A S C A D E , 
         F O R E I G N   K E Y   ( a d m i n _ i d )   R E F E R E N C E S   a d m i n s ( i d )   O N   D E L E T E   S E T   N U L L 
 ) ;  
 