import portfolio from "@/assets/portfolio.png";
import resume_bot from "@/assets/resume-bot.png";
import lookfast from "@/assets/lookfast.png";
import source_code from "@/assets/source-code.svg";

export const PROJECTS = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A minimalist portfolio website built with React and Vite showcasing my projects and skills.",
    image: portfolio,
    tags: ["React.js", "Tailwind CSS", "Framer Motion"],
    demoLink: "#",
    codeLink: "https://github.com/Jaskaran320/Resume-website",
  },
  {
    id: 2,
    title: "Resume Bot",
    description:
      "An AI-powered resume assistant that answers questions about my skills and experience using Gemini API.",
    image: resume_bot,
    tags: ["React.js", "GoogleGenerativeAI", "Tailwind CSS"],
    demoLink: "/resume",
    codeLink: "https://github.com/Jaskaran320/Resume-Website",
  },
  {
    id: 3,
    title: "Lookfast",
    description:
      "A platform to showcase latest AI models and tools, providing easy and user-friendly AI access.",
    image: lookfast,
    tags: ["Solid.js", "Flask", "OpenCV", "RAG"],
    demoLink: "https://lookfast.vercel.app/",
    codeLink: "https://github.com/Jaskaran320/LookFast",
  },
  {
    id: 4,
    title: "StockFetch",
    description:
      "A Python-based stock data fetching tool that retrieves and analyzes stock data from various global markets.",
    image: source_code,
    tags: ["Python", "Asyncio", "Pandas"],
    demoLink: "",
    codeLink: "",
  },
  {
    id: 5,
    title: "Deep Learning on Noisy Financial Data",
    description:
      "A research project applying deep learning techniques to analyze and predict financial data trends.",
    image: source_code,
    tags: ["Python", "PyTorch", "Deep Learning"],
    demoLink: "",
    codeLink: "https://github.com/Jaskaran320/Advanced-Machine-Learning-CSE642-Assignments",
  },
  {
    id: 6,
    title: "Raft Consensus Algorithm",
    description:
      "A fault-tolerant key-value store implementation using a modified Raft consensus algorithm.",
    image: source_code,
    tags: ["Python", "gRPC", "Distributed Systems"],
    demoLink: "",
    codeLink: "https://github.com/Jaskaran320/Raft-implementation",
  },
  {
    id: 7,
    title: "Content Based Image Retrieval",
    description:
      "A system that suggests images based on artistic style using deep learning techniques.",
    image: source_code,
    tags: ["Python", "PyTorch", "Scikit-Learn", "Deep Learning"],
    demoLink: "",
    codeLink: "https://github.com/colordepth/image-retrieval",
  },
  {
    id: 8,
    title: "Point Cloud Registration",
    description:
      "A project that analyzes point clouds using the PointNet framework for classification and segmentation tasks.",
    image: source_code,
    tags: ["Python", "PyTorch", "Open3D", "Computer Vision"],
    demoLink: "",
    codeLink: "https://github.com/Jaskaran320/Computer-Vision",
  },
  {
    id: 9,
    title: "Heart Disease Prediction Model",
    description:
      "A machine learning model that predicts heart diseases based on patient medical data.",
    image: source_code,
    tags: ["Python", "Scikit-Learn", "Machine Learning"],
    demoLink: "",
    codeLink: "https://github.com/Jaskaran320/ML_Project_2022",
  },
  {
    id: 10,
    title: "Network on Chip Simulator",
    description:
      "A cycle-accurate, real-time simulator for a 3x3 NoC mesh containing nine routers.",
    image: source_code,
    tags: ["Python", "Gem5"],
    demoLink: "",
    codeLink: "https://github.com/Jaskaran320/NoC-Simulator",
  },
];
