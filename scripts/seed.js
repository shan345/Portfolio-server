const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

// Import models
const Admin = require("../models/Admin");
const Hero = require("../models/Hero");
const About = require("../models/About");
const Skill = require("../models/Skill");
const Project = require("../models/Project");
const SocialLinks = require("../models/SocialLinks");

async function seed() {
  try {
    // Connect MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    /* ---------------- ADMIN ---------------- */
    const existingAdmin = await Admin.findOne({ username: "shan" });

    if (!existingAdmin) {
      await Admin.create({
        username: "shan",
        password: "Shan@345@dev@portfolio",
      });

      console.log("✅ Admin created → admin / admin123");
    } else {
      console.log("ℹ️ Admin already exists");
    }

    /* ---------------- HERO ---------------- */
    const heroExists = await Hero.findOne();

    if (!heroExists) {
      await Hero.create({
        greeting: "Hai there!",
        typewriterStrings: ["I'm Shan", "I'm a Software Engineer"],
        profileImage: "",
        resumeLink:
          "https://drive.google.com/file/d/1oxhexkyGn4tRlBuQI540a_a5JU65OMn0/view?usp=sharing",
      });

      console.log("✅ Hero seeded");
    }

    /* ---------------- ABOUT ---------------- */
    const aboutExists = await About.findOne();

    if (!aboutExists) {
      await About.create({
        education: {
          degree: "B.E - Computer Science and Engineering",
          college: "Jerusalem College of Engineering, Chennai",
        },
        certifications: [
          {
            title: "Python Programming",
            certId: "UC-3feb850d-9a67-45d3-af9a-91d7f38651bf",
          },
          {
            title: "Full Stack Web Development (MERN)",
            certId: "UC-49654252-1482-47a6-bd4a-20bf2d1b478a",
          },
        ],
        experiences: [
          {
            company: "Edify Techno Solutions",
            role: "Full Stack Web Development (MERN)",
            employmentType: "Internship",
            startDate: "Jan 2024",
            endDate: "Feb 2024",
            totalDuration: "1 month",
            location: "Chennai, India",
            description: "Developed and deployed full-stack web applications using the MERN stack."
          }
        ],
        resumeLink:
          "https://drive.google.com/file/d/1oxhexkyGn4tRlBuQI540a_a5JU65OMn0/view?usp=sharing",
      });

      console.log("✅ About seeded");
    }

    /* ---------------- SKILLS ---------------- */
    // Always refresh skills (delete + re-insert)
    await Skill.deleteMany({});
    const skills = [
      // Row 1: Languages (4+4+4 = 12)
      { name: "JavaScript", gridSize: 4, order: 0 },
      { name: "TypeScript", gridSize: 4, order: 1 },
      { name: "Python", gridSize: 4, order: 2 },

      // Row 2: Backend Frameworks (4+4+4 = 12)
      { name: "Node.js", gridSize: 4, order: 3 },
      { name: "Express.js", gridSize: 4, order: 4 },
      { name: "NestJS", gridSize: 4, order: 5 },

      // Row 3: Frontend (3+3+3+3 = 12)
      { name: "React", gridSize: 3, order: 6 },
      { name: "Next.js", gridSize: 3, order: 7 },
      { name: "Redux", gridSize: 3, order: 8 },
      { name: "HTML & CSS", gridSize: 3, order: 9 },

      // Row 4: Databases (4+4+4 = 12)
      { name: "MongoDB", gridSize: 4, order: 10 },
      { name: "PostgreSQL", gridSize: 4, order: 11 },
      { name: "Redis", gridSize: 4, order: 12 },

      // Row 5: API Protocols (3+3+3+3 = 12)
      { name: "REST API", gridSize: 3, order: 13 },
      { name: "gRPC", gridSize: 3, order: 14 },
      { name: "GraphQL", gridSize: 3, order: 15 },
      { name: "WebSocket", gridSize: 3, order: 16 },

      // Row 6: ORM / API Tools (4+4+4 = 12)
      { name: "Prisma", gridSize: 4, order: 17 },
      { name: "Sequelize", gridSize: 4, order: 18 },
      { name: "Swagger / OpenAPI", gridSize: 4, order: 19 },

      // Row 7: Other Backend (4+4+4 = 12)
      { name: "Django", gridSize: 4, order: 20 },
      { name: "Flask", gridSize: 4, order: 21 },
      { name: "WordPress", gridSize: 4, order: 22 },

      // Row 8: DevOps & Cloud (3+3+6 = 12)
      { name: "Docker", gridSize: 3, order: 23 },
      { name: "AWS", gridSize: 3, order: 24 },
      { name: "DigitalOcean", gridSize: 6, order: 25 },

      // Row 9: Tools (3+3+3+3 = 12)
      { name: "Git", gridSize: 3, order: 26 },
      { name: "Postman", gridSize: 3, order: 27 },
      { name: "Figma", gridSize: 3, order: 28 },
      { name: "Linux", gridSize: 3, order: 29 },

      // Row 10: Auth & Integrations (4+4+4 = 12)
      { name: "SSO / OAuth", gridSize: 4, order: 30 },
      { name: "Twilio / MSG91", gridSize: 4, order: 31 },
      { name: "Email Integration", gridSize: 4, order: 32 },

      // Row 11: Security (6+6 = 12)
      { name: "RBAC & Security", gridSize: 6, order: 33 },
      { name: "Ethical Hacking", gridSize: 6, order: 34 },
    ];

    await Skill.insertMany(skills);
    console.log("✅ Skills seeded");

    /* ---------------- PROJECTS ---------------- */
    const projectCount = await Project.countDocuments();

    if (projectCount === 0) {
      const projects = [
        {
          title: "SIMON GAME",
          description:
            "Classic memory game where players repeat sequences of colors.",
          imageUrl:
            "https://via.placeholder.com/400x200?text=Simon+Game",
          overview:
            "Simon game built using HTML, CSS and JavaScript to test memory.",
          techStack: "HTML, CSS, JavaScript",
          liveUrl: "https://shan345.github.io/simon",
          githubUrl: "https://github.com/shan345/simon",
          order: 0,
        },
        {
          title: "HUMAN SPEECH EMOTION RECOGNITION",
          description:
            "Detects human emotions from speech using machine learning.",
          imageUrl:
            "https://via.placeholder.com/400x200?text=Speech+Emotion+Recognition",
          overview:
            "React frontend + Python ML backend for emotion recognition.",
          techStack: "React, Python, Flask, ML",
          liveUrl: "",
          githubUrl: "",
          order: 1,
        },
        {
          title: "PORTFOLIO",
          description: "Personal portfolio showcasing my work.",
          imageUrl:
            "https://via.placeholder.com/400x200?text=Portfolio",
          overview:
            "Portfolio built using React + Material UI with Node.js backend.",
          techStack: "React, Material UI, Node.js, Express",
          liveUrl: "https://www.shantechworld.com",
          githubUrl: "https://github.com/shan345/portfolio",
          order: 2,
        },
        {
          title: "Calculator",
          description: "Simple arithmetic calculator.",
          imageUrl:
            "https://via.placeholder.com/400x200?text=Calculator",
          overview:
            "Calculator built using HTML, CSS and JavaScript.",
          techStack: "HTML, CSS, JavaScript",
          liveUrl: "https://shan345.github.io/calculator/",
          githubUrl: "https://github.com/shan345/calculator",
          order: 3,
        },
        {
          title: "RandomUser API",
          description:
            "Random user generator using API.",
          imageUrl:
            "https://via.placeholder.com/400x200?text=RandomUser+API",
          overview:
            "React + TypeScript app integrating RandomUser API.",
          techStack: "React, TypeScript, Material UI",
          liveUrl: "https://shan345.github.io/randomuserapi/",
          githubUrl: "https://github.com/shan345/randomuserapi",
          order: 4,
        },
      ];

      await Project.insertMany(projects);
      console.log("✅ Projects seeded");
    }

    /* ---------------- SOCIAL LINKS ---------------- */
    const socialExists = await SocialLinks.findOne();

    if (!socialExists) {
      await SocialLinks.create({
        instagram: "https://www.instagram.com/jamnishan/",
        github: "https://github.com/shan345",
        linkedin: "https://www.linkedin.com/in/shan345/",
        youtube: "https://www.youtube.com/@shantechworld",
        twitter: "https://twitter.com/jamnishan",
      });

      console.log("✅ Social Links seeded");
    }

    console.log("\n🎉 Seeding completed successfully!");

    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error("❌ Seed error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();
