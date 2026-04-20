interface project {
  id: number;
  name: string;
  description: string;
  link?: string;
  githubLink?: string;
  gitlabLink?: string;
  isFeatured: boolean;

  image: string;

  status: "Deleted" | "Active";
  technologies: string[];
}

const projects: project[] = [
  {
    id: 1,
    name: "Console-Based Library Management System",
    description:
      "This is a JavaScript and Node.js terminal-based Library Management System featuring user authentication, role-based access, book inventory tracking, borrowing, and search functions. It showcases my skills in core JavaScript, structured logic, and interactive command-line application development.",

    gitlabLink:
      "https://gitlab.com/uplift-code-camp/students/batch-28/leoncio/projects/-/tree/1cc778b5db8a77aff45e78e98c905c194f328bf9/p1-js-console-app",
    isFeatured: false,
    image: "/images/project/console-app.jpg",
    status: "Active",
    technologies: ["Javascript"],
  },
  {
    id: 2,
    name: "Web Portfolio",
    description:
      "This is a responsive personal portfolio website built with HTML and CSS to showcase my background, technical skills, featured projects, resume, and contact links. It highlights my front-end development skills and ability to create clean, user-focused web layouts.",
    link: "https://leon-espiritu.netlify.app/",
    isFeatured: false,
    gitlabLink:
      "https://gitlab.com/uplift-code-camp/students/batch-28/leoncio/projects/-/tree/1cc778b5db8a77aff45e78e98c905c194f328bf9/p2-web-dev-portfolio",
    image: "/images/project/portfolio-v1.jpg",
    status: "Active",
    technologies: ["HTML", "CSS", "Responsive Design"],
  },
  {
    id: 3,
    name: "Color Game",
    description:
      "This is an interactive JavaScript browser game where users place bets on colors, track money, manage transactions, and view game results through modals and dynamic UI updates. It showcases my skills in DOM manipulation, modular JavaScript, validation, and user interaction design.",
    isFeatured: false,
    link: "https://color-game-leo.netlify.app/",
    gitlabLink:
      "https://gitlab.com/uplift-code-camp/students/batch-28/leoncio/projects/-/tree/1cc778b5db8a77aff45e78e98c905c194f328bf9/p3-js-api-app",
    image: "/images/project/color-game.jpg",
    status: "Active",
    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
      "DOM Manipulation",
      "Modular JavaScript",
      "Local Storage",
      "API Integration",
    ],
  },

  {
    id: 4,
    name: "Web Invitation Restful API",
    description:
      "This is a backend API built with Node.js, Express, and MongoDB for managing web invitations, RSVPs, themes, and user authentication. It showcases my skills in REST API development, database integration, JWT-based security, file uploads, and backend project structure.",
    isFeatured: false,
    link: "https://node-app-tjc4.onrender.com/client/",
    gitlabLink:
      "https://gitlab.com/uplift-code-camp/students/batch-28/leoncio/projects/-/tree/1cc778b5db8a77aff45e78e98c905c194f328bf9/p4-node-app",
    image: "/images/project/web-invitation-API.jpg",
    status: "Active",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "REST API",
      "JWT",
      "File Uploads",
    ],
  },

  {
    id: 5,
    name: "Restuarant Frontend App",
    description:
      "This project is a responsive restaurant web application built with React, Vite, Tailwind CSS, and React Router. It features menu browsing, cart and checkout flow, multiple pages, and shared state management, showcasing my skills in modern front-end development.",
    isFeatured: true,
    link: "https://restaurant-uplift-proj5.netlify.app/",
    gitlabLink:
      "https://gitlab.com/uplift-code-camp/students/batch-28/leoncio/projects/-/tree/1cc778b5db8a77aff45e78e98c905c194f328bf9/p5-react-app",
    image: "/images/project/restuarant-web-app.jpg",
    status: "Active",
    technologies: [
      "React.js",
      "TailwindCSS",
      "Local Storage",
      "Responsive Design",
      "API Integration",
    ],
  },

  {
    id: 6,
    name: "Queue Flow",
    description:
      "Queue Flow is a full-stack queue and appointment management system built with React, Node.js, Express, and MongoDB. It features customer booking, admin queue control, authentication, and real-time updates with Socket.IO, showcasing collaborative frontend and backend development in a team project.",
    isFeatured: true,
    link: "https://queue-flow-fend.onrender.com/",
    gitlabLink:
      "https://gitlab.com/uplift-code-camp/students/batch-28/group-project/group4/-/tree/f6592a11cecc831446a78b0e0a55bd77091c3abd/",
    image: "/images/project/queue-flow.jpg",
    status: "Active",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "JWT",
      "React.js",
      "TailwindCSS",
      "Agile Methodology",
    ],
  },
  {
    id: 7,
    name: "Reactjs web Portfolio",
    description:
      "A responsive personal portfolio built with React, TypeScript, Vite, and Tailwind CSS. It showcases my profile, technical skills, and selected projects through a modern single-page interface with smooth section transitions, interactive project cards, and a mobile-friendly layout.",
    isFeatured: true,
    link: "https://leoncio-espiritu.vercel.app/",
    gitlabLink:
      "https://gitlab.com/uplift-code-camp/students/batch-28/leoncio/projects/-/tree/c323b8c47461e8fb080a63fe992fb397c23dfcaa/portfolio-fend",
    githubLink:
      "https://github.com/lespiritu/uplift-projects-2026/tree/main/portfolio-fend",
    image: "/images/project/react-web-portfolio.jpg",
    status: "Active",
    technologies: ["React.js", "TailwindCSS", "Typescript"],
  },
];

export default projects;
