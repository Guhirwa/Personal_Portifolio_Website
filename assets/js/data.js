window.PORTFOLIO_DATA = {
  profile: {
    name: "Christian Guhirwa",
    title: "Software Engineer",
    tagline: "Crafting practical and user-focused digital solutions.",
    address: "93 KK 495 St",
    phone: "+250 790 714 202",
    email: "guhirwachristian004@gmail.com",
  },
  about: {
    intro:
      "Passionate Software Engineering student with strong technical expertise in web and software development, plus hands-on experience in IT support, teamwork, and training facilitation.",
    summary:
      "Dedicated to leveraging technology for sustainable development and process improvement across real-world projects.",
  },
  skills: {
    technical: [
      "Languages: JavaScript, TypeScript, Java, SQL, C, C#",
      "Frameworks: React, Tailwind CSS, Node.js, Express, NestJS, Spring Boot, Java Swing, .NET",
      "Databases: MySQL, PostgreSQL, Oracle",
      "Tools: Git/GitHub, Docker (basic), VS Code, Eclipse, Postman",
    ],
    professional: [
      "Communication and team collaboration",
      "Problem-solving and critical thinking",
      "Adaptability and continuous learning",
      "Agile methodologies (Scrum, Kanban)",
      "Project tools: Jira, Trello, Toggl",
    ],
    languages: ["English: Professional fluency", "Kinyarwanda: Native"],
  },
  experience: [
    "Front End Development Trainee, ALX Rwanda (May 2025 - Dec 2025)",
    "Professional Foundation Trainee, ALX Rwanda (May 2025 - Aug 2025)",
    "AI Engineering Specialization, The Gym Rwanda (Feb 2026 - Present)",
    "Training Facilitator, The Gym Rwanda (May 2025 - Sept 2025)",
    "IT Support and Customer Care Assistant, Gihundwe Sector (Dec 2022 - Sept 2023)",
    "BSc Software Engineering, AUCA (Sept 2023 - Present, GPA: 3.4)",
  ],
  projects: [
    {
      id: "portfolio-site",
      title: "Portfolio Website",
      description:
        "A responsive personal portfolio built with semantic HTML, modular CSS, and JavaScript-driven rendering.",
      category: "web",
      technologies: ["HTML", "CSS", "JavaScript"],
      role: "Frontend Developer",
      liveLink: "#",
      githubLink: "#",
    },
  ],
  blogPosts: [
    {
      id: "building-clean-layouts",
      title: "Building Clean Layouts for Small Projects",
      excerpt:
        "A practical note on keeping personal project layouts simple, readable, and easy to maintain.",
      category: "design",
      date: "2026-04-05",
      content: [
        "Start with semantic structure before adding visual polish.",
        "Use spacing, headings, and contrast to guide the reader.",
        "Keep components reusable so future sections stay consistent.",
      ],
      codeSnippet: '<section class="content-block">...</section>',
    },
    {
      id: "data-driven-ui",
      title: "Why I Moved to a Data-Driven UI",
      excerpt:
        "A short reflection on keeping content in one place and rendering it through JavaScript.",
      category: "development",
      date: "2026-04-06",
      content: [
        "One source of truth avoids duplication and reduces mistakes.",
        "Render functions make it easier to update entire sections later.",
        "The pattern works well for portfolio sites and small dashboards.",
      ],
      codeSnippet: "window.renderProjects(container, 'all');",
    },
    {
      id: "responsive-first",
      title: "Thinking Mobile-First for Portfolio Pages",
      excerpt:
        "A short guide to designing mobile-first layouts before moving to larger screens.",
      category: "css",
      date: "2026-04-07",
      content: [
        "Use flexible grids and avoid fixed widths.",
        "Test buttons, cards, and sections on smaller screens early.",
        "Add enhancements for larger screens after the mobile layout works well.",
      ],
      codeSnippet:
        "grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));",
    },
  ],
};
