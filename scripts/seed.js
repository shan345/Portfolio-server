const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env variables
dotenv.config({ path: "../.env" });

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
const existingAdmin = await Admin.findOne({ username: "admin" });

if (!existingAdmin) {
  await Admin.create({
    username: "admin",
    password: "admin123",
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
    internship: {
      company: "Edify Techno Solutions",
      role: "Full Stack Web Development (MERN)",
      duration: "1 month",
    },
    resumeLink:
      "https://drive.google.com/file/d/1oxhexkyGn4tRlBuQI540a_a5JU65OMn0/view?usp=sharing",
  });

  console.log("✅ About seeded");
}

/* ---------------- SKILLS ---------------- */
const skillCount = await Skill.countDocuments();

if (skillCount === 0) {
  const skills = [
    { name: "PYTHON", gridSize: 8, order: 0 },
    { name: "C", gridSize: 4, order: 1 },
    { name: "JAVA SCRIPT", gridSize: 6, order: 2 },
    { name: "MONGO DB", gridSize: 6, order: 3 },
    { name: "EXPRESS JS", gridSize: 4, order: 4 },
    { name: "REACT JS", gridSize: 8, order: 5 },
    { name: "HTML & CSS", gridSize: 8, order: 6 },
    { name: "NODE JS", gridSize: 4, order: 7 },
    { name: "SQL", gridSize: 2, order: 8 },
    { name: "GIT", gridSize: 3, order: 9 },
    { name: "API", gridSize: 2, order: 10 },
    { name: "ETHICAL HACKING", gridSize: 5, order: 11 },
  ];

  await Skill.insertMany(skills);
  console.log("✅ Skills seeded");
}

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
