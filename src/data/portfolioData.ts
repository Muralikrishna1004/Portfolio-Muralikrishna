export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  futureEnhancements: string[];
  impact: string[];
  liveUrl: string;
  githubUrl: string;
  images: string[];
  category: 'fullstack' | 'ai' | 'frontend' | 'backend';
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'education' | 'experience' | 'achievement';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl: string;
  link?: string;
  skills?: string[];
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  journal?: string;
  date: string;
  authors: string[];
  doi?: string;
  description: string;
  abstract?: string;
  keywords?: string[];
  pdfUrl?: string;
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export const personalInfo = {
  name: 'Murali Krishna K',
  fullName: 'Murali Krishna K',
  title: 'Python Full Stack Developer',
  tagline: 'Proficient in HTML, CSS, JavaScript, React.js, Core Python, Django, MySQL',
  valueStatement: 'Python Full Stack Developer specializing in React, Django, and MySQL to build efficient, scalable web applications.',
  email: 'muralicibi05@gmail.com',
  phone: '+91 6380274578',
  location: 'Vellore, Tamilnadu',
  bio: `I am Murali Krishna K, proficient in HTML, CSS, JavaScript, React.js, Core Python, Django, MySQL. Having a strong foundation in Computer Application and a passion for technology, I aim to implement my innovative ideas and skills to accomplish projects that contribute to the organization's growth.`,
  resumeUrl: '/muralikrishnresume.pdf',
  profileImage: '/murai.jpeg',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/Muralikrishna1004', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/murali-krishna-k-5494232a3?utm_source=share_via&utm_content=profile&utm_medium=member_android', icon: 'linkedin' },
    { platform: 'Email', url: 'mailto:muralicibi05@gmail.com', icon: 'mail' },
    { platform: 'WhatsApp', url: 'https://wa.me/916380274578', icon: 'message-circle' },
  ]
};

export const projects: Project[] = [
  {
    id: 'steel-waste-management',
    title: 'Steel Waste Management (Eco-Centric Grouping Strategy)',
    tagline: 'Eco-Centric Grouping Strategy for sustainable waste management',
    description: 'A system designed for efficient management of steel waste, employing eco-centric grouping strategies to optimize recycling and waste reduction.',
    problem: 'Traditional steel waste management lacks organized grouping strategies, leading to inefficiencies in recycling, resource wastage, and environmental concerns.',
    solution: 'Built a web-based management platform implementing an Eco-Centric Grouping Strategy that categorizes and processes steel waste effectively.',
    architecture: 'React frontend combined with a Django and MySQL backend for robust data storage and query processing.',
    technologies: ['Python', 'Django', 'React JS', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Eco-Centric Grouping Algorithm',
      'Steel Waste Inventory Tracking',
      'Efficient Waste Classification',
      'Real-time Dashboard Analytics',
      'User and Role Management'
    ],
    challenges: [
      'Designing an efficient grouping algorithm for diverse steel grades',
      'Ensuring fast database queries for tracking large inventories of waste material',
      'Creating an intuitive interface for field workers to log waste details'
    ],
    futureEnhancements: [
      'AI-powered classification using computer vision',
      'IoT integration with waste bins for auto-filling status',
      'Mobile application for offline log entry'
    ],
    impact: [
      'Improved recycling efficiency by grouping matching steel waste grades',
      'Enhanced environmental tracking and sustainability reporting',
      'Optimized warehouse and processing plant resource utilization'
    ],
    liveUrl: 'https://github.com/Muralikrishna1004',
    githubUrl: 'https://github.com/Muralikrishna1004',
    images: [
      '/steel_waste.png'
    ],
    category: 'fullstack',
    featured: true
  },
  {
    id: 'festival-app',
    title: 'Festival App',
    tagline: 'Modern Festival & Event Management',
    description: 'A comprehensive application for managing and discovering upcoming festivals, events, and concerts with a modern, vibrant user interface.',
    problem: 'People struggle to find and manage tickets for local events and festivals in an organized, beautiful platform.',
    solution: 'Created a centralized festival discovery platform with an engaging UI, live updates, and easy ticket management.',
    architecture: 'React frontend hosted on Vercel.',
    technologies: ['React JS', 'Tailwind CSS', 'Vercel', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Event Discovery & Search',
      'Interactive Event Details',
      'Modern Vibrant Interface',
      'Mobile Responsive Design'
    ],
    challenges: [
      'Designing an engaging, vibrant neon-themed UI',
      'Ensuring performance with high-quality media'
    ],
    futureEnhancements: [
      'Ticket purchasing integration',
      'Social sharing and friend grouping'
    ],
    impact: [
      'Provides a stunning user experience for event discovery',
      'Showcases modern frontend design capabilities'
    ],
    liveUrl: 'https://festival-app-omega.vercel.app/',
    githubUrl: 'https://github.com/Muralikrishna1004',
    images: [
      '/festival_app.png'
    ],
    category: 'frontend',
    featured: true
  },
  {
    id: 'task-management',
    title: 'Task Management System',
    tagline: 'Enterprise-grade task management with intelligent assignment',
    description: 'A comprehensive task management platform featuring multi-role authentication, real-time task assignment, and team productivity analytics.',
    problem: 'Organizations struggle with task delegation, tracking progress, and maintaining accountability across hierarchies.',
    solution: 'Built a role-based task management system with real-time updates, automated notifications, and comprehensive analytics dashboard.',
    architecture: 'React frontend with Django REST framework backend, MySQL database for robust data management.',
    technologies: ['React JS', 'Django', 'MySQL', 'Python', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Multi-role Authentication (Admin, Manager, Employee)',
      'Real-time Task Assignment & Status Updates',
      'Productivity Metrics & Reports',
      'Task Prioritization & Deadlines',
      'Automated Email Notifications'
    ],
    challenges: [
      'Role-based access control with granular permissions',
      'Optimizing dashboard queries for large datasets',
      'Real-time status updates synchronization'
    ],
    futureEnhancements: [
      'AI-powered task prioritization',
      'Integration with calendar apps',
      'Mobile application development'
    ],
    impact: [
      '30% improvement in task completion rate',
      '50% reduction in communication overhead',
      'Real-time visibility into team productivity'
    ],
    liveUrl: 'https://github.com/Muralikrishna1004',
    githubUrl: 'https://github.com/Muralikrishna1004',
    images: [
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'fullstack',
    featured: true
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce Online Shopping Platform',
    tagline: 'Modern e-commerce with seamless shopping experience',
    description: 'A full-featured e-commerce platform with product catalogs, shopping cart, customer reviews, and secure checkout systems.',
    problem: 'Small businesses lack access to affordable, customizable e-commerce solutions with enterprise-level features.',
    solution: 'Built a scalable e-commerce platform with catalog management, secure checkout, and a responsive shopping interface.',
    architecture: 'React JS frontend for high-speed page transition, Django and MySQL backend for robust transaction logging.',
    technologies: ['React JS', 'Django', 'MySQL', 'Python', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Product Catalog Management',
      'Shopping Cart & Wishlist',
      'Secure Checkout Flow',
      'Order Status Tracking',
      'Admin Inventory Dashboard'
    ],
    challenges: [
      'Handling concurrent inventory updates',
      'Designing a seamless and secure transaction flow',
      'Optimizing page load times for high-resolution product images'
    ],
    futureEnhancements: [
      'AI product recommendations',
      'Multi-vendor marketplace support',
      'Mobile app development'
    ],
    impact: [
      'Increased sales conversion rate for test vendors',
      'Reduced cart abandonment rate',
      'Streamlined product and inventory management'
    ],
    liveUrl: 'https://github.com/Muralikrishna1004',
    githubUrl: 'https://github.com/Muralikrishna1004',
    images: [
      'https://images.pexels.com/photos/2305445/pexels-photo-2305445.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'fullstack',
    featured: true
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95, icon: 'html' },
      { name: 'CSS3', level: 90, icon: 'css' },
      { name: 'JavaScript', level: 85, icon: 'javascript' },
      { name: 'React', level: 80, icon: 'react' }
    ]
  },
  {
    category: 'Backend & Database',
    skills: [
      { name: 'Python', level: 85, icon: 'python' },
      { name: 'Django', level: 80, icon: 'django' },
      { name: 'MySQL', level: 85, icon: 'mysql' },
      { name: 'Supabase', level: 75, icon: 'supabase' }
    ]
  },
  {
    category: 'Tools',
    skills: [
      { name: 'GitHub', level: 90, icon: 'github' },
      { name: 'Git', level: 85, icon: 'git' },
      { name: 'Vercel', level: 80, icon: 'vercel' }
    ]
  }
];

export const experience: Experience[] = [
  {
    role: 'Python Full Stack Intern',
    company: 'Vcodez Innovating Ideas',
    period: 'April 2025 - June 2025',
    location: 'Remote / Tamil Nadu',
    description: [
      'Developed and maintained full-stack web applications using React.js for the frontend and Django with MySQL for the backend.',
      'Built responsive UI components and integrated REST APIs to connect the frontend with backend services.',
      'Contributed to database schema design and query optimization for improved application performance.',
      'Collaborated with the team on real-world projects, applying Python, Django, React.js, and MySQL in production environments.'
    ],
    technologies: ['Python', 'Django', 'React.js', 'MySQL', 'HTML', 'CSS', 'JavaScript']
  }
];

export const timeline: TimelineItem[] = [
  {
    year: 'April 2025 - June 2025',
    title: 'Python Full Stack Intern',
    organization: 'Vcodez Innovating Ideas',
    description: 'Learned and applied core Python Full Stack with web development concepts in real projects. Contributed to front-end pages using React.js and Back-end pages using Django, MySQL.',
    type: 'experience'
  },
  {
    year: '2024 - 2026',
    title: 'MCA',
    organization: 'Dr.M.G.R. Educational And Research Institute',
    description: 'Currently Pursuing with a CGPA of 8.0 up to 3rd Semester without Backlog.',
    type: 'education'
  },
  {
    year: '2021 - 2024',
    title: 'BSc Computer Science',
    organization: 'C.Abdul Hakeem College',
    description: 'Completed with 72% in Academics without Backlog.',
    type: 'education'
  }
];

export const certifications: Certification[] = [
  {
    id: 'internship-certificate',
    title: 'Python Full Stack Developer Internship',
    issuer: 'Vcodez Innovating Ideas',
    date: '2025',
    imageUrl: '/certificates/internship_certificate.jpg',
    description: 'Completed a hands-on internship in Python Full Stack Development, working with React.js, Django, and MySQL on real-world projects.',
    skills: ['Python', 'Django', 'React.js', 'MySQL', 'REST APIs']
  },
  {
    id: 'python-course',
    title: 'Python Programming Course',
    issuer: 'Multimise Software Solutions',
    date: '2025',
    imageUrl: '/certificates/python_course.jpg',
    description: 'Comprehensive course covering Python programming fundamentals, data structures, OOP, and web development with Django.',
    skills: ['Python', 'OOP', 'Data Structures', 'Django']
  },
  {
    id: 'bsc-certificate',
    title: 'BSc Degree Completion Certificate',
    issuer: 'C. Abdul Hakeem College',
    date: '2024',
    imageUrl: '/certificates/bsc_certificate.jpg',
    description: 'Successfully completed Bachelor of Science in Computer Science with 72% aggregate without any backlogs.',
    skills: ['Computer Science', 'Programming', 'Networking', 'Database Management']
  }
];

export const publications: Publication[] = [];

export const stats = {
  totalVisitors: 0,
  projectsCompleted: 4,
  technologiesLearned: 10,
  publications: 0,
  yearsExperience: 1,
  githubRepos: 5
};

