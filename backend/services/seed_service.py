import json
from sqlalchemy import inspect, text
from extensions import db
from models.admin import Admin
from models.website_settings import WebsiteSetting
from models.theme import ThemeSetting
from models.homepage import HomepageSection
from models.navigation import NavigationItem
from models.social import SocialLink
from models.contact import ContactSetting
from models.seo import SeoSetting
from models.subject import Subject
from models.course import Course
from models.lesson import CourseModule, Lesson, Resource
from models.quiz import Quiz, Question, QuizOption
from models.announcement import Announcement
from models.page import Page, PageSection

def migrate_schema():
    """Inspect existing database tables and add any new V2 columns if missing."""
    try:
        inspector = inspect(db.engine)
        table_names = inspector.get_table_names()

        # 1. Courses migration
        if 'courses' in table_names:
            columns = [c['name'] for c in inspector.get_columns('courses')]
            new_cols = {
                'age_group': "VARCHAR(100) DEFAULT 'Grade 4 - 12 & Adults'",
                'prerequisites': "VARCHAR(255) DEFAULT 'Basic arithmetic and keen interest in rapid learning'",
                'learning_outcomes': "TEXT",
                'skills_developed': "TEXT",
                'faqs_json': "TEXT"
            }
            for col_name, col_type in new_cols.items():
                if col_name not in columns:
                    try:
                        db.session.execute(text(f"ALTER TABLE courses ADD COLUMN {col_name} {col_type}"))
                        db.session.commit()
                    except Exception as col_err:
                        db.session.rollback()
                        print(f"Column migration notice ({col_name}): {col_err}")

        # 2. Website Settings location migration
        if 'website_settings' in table_names:
            columns = [c['name'] for c in inspector.get_columns('website_settings')]
            loc_cols = {
                'location_name': "VARCHAR(150) DEFAULT 'Cognova'",
                'address': "TEXT DEFAULT 'Coach Sindhu Ram Academy, Tamil Nadu, India'",
                'latitude': "VARCHAR(50) DEFAULT '11.0168445'",
                'longitude': "VARCHAR(50) DEFAULT '76.9558321'",
                'google_maps_url': "TEXT",
                'apple_maps_url': "TEXT",
                'maps_embed_url': "TEXT"
            }
            for col_name, col_type in loc_cols.items():
                if col_name not in columns:
                    try:
                        db.session.execute(text(f"ALTER TABLE website_settings ADD COLUMN {col_name} {col_type}"))
                        db.session.commit()
                    except Exception as col_err:
                        db.session.rollback()
                        print(f"Website settings migration notice ({col_name}): {col_err}")

        # 3. Contact Settings location migration
        if 'contact_settings' in table_names:
            columns = [c['name'] for c in inspector.get_columns('contact_settings')]
            loc_cols = {
                'location_name': "VARCHAR(150) DEFAULT 'Cognova'",
                'latitude': "VARCHAR(50) DEFAULT '11.0168445'",
                'longitude': "VARCHAR(50) DEFAULT '76.9558321'",
                'google_maps_url': "TEXT",
                'apple_maps_url': "TEXT"
            }
            for col_name, col_type in loc_cols.items():
                if col_name not in columns:
                    try:
                        db.session.execute(text(f"ALTER TABLE contact_settings ADD COLUMN {col_name} {col_type}"))
                        db.session.commit()
                    except Exception as col_err:
                        db.session.rollback()
                        print(f"Contact settings migration notice ({col_name}): {col_err}")

    except Exception as e:
        print(f"Schema inspection notice: {e}")

def seed_database():
    """Seed initial default configurations and sample content if database is empty."""
    migrate_schema()
    
    # 1. Admin Account
    if not Admin.query.first():
        import os
        admin_username = os.environ.get('ADMIN_USERNAME', 'admin')
        admin_email = os.environ.get('ADMIN_EMAIL', 'coach.sindhuram@gmail.com')
        admin_password = os.environ.get('ADMIN_PASSWORD', '$12345678')

        admin = Admin(
            username=admin_username,
            email=admin_email
        )
        admin.set_password(admin_password)
        db.session.add(admin)

    # 2. Website Settings
    if not WebsiteSetting.query.first():
        site = WebsiteSetting(
            site_name='Cognova',
            tagline='Empowering Minds, Shaping Futures',
            site_description='Cognova is a premier educational platform providing world-class courses, subjects, lessons, and interactive learning assessments.',
            logo_url='https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&auto=format&fit=crop&q=80',
            favicon_url='https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=64&auto=format&fit=crop&q=80',
            dark_mode_default=False,
            location_name='Cognova',
            address='Coach Sindhu Ram Academy, Tamil Nadu, India',
            latitude='11.0168445',
            longitude='76.9558321',
            google_maps_url='https://www.google.com/maps/search/?api=1&query=11.0168445,76.9558321',
            apple_maps_url='https://maps.apple.com/?q=Cognova%20Academy&ll=11.0168445,76.9558321',
            maps_embed_url='https://maps.google.com/maps?q=Cognova%20Academy%20Coach%20Sindhu%20Ram&t=&z=15&ie=UTF8&iwloc=&output=embed'
        )
        db.session.add(site)


    # 3. Theme Settings
    if not ThemeSetting.query.first():
        theme = ThemeSetting(
            active_preset='Academic',
            primary_color='#1E3A8A',    # Navy Blue
            secondary_color='#0D9488',  # Teal
            accent_color='#F59E0B',     # Gold
            background_color='#F8FAFC', # Slate Light
            text_color='#0F172A',       # Dark Slate
            card_color='#FFFFFF',
            button_color='#1E3A8A',
            header_color='#FFFFFF',
            footer_color='#0F172A',
            font_heading='Outfit',
            font_body='Inter',
            font_scale='medium',
            heading_weight='700',
            body_weight='400',
            border_radius='12px',
            shadow_style='modern',
            is_published=True
        )
        db.session.add(theme)

    # 4. Homepage Sections
    if not HomepageSection.query.first():
        sections = [
            HomepageSection(
                section_key='hero',
                section_name='Hero Section',
                is_enabled=True,
                display_order=1,
                title='Master Vedic Maths, Memory & Speed Reading',
                subtitle='Unlock faster mental calculations, advanced memory recall, national competition practice, and rapid reading efficiency with Coach Sindhu Ram.',
                image_url='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80',
                cta_text='Explore Courses',
                cta_url='/courses',
                secondary_cta_text='Browse Subjects',
                secondary_cta_url='/subjects',
                background_style='gradient'
            ),
            HomepageSection(
                section_key='about',
                section_name='About Section',
                is_enabled=True,
                display_order=2,
                title='Empowering Minds with Coach Sindhu Ram',
                subtitle='Specialized Coaching in Vedic Mathematics, Memory Training, and Speed Reading.',
                content='Cognova offers world-class training in Vedic Maths (16 Sutras for rapid mental arithmetic), Memory Coaching (association & recall techniques), and Speed Reading (rapid information processing). Our students excel in national-level speed competitions and academic challenges.',
                image_url='https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
                cta_text='Learn More About Us',
                cta_url='/about',
                meta_json=json.dumps([
                    {'label': 'Active Students', 'value': '15,000+'},
                    {'label': 'Expert Courses', 'value': '120+'},
                    {'label': 'Interactive Lessons', 'value': '850+'},
                    {'label': 'Success Rate', 'value': '98%'}
                ])
            ),
            HomepageSection(
                section_key='featured_courses',
                section_name='Featured Courses',
                is_enabled=True,
                display_order=3,
                title='Featured Courses',
                subtitle='Handpicked premium courses designed by leading educators.',
                background_style='default'
            ),
            HomepageSection(
                section_key='benefits',
                section_name='Learning Benefits',
                is_enabled=True,
                display_order=4,
                title='Why Learn With Cognova?',
                subtitle='We provide an unmatched educational experience built for modern learners.',
                meta_json=json.dumps([
                    {'title': 'Expert Learning', 'desc': 'Curated curriculum by seasoned academic leaders and subject experts.', 'icon': 'Award'},
                    {'title': 'Structured Courses', 'desc': 'Step-by-step modules that build deep mastery from basics to advanced levels.', 'icon': 'Layers'},
                    {'title': 'Interactive Assessments', 'desc': 'Immediate feedback on quizzes and progress tracking to reinforce knowledge.', 'icon': 'CheckCircle'},
                    {'title': 'Quality Resources', 'desc': 'Comprehensive study notes, downloadable guides, and video lectures.', 'icon': 'FileText'},
                    {'title': 'Flexible Pace', 'desc': 'Learn anytime, anywhere on mobile or desktop at your own comfort.', 'icon': 'Clock'},
                    {'title': 'Continuous Growth', 'desc': 'Regular announcements, updated modules, and expanding course libraries.', 'icon': 'TrendingUp'}
                ])
            ),
            HomepageSection(
                section_key='testimonials',
                section_name='Student & Parent Testimonials',
                is_enabled=True,
                display_order=5,
                title='What Our Learners Say',
                subtitle='Real feedback from students thriving at Cognova.',
                meta_json=json.dumps([
                    {
                        'name': 'Priya Sharma',
                        'role': 'Science Student',
                        'quote': 'The structured lessons and quizzes at Cognova transformed my understanding of Physics and Mathematics!',
                        'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
                    },
                    {
                        'name': 'Rohan Verma',
                        'role': 'Computer Science Learner',
                        'quote': 'Clear video tutorials, concise notes, and instant quiz scoring helped me clear my competitive examinations with ease.',
                        'avatar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
                    },
                    {
                        'name': 'Ananya Iyer',
                        'role': 'High School Scholar',
                        'quote': 'The mobile-friendly layout and interactive assessments make revision fun and super efficient!',
                        'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                    }
                ])
            ),
            HomepageSection(
                section_key='announcements',
                section_name='Latest Announcements',
                is_enabled=True,
                display_order=6,
                title='Academy News & Updates',
                subtitle='Stay informed with the latest notifications, workshops, and exam alerts.',
                background_style='default'
            ),
            HomepageSection(
                section_key='cta',
                section_name='Call To Action',
                is_enabled=True,
                display_order=7,
                title='Ready to Begin Your Educational Journey?',
                subtitle='Explore our extensive library of subjects and take your knowledge to the next level today.',
                cta_text='Get Started Free',
                cta_url='/courses',
                background_style='dark'
            )
        ]
        for sec in sections:
            db.session.add(sec)
        db.session.commit()

    # 4b. Seed CMS Pages
    if not Page.query.filter_by(is_home=True).first():
        # Get old homepage sections if available
        old_sections = HomepageSection.query.order_by(HomepageSection.display_order.asc()).all()
        page_sections = []
        for old in old_sections:
            page_sections.append({
                "type": old.section_key if old.section_key in ['hero', 'about', 'featured_courses', 'benefits', 'testimonials', 'announcements', 'cta'] else 'richtext',
                "content": {
                    "title": old.title,
                    "subtitle": old.subtitle,
                    "cta_text": old.cta_text,
                    "cta_url": old.cta_url,
                    "image_url": old.image_url,
                    "html": old.content,
                    "meta": old.meta_json
                },
                "styles": {
                    "backgroundColor": "#1E3A8A" if old.background_style == 'dark' else "#ffffff",
                    "textColor": "#ffffff" if old.background_style == 'dark' else "#000000"
                }
            })

        home_page = Page(
            name="Home",
            slug="",
            is_home=True,
            status="published",
            seo_title="Cognova - Home",
            seo_description="Empowering Minds with Coach Sindhu Ram"
        )
        db.session.add(home_page)
        db.session.commit()
        
        for index, s_data in enumerate(page_sections):
            section = PageSection(
                page_id=home_page.id,
                type=s_data.get('type', 'generic'),
                display_order=index,
                content_json=json.dumps(s_data.get('content', {})),
                styles_json=json.dumps(s_data.get('styles', {}))
            )
            db.session.add(section)
        
        db.session.commit()

    # 5. Navigation Items
    if not NavigationItem.query.first():
        nav_items = [
            NavigationItem(label='Home', destination='/', display_order=1, location='both'),
            NavigationItem(label='About', destination='/about', display_order=2, location='both'),
            NavigationItem(label='Courses', destination='/courses', display_order=3, location='both'),
            NavigationItem(label='Subjects', destination='/subjects', display_order=4, location='both'),
            NavigationItem(label='Announcements', destination='/announcements', display_order=5, location='both'),
            NavigationItem(label='Contact', destination='/contact', display_order=6, location='both')
        ]
        for item in nav_items:
            db.session.add(item)

    # 6. Social Links
    if not SocialLink.query.first():
        socials = [
            SocialLink(platform='Instagram', url='https://www.instagram.com/coachsindhuram?igsh=MXR4cmdvaHZveHZleA%3D%3D', icon='Instagram', display_order=1, is_enabled=True),
            SocialLink(platform='YouTube', url='https://youtube.com/@cognova', icon='Youtube', display_order=2, is_enabled=False),
            SocialLink(platform='LinkedIn', url='https://www.linkedin.com/in/coach-sindhuram/', icon='Linkedin', display_order=3, is_enabled=True),
            SocialLink(platform='Facebook', url='https://facebook.com/cognova', icon='Facebook', display_order=4, is_enabled=True),
            SocialLink(platform='X', url='https://x.com/Cognova_edu', icon='Twitter', display_order=5, is_enabled=False)
        ]
        for soc in socials:
            db.session.add(soc)

    # 7. Contact Settings
    if not ContactSetting.query.first():
        contact = ContactSetting(
            email='coach.sindhuram@gmail.com',
            phone='+91 90803 85589',
            whatsapp='+919080385589',
            location_name='Cognova',
            address='Coach Sindhu Ram Academy, Tamil Nadu, India',
            latitude='11.0168445',
            longitude='76.9558321',
            google_maps_url='https://www.google.com/maps/search/?api=1&query=11.0168445,76.9558321',
            apple_maps_url='https://maps.apple.com/?q=Cognova%20Academy&ll=11.0168445,76.9558321',
            maps_embed_url='https://maps.google.com/maps?q=Cognova%20Academy%20Coach%20Sindhu%20Ram&t=&z=15&ie=UTF8&iwloc=&output=embed',
            working_hours='Monday - Saturday: 8:30 AM - 6:30 PM',
            contact_form_recipient='coach.sindhuram@gmail.com'
        )
        db.session.add(contact)

    # 8. SEO Settings
    if not SeoSetting.query.first():
        seo = SeoSetting(
            site_title='Cognova — Premier Educational Platform',
            meta_description='Empowering minds with structured courses, subjects, video lessons, and interactive quizzes.',
            keywords='education, academy, courses, subjects, lessons, quizzes, Cognova, learning',
            og_title='Cognova — Excellence in Education',
            og_description='Explore premier educational content and test your skills with interactive quizzes.'
        )
        db.session.add(seo)

    # 9. Flagship Subjects (Coach Sindhu Ram)
    if not Subject.query.first():
        vm_sub = Subject(
            name='Vedic Mathematics',
            slug='vedic-mathematics',
            description='Master ancient Vedic maths techniques, mental arithmetic, faster calculations, and competition-oriented practice.',
            image_url='https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
            icon='Calculator',
            display_order=1
        )
        mem_sub = Subject(
            name='Memory Coaching',
            slug='memory-coaching',
            description='Transform recall, retention, and cognitive learning strategies with proven memory training techniques.',
            image_url='https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=80',
            icon='Award',
            display_order=2
        )
        sr_sub = Subject(
            name='Speed Reading',
            slug='speed-reading',
            description='Develop speed-reading techniques to improve reading efficiency and rapidly process written information.',
            image_url='https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
            icon='BookOpen',
            display_order=3
        )
        db.session.add_all([vm_sub, mem_sub, sr_sub])
        db.session.flush()

        # 10. Flagship Courses
        c1 = Course(
            title='Vedic Maths & Speed Calculation Mastery',
            slug='vedic-maths-speed-calculation-mastery',
            description='Learn 16 Vedic Sutras for lightning-fast mental arithmetic, rapid multiplication, square roots, and national-level competition preparation.',
            thumbnail_url='https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
            category='Vedic Maths',
            subject_id=vm_sub.id,
            difficulty='All Levels',
            duration='4 Weeks',
            age_group='Grade 4 - 12 & Competitive Aspirants',
            prerequisites='Basic addition, subtraction and multiplication tables (1 to 9)',
            learning_outcomes=json.dumps([
                'Master all 16 Vedic Sutras and 13 Sub-sutras for instant mental math',
                'Calculate 2, 3, and 4-digit multiplication in seconds without pen and paper',
                'Rapidly compute square roots, cube roots, and recurring decimals',
                'Solve algebraic equations and divisibility checks with mental shortcuts',
                'Gain extreme confidence and speed for national-level speed math competitions'
            ]),
            skills_developed=json.dumps([
                'Mental Arithmetic Speed', 'Cognitive Agility', 'Numerical Intuition', 'Competitive Exam Readiness', 'Analytical Problem Solving'
            ]),
            faqs_json=json.dumps([
                {
                    'question': 'Who is this Vedic Maths program suitable for?',
                    'answer': 'This course is ideal for school students from Grade 4 onwards, high schoolers preparing for competitive exams (Olympiads, NTSE, SAT), and adults seeking sharp mental agility.'
                },
                {
                    'question': 'What are the batch timings and format?',
                    'answer': 'We offer both Live Interactive Zoom weekend/weekday batches and In-Person classes with Coach Sindhu Ram. Batch schedules are customized upon enrollment.'
                },
                {
                    'question': 'Will my child receive practice worksheets and assessments?',
                    'answer': 'Yes! Students receive structured digital practice sheets, timed speed calculation drills, and interactive assessments at every module.'
                }
            ]),
            status='published',
            is_featured=True,
            display_order=1
        )
        c2 = Course(
            title='Memory Coaching & Retention Masterclass',
            slug='memory-coaching-retention-masterclass',
            description='Master cognitive recall techniques, mnemonic systems, mind mapping, and long-term memory retention strategies.',
            thumbnail_url='https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=80',
            category='Memory Coaching',
            subject_id=mem_sub.id,
            difficulty='All Levels',
            duration='3 Weeks',
            age_group='Grade 6 - 12, College & Professionals',
            prerequisites='Keen desire to improve study recall, focus, and memory techniques',
            learning_outcomes=json.dumps([
                'Learn association, visualization, and link mnemonic techniques',
                'Memorize long formulas, historical dates, periodic tables, and vocabulary effortlessly',
                'Master the Peg System and Journey / Memory Palace method',
                'Eliminate exam anxiety through structured spaced-retrieval techniques',
                'Double information retention duration and speed of review'
            ]),
            skills_developed=json.dumps([
                'Long-term Memory Retention', 'Mnemonic Association', 'Focus & Concentration', 'Spatial Memory Mapping', 'Exam Stress Reduction'
            ]),
            faqs_json=json.dumps([
                {
                    'question': 'How quickly will I see improvements in my memory?',
                    'answer': 'Most students experience a dramatic 2x to 3x increase in their recall speed and retention within the first 3 sessions of applying the visualization frameworks.'
                },
                {
                    'question': 'Can these techniques be applied to academic textbooks?',
                    'answer': 'Absolutely. The frameworks are specifically designed for academic concepts like science terms, vocabulary, formulas, speeches, and complex sequences.'
                }
            ]),
            status='published',
            is_featured=True,
            display_order=2
        )
        c3 = Course(
            title='Speed Reading & Rapid Information Processing',
            slug='speed-reading-rapid-information-processing',
            description='Double your reading speed, eliminate sub-vocalization, expand peripheral vision, and maximize comprehension efficiency.',
            thumbnail_url='https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
            category='Speed Reading',
            subject_id=sr_sub.id,
            difficulty='All Levels',
            duration='2 Weeks',
            age_group='Grade 7 - 12, College Students & Professionals',
            prerequisites='Basic English reading proficiency',
            learning_outcomes=json.dumps([
                'Increase reading speed from 150-200 WPM to 400-600+ WPM',
                'Eliminate subvocalization (inner reading voice) that slows comprehension',
                'Expand peripheral vision span to read whole chunks and sentences in single fixations',
                'Master skimming, scanning, and deep-comprehension reading modes',
                'Finish comprehensive books, research papers, and chapters in half the time'
            ]),
            skills_developed=json.dumps([
                'Speed Reading (400+ WPM)', 'Peripheral Vision Expansion', 'Rapid Text Scanning', 'High Comprehension Rate', 'Information Processing'
            ]),
            faqs_json=json.dumps([
                {
                    'question': 'Will speed reading reduce my reading comprehension?',
                    'answer': 'No! When trained with Coach Sindhu Ram’s eye-pacing and chunking methods, comprehension actually improves because your brain processes words in cohesive visual ideas rather than isolated syllables.'
                },
                {
                    'question': 'Do I need special software or tools?',
                    'answer': 'No special tools required. You will learn eye drills and pacing techniques that you can apply immediately to printed books, PDFs, and digital screens.'
                }
            ]),
            status='published',
            is_featured=True,
            display_order=3
        )
        db.session.add_all([c1, c2, c3])
        db.session.flush()

        # Modules & Lessons for Vedic Maths
        m1 = CourseModule(course_id=c1.id, title='Module 1: Mental Arithmetic & Sutras', display_order=1)
        db.session.add(m1)
        db.session.flush()

        l1 = Lesson(
            course_id=c1.id,
            module_id=m1.id,
            subject_id=vm_sub.id,
            title='Fast Mental Multiplication Techniques',
            slug='fast-mental-multiplication-techniques',
            description='Learn Ekadhikena Purvena and Vertically & Crosswise techniques for instant mental calculations.',
            content='''# Vedic Maths: Fast Mental Calculations

Vedic Mathematics is an ancient Indian system of calculation based on 16 main Sutras (word-formulas).

## Key Benefits
- **Lightning Speed**: Solve complex arithmetic 10x faster than traditional methods.
- **Mental Agility**: Eliminates reliance on calculators.
- **Competition Readiness**: Prepares students for national-level speed challenges.

### Technique 1: Multiplication by 11
To multiply a 2-digit number by 11:
1. Separate the two digits.
2. Add the two digits together.
3. Place the sum in the middle!

Example: `45 x 11`
- 4 and 5 separated -> `4 _ 5`
- 4 + 5 = 9
- Result: **495**
''',
            video_url='https://www.youtube.com/embed/rfscVS0vtbw',
            duration='15 mins',
            display_order=1,
            is_published=True
        )
        l2 = Lesson(
            course_id=c2.id,
            module_id=None,
            subject_id=mem_sub.id,
            title='Mnemonic & Association Techniques',
            slug='mnemonic-association-techniques',
            description='Learn how to connect new concepts with vivid mental imagery for instant recall.',
            content='''# Memory Coaching: Mental Association & Mnemonics

Memory is built on association. By anchoring abstract information to vivid mental images, retention increases dramatically.

## Core Strategies
- **Visualization**: Make mental pictures bright, exaggerated, and active.
- **Peg System**: Associate numbers with predefined peg words.
- **Spaced Retrieval**: Re-visit key memories at strategic intervals.
''',
            video_url='https://www.youtube.com/embed/k9TUPpGqYTo',
            duration='20 mins',
            display_order=1,
            is_published=True
        )
        db.session.add_all([l1, l2])
        db.session.flush()

        # Quiz for Vedic Maths
        q1 = Quiz(
            course_id=c1.id,
            lesson_id=l1.id,
            title='Vedic Maths Speed Challenge',
            description='Test your mental calculation speed and sutra techniques.',
            time_limit_minutes=10,
            passing_score=70,
            is_published=True
        )
        db.session.add(q1)
        db.session.flush()

        qn1 = Question(
            quiz_id=q1.id,
            question_text='Using the Vedic Maths technique, what is 36 x 11?',
            question_type='single_choice',
            points=10,
            display_order=1,
            explanation='Separate 3 and 6, middle digit is 3 + 6 = 9. Answer is 396.'
        )
        db.session.add(qn1)
        db.session.flush()

        db.session.add_all([
            QuizOption(question_id=qn1.id, option_text='386', is_correct=False, display_order=1),
            QuizOption(question_id=qn1.id, option_text='396', is_correct=True, display_order=2),
            QuizOption(question_id=qn1.id, option_text='406', is_correct=False, display_order=3),
            QuizOption(question_id=qn1.id, option_text='366', is_correct=False, display_order=4)
        ])

        qn2 = Question(
            quiz_id=q1.id,
            question_text='Python is an interpreted programming language. True or False?',
            question_type='true_false',
            points=10,
            display_order=2,
            explanation='Yes, Python code is interpreted line-by-line by the Python interpreter.'
        )
        db.session.add(qn2)
        db.session.flush()

        db.session.add_all([
            QuizOption(question_id=qn2.id, option_text='True', is_correct=True, display_order=1),
            QuizOption(question_id=qn2.id, option_text='False', is_correct=False, display_order=2)
        ])

    # 12. V2 Migration: Auto-enrich existing courses if learning outcomes are empty
    courses = Course.query.all()
    for c in courses:
        updated = False
        if not c.age_group:
            c.age_group = 'Grade 4 - 12 & Adults'
            updated = True
        if not c.prerequisites:
            c.prerequisites = 'Basic arithmetic and keen interest in rapid learning'
            updated = True
        if not c.learning_outcomes:
            if 'vedic' in c.title.lower():
                c.learning_outcomes = json.dumps([
                    'Master all 16 Vedic Sutras and 13 Sub-sutras for instant mental math',
                    'Calculate 2, 3, and 4-digit multiplication in seconds without pen and paper',
                    'Rapidly compute square roots, cube roots, and recurring decimals',
                    'Solve algebraic equations and divisibility checks with mental shortcuts',
                    'Gain extreme confidence and speed for national-level speed math competitions'
                ])
                c.skills_developed = json.dumps([
                    'Mental Arithmetic Speed', 'Cognitive Agility', 'Numerical Intuition', 'Competitive Exam Readiness', 'Analytical Problem Solving'
                ])
                c.faqs_json = json.dumps([
                    {
                        'question': 'Who is this Vedic Maths program suitable for?',
                        'answer': 'This course is ideal for school students from Grade 4 onwards, high schoolers preparing for competitive exams (Olympiads, NTSE, SAT), and adults seeking sharp mental agility.'
                    },
                    {
                        'question': 'What are the batch timings and format?',
                        'answer': 'We offer both Live Interactive Zoom weekend/weekday batches and In-Person classes with Coach Sindhu Ram. Batch schedules are customized upon enrollment.'
                    }
                ])
                updated = True
            elif 'memory' in c.title.lower():
                c.learning_outcomes = json.dumps([
                    'Learn association, visualization, and link mnemonic techniques',
                    'Memorize long formulas, historical dates, periodic tables, and vocabulary effortlessly',
                    'Master the Peg System and Journey / Memory Palace method',
                    'Eliminate exam anxiety through structured spaced-retrieval techniques',
                    'Double information retention duration and speed of review'
                ])
                c.skills_developed = json.dumps([
                    'Long-term Memory Retention', 'Mnemonic Association', 'Focus & Concentration', 'Spatial Memory Mapping', 'Exam Stress Reduction'
                ])
                c.faqs_json = json.dumps([
                    {
                        'question': 'How quickly will I see improvements in my memory?',
                        'answer': 'Most students experience a dramatic 2x to 3x increase in their recall speed and retention within the first 3 sessions of applying the visualization frameworks.'
                    }
                ])
                updated = True
            elif 'speed' in c.title.lower():
                c.learning_outcomes = json.dumps([
                    'Increase reading speed from 150-200 WPM to 400-600+ WPM',
                    'Eliminate subvocalization (inner reading voice) that slows comprehension',
                    'Expand peripheral vision span to read whole chunks and sentences in single fixations',
                    'Master skimming, scanning, and deep-comprehension reading modes',
                    'Finish comprehensive books, research papers, and chapters in half the time'
                ])
                c.skills_developed = json.dumps([
                    'Speed Reading (400+ WPM)', 'Peripheral Vision Expansion', 'Rapid Text Scanning', 'High Comprehension Rate', 'Information Processing'
                ])
                c.faqs_json = json.dumps([
                    {
                        'question': 'Will speed reading reduce my reading comprehension?',
                        'answer': 'No! When trained with Coach Sindhu Ram’s eye-pacing and chunking methods, comprehension actually improves because your brain processes words in cohesive visual ideas rather than isolated syllables.'
                    }
                ])
                updated = True

    db.session.commit()

