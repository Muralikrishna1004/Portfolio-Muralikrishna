-- SUPABASE DDL SETUP FOR MURALI PORTFOLIO

-- 1. Portfolio Profile
CREATE TABLE portfolio_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    roles TEXT[] NOT NULL DEFAULT '{}', -- e.g. ["Python Full Stack Developer", "Software Engineer"]
    date_of_birth DATE,
    degree VARCHAR(255),
    about_text TEXT,
    resume_url TEXT,
    profile_photo_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Portfolio Projects
CREATE TABLE portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT '{}', -- e.g. ["React JS", "Django"]
    github_link TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Portfolio Skills
CREATE TABLE portfolio_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL, -- e.g. "Frontend", "Backend", "Tools"
    skill_name VARCHAR(100) NOT NULL,
    icon_name VARCHAR(100), -- FontAwesome class e.g. "fab fa-react" or image url
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Portfolio Experience & Education
CREATE TABLE portfolio_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL, -- "experience" or "education"
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    description TEXT,
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) to allow public read access but secure inserts
ALTER TABLE portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_experience ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all relevant tables
CREATE POLICY "Allow public read access on portfolio_profile" ON portfolio_profile FOR SELECT USING (true);
CREATE POLICY "Allow public read access on portfolio_projects" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on portfolio_skills" ON portfolio_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on portfolio_experience" ON portfolio_experience FOR SELECT USING (true);
