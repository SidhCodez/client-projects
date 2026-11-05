// data.js — mock roadmap data + fetch helpers
export const MOCK_MODE = true;

export const DOMAINS = [
  { id: "frontend", label: "Frontend", icon: "🌐" },
  { id: "backend", label: "Backend", icon: "⚙️" },
  { id: "devops", label: "DevOps", icon: "🚀" },
  { id: "data-science", label: "Data Science", icon: "📊" },
  { id: "cloud", label: "Cloud", icon: "☁️" },
  { id: "mobile", label: "Mobile", icon: "📱" },
  { id: "ai-ml", label: "AI / ML", icon: "🤖" },
  { id: "security", label: "Cybersecurity", icon: "🔐" },
  { id: "blockchain", label: "Blockchain", icon: "⛓️" },
  { id: "game-dev", label: "Game Development", icon: "🎮" },
  { id: "ux-design", label: "UX Design", icon: "🎨" },
  { id: "dba", label: "Database Admin", icon: "🗄️" },
  { id: "sre", label: "Site Reliability", icon: "📡" },
  { id: "qa", label: "QA Engineering", icon: "🧪" },
  { id: "embedded", label: "Embedded Systems", icon: "🔌" },
  { id: "rust", label: "Rust Developer", icon: "🦀" },
  { id: "golang", label: "Go Developer", icon: "🐹" },
  { id: "python", label: "Python Developer", icon: "🐍" },
  { id: "java", label: "Java Developer", icon: "☕" },
  { id: "dotnet", label: ".NET Developer", icon: "🔷" },
  { id: "react", label: "React Developer", icon: "⚛️" },
  { id: "vue", label: "Vue Developer", icon: "💚" },
  { id: "angular", label: "Angular Developer", icon: "🔴" },
  { id: "nodejs", label: "Node.js Developer", icon: "🟢" },
  { id: "flutter", label: "Flutter Developer", icon: "🐦" },
  { id: "ios", label: "iOS Developer", icon: "🍎" },
  { id: "android", label: "Android Developer", icon: "🤖" },
  { id: "aws", label: "AWS Engineer", icon: "🟠" },
  { id: "gcp", label: "GCP Engineer", icon: "🔵" },
  { id: "azure", label: "Azure Engineer", icon: "☁️" },
  { id: "kubernetes", label: "Kubernetes", icon: "⚓" },
  { id: "docker", label: "Docker", icon: "🐳" },
  { id: "mlops", label: "MLOps", icon: "🔬" },
  { id: "data-eng", label: "Data Engineering", icon: "🏗️" },
  { id: "data-analyst", label: "Data Analyst", icon: "📈" },
  { id: "bi", label: "Business Intelligence", icon: "💡" },
  { id: "nlp", label: "NLP Engineer", icon: "💬" },
  { id: "cv", label: "Computer Vision", icon: "👁️" },
  { id: "defi", label: "DeFi Developer", icon: "💰" },
  { id: "solidity", label: "Solidity Dev", icon: "🔗" },
  { id: "graphql", label: "GraphQL", icon: "◼️" },
  { id: "microservices", label: "Microservices", icon: "🧩" },
  { id: "system-design", label: "System Design", icon: "🏛️" },
  { id: "api-design", label: "API Design", icon: "🔁" },
  { id: "open-source", label: "Open Source Contrib", icon: "🌍" },
  { id: "technical-writing", label: "Technical Writing", icon: "✍️" },
  { id: "product-mgmt", label: "Product Management", icon: "📋" },
  { id: "cto-path", label: "CTO Path", icon: "👑" },
  { id: "freelance", label: "Freelance Dev", icon: "💼" },
  { id: "competitive", label: "Competitive Programming", icon: "🏆" },
  { id: "low-level", label: "Low-Level Programming", icon: "⚡" },
  { id: "networking", label: "Networking", icon: "🌐" },
  { id: "linux-admin", label: "Linux Admin", icon: "🐧" },
  { id: "terraform", label: "Terraform / IaC", icon: "🏗️" },
  { id: "prompt-eng", label: "Prompt Engineering", icon: "🧠" },
  { id: "rag", label: "RAG / LLM Apps", icon: "📚" },
  { id: "web3", label: "Web3 Developer", icon: "🕸️" },
  { id: "ar-vr", label: "AR / VR Dev", icon: "🥽" },
  { id: "dsa", label: "DSA / Interviews", icon: "📐" },
];

const ROADMAPS = {
  "frontend": {
    title: "Frontend Developer",
    description: "Learn everything to become a modern frontend developer.",
    estimatedWeeks: 24,
    sections: [
      { id:"s1", title:"Internet Fundamentals", phase:1, milestones:[
        {id:"m1",title:"How the Internet Works",type:"concept",weeks:1,resources:["MDN","CS50"],done:false},
        {id:"m2",title:"HTTP & HTTPS",type:"concept",weeks:1,resources:["MDN","curl docs"],done:false},
        {id:"m3",title:"DNS & Hosting",type:"concept",weeks:1,resources:["Cloudflare Docs"],done:false},
      ]},
      { id:"s2", title:"HTML", phase:1, milestones:[
        {id:"m4",title:"HTML Semantics",type:"skill",weeks:2,resources:["MDN HTML","freeCodeCamp"],done:false},
        {id:"m5",title:"Forms & Validation",type:"skill",weeks:1,resources:["web.dev"],done:false},
        {id:"m6",title:"Accessibility (a11y)",type:"skill",weeks:1,resources:["a11yproject.com"],done:false},
      ]},
      { id:"s3", title:"CSS", phase:1, milestones:[
        {id:"m7",title:"CSS Fundamentals",type:"skill",weeks:2,resources:["CSS Tricks","MDN CSS"],done:false},
        {id:"m8",title:"Flexbox & Grid",type:"skill",weeks:1,resources:["Flexbox Froggy","Grid Garden"],done:false},
        {id:"m9",title:"Responsive Design",type:"skill",weeks:1,resources:["web.dev"],done:false},
        {id:"m10",title:"CSS Animations",type:"skill",weeks:1,resources:["MDN Animations"],done:false},
      ]},
      { id:"s4", title:"JavaScript", phase:2, milestones:[
        {id:"m11",title:"JS Fundamentals",type:"skill",weeks:3,resources:["javascript.info","Eloquent JS"],done:false},
        {id:"m12",title:"DOM Manipulation",type:"skill",weeks:1,resources:["MDN DOM"],done:false},
        {id:"m13",title:"Fetch API & Async/Await",type:"skill",weeks:1,resources:["javascript.info"],done:false},
        {id:"m14",title:"ES6+ Features",type:"skill",weeks:1,resources:["MDN JS"],done:false},
      ]},
      { id:"s5", title:"Tooling", phase:2, milestones:[
        {id:"m15",title:"Git & GitHub",type:"tool",weeks:1,resources:["Pro Git Book"],done:false},
        {id:"m16",title:"npm / Vite",type:"tool",weeks:1,resources:["vitejs.dev"],done:false},
      ]},
      { id:"s6", title:"Framework", phase:3, milestones:[
        {id:"m17",title:"React / Vue / Angular",type:"skill",weeks:4,resources:["reactjs.org","vuejs.org"],done:false},
        {id:"m18",title:"State Management",type:"skill",weeks:2,resources:["Zustand","Redux Toolkit"],done:false},
        {id:"m19",title:"Routing",type:"skill",weeks:1,resources:["React Router"],done:false},
      ]},
      { id:"s7", title:"Deploy", phase:4, milestones:[
        {id:"m20",title:"Vitest / Jest",type:"skill",weeks:1,resources:["vitest.dev"],done:false},
        {id:"m21",title:"CI/CD with GitHub Actions",type:"tool",weeks:1,resources:["docs.github.com"],done:false},
        {id:"m22",title:"Vercel / Netlify",type:"tool",weeks:1,resources:["vercel.com"],done:false},
      ]},
    ]
  },

  "backend": {
    title: "Backend Developer",
    description: "Master server-side programming, APIs, and databases.",
    estimatedWeeks: 28,
    sections: [
      { id:"s1", title:"Language Foundations", phase:1, milestones:[
        {id:"m1",title:"Node.js / Python / Go / Java",type:"skill",weeks:4,resources:["nodejs.org","python.org"],done:false},
        {id:"m2",title:"OOP & Functional Concepts",type:"concept",weeks:2,resources:["Clean Code"],done:false},
      ]},
      { id:"s2", title:"Databases", phase:2, milestones:[
        {id:"m3",title:"SQL (PostgreSQL)",type:"skill",weeks:2,resources:["PostgreSQL Docs","SQLBolt"],done:false},
        {id:"m4",title:"NoSQL (MongoDB / Redis)",type:"skill",weeks:2,resources:["MongoDB Docs"],done:false},
        {id:"m5",title:"ORM (Prisma)",type:"tool",weeks:1,resources:["prisma.io"],done:false},
      ]},
      { id:"s3", title:"APIs", phase:2, milestones:[
        {id:"m6",title:"REST API Design",type:"skill",weeks:2,resources:["restfulapi.net"],done:false},
        {id:"m7",title:"GraphQL",type:"skill",weeks:2,resources:["graphql.org"],done:false},
        {id:"m8",title:"Auth (JWT, OAuth)",type:"skill",weeks:2,resources:["jwt.io"],done:false},
      ]},
      { id:"s4", title:"Infrastructure", phase:3, milestones:[
        {id:"m9",title:"Docker",type:"tool",weeks:2,resources:["docs.docker.com"],done:false},
        {id:"m10",title:"Linux & Shell",type:"skill",weeks:2,resources:["linuxcommand.org"],done:false},
        {id:"m11",title:"Caching (Redis)",type:"concept",weeks:1,resources:["redis.io"],done:false},
      ]},
    ]
  },

  "devops": {
    title: "DevOps Engineer",
    description: "Automate, deploy, and scale infrastructure reliably.",
    estimatedWeeks: 32,
    sections: [
      { id:"s1", title:"Linux & Networking", phase:1, milestones:[
        {id:"m1",title:"Linux CLI Mastery",type:"skill",weeks:2,resources:["linuxcommand.org"],done:false},
        {id:"m2",title:"Bash Scripting",type:"skill",weeks:2,resources:["bash guide"],done:false},
        {id:"m3",title:"Networking Basics",type:"concept",weeks:2,resources:["Julia Evans zines"],done:false},
      ]},
      { id:"s2", title:"Containers", phase:2, milestones:[
        {id:"m4",title:"Docker",type:"tool",weeks:2,resources:["docs.docker.com"],done:false},
        {id:"m5",title:"Docker Compose",type:"tool",weeks:1,resources:["docs.docker.com"],done:false},
        {id:"m6",title:"Kubernetes",type:"tool",weeks:4,resources:["kubernetes.io"],done:false},
      ]},
      { id:"s3", title:"CI/CD", phase:2, milestones:[
        {id:"m7",title:"GitHub Actions",type:"tool",weeks:2,resources:["docs.github.com"],done:false},
        {id:"m8",title:"Jenkins / GitLab CI",type:"tool",weeks:2,resources:["jenkins.io"],done:false},
      ]},
      { id:"s4", title:"Cloud & IaC", phase:3, milestones:[
        {id:"m9",title:"AWS / GCP / Azure",type:"skill",weeks:4,resources:["AWS Docs"],done:false},
        {id:"m10",title:"Terraform",type:"tool",weeks:3,resources:["developer.hashicorp.com"],done:false},
        {id:"m11",title:"Prometheus + Grafana",type:"tool",weeks:2,resources:["prometheus.io"],done:false},
      ]},
    ]
  },

  "data-science": {
    title: "Data Scientist",
    description: "From data wrangling to ML to production.",
    estimatedWeeks: 36,
    sections: [
      { id:"s1", title:"Python for Data", phase:1, milestones:[
        {id:"m1",title:"Python Fundamentals",type:"skill",weeks:3,resources:["python.org"],done:false},
        {id:"m2",title:"NumPy & Pandas",type:"skill",weeks:2,resources:["pandas.pydata.org"],done:false},
        {id:"m3",title:"Matplotlib & Seaborn",type:"skill",weeks:2,resources:["matplotlib.org"],done:false},
      ]},
      { id:"s2", title:"Stats & Math", phase:1, milestones:[
        {id:"m4",title:"Probability & Stats",type:"concept",weeks:3,resources:["StatQuest"],done:false},
        {id:"m5",title:"Linear Algebra",type:"concept",weeks:2,resources:["3Blue1Brown"],done:false},
      ]},
      { id:"s3", title:"ML", phase:2, milestones:[
        {id:"m6",title:"scikit-learn",type:"skill",weeks:3,resources:["scikit-learn.org"],done:false},
        {id:"m7",title:"Model Evaluation",type:"skill",weeks:2,resources:["Hands-On ML"],done:false},
      ]},
      { id:"s4", title:"Deep Learning", phase:3, milestones:[
        {id:"m8",title:"PyTorch / TensorFlow",type:"skill",weeks:4,resources:["pytorch.org"],done:false},
        {id:"m9",title:"NLP & Transformers",type:"skill",weeks:3,resources:["HuggingFace"],done:false},
      ]},
    ]
  },

  "cloud": {
    title: "Cloud Engineer",
    description: "Design and operate cloud-native infrastructure.",
    estimatedWeeks: 30,
    sections: [
      { id:"s1", title:"Cloud Basics", phase:1, milestones:[
        {id:"m1",title:"IaaS/PaaS/SaaS Concepts",type:"concept",weeks:1,resources:["AWS Whitepaper"],done:false},
        {id:"m2",title:"Networking (VPC, Subnets)",type:"concept",weeks:2,resources:["AWS VPC Docs"],done:false},
        {id:"m3",title:"IAM & Security",type:"skill",weeks:2,resources:["AWS IAM"],done:false},
      ]},
      { id:"s2", title:"Core Services", phase:2, milestones:[
        {id:"m4",title:"Compute (EC2, VMs)",type:"skill",weeks:2,resources:["AWS EC2"],done:false},
        {id:"m5",title:"Storage (S3)",type:"skill",weeks:1,resources:["AWS S3"],done:false},
        {id:"m6",title:"Serverless (Lambda)",type:"skill",weeks:2,resources:["serverless.com"],done:false},
      ]},
      { id:"s3", title:"IaC & Certifications", phase:3, milestones:[
        {id:"m7",title:"Terraform",type:"tool",weeks:3,resources:["hashicorp.com"],done:false},
        {id:"m8",title:"AWS Solutions Architect",type:"milestone",weeks:4,resources:["AWS Training"],done:false},
      ]},
    ]
  },

  "mobile": {
    title: "Mobile Developer",
    description: "Build native and cross-platform mobile apps.",
    estimatedWeeks: 28,
    sections: [
      { id:"s1", title:"Pick a Path", phase:1, milestones:[
        {id:"m1",title:"React Native vs Flutter vs Swift/Kotlin",type:"concept",weeks:1,resources:["reactnative.dev","flutter.dev"],done:false},
      ]},
      { id:"s2", title:"Cross-Platform", phase:2, milestones:[
        {id:"m2",title:"React Native Fundamentals",type:"skill",weeks:4,resources:["reactnative.dev"],done:false},
        {id:"m3",title:"Expo & EAS",type:"tool",weeks:2,resources:["expo.dev"],done:false},
        {id:"m4",title:"Navigation",type:"skill",weeks:1,resources:["reactnavigation.org"],done:false},
      ]},
      { id:"s3", title:"Publishing", phase:3, milestones:[
        {id:"m5",title:"Device APIs",type:"skill",weeks:2,resources:["Expo Docs"],done:false},
        {id:"m6",title:"App Store / Play Store",type:"milestone",weeks:2,resources:["Apple Docs","Android Docs"],done:false},
      ]},
    ]
  },

  "ai-ml": {
    title: "AI / ML Engineer",
    description: "Build, train, and deploy intelligent systems.",
    estimatedWeeks: 40,
    sections: [
      { id:"s1", title:"Foundations", phase:1, milestones:[
        {id:"m1",title:"Python + NumPy",type:"skill",weeks:3,resources:["python.org"],done:false},
        {id:"m2",title:"Linear Algebra & Calculus",type:"concept",weeks:3,resources:["3Blue1Brown"],done:false},
      ]},
      { id:"s2", title:"Classical ML", phase:2, milestones:[
        {id:"m3",title:"scikit-learn",type:"skill",weeks:2,resources:["scikit-learn.org"],done:false},
        {id:"m4",title:"Feature Engineering",type:"skill",weeks:2,resources:["Kaggle"],done:false},
      ]},
      { id:"s3", title:"Deep Learning", phase:3, milestones:[
        {id:"m5",title:"PyTorch",type:"skill",weeks:4,resources:["pytorch.org"],done:false},
        {id:"m6",title:"LLM Fine-Tuning",type:"skill",weeks:3,resources:["huggingface.co"],done:false},
      ]},
      { id:"s4", title:"MLOps", phase:4, milestones:[
        {id:"m7",title:"MLflow / W&B",type:"tool",weeks:2,resources:["mlflow.org"],done:false},
        {id:"m8",title:"Model Serving (FastAPI)",type:"tool",weeks:2,resources:["fastapi.tiangolo.com"],done:false},
      ]},
    ]
  },

  "security": {
    title: "Cybersecurity Engineer",
    description: "Protect systems, networks, and data.",
    estimatedWeeks: 36,
    sections: [
      { id:"s1", title:"Foundations", phase:1, milestones:[
        {id:"m1",title:"Networking (TCP/IP, OSI)",type:"concept",weeks:2,resources:["CompTIA Network+"],done:false},
        {id:"m2",title:"Linux CLI",type:"skill",weeks:2,resources:["OverTheWire: Bandit"],done:false},
        {id:"m3",title:"Cryptography Basics",type:"concept",weeks:2,resources:["Cryptopals"],done:false},
      ]},
      { id:"s2", title:"Offensive Security", phase:2, milestones:[
        {id:"m4",title:"Ethical Hacking Methodology",type:"concept",weeks:2,resources:["HTB Academy"],done:false},
        {id:"m5",title:"Web App Pentesting (OWASP)",type:"skill",weeks:3,resources:["PortSwigger Academy"],done:false},
        {id:"m6",title:"Network Pentesting",type:"skill",weeks:3,resources:["TryHackMe"],done:false},
      ]},
      { id:"s3", title:"Defensive + Certs", phase:3, milestones:[
        {id:"m7",title:"SIEM (Splunk, ELK)",type:"tool",weeks:3,resources:["Splunk Training"],done:false},
        {id:"m8",title:"CompTIA Security+",type:"milestone",weeks:3,resources:["Professor Messer"],done:false},
        {id:"m9",title:"OSCP",type:"milestone",weeks:4,resources:["offensive-security.com"],done:false},
      ]},
    ]
  },

  "blockchain": {
    title: "Blockchain Developer",
    description: "Build decentralized applications and smart contracts.",
    estimatedWeeks: 28,
    sections: [
      { id:"s1", title:"Crypto Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Blockchain Concepts (Consensus, Hashing)",type:"concept",weeks:2,resources:["Bitcoin Whitepaper","Ethereum.org"],done:false},
        {id:"m2",title:"Wallets, Keys & Transactions",type:"concept",weeks:1,resources:["Mastering Bitcoin"],done:false},
        {id:"m3",title:"DeFi & NFT Basics",type:"concept",weeks:1,resources:["Finematics (YouTube)"],done:false},
      ]},
      { id:"s2", title:"Smart Contracts", phase:2, milestones:[
        {id:"m4",title:"Solidity Fundamentals",type:"skill",weeks:3,resources:["CryptoZombies","Solidity Docs"],done:false},
        {id:"m5",title:"Hardhat / Foundry",type:"tool",weeks:2,resources:["hardhat.org"],done:false},
        {id:"m6",title:"OpenZeppelin Contracts",type:"skill",weeks:1,resources:["docs.openzeppelin.com"],done:false},
      ]},
      { id:"s3", title:"dApp Frontend", phase:3, milestones:[
        {id:"m7",title:"Ethers.js / Viem",type:"skill",weeks:2,resources:["docs.ethers.org"],done:false},
        {id:"m8",title:"Wagmi + RainbowKit",type:"tool",weeks:1,resources:["wagmi.sh"],done:false},
        {id:"m9",title:"IPFS & Filecoin",type:"concept",weeks:1,resources:["ipfs.tech"],done:false},
      ]},
      { id:"s4", title:"Security & Deployment", phase:4, milestones:[
        {id:"m10",title:"Smart Contract Auditing",type:"skill",weeks:3,resources:["Secureum","DeFiHackLabs"],done:false},
        {id:"m11",title:"Deploy on Mainnet",type:"milestone",weeks:2,resources:["Alchemy Docs"],done:false},
      ]},
    ]
  },

  "game-dev": {
    title: "Game Developer",
    description: "Build 2D and 3D games from scratch.",
    estimatedWeeks: 36,
    sections: [
      { id:"s1", title:"Foundations", phase:1, milestones:[
        {id:"m1",title:"Game Loop & Architecture",type:"concept",weeks:1,resources:["Game Programming Patterns"],done:false},
        {id:"m2",title:"Math for Games (Vectors, Matrices)",type:"concept",weeks:2,resources:["3Blue1Brown","Khan Academy"],done:false},
      ]},
      { id:"s2", title:"Engine", phase:2, milestones:[
        {id:"m3",title:"Unity or Godot (pick one)",type:"tool",weeks:4,resources:["unity.com","godotengine.org"],done:false},
        {id:"m4",title:"2D Game: Platformer",type:"milestone",weeks:3,resources:["Brackeys (YouTube)"],done:false},
        {id:"m5",title:"Physics & Collision",type:"skill",weeks:2,resources:["Unity Physics Docs"],done:false},
      ]},
      { id:"s3", title:"3D & Graphics", phase:3, milestones:[
        {id:"m6",title:"3D Modeling Basics (Blender)",type:"skill",weeks:2,resources:["blender.org"],done:false},
        {id:"m7",title:"Shaders & Materials",type:"skill",weeks:2,resources:["Shader Graph Docs"],done:false},
        {id:"m8",title:"Lighting & Post-Processing",type:"skill",weeks:1,resources:["Unity HDRP Docs"],done:false},
      ]},
      { id:"s4", title:"Shipping", phase:4, milestones:[
        {id:"m9",title:"Audio Integration",type:"skill",weeks:1,resources:["FMOD Docs"],done:false},
        {id:"m10",title:"Publish to Steam / itch.io",type:"milestone",weeks:2,resources:["steamworks.sdk","itch.io"],done:false},
      ]},
    ]
  },

  "ux-design": {
    title: "UX Designer",
    description: "Design intuitive and delightful user experiences.",
    estimatedWeeks: 20,
    sections: [
      { id:"s1", title:"Design Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Design Principles (Gestalt, Hierarchy)",type:"concept",weeks:2,resources:["Laws of UX"],done:false},
        {id:"m2",title:"Typography & Color Theory",type:"concept",weeks:1,resources:["Practical Typography"],done:false},
        {id:"m3",title:"Accessibility in Design",type:"skill",weeks:1,resources:["a11yproject.com"],done:false},
      ]},
      { id:"s2", title:"Research", phase:2, milestones:[
        {id:"m4",title:"User Research Methods",type:"skill",weeks:2,resources:["Nielsen Norman Group"],done:false},
        {id:"m5",title:"Usability Testing",type:"skill",weeks:1,resources:["usability.gov"],done:false},
      ]},
      { id:"s3", title:"Tooling", phase:2, milestones:[
        {id:"m6",title:"Figma Mastery",type:"tool",weeks:3,resources:["figma.com/learn"],done:false},
        {id:"m7",title:"Prototyping & Interactions",type:"skill",weeks:2,resources:["Figma Prototyping"],done:false},
        {id:"m8",title:"Design Systems",type:"skill",weeks:2,resources:["Storybook","Material Design"],done:false},
      ]},
      { id:"s4", title:"Portfolio", phase:3, milestones:[
        {id:"m9",title:"Case Study Writing",type:"skill",weeks:2,resources:["UX Collective"],done:false},
        {id:"m10",title:"Portfolio on Behance / Dribbble",type:"milestone",weeks:1,resources:["behance.net"],done:false},
      ]},
    ]
  },

  "dba": {
    title: "Database Administrator",
    description: "Design, optimize, and secure databases at scale.",
    estimatedWeeks: 24,
    sections: [
      { id:"s1", title:"SQL Mastery", phase:1, milestones:[
        {id:"m1",title:"Advanced SQL (CTEs, Window Functions)",type:"skill",weeks:3,resources:["Mode Analytics SQL","PostgreSQL Docs"],done:false},
        {id:"m2",title:"Indexing & Query Optimization",type:"skill",weeks:2,resources:["Use The Index, Luke"],done:false},
        {id:"m3",title:"Transactions & ACID",type:"concept",weeks:1,resources:["PostgreSQL Docs"],done:false},
      ]},
      { id:"s2", title:"Administration", phase:2, milestones:[
        {id:"m4",title:"Backup & Recovery",type:"skill",weeks:2,resources:["pg_dump Docs"],done:false},
        {id:"m5",title:"Replication & High Availability",type:"skill",weeks:2,resources:["Patroni Docs"],done:false},
        {id:"m6",title:"Database Security",type:"skill",weeks:1,resources:["CIS Benchmarks"],done:false},
      ]},
      { id:"s3", title:"NoSQL & Cloud DBs", phase:3, milestones:[
        {id:"m7",title:"MongoDB",type:"tool",weeks:2,resources:["mongodb.com"],done:false},
        {id:"m8",title:"Redis",type:"tool",weeks:1,resources:["redis.io"],done:false},
        {id:"m9",title:"Cloud DBs (RDS, Spanner)",type:"skill",weeks:2,resources:["AWS RDS Docs"],done:false},
      ]},
    ]
  },

  "sre": {
    title: "Site Reliability Engineer",
    description: "Keep large-scale systems reliable, fast, and available.",
    estimatedWeeks: 30,
    sections: [
      { id:"s1", title:"SRE Foundations", phase:1, milestones:[
        {id:"m1",title:"SRE Book (Google)",type:"concept",weeks:2,resources:["sre.google"],done:false},
        {id:"m2",title:"Linux Internals",type:"skill",weeks:2,resources:["Linux Kernel Docs"],done:false},
        {id:"m3",title:"SLOs, SLAs, SLIs",type:"concept",weeks:1,resources:["sre.google/sre-book"],done:false},
      ]},
      { id:"s2", title:"Observability", phase:2, milestones:[
        {id:"m4",title:"Prometheus & Grafana",type:"tool",weeks:2,resources:["prometheus.io"],done:false},
        {id:"m5",title:"Distributed Tracing (Jaeger)",type:"tool",weeks:2,resources:["jaegertracing.io"],done:false},
        {id:"m6",title:"Log Aggregation (ELK)",type:"tool",weeks:2,resources:["elastic.co"],done:false},
      ]},
      { id:"s3", title:"Reliability Engineering", phase:3, milestones:[
        {id:"m7",title:"Chaos Engineering",type:"skill",weeks:2,resources:["chaos-mesh.org"],done:false},
        {id:"m8",title:"Incident Management",type:"skill",weeks:1,resources:["PagerDuty Docs"],done:false},
        {id:"m9",title:"Capacity Planning",type:"concept",weeks:2,resources:["SRE Workbook"],done:false},
      ]},
    ]
  },

  "qa": {
    title: "QA Engineer",
    description: "Ensure software quality through testing at every level.",
    estimatedWeeks: 20,
    sections: [
      { id:"s1", title:"Testing Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Testing Pyramid (Unit/Integration/E2E)",type:"concept",weeks:1,resources:["martinfowler.com"],done:false},
        {id:"m2",title:"Test Case Design",type:"skill",weeks:2,resources:["ISTQB Foundation"],done:false},
      ]},
      { id:"s2", title:"Automated Testing", phase:2, milestones:[
        {id:"m3",title:"Jest / Vitest",type:"tool",weeks:2,resources:["jestjs.io"],done:false},
        {id:"m4",title:"Playwright / Cypress (E2E)",type:"tool",weeks:2,resources:["playwright.dev"],done:false},
        {id:"m5",title:"API Testing (Postman, REST Assured)",type:"tool",weeks:1,resources:["postman.com"],done:false},
      ]},
      { id:"s3", title:"Performance & Mobile", phase:3, milestones:[
        {id:"m6",title:"Load Testing (k6, JMeter)",type:"tool",weeks:2,resources:["k6.io"],done:false},
        {id:"m7",title:"Mobile Testing (Appium)",type:"tool",weeks:2,resources:["appium.io"],done:false},
        {id:"m8",title:"ISTQB Foundation Cert",type:"milestone",weeks:3,resources:["istqb.org"],done:false},
      ]},
    ]
  },

  "embedded": {
    title: "Embedded Systems Developer",
    description: "Program microcontrollers and real-time systems.",
    estimatedWeeks: 32,
    sections: [
      { id:"s1", title:"Electronics Basics", phase:1, milestones:[
        {id:"m1",title:"Digital Logic & Circuits",type:"concept",weeks:2,resources:["nand2tetris.org"],done:false},
        {id:"m2",title:"Microcontroller Architecture",type:"concept",weeks:2,resources:["ARM Cortex-M Guide"],done:false},
      ]},
      { id:"s2", title:"Programming", phase:2, milestones:[
        {id:"m3",title:"C for Embedded Systems",type:"skill",weeks:4,resources:["Effective C (Seacord)"],done:false},
        {id:"m4",title:"Arduino / STM32",type:"tool",weeks:3,resources:["arduino.cc","stm32duino"],done:false},
        {id:"m5",title:"RTOS (FreeRTOS)",type:"skill",weeks:3,resources:["freertos.org"],done:false},
      ]},
      { id:"s3", title:"Protocols & Debugging", phase:3, milestones:[
        {id:"m6",title:"UART, SPI, I2C, CAN",type:"skill",weeks:2,resources:["Embedded.fm Podcast"],done:false},
        {id:"m7",title:"JTAG / GDB Debugging",type:"tool",weeks:2,resources:["OpenOCD Docs"],done:false},
        {id:"m8",title:"Power Management",type:"concept",weeks:2,resources:["TI App Notes"],done:false},
      ]},
    ]
  },

  "rust": {
    title: "Rust Developer",
    description: "Master Rust for systems programming and performance.",
    estimatedWeeks: 28,
    sections: [
      { id:"s1", title:"Rust Basics", phase:1, milestones:[
        {id:"m1",title:"The Rust Book (Chapters 1–10)",type:"skill",weeks:4,resources:["doc.rust-lang.org/book"],done:false},
        {id:"m2",title:"Ownership, Borrowing, Lifetimes",type:"concept",weeks:3,resources:["Rust Book Ch. 4–10"],done:false},
        {id:"m3",title:"Error Handling (Result, Option)",type:"skill",weeks:1,resources:["Rust Book Ch. 9"],done:false},
      ]},
      { id:"s2", title:"Intermediate", phase:2, milestones:[
        {id:"m4",title:"Traits & Generics",type:"skill",weeks:2,resources:["Rust Book Ch. 10"],done:false},
        {id:"m5",title:"Async Rust (Tokio)",type:"skill",weeks:3,resources:["tokio.rs"],done:false},
        {id:"m6",title:"Cargo & Crates.io",type:"tool",weeks:1,resources:["crates.io"],done:false},
      ]},
      { id:"s3", title:"Advanced", phase:3, milestones:[
        {id:"m7",title:"Unsafe Rust",type:"concept",weeks:2,resources:["Rustonomicon"],done:false},
        {id:"m8",title:"WASM with Rust",type:"skill",weeks:2,resources:["rustwasm.github.io"],done:false},
        {id:"m9",title:"Build a CLI or Web Server",type:"milestone",weeks:2,resources:["Axum Docs","Clap Docs"],done:false},
      ]},
    ]
  },

  "golang": {
    title: "Go Developer",
    description: "Build fast, concurrent, cloud-native software with Go.",
    estimatedWeeks: 22,
    sections: [
      { id:"s1", title:"Go Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Go Tour & Syntax",type:"skill",weeks:2,resources:["tour.golang.org"],done:false},
        {id:"m2",title:"Goroutines & Channels",type:"skill",weeks:2,resources:["Go Concurrency Patterns"],done:false},
        {id:"m3",title:"Interfaces & Error Handling",type:"skill",weeks:1,resources:["Effective Go"],done:false},
      ]},
      { id:"s2", title:"Building with Go", phase:2, milestones:[
        {id:"m4",title:"REST API with Gin / Fiber",type:"skill",weeks:2,resources:["gin-gonic.com"],done:false},
        {id:"m5",title:"Database (GORM / sqlc)",type:"tool",weeks:2,resources:["gorm.io"],done:false},
        {id:"m6",title:"Testing in Go",type:"skill",weeks:1,resources:["pkg.go.dev/testing"],done:false},
      ]},
      { id:"s3", title:"Production", phase:3, milestones:[
        {id:"m7",title:"Docker + Deploy Go App",type:"tool",weeks:2,resources:["docs.docker.com"],done:false},
        {id:"m8",title:"gRPC",type:"skill",weeks:2,resources:["grpc.io"],done:false},
      ]},
    ]
  },

  "python": {
    title: "Python Developer",
    description: "From scripting to web apps to automation with Python.",
    estimatedWeeks: 24,
    sections: [
      { id:"s1", title:"Core Python", phase:1, milestones:[
        {id:"m1",title:"Python Fundamentals",type:"skill",weeks:3,resources:["python.org","Automate the Boring Stuff"],done:false},
        {id:"m2",title:"OOP in Python",type:"skill",weeks:2,resources:["Real Python"],done:false},
        {id:"m3",title:"File I/O & Standard Library",type:"skill",weeks:1,resources:["python.org docs"],done:false},
      ]},
      { id:"s2", title:"Web Development", phase:2, milestones:[
        {id:"m4",title:"Django or FastAPI",type:"skill",weeks:4,resources:["djangoproject.com","fastapi.tiangolo.com"],done:false},
        {id:"m5",title:"REST APIs + Auth",type:"skill",weeks:2,resources:["DRF Docs"],done:false},
        {id:"m6",title:"Celery & Task Queues",type:"tool",weeks:1,resources:["celeryproject.org"],done:false},
      ]},
      { id:"s3", title:"Scripting & Automation", phase:3, milestones:[
        {id:"m7",title:"Web Scraping (BeautifulSoup, Playwright)",type:"skill",weeks:2,resources:["scrapy.org"],done:false},
        {id:"m8",title:"CLI Tools (Click, Typer)",type:"tool",weeks:1,resources:["typer.tiangolo.com"],done:false},
      ]},
    ]
  },

  "java": {
    title: "Java Developer",
    description: "Enterprise-grade backend and Android development with Java.",
    estimatedWeeks: 28,
    sections: [
      { id:"s1", title:"Core Java", phase:1, milestones:[
        {id:"m1",title:"Java Fundamentals",type:"skill",weeks:3,resources:["Oracle Java Docs","Head First Java"],done:false},
        {id:"m2",title:"OOP & SOLID Principles",type:"concept",weeks:2,resources:["Clean Code"],done:false},
        {id:"m3",title:"Collections & Generics",type:"skill",weeks:2,resources:["Effective Java"],done:false},
        {id:"m4",title:"Concurrency & Threads",type:"skill",weeks:2,resources:["Java Concurrency in Practice"],done:false},
      ]},
      { id:"s2", title:"Spring Ecosystem", phase:2, milestones:[
        {id:"m5",title:"Spring Boot",type:"skill",weeks:3,resources:["spring.io"],done:false},
        {id:"m6",title:"Spring Security",type:"skill",weeks:2,resources:["Spring Security Docs"],done:false},
        {id:"m7",title:"Spring Data JPA",type:"tool",weeks:1,resources:["spring.io/guides"],done:false},
      ]},
      { id:"s3", title:"Build & Deploy", phase:3, milestones:[
        {id:"m8",title:"Maven / Gradle",type:"tool",weeks:1,resources:["maven.apache.org"],done:false},
        {id:"m9",title:"Docker & Kubernetes",type:"tool",weeks:2,resources:["kubernetes.io"],done:false},
        {id:"m10",title:"OCP Java Certification",type:"milestone",weeks:4,resources:["oracle.com/certification"],done:false},
      ]},
    ]
  },

  "dotnet": {
    title: ".NET Developer",
    description: "Build web, desktop, and cloud apps with C# and .NET.",
    estimatedWeeks: 26,
    sections: [
      { id:"s1", title:"C# Fundamentals", phase:1, milestones:[
        {id:"m1",title:"C# Syntax & OOP",type:"skill",weeks:3,resources:["learn.microsoft.com"],done:false},
        {id:"m2",title:"LINQ & Async/Await",type:"skill",weeks:2,resources:["C# in Depth"],done:false},
        {id:"m3",title:"NuGet & .NET CLI",type:"tool",weeks:1,resources:["nuget.org"],done:false},
      ]},
      { id:"s2", title:"ASP.NET Core", phase:2, milestones:[
        {id:"m4",title:"ASP.NET Core MVC / API",type:"skill",weeks:3,resources:["learn.microsoft.com"],done:false},
        {id:"m5",title:"Entity Framework Core",type:"tool",weeks:2,resources:["learn.microsoft.com/ef"],done:false},
        {id:"m6",title:"SignalR (Real-Time)",type:"skill",weeks:1,resources:["SignalR Docs"],done:false},
      ]},
      { id:"s3", title:"Azure & Deploy", phase:3, milestones:[
        {id:"m7",title:"Azure App Service",type:"tool",weeks:2,resources:["azure.microsoft.com"],done:false},
        {id:"m8",title:"AZ-900 Certification",type:"milestone",weeks:3,resources:["Microsoft Learn"],done:false},
      ]},
    ]
  },

  "react": {
    title: "React Developer",
    description: "Deep dive into React ecosystem for modern web apps.",
    estimatedWeeks: 20,
    sections: [
      { id:"s1", title:"React Core", phase:1, milestones:[
        {id:"m1",title:"JSX, Components, Props",type:"skill",weeks:1,resources:["react.dev"],done:false},
        {id:"m2",title:"Hooks (useState, useEffect, useRef)",type:"skill",weeks:2,resources:["react.dev/learn"],done:false},
        {id:"m3",title:"Context API",type:"skill",weeks:1,resources:["react.dev"],done:false},
        {id:"m4",title:"React Query / SWR",type:"tool",weeks:1,resources:["tanstack.com/query"],done:false},
      ]},
      { id:"s2", title:"Ecosystem", phase:2, milestones:[
        {id:"m5",title:"React Router v6",type:"tool",weeks:1,resources:["reactrouter.com"],done:false},
        {id:"m6",title:"Zustand / Redux Toolkit",type:"tool",weeks:2,resources:["zustand-demo.pmnd.rs"],done:false},
        {id:"m7",title:"Next.js (SSR/SSG)",type:"skill",weeks:3,resources:["nextjs.org"],done:false},
      ]},
      { id:"s3", title:"Testing & Performance", phase:3, milestones:[
        {id:"m8",title:"Testing Library + Vitest",type:"tool",weeks:2,resources:["testing-library.com"],done:false},
        {id:"m9",title:"Performance (useMemo, lazy, Profiler)",type:"skill",weeks:1,resources:["react.dev/reference"],done:false},
      ]},
    ]
  },

  "vue": {
    title: "Vue Developer",
    description: "Build progressive web apps with Vue 3.",
    estimatedWeeks: 18,
    sections: [
      { id:"s1", title:"Vue 3 Core", phase:1, milestones:[
        {id:"m1",title:"Composition API & setup()",type:"skill",weeks:2,resources:["vuejs.org"],done:false},
        {id:"m2",title:"Reactivity (ref, reactive, computed)",type:"skill",weeks:1,resources:["vuejs.org/guide"],done:false},
        {id:"m3",title:"Components & Props",type:"skill",weeks:1,resources:["vuejs.org"],done:false},
      ]},
      { id:"s2", title:"Ecosystem", phase:2, milestones:[
        {id:"m4",title:"Vue Router",type:"tool",weeks:1,resources:["router.vuejs.org"],done:false},
        {id:"m5",title:"Pinia (State)",type:"tool",weeks:1,resources:["pinia.vuejs.org"],done:false},
        {id:"m6",title:"Nuxt 3 (SSR/SSG)",type:"skill",weeks:3,resources:["nuxt.com"],done:false},
      ]},
      { id:"s3", title:"Testing & Deploy", phase:3, milestones:[
        {id:"m7",title:"Vitest + Vue Testing Library",type:"tool",weeks:2,resources:["vitest.dev"],done:false},
        {id:"m8",title:"Deploy Nuxt app",type:"milestone",weeks:1,resources:["nuxt.com/deploy"],done:false},
      ]},
    ]
  },

  "angular": {
    title: "Angular Developer",
    description: "Enterprise-scale frontend apps with Angular.",
    estimatedWeeks: 22,
    sections: [
      { id:"s1", title:"Angular Fundamentals", phase:1, milestones:[
        {id:"m1",title:"TypeScript for Angular",type:"skill",weeks:2,resources:["typescriptlang.org"],done:false},
        {id:"m2",title:"Components, Modules, Templates",type:"skill",weeks:2,resources:["angular.io"],done:false},
        {id:"m3",title:"Dependency Injection",type:"concept",weeks:1,resources:["angular.io/guide/di"],done:false},
        {id:"m4",title:"RxJS Basics",type:"skill",weeks:2,resources:["rxjs.dev"],done:false},
      ]},
      { id:"s2", title:"Advanced Angular", phase:2, milestones:[
        {id:"m5",title:"Angular Router & Guards",type:"skill",weeks:1,resources:["angular.io/guide/router"],done:false},
        {id:"m6",title:"NgRx State Management",type:"tool",weeks:3,resources:["ngrx.io"],done:false},
        {id:"m7",title:"Angular Material",type:"tool",weeks:1,resources:["material.angular.io"],done:false},
      ]},
      { id:"s3", title:"Testing & Deploy", phase:3, milestones:[
        {id:"m8",title:"Jest + Angular Testing",type:"tool",weeks:2,resources:["jestjs.io"],done:false},
        {id:"m9",title:"Build & Deploy",type:"milestone",weeks:1,resources:["angular.io/guide/deployment"],done:false},
      ]},
    ]
  },

  "nodejs": {
    title: "Node.js Developer",
    description: "Build scalable backend services with Node.js.",
    estimatedWeeks: 22,
    sections: [
      { id:"s1", title:"Node.js Core", phase:1, milestones:[
        {id:"m1",title:"Event Loop & Non-Blocking I/O",type:"concept",weeks:1,resources:["nodejs.org/docs"],done:false},
        {id:"m2",title:"Modules (ESM & CommonJS)",type:"skill",weeks:1,resources:["nodejs.org"],done:false},
        {id:"m3",title:"File System, Streams, Buffers",type:"skill",weeks:2,resources:["nodejs.org/api"],done:false},
      ]},
      { id:"s2", title:"Frameworks & DBs", phase:2, milestones:[
        {id:"m4",title:"Express.js / Fastify",type:"skill",weeks:2,resources:["expressjs.com","fastify.io"],done:false},
        {id:"m5",title:"Prisma + PostgreSQL",type:"tool",weeks:2,resources:["prisma.io"],done:false},
        {id:"m6",title:"Authentication (Passport / JWT)",type:"skill",weeks:1,resources:["passportjs.org"],done:false},
      ]},
      { id:"s3", title:"Production", phase:3, milestones:[
        {id:"m7",title:"PM2 & Process Management",type:"tool",weeks:1,resources:["pm2.io"],done:false},
        {id:"m8",title:"Testing (Jest + Supertest)",type:"tool",weeks:2,resources:["jestjs.io"],done:false},
        {id:"m9",title:"Microservices with Node",type:"skill",weeks:2,resources:["microservices.io"],done:false},
      ]},
    ]
  },

  "flutter": {
    title: "Flutter Developer",
    description: "Cross-platform apps for mobile, web and desktop.",
    estimatedWeeks: 22,
    sections: [
      { id:"s1", title:"Dart Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Dart Syntax & OOP",type:"skill",weeks:2,resources:["dart.dev"],done:false},
        {id:"m2",title:"Async / Futures / Streams",type:"skill",weeks:1,resources:["dart.dev/async"],done:false},
      ]},
      { id:"s2", title:"Flutter Widgets", phase:2, milestones:[
        {id:"m3",title:"Widget Tree & Layouts",type:"skill",weeks:2,resources:["flutter.dev/docs"],done:false},
        {id:"m4",title:"StatefulWidget & setState",type:"skill",weeks:1,resources:["flutter.dev"],done:false},
        {id:"m5",title:"Navigation & Routing",type:"skill",weeks:1,resources:["GoRouter Docs"],done:false},
        {id:"m6",title:"State: Riverpod / BLoC",type:"tool",weeks:2,resources:["riverpod.dev"],done:false},
      ]},
      { id:"s3", title:"Release", phase:3, milestones:[
        {id:"m7",title:"Firebase Integration",type:"tool",weeks:2,resources:["firebase.google.com"],done:false},
        {id:"m8",title:"Play Store & App Store Release",type:"milestone",weeks:2,resources:["flutter.dev/deployment"],done:false},
      ]},
    ]
  },

  "ios": {
    title: "iOS Developer",
    description: "Build native iOS apps with Swift and SwiftUI.",
    estimatedWeeks: 26,
    sections: [
      { id:"s1", title:"Swift Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Swift Syntax & Types",type:"skill",weeks:2,resources:["swift.org","Hacking with Swift"],done:false},
        {id:"m2",title:"Optionals & Error Handling",type:"skill",weeks:1,resources:["swift.org/documentation"],done:false},
        {id:"m3",title:"Protocols & Generics",type:"skill",weeks:2,resources:["Hacking with Swift"],done:false},
      ]},
      { id:"s2", title:"SwiftUI", phase:2, milestones:[
        {id:"m4",title:"SwiftUI Views & Layout",type:"skill",weeks:3,resources:["apple.com/xcode"],done:false},
        {id:"m5",title:"@State, @Binding, @ObservedObject",type:"skill",weeks:2,resources:["Hacking with Swift"],done:false},
        {id:"m6",title:"Navigation & Tab Views",type:"skill",weeks:1,resources:["SwiftUI Docs"],done:false},
      ]},
      { id:"s3", title:"Advanced & Ship", phase:3, milestones:[
        {id:"m7",title:"Core Data / SwiftData",type:"tool",weeks:2,resources:["Apple Docs"],done:false},
        {id:"m8",title:"In-App Purchases",type:"skill",weeks:1,resources:["Apple StoreKit Docs"],done:false},
        {id:"m9",title:"Submit to App Store",type:"milestone",weeks:2,resources:["developer.apple.com"],done:false},
      ]},
    ]
  },

  "android": {
    title: "Android Developer",
    description: "Build native Android apps with Kotlin and Jetpack Compose.",
    estimatedWeeks: 26,
    sections: [
      { id:"s1", title:"Kotlin Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Kotlin Syntax & Null Safety",type:"skill",weeks:2,resources:["kotlinlang.org"],done:false},
        {id:"m2",title:"Coroutines & Flow",type:"skill",weeks:2,resources:["Kotlin Coroutines Guide"],done:false},
      ]},
      { id:"s2", title:"Jetpack Compose", phase:2, milestones:[
        {id:"m3",title:"Composable Functions & State",type:"skill",weeks:3,resources:["developer.android.com/compose"],done:false},
        {id:"m4",title:"Navigation Compose",type:"tool",weeks:1,resources:["developer.android.com"],done:false},
        {id:"m5",title:"ViewModel + Hilt DI",type:"tool",weeks:2,resources:["developer.android.com"],done:false},
      ]},
      { id:"s3", title:"APIs & Release", phase:3, milestones:[
        {id:"m6",title:"Retrofit + Kotlin Serialization",type:"tool",weeks:2,resources:["square.github.io/retrofit"],done:false},
        {id:"m7",title:"Room Database",type:"tool",weeks:1,resources:["developer.android.com/room"],done:false},
        {id:"m8",title:"Google Play Release",type:"milestone",weeks:2,resources:["developer.android.com/distribute"],done:false},
      ]},
    ]
  },

  "aws": {
    title: "AWS Engineer",
    description: "Master Amazon Web Services for cloud architecture.",
    estimatedWeeks: 28,
    sections: [
      { id:"s1", title:"Core Services", phase:1, milestones:[
        {id:"m1",title:"IAM, VPC, EC2",type:"skill",weeks:3,resources:["AWS Docs","AWS Skill Builder"],done:false},
        {id:"m2",title:"S3, CloudFront, Route 53",type:"skill",weeks:2,resources:["AWS Docs"],done:false},
        {id:"m3",title:"RDS & DynamoDB",type:"skill",weeks:2,resources:["AWS Docs"],done:false},
      ]},
      { id:"s2", title:"Serverless & Containers", phase:2, milestones:[
        {id:"m4",title:"Lambda + API Gateway",type:"skill",weeks:2,resources:["AWS SAM Docs"],done:false},
        {id:"m5",title:"ECS / EKS",type:"tool",weeks:3,resources:["AWS EKS Docs"],done:false},
      ]},
      { id:"s3", title:"Certifications", phase:3, milestones:[
        {id:"m6",title:"AWS Cloud Practitioner",type:"milestone",weeks:2,resources:["Stephane Maarek Udemy"],done:false},
        {id:"m7",title:"AWS Solutions Architect Associate",type:"milestone",weeks:4,resources:["Adrian Cantrill"],done:false},
      ]},
    ]
  },

  "gcp": {
    title: "GCP Engineer",
    description: "Build and scale on Google Cloud Platform.",
    estimatedWeeks: 24,
    sections: [
      { id:"s1", title:"GCP Core", phase:1, milestones:[
        {id:"m1",title:"Compute Engine & GKE",type:"skill",weeks:3,resources:["Google Cloud Docs"],done:false},
        {id:"m2",title:"Cloud Storage & BigQuery",type:"skill",weeks:2,resources:["cloud.google.com"],done:false},
        {id:"m3",title:"IAM & VPC",type:"skill",weeks:1,resources:["Google Cloud Docs"],done:false},
      ]},
      { id:"s2", title:"AI & Serverless", phase:2, milestones:[
        {id:"m4",title:"Cloud Functions & Run",type:"skill",weeks:2,resources:["cloud.google.com/functions"],done:false},
        {id:"m5",title:"Vertex AI",type:"tool",weeks:3,resources:["cloud.google.com/vertex-ai"],done:false},
      ]},
      { id:"s3", title:"Certifications", phase:3, milestones:[
        {id:"m6",title:"GCP Associate Cloud Engineer",type:"milestone",weeks:4,resources:["Google Cloud Skills Boost"],done:false},
        {id:"m7",title:"GCP Professional Data Engineer",type:"milestone",weeks:4,resources:["Google Cloud Skills Boost"],done:false},
      ]},
    ]
  },

  "azure": {
    title: "Azure Engineer",
    description: "Enterprise cloud with Microsoft Azure.",
    estimatedWeeks: 24,
    sections: [
      { id:"s1", title:"Azure Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Azure Portal & CLI",type:"skill",weeks:1,resources:["learn.microsoft.com"],done:false},
        {id:"m2",title:"Compute (VMs, AKS, Functions)",type:"skill",weeks:3,resources:["Azure Docs"],done:false},
        {id:"m3",title:"Storage & Cosmos DB",type:"skill",weeks:2,resources:["Azure Docs"],done:false},
      ]},
      { id:"s2", title:"DevOps & Security", phase:2, milestones:[
        {id:"m4",title:"Azure DevOps Pipelines",type:"tool",weeks:2,resources:["docs.microsoft.com/azure/devops"],done:false},
        {id:"m5",title:"Azure AD & RBAC",type:"skill",weeks:2,resources:["Azure Docs"],done:false},
      ]},
      { id:"s3", title:"Certifications", phase:3, milestones:[
        {id:"m6",title:"AZ-900 Azure Fundamentals",type:"milestone",weeks:2,resources:["Microsoft Learn"],done:false},
        {id:"m7",title:"AZ-104 Administrator",type:"milestone",weeks:4,resources:["Microsoft Learn"],done:false},
      ]},
    ]
  },

  "kubernetes": {
    title: "Kubernetes Engineer",
    description: "Orchestrate containers at scale with Kubernetes.",
    estimatedWeeks: 20,
    sections: [
      { id:"s1", title:"K8s Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Pods, Deployments, Services",type:"skill",weeks:2,resources:["kubernetes.io/docs"],done:false},
        {id:"m2",title:"ConfigMaps & Secrets",type:"skill",weeks:1,resources:["kubernetes.io"],done:false},
        {id:"m3",title:"Namespaces & RBAC",type:"skill",weeks:1,resources:["kubernetes.io"],done:false},
      ]},
      { id:"s2", title:"Advanced K8s", phase:2, milestones:[
        {id:"m4",title:"Helm Charts",type:"tool",weeks:2,resources:["helm.sh"],done:false},
        {id:"m5",title:"Ingress & Networking",type:"skill",weeks:2,resources:["kubernetes.io/ingress"],done:false},
        {id:"m6",title:"StatefulSets & Persistent Volumes",type:"skill",weeks:1,resources:["kubernetes.io"],done:false},
        {id:"m7",title:"Horizontal Pod Autoscaling",type:"skill",weeks:1,resources:["kubernetes.io"],done:false},
      ]},
      { id:"s3", title:"Certifications", phase:3, milestones:[
        {id:"m8",title:"CKA (Certified Kubernetes Admin)",type:"milestone",weeks:4,resources:["training.linuxfoundation.org"],done:false},
      ]},
    ]
  },

  "docker": {
    title: "Docker & Containers",
    description: "Package and ship software reliably with containers.",
    estimatedWeeks: 10,
    sections: [
      { id:"s1", title:"Docker Core", phase:1, milestones:[
        {id:"m1",title:"Images, Containers, Volumes",type:"skill",weeks:2,resources:["docs.docker.com"],done:false},
        {id:"m2",title:"Dockerfile Best Practices",type:"skill",weeks:1,resources:["docs.docker.com/develop"],done:false},
        {id:"m3",title:"Docker Compose",type:"tool",weeks:1,resources:["docs.docker.com/compose"],done:false},
      ]},
      { id:"s2", title:"Advanced", phase:2, milestones:[
        {id:"m4",title:"Multi-Stage Builds",type:"skill",weeks:1,resources:["docs.docker.com"],done:false},
        {id:"m5",title:"Docker Networking",type:"concept",weeks:1,resources:["docs.docker.com/network"],done:false},
        {id:"m6",title:"Docker in CI/CD",type:"tool",weeks:2,resources:["GitHub Actions Docs"],done:false},
        {id:"m7",title:"Docker Security",type:"skill",weeks:2,resources:["snyk.io/docker"],done:false},
      ]},
    ]
  },

  "mlops": {
    title: "MLOps Engineer",
    description: "Productionize and operate ML models reliably.",
    estimatedWeeks: 28,
    sections: [
      { id:"s1", title:"ML Foundations", phase:1, milestones:[
        {id:"m1",title:"ML Lifecycle Overview",type:"concept",weeks:1,resources:["mlops.org"],done:false},
        {id:"m2",title:"Python + scikit-learn",type:"skill",weeks:3,resources:["scikit-learn.org"],done:false},
      ]},
      { id:"s2", title:"Experiment Tracking", phase:2, milestones:[
        {id:"m3",title:"MLflow",type:"tool",weeks:2,resources:["mlflow.org"],done:false},
        {id:"m4",title:"Weights & Biases",type:"tool",weeks:1,resources:["wandb.ai"],done:false},
        {id:"m5",title:"DVC (Data Version Control)",type:"tool",weeks:2,resources:["dvc.org"],done:false},
      ]},
      { id:"s3", title:"Deployment", phase:3, milestones:[
        {id:"m6",title:"Model Serving (BentoML / TorchServe)",type:"tool",weeks:2,resources:["bentoml.org"],done:false},
        {id:"m7",title:"Feature Stores (Feast)",type:"tool",weeks:2,resources:["feast.dev"],done:false},
        {id:"m8",title:"Monitoring (Evidently AI)",type:"tool",weeks:2,resources:["evidentlyai.com"],done:false},
      ]},
    ]
  },

  "data-eng": {
    title: "Data Engineer",
    description: "Build pipelines that move and transform data at scale.",
    estimatedWeeks: 30,
    sections: [
      { id:"s1", title:"Foundations", phase:1, milestones:[
        {id:"m1",title:"SQL & Data Modeling",type:"skill",weeks:3,resources:["Mode Analytics","dbt Docs"],done:false},
        {id:"m2",title:"Python for Data",type:"skill",weeks:2,resources:["pandas.pydata.org"],done:false},
      ]},
      { id:"s2", title:"Pipelines", phase:2, milestones:[
        {id:"m3",title:"Apache Airflow",type:"tool",weeks:3,resources:["airflow.apache.org"],done:false},
        {id:"m4",title:"dbt (Data Build Tool)",type:"tool",weeks:2,resources:["getdbt.com"],done:false},
        {id:"m5",title:"Kafka (Streaming)",type:"tool",weeks:3,resources:["kafka.apache.org"],done:false},
      ]},
      { id:"s3", title:"Big Data & Cloud", phase:3, milestones:[
        {id:"m6",title:"Spark",type:"tool",weeks:3,resources:["spark.apache.org"],done:false},
        {id:"m7",title:"BigQuery / Redshift / Snowflake",type:"tool",weeks:2,resources:["cloud.google.com/bigquery"],done:false},
        {id:"m8",title:"Data Lakehouse (Delta / Iceberg)",type:"concept",weeks:2,resources:["delta.io"],done:false},
      ]},
    ]
  },

  "data-analyst": {
    title: "Data Analyst",
    description: "Turn raw data into clear insights and decisions.",
    estimatedWeeks: 18,
    sections: [
      { id:"s1", title:"Core Skills", phase:1, milestones:[
        {id:"m1",title:"Excel & Google Sheets",type:"skill",weeks:1,resources:["Chandoo.org"],done:false},
        {id:"m2",title:"SQL for Analysis",type:"skill",weeks:3,resources:["SQLBolt","Mode Analytics"],done:false},
        {id:"m3",title:"Python (Pandas, Matplotlib)",type:"skill",weeks:3,resources:["pandas.pydata.org"],done:false},
      ]},
      { id:"s2", title:"Visualization", phase:2, milestones:[
        {id:"m4",title:"Tableau or Power BI",type:"tool",weeks:3,resources:["tableau.com/learn"],done:false},
        {id:"m5",title:"Storytelling with Data",type:"skill",weeks:2,resources:["storytellingwithdata.com"],done:false},
      ]},
      { id:"s3", title:"Statistics", phase:3, milestones:[
        {id:"m6",title:"Descriptive & Inferential Stats",type:"concept",weeks:2,resources:["StatQuest"],done:false},
        {id:"m7",title:"A/B Testing",type:"skill",weeks:2,resources:["Evan Miller Stats"],done:false},
      ]},
    ]
  },

  "bi": {
    title: "Business Intelligence",
    description: "Design dashboards and reports that drive business decisions.",
    estimatedWeeks: 16,
    sections: [
      { id:"s1", title:"Data Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Data Warehousing Concepts",type:"concept",weeks:2,resources:["Kimball Group"],done:false},
        {id:"m2",title:"Star Schema & Dimensional Modeling",type:"skill",weeks:2,resources:["The Data Warehouse Toolkit"],done:false},
      ]},
      { id:"s2", title:"BI Tools", phase:2, milestones:[
        {id:"m3",title:"Power BI (DAX & Power Query)",type:"tool",weeks:4,resources:["learn.microsoft.com/power-bi"],done:false},
        {id:"m4",title:"Tableau Desktop",type:"tool",weeks:3,resources:["tableau.com/learn"],done:false},
        {id:"m5",title:"Looker / Google Data Studio",type:"tool",weeks:1,resources:["looker.com/docs"],done:false},
      ]},
    ]
  },

  "nlp": {
    title: "NLP Engineer",
    description: "Build systems that understand and generate human language.",
    estimatedWeeks: 32,
    sections: [
      { id:"s1", title:"Foundations", phase:1, milestones:[
        {id:"m1",title:"Linguistics Basics",type:"concept",weeks:1,resources:["Stanford NLP Course"],done:false},
        {id:"m2",title:"Text Preprocessing (tokenization, stemming)",type:"skill",weeks:1,resources:["NLTK Book"],done:false},
        {id:"m3",title:"Classical NLP (TF-IDF, Bag of Words)",type:"skill",weeks:2,resources:["scikit-learn"],done:false},
      ]},
      { id:"s2", title:"Deep Learning for NLP", phase:2, milestones:[
        {id:"m4",title:"Word Embeddings (Word2Vec, GloVe)",type:"concept",weeks:2,resources:["Gensim Docs"],done:false},
        {id:"m5",title:"Transformers (BERT, GPT)",type:"skill",weeks:4,resources:["HuggingFace Course"],done:false},
        {id:"m6",title:"Fine-Tuning LLMs",type:"skill",weeks:3,resources:["huggingface.co/peft"],done:false},
      ]},
      { id:"s3", title:"Applications", phase:3, milestones:[
        {id:"m7",title:"Sentiment Analysis & NER",type:"skill",weeks:2,resources:["spaCy Docs"],done:false},
        {id:"m8",title:"RAG Systems",type:"skill",weeks:3,resources:["LangChain Docs"],done:false},
        {id:"m9",title:"Deploy NLP API",type:"milestone",weeks:2,resources:["FastAPI","Spaces on HuggingFace"],done:false},
      ]},
    ]
  },

  "cv": {
    title: "Computer Vision Engineer",
    description: "Teach machines to see and understand visual data.",
    estimatedWeeks: 30,
    sections: [
      { id:"s1", title:"Foundations", phase:1, milestones:[
        {id:"m1",title:"Image Basics & OpenCV",type:"skill",weeks:2,resources:["opencv.org"],done:false},
        {id:"m2",title:"Linear Algebra for Vision",type:"concept",weeks:2,resources:["3Blue1Brown"],done:false},
        {id:"m3",title:"Classical CV (edges, filters, SIFT)",type:"skill",weeks:2,resources:["PyImageSearch"],done:false},
      ]},
      { id:"s2", title:"Deep Learning for Vision", phase:2, milestones:[
        {id:"m4",title:"CNNs (ResNet, EfficientNet)",type:"skill",weeks:3,resources:["fast.ai"],done:false},
        {id:"m5",title:"Object Detection (YOLO, Detectron2)",type:"skill",weeks:3,resources:["ultralytics.com"],done:false},
        {id:"m6",title:"Segmentation (SAM, UNet)",type:"skill",weeks:2,resources:["segment-anything.com"],done:false},
      ]},
      { id:"s3", title:"Production", phase:3, milestones:[
        {id:"m7",title:"TensorRT / ONNX Export",type:"tool",weeks:2,resources:["developer.nvidia.com"],done:false},
        {id:"m8",title:"Deploy CV API",type:"milestone",weeks:2,resources:["FastAPI + Roboflow"],done:false},
      ]},
    ]
  },

  "defi": {
    title: "DeFi Developer",
    description: "Build decentralized finance protocols and tooling.",
    estimatedWeeks: 30,
    sections: [
      { id:"s1", title:"DeFi Concepts", phase:1, milestones:[
        {id:"m1",title:"AMMs, Lending, Yield Farming",type:"concept",weeks:2,resources:["Finematics","DeFi MOOC"],done:false},
        {id:"m2",title:"Tokenomics & Governance",type:"concept",weeks:1,resources:["a16z Crypto Readings"],done:false},
      ]},
      { id:"s2", title:"Protocol Development", phase:2, milestones:[
        {id:"m3",title:"Solidity + Foundry",type:"skill",weeks:4,resources:["foundry-rs.github.io"],done:false},
        {id:"m4",title:"Uniswap V3 Fork / Custom AMM",type:"skill",weeks:4,resources:["Uniswap Docs"],done:false},
        {id:"m5",title:"Chainlink Oracles",type:"tool",weeks:1,resources:["chain.link/docs"],done:false},
      ]},
      { id:"s3", title:"Security & Audit", phase:3, milestones:[
        {id:"m6",title:"Reentrancy & Flash Loan Attacks",type:"concept",weeks:2,resources:["DeFiHackLabs"],done:false},
        {id:"m7",title:"Slither / Mythril Static Analysis",type:"tool",weeks:2,resources:["github.com/crytic/slither"],done:false},
        {id:"m8",title:"Protocol Audit Report",type:"milestone",weeks:4,resources:["Code4rena","Sherlock"],done:false},
      ]},
    ]
  },

  "solidity": {
    title: "Solidity Developer",
    description: "Write secure, gas-efficient smart contracts.",
    estimatedWeeks: 22,
    sections: [
      { id:"s1", title:"Solidity Basics", phase:1, milestones:[
        {id:"m1",title:"Data Types, Mappings, Structs",type:"skill",weeks:2,resources:["CryptoZombies","Solidity Docs"],done:false},
        {id:"m2",title:"Functions, Modifiers, Events",type:"skill",weeks:2,resources:["Solidity Docs"],done:false},
        {id:"m3",title:"Inheritance & Interfaces",type:"skill",weeks:1,resources:["OpenZeppelin Docs"],done:false},
      ]},
      { id:"s2", title:"Advanced Solidity", phase:2, milestones:[
        {id:"m4",title:"Gas Optimization",type:"skill",weeks:2,resources:["RareSkills Gas Optimization"],done:false},
        {id:"m5",title:"Proxy Patterns & Upgradeability",type:"concept",weeks:2,resources:["OpenZeppelin Proxies"],done:false},
        {id:"m6",title:"ERC Standards (ERC20, ERC721, ERC1155)",type:"skill",weeks:2,resources:["EIPs on ethereum.org"],done:false},
      ]},
      { id:"s3", title:"Testing & Audit", phase:3, milestones:[
        {id:"m7",title:"Foundry Testing",type:"tool",weeks:2,resources:["foundry-rs.github.io"],done:false},
        {id:"m8",title:"Fuzz Testing",type:"skill",weeks:1,resources:["Foundry Fuzz Docs"],done:false},
      ]},
    ]
  },

  "graphql": {
    title: "GraphQL Developer",
    description: "Design and consume GraphQL APIs efficiently.",
    estimatedWeeks: 12,
    sections: [
      { id:"s1", title:"GraphQL Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Queries, Mutations, Subscriptions",type:"skill",weeks:2,resources:["graphql.org/learn"],done:false},
        {id:"m2",title:"Schema Design",type:"skill",weeks:2,resources:["graphql.org"],done:false},
        {id:"m3",title:"Resolvers & Dataloaders",type:"skill",weeks:2,resources:["apollographql.com/docs"],done:false},
      ]},
      { id:"s2", title:"Apollo Stack", phase:2, milestones:[
        {id:"m4",title:"Apollo Server",type:"tool",weeks:2,resources:["apollographql.com"],done:false},
        {id:"m5",title:"Apollo Client + React",type:"tool",weeks:2,resources:["apollographql.com/docs/react"],done:false},
      ]},
      { id:"s3", title:"Advanced", phase:3, milestones:[
        {id:"m6",title:"Federation (supergraph)",type:"skill",weeks:2,resources:["apollographql.com/docs/federation"],done:false},
      ]},
    ]
  },

  "microservices": {
    title: "Microservices Architecture",
    description: "Design, build, and operate microservices at scale.",
    estimatedWeeks: 26,
    sections: [
      { id:"s1", title:"Concepts", phase:1, milestones:[
        {id:"m1",title:"Monolith vs Microservices",type:"concept",weeks:1,resources:["microservices.io"],done:false},
        {id:"m2",title:"Domain-Driven Design (DDD)",type:"concept",weeks:2,resources:["DDD Quickly (free PDF)"],done:false},
        {id:"m3",title:"12-Factor App",type:"concept",weeks:1,resources:["12factor.net"],done:false},
      ]},
      { id:"s2", title:"Communication", phase:2, milestones:[
        {id:"m4",title:"Sync (REST / gRPC)",type:"skill",weeks:2,resources:["grpc.io"],done:false},
        {id:"m5",title:"Async (Kafka / RabbitMQ)",type:"tool",weeks:2,resources:["kafka.apache.org"],done:false},
        {id:"m6",title:"API Gateway (Kong / NGINX)",type:"tool",weeks:1,resources:["konghq.com"],done:false},
      ]},
      { id:"s3", title:"Observability & Resilience", phase:3, milestones:[
        {id:"m7",title:"Distributed Tracing (Jaeger)",type:"tool",weeks:2,resources:["jaegertracing.io"],done:false},
        {id:"m8",title:"Circuit Breakers (Resilience4j)",type:"skill",weeks:1,resources:["resilience4j.readme.io"],done:false},
        {id:"m9",title:"Service Mesh (Istio)",type:"tool",weeks:3,resources:["istio.io"],done:false},
      ]},
    ]
  },

  "system-design": {
    title: "System Design",
    description: "Architect scalable, reliable, and maintainable systems.",
    estimatedWeeks: 20,
    sections: [
      { id:"s1", title:"Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Scalability (Horizontal vs Vertical)",type:"concept",weeks:1,resources:["highscalability.com"],done:false},
        {id:"m2",title:"CAP Theorem & Consistency",type:"concept",weeks:1,resources:["Martin Kleppmann - DDIA"],done:false},
        {id:"m3",title:"Load Balancing",type:"concept",weeks:1,resources:["NGINX Docs"],done:false},
        {id:"m4",title:"Caching Strategies",type:"concept",weeks:1,resources:["Redis Docs"],done:false},
      ]},
      { id:"s2", title:"Components", phase:2, milestones:[
        {id:"m5",title:"Message Queues (Kafka, SQS)",type:"concept",weeks:2,resources:["kafka.apache.org"],done:false},
        {id:"m6",title:"CDN & Global Distribution",type:"concept",weeks:1,resources:["Cloudflare Docs"],done:false},
        {id:"m7",title:"Database Sharding & Replication",type:"concept",weeks:2,resources:["DDIA Book"],done:false},
      ]},
      { id:"s3", title:"Practice", phase:3, milestones:[
        {id:"m8",title:"Design Twitter / YouTube / Uber",type:"milestone",weeks:4,resources:["Grokking System Design","Exponent"],done:false},
        {id:"m9",title:"System Design Mock Interviews",type:"milestone",weeks:4,resources:["interviewing.io"],done:false},
      ]},
    ]
  },

  "api-design": {
    title: "API Design",
    description: "Design APIs that developers love to use.",
    estimatedWeeks: 14,
    sections: [
      { id:"s1", title:"REST Principles", phase:1, milestones:[
        {id:"m1",title:"REST Constraints & HATEOAS",type:"concept",weeks:1,resources:["restfulapi.net"],done:false},
        {id:"m2",title:"HTTP Methods, Status Codes",type:"concept",weeks:1,resources:["MDN HTTP"],done:false},
        {id:"m3",title:"API Versioning Strategies",type:"skill",weeks:1,resources:["apigee.com/api-design"],done:false},
      ]},
      { id:"s2", title:"Documentation & Contracts", phase:2, milestones:[
        {id:"m4",title:"OpenAPI / Swagger",type:"tool",weeks:2,resources:["swagger.io"],done:false},
        {id:"m5",title:"API-First Design",type:"skill",weeks:1,resources:["stoplight.io"],done:false},
        {id:"m6",title:"Postman Collections",type:"tool",weeks:1,resources:["postman.com/docs"],done:false},
      ]},
      { id:"s3", title:"Security & Performance", phase:3, milestones:[
        {id:"m7",title:"Rate Limiting & Throttling",type:"skill",weeks:1,resources:["nginx.com/rate-limiting"],done:false},
        {id:"m8",title:"OAuth 2.0 & OpenID Connect",type:"skill",weeks:2,resources:["oauth.net"],done:false},
        {id:"m9",title:"Pagination & Filtering Patterns",type:"skill",weeks:1,resources:["apigee best practices"],done:false},
      ]},
    ]
  },

  "open-source": {
    title: "Open Source Contributor",
    description: "Navigate codebases and contribute to OSS projects.",
    estimatedWeeks: 12,
    sections: [
      { id:"s1", title:"Setup", phase:1, milestones:[
        {id:"m1",title:"Git Advanced (rebase, cherry-pick, bisect)",type:"skill",weeks:2,resources:["Pro Git Book"],done:false},
        {id:"m2",title:"Reading Large Codebases",type:"skill",weeks:1,resources:["sourcetrail.com"],done:false},
      ]},
      { id:"s2", title:"Contributing", phase:2, milestones:[
        {id:"m3",title:"Find Good First Issues",type:"milestone",weeks:1,resources:["goodfirstissue.dev"],done:false},
        {id:"m4",title:"Write a Pull Request",type:"milestone",weeks:2,resources:["GitHub Docs"],done:false},
        {id:"m5",title:"Code Review Etiquette",type:"skill",weeks:1,resources:["Google Engineering Practices"],done:false},
      ]},
      { id:"s3", title:"Maintainer Path", phase:3, milestones:[
        {id:"m6",title:"Triage Issues",type:"skill",weeks:2,resources:["opensource.guide"],done:false},
        {id:"m7",title:"Release & Versioning (semver)",type:"skill",weeks:1,resources:["semver.org"],done:false},
        {id:"m8",title:"Build Your Own OSS Project",type:"milestone",weeks:4,resources:["opensource.guide"],done:false},
      ]},
    ]
  },

  "technical-writing": {
    title: "Technical Writing",
    description: "Document software clearly for developers and end users.",
    estimatedWeeks: 14,
    sections: [
      { id:"s1", title:"Writing Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Plain Language & Style",type:"concept",weeks:1,resources:["Google Developer Style Guide"],done:false},
        {id:"m2",title:"Docs-as-Code (Markdown, Git)",type:"skill",weeks:1,resources:["writethedocs.org"],done:false},
        {id:"m3",title:"API Documentation",type:"skill",weeks:2,resources:["idratherbewriting.com"],done:false},
      ]},
      { id:"s2", title:"Tools & Platforms", phase:2, milestones:[
        {id:"m4",title:"MkDocs / Docusaurus",type:"tool",weeks:2,resources:["mkdocs.org","docusaurus.io"],done:false},
        {id:"m5",title:"OpenAPI Documentation",type:"tool",weeks:1,resources:["swagger.io"],done:false},
      ]},
      { id:"s3", title:"Portfolio", phase:3, milestones:[
        {id:"m6",title:"Write 3 Doc Portfolio Pieces",type:"milestone",weeks:3,resources:["writethedocs.org/guide"],done:false},
        {id:"m7",title:"Google Technical Writing Course",type:"milestone",weeks:2,resources:["developers.google.com/tech-writing"],done:false},
      ]},
    ]
  },

  "product-mgmt": {
    title: "Product Management",
    description: "Ship products users love by bridging business and tech.",
    estimatedWeeks: 18,
    sections: [
      { id:"s1", title:"PM Fundamentals", phase:1, milestones:[
        {id:"m1",title:"Product Lifecycle & Roadmapping",type:"concept",weeks:2,resources:["Inspired (Cagan)"],done:false},
        {id:"m2",title:"User Research & Jobs-to-be-Done",type:"skill",weeks:2,resources:["JTBD.info"],done:false},
        {id:"m3",title:"Prioritization Frameworks (RICE, ICE)",type:"skill",weeks:1,resources:["productplan.com"],done:false},
      ]},
      { id:"s2", title:"Execution", phase:2, milestones:[
        {id:"m4",title:"Agile & Scrum",type:"skill",weeks:1,resources:["scrum.org"],done:false},
        {id:"m5",title:"PRD Writing",type:"skill",weeks:2,resources:["lenny.substack.com"],done:false},
        {id:"m6",title:"Metrics & Analytics (North Star)",type:"skill",weeks:2,resources:["amplitude.com/blog"],done:false},
      ]},
      { id:"s3", title:"Growth", phase:3, milestones:[
        {id:"m7",title:"Growth Loops & Retention",type:"concept",weeks:2,resources:["reforge.com"],done:false},
        {id:"m8",title:"PM Interview Prep",type:"milestone",weeks:3,resources:["Cracking the PM Interview"],done:false},
      ]},
    ]
  },

  "cto-path": {
    title: "CTO Path",
    description: "Technical leadership: from senior engineer to CTO.",
    estimatedWeeks: 52,
    sections: [
      { id:"s1", title:"Technical Mastery", phase:1, milestones:[
        {id:"m1",title:"System Design Mastery",type:"skill",weeks:8,resources:["DDIA","Grokking"],done:false},
        {id:"m2",title:"Security & Compliance Awareness",type:"concept",weeks:4,resources:["OWASP","SOC2 Overview"],done:false},
      ]},
      { id:"s2", title:"Leadership", phase:2, milestones:[
        {id:"m3",title:"Engineering Management (1:1s, hiring)",type:"skill",weeks:6,resources:["An Elegant Puzzle","The Manager's Path"],done:false},
        {id:"m4",title:"Tech Strategy & Vision",type:"skill",weeks:4,resources:["Good Strategy Bad Strategy"],done:false},
        {id:"m5",title:"Board & Investor Communication",type:"skill",weeks:2,resources:["First Round Review"],done:false},
      ]},
      { id:"s3", title:"Execution", phase:3, milestones:[
        {id:"m6",title:"Build Engineering Culture",type:"milestone",weeks:8,resources:["Accelerate (Forsgren)"],done:false},
        {id:"m7",title:"Vendor & Budget Management",type:"skill",weeks:4,resources:["SaaS Finance Basics"],done:false},
      ]},
    ]
  },

  "freelance": {
    title: "Freelance Developer",
    description: "Build a sustainable freelance dev business.",
    estimatedWeeks: 16,
    sections: [
      { id:"s1", title:"Business Basics", phase:1, milestones:[
        {id:"m1",title:"Freelance Pricing (hourly vs project)",type:"concept",weeks:1,resources:["Freelancermap Blog"],done:false},
        {id:"m2",title:"Contracts & Scope of Work",type:"skill",weeks:1,resources:["bonsai.io/templates"],done:false},
        {id:"m3",title:"Invoice & Tax Basics",type:"concept",weeks:1,resources:["freshbooks.com/blog"],done:false},
      ]},
      { id:"s2", title:"Finding Clients", phase:2, milestones:[
        {id:"m4",title:"Portfolio Website",type:"milestone",weeks:2,resources:["brittanychiang.com (example)"],done:false},
        {id:"m5",title:"Upwork / Toptal Profile",type:"milestone",weeks:1,resources:["upwork.com"],done:false},
        {id:"m6",title:"Cold Outreach & LinkedIn",type:"skill",weeks:2,resources:["Cold Email Mastery"],done:false},
      ]},
      { id:"s3", title:"Scaling", phase:3, milestones:[
        {id:"m7",title:"Retainer Model",type:"concept",weeks:1,resources:["doubleyourfreelancing.com"],done:false},
        {id:"m8",title:"Agency Transition",type:"concept",weeks:2,resources:["Agency Highway Podcast"],done:false},
        {id:"m9",title:"Passive Income (courses/templates)",type:"concept",weeks:2,resources:["Gumroad","Lemon Squeezy"],done:false},
      ]},
    ]
  },

  "competitive": {
    title: "Competitive Programming",
    description: "Solve algorithmic problems to win contests and ace interviews.",
    estimatedWeeks: 40,
    sections: [
      { id:"s1", title:"Foundations", phase:1, milestones:[
        {id:"m1",title:"Big-O Complexity",type:"concept",weeks:1,resources:["Big-O Cheat Sheet"],done:false},
        {id:"m2",title:"Arrays, Strings, Hashing",type:"skill",weeks:3,resources:["LeetCode Easy","NeetCode"],done:false},
        {id:"m3",title:"Two Pointers & Sliding Window",type:"skill",weeks:2,resources:["NeetCode.io"],done:false},
      ]},
      { id:"s2", title:"Core Algorithms", phase:2, milestones:[
        {id:"m4",title:"Binary Search",type:"skill",weeks:2,resources:["LeetCode Binary Search Tag"],done:false},
        {id:"m5",title:"Trees & Graphs",type:"skill",weeks:4,resources:["NeetCode","Visualgo"],done:false},
        {id:"m6",title:"Dynamic Programming",type:"skill",weeks:6,resources:["Aditya Verma (YouTube)"],done:false},
      ]},
      { id:"s3", title:"Advanced", phase:3, milestones:[
        {id:"m7",title:"Segment Trees & Fenwick",type:"skill",weeks:3,resources:["cp-algorithms.com"],done:false},
        {id:"m8",title:"Network Flow",type:"skill",weeks:3,resources:["cp-algorithms.com"],done:false},
        {id:"m9",title:"Compete on Codeforces / LeetCode Weekly",type:"milestone",weeks:8,resources:["codeforces.com"],done:false},
      ]},
    ]
  },

  "low-level": {
    title: "Low-Level Programming",
    description: "Understand computers from the silicon up.",
    estimatedWeeks: 36,
    sections: [
      { id:"s1", title:"Computer Architecture", phase:1, milestones:[
        {id:"m1",title:"Binary, Logic Gates, ALU",type:"concept",weeks:2,resources:["nand2tetris.org"],done:false},
        {id:"m2",title:"CPU Architecture & Pipelines",type:"concept",weeks:2,resources:["CS:APP Book"],done:false},
        {id:"m3",title:"Memory Hierarchy (cache, RAM, virtual)",type:"concept",weeks:2,resources:["CS:APP Ch. 6"],done:false},
      ]},
      { id:"s2", title:"C Programming", phase:2, milestones:[
        {id:"m4",title:"C Language Mastery",type:"skill",weeks:4,resources:["K&R C","Beej's Guide"],done:false},
        {id:"m5",title:"Memory Management (malloc, free, valgrind)",type:"skill",weeks:2,resources:["CS:APP"],done:false},
        {id:"m6",title:"Systems Programming (signals, processes)",type:"skill",weeks:3,resources:["APUE Book"],done:false},
      ]},
      { id:"s3", title:"Assembly & OS", phase:3, milestones:[
        {id:"m7",title:"x86 Assembly",type:"skill",weeks:4,resources:["CS:APP","Art of Assembly"],done:false},
        {id:"m8",title:"Build a Tiny OS",type:"milestone",weeks:4,resources:["os.phil-opp.com","osdev.org"],done:false},
      ]},
    ]
  },

  "networking": {
    title: "Networking",
    description: "Understand and configure computer networks.",
    estimatedWeeks: 22,
    sections: [
      { id:"s1", title:"Fundamentals", phase:1, milestones:[
        {id:"m1",title:"OSI & TCP/IP Model",type:"concept",weeks:2,resources:["CompTIA Network+ Book"],done:false},
        {id:"m2",title:"IP Addressing & Subnetting",type:"skill",weeks:2,resources:["subnet.tools","Professor Messer"],done:false},
        {id:"m3",title:"DNS, DHCP, NAT",type:"concept",weeks:1,resources:["Cloudflare Learning"],done:false},
      ]},
      { id:"s2", title:"Routing & Switching", phase:2, milestones:[
        {id:"m4",title:"VLANs & Spanning Tree",type:"skill",weeks:2,resources:["Cisco Docs"],done:false},
        {id:"m5",title:"Routing Protocols (OSPF, BGP)",type:"skill",weeks:3,resources:["Cisco Press"],done:false},
        {id:"m6",title:"Wireless Networking",type:"concept",weeks:1,resources:["CompTIA Network+"],done:false},
      ]},
      { id:"s3", title:"Certifications", phase:3, milestones:[
        {id:"m7",title:"CompTIA Network+",type:"milestone",weeks:4,resources:["Professor Messer"],done:false},
        {id:"m8",title:"Cisco CCNA",type:"milestone",weeks:6,resources:["Jeremy's IT Lab (YouTube)"],done:false},
      ]},
    ]
  },

  "linux-admin": {
    title: "Linux Admin",
    description: "Administer Linux servers in production.",
    estimatedWeeks: 20,
    sections: [
      { id:"s1", title:"Linux Basics", phase:1, milestones:[
        {id:"m1",title:"File System & Permissions",type:"skill",weeks:2,resources:["linuxcommand.org"],done:false},
        {id:"m2",title:"Processes & Signals",type:"skill",weeks:1,resources:["Linux Manual Pages"],done:false},
        {id:"m3",title:"Users, Groups, sudo",type:"skill",weeks:1,resources:["man pages"],done:false},
      ]},
      { id:"s2", title:"Services & Automation", phase:2, milestones:[
        {id:"m4",title:"systemd & Service Management",type:"skill",weeks:1,resources:["systemd.io"],done:false},
        {id:"m5",title:"Bash Scripting & Cron",type:"skill",weeks:2,resources:["bash-guide"],done:false},
        {id:"m6",title:"Ansible Automation",type:"tool",weeks:3,resources:["docs.ansible.com"],done:false},
      ]},
      { id:"s3", title:"Networking & Security", phase:3, milestones:[
        {id:"m7",title:"iptables / nftables",type:"skill",weeks:2,resources:["netfilter.org"],done:false},
        {id:"m8",title:"SSH Hardening & Key Management",type:"skill",weeks:1,resources:["ssh.com/ssh"],done:false},
        {id:"m9",title:"RHCSA / LFCS Exam",type:"milestone",weeks:4,resources:["redhat.com/certification"],done:false},
      ]},
    ]
  },

  "terraform": {
    title: "Terraform / IaC",
    description: "Provision and manage cloud infrastructure as code.",
    estimatedWeeks: 14,
    sections: [
      { id:"s1", title:"Terraform Basics", phase:1, milestones:[
        {id:"m1",title:"HCL Syntax, Resources, Providers",type:"skill",weeks:2,resources:["developer.hashicorp.com/terraform"],done:false},
        {id:"m2",title:"State Management",type:"skill",weeks:1,resources:["Terraform Docs"],done:false},
        {id:"m3",title:"Variables & Outputs",type:"skill",weeks:1,resources:["Terraform Docs"],done:false},
      ]},
      { id:"s2", title:"Advanced Terraform", phase:2, milestones:[
        {id:"m4",title:"Modules",type:"skill",weeks:2,resources:["registry.terraform.io"],done:false},
        {id:"m5",title:"Remote State & Workspaces",type:"skill",weeks:1,resources:["Terraform Docs"],done:false},
        {id:"m6",title:"Terragrunt",type:"tool",weeks:2,resources:["terragrunt.gruntwork.io"],done:false},
      ]},
      { id:"s3", title:"Certification", phase:3, milestones:[
        {id:"m7",title:"HashiCorp Terraform Associate",type:"milestone",weeks:3,resources:["developer.hashicorp.com/certifications"],done:false},
      ]},
    ]
  },

  "prompt-eng": {
    title: "Prompt Engineering",
    description: "Craft effective prompts to get the best from LLMs.",
    estimatedWeeks: 8,
    sections: [
      { id:"s1", title:"LLM Fundamentals", phase:1, milestones:[
        {id:"m1",title:"How Transformers Work (overview)",type:"concept",weeks:1,resources:["Illustrated Transformer (Jay Alammar)"],done:false},
        {id:"m2",title:"Temperature, Top-P, Context Windows",type:"concept",weeks:1,resources:["OpenAI Docs","Anthropic Docs"],done:false},
      ]},
      { id:"s2", title:"Prompting Techniques", phase:2, milestones:[
        {id:"m3",title:"Zero-Shot, Few-Shot, Chain-of-Thought",type:"skill",weeks:1,resources:["PromptingGuide.ai"],done:false},
        {id:"m4",title:"Structured Outputs (JSON mode, XML)",type:"skill",weeks:1,resources:["Anthropic Cookbook"],done:false},
        {id:"m5",title:"System Prompts & Personas",type:"skill",weeks:1,resources:["Anthropic Docs"],done:false},
        {id:"m6",title:"Prompt Injection & Jailbreak Defense",type:"concept",weeks:1,resources:["OWASP LLM Top 10"],done:false},
      ]},
      { id:"s3", title:"Advanced", phase:3, milestones:[
        {id:"m7",title:"ReAct & Tool Use",type:"skill",weeks:1,resources:["langchain.com/docs"],done:false},
        {id:"m8",title:"Evals & Prompt Regression Testing",type:"skill",weeks:1,resources:["PromptFoo","Braintrust"],done:false},
      ]},
    ]
  },

  "rag": {
    title: "RAG / LLM Apps",
    description: "Build production LLM apps with retrieval-augmented generation.",
    estimatedWeeks: 16,
    sections: [
      { id:"s1", title:"LLM API Basics", phase:1, milestones:[
        {id:"m1",title:"OpenAI / Anthropic API",type:"skill",weeks:1,resources:["platform.openai.com","anthropic.com/docs"],done:false},
        {id:"m2",title:"Embeddings & Vector Similarity",type:"concept",weeks:1,resources:["Jay Alammar Blog"],done:false},
        {id:"m3",title:"Vector Databases (Pinecone, Chroma)",type:"tool",weeks:2,resources:["docs.pinecone.io"],done:false},
      ]},
      { id:"s2", title:"RAG Pipeline", phase:2, milestones:[
        {id:"m4",title:"Document Chunking & Indexing",type:"skill",weeks:2,resources:["LlamaIndex Docs"],done:false},
        {id:"m5",title:"LangChain / LlamaIndex",type:"tool",weeks:3,resources:["langchain.com","llamaindex.ai"],done:false},
        {id:"m6",title:"Hybrid Search (keyword + semantic)",type:"skill",weeks:1,resources:["Weaviate Docs"],done:false},
      ]},
      { id:"s3", title:"Agentic Systems", phase:3, milestones:[
        {id:"m7",title:"Tool Use & Function Calling",type:"skill",weeks:2,resources:["Anthropic Tool Use Docs"],done:false},
        {id:"m8",title:"Multi-Agent Frameworks (LangGraph)",type:"tool",weeks:2,resources:["langchain-ai.github.io/langgraph"],done:false},
        {id:"m9",title:"Evaluation (RAGAS)",type:"tool",weeks:1,resources:["docs.ragas.io"],done:false},
      ]},
    ]
  },

  "web3": {
    title: "Web3 Developer",
    description: "Build full-stack decentralized applications.",
    estimatedWeeks: 26,
    sections: [
      { id:"s1", title:"Web3 Foundations", phase:1, milestones:[
        {id:"m1",title:"Blockchain & Cryptography",type:"concept",weeks:2,resources:["ethereum.org/learn"],done:false},
        {id:"m2",title:"Wallets & Signing",type:"concept",weeks:1,resources:["MetaMask Docs"],done:false},
        {id:"m3",title:"Solidity Basics",type:"skill",weeks:3,resources:["CryptoZombies"],done:false},
      ]},
      { id:"s2", title:"dApp Stack", phase:2, milestones:[
        {id:"m4",title:"Ethers.js / Viem",type:"skill",weeks:2,resources:["viem.sh"],done:false},
        {id:"m5",title:"Wagmi + Next.js dApp",type:"skill",weeks:2,resources:["wagmi.sh"],done:false},
        {id:"m6",title:"TheGraph (indexing)",type:"tool",weeks:2,resources:["thegraph.com/docs"],done:false},
      ]},
      { id:"s3", title:"Full Project", phase:3, milestones:[
        {id:"m7",title:"Deploy Contract + Frontend",type:"milestone",weeks:2,resources:["Alchemy Tutorials"],done:false},
        {id:"m8",title:"Gas Optimization",type:"skill",weeks:2,resources:["RareSkills"],done:false},
      ]},
    ]
  },

  "ar-vr": {
    title: "AR / VR Developer",
    description: "Build immersive augmented and virtual reality experiences.",
    estimatedWeeks: 28,
    sections: [
      { id:"s1", title:"Foundations", phase:1, milestones:[
        {id:"m1",title:"3D Math (vectors, quaternions, transforms)",type:"concept",weeks:2,resources:["3Blue1Brown","GameMath.net"],done:false},
        {id:"m2",title:"Unity or Unreal (pick one)",type:"tool",weeks:3,resources:["unity.com","unrealengine.com"],done:false},
      ]},
      { id:"s2", title:"XR Development", phase:2, milestones:[
        {id:"m3",title:"Unity XR Toolkit",type:"tool",weeks:3,resources:["docs.unity3d.com/xr"],done:false},
        {id:"m4",title:"Hand Tracking & Controller Input",type:"skill",weeks:2,resources:["Meta Developer Docs"],done:false},
        {id:"m5",title:"Spatial UI Design",type:"skill",weeks:2,resources:["Microsoft Mixed Reality Docs"],done:false},
      ]},
      { id:"s3", title:"WebXR & Deploy", phase:3, milestones:[
        {id:"m6",title:"WebXR + Three.js / A-Frame",type:"skill",weeks:3,resources:["immersiveweb.dev"],done:false},
        {id:"m7",title:"Deploy to Meta Quest / Vision Pro",type:"milestone",weeks:3,resources:["developer.meta.com"],done:false},
      ]},
    ]
  },

  "dsa": {
    title: "DSA / Interview Prep",
    description: "Crack coding interviews at top tech companies.",
    estimatedWeeks: 24,
    sections: [
      { id:"s1", title:"Core Data Structures", phase:1, milestones:[
        {id:"m1",title:"Arrays, Strings, Hash Maps",type:"skill",weeks:2,resources:["NeetCode.io"],done:false},
        {id:"m2",title:"Linked Lists, Stacks, Queues",type:"skill",weeks:2,resources:["LeetCode"],done:false},
        {id:"m3",title:"Trees & Tries",type:"skill",weeks:2,resources:["Visualgo","NeetCode"],done:false},
        {id:"m4",title:"Heaps & Priority Queues",type:"skill",weeks:1,resources:["LeetCode Heap Tag"],done:false},
      ]},
      { id:"s2", title:"Algorithms", phase:2, milestones:[
        {id:"m5",title:"Binary Search",type:"skill",weeks:2,resources:["NeetCode"],done:false},
        {id:"m6",title:"Graphs (BFS, DFS, Dijkstra)",type:"skill",weeks:3,resources:["Visualgo"],done:false},
        {id:"m7",title:"Dynamic Programming",type:"skill",weeks:4,resources:["Aditya Verma YouTube"],done:false},
        {id:"m8",title:"Backtracking",type:"skill",weeks:1,resources:["NeetCode"],done:false},
      ]},
      { id:"s3", title:"Interview Practice", phase:3, milestones:[
        {id:"m9",title:"100 LeetCode Problems",type:"milestone",weeks:4,resources:["leetcode.com"],done:false},
        {id:"m10",title:"Mock Interviews (Pramp / interviewing.io)",type:"milestone",weeks:2,resources:["pramp.com"],done:false},
        {id:"m11",title:"Behavioral (STAR Method)",type:"skill",weeks:1,resources:["Cracking the Coding Interview"],done:false},
      ]},
    ]
  },
};

export async function fetchRoadmap(domainId) {
  if (MOCK_MODE) return getMockRoadmap(domainId);
  try {
    const res = await fetch(`https://roadmap.sh/api/v1/roadmap/${domainId}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error("API unavailable");
    return await res.json();
  } catch {
    console.warn("API unavailable, using mock data");
    return getMockRoadmap(domainId);
  }
}

export function getMockRoadmap(domainId) {
  const roadmap = ROADMAPS[domainId];
  if (!roadmap) return null;
  return structuredClone(roadmap);
}

export function toMarkdown(domain, roadmap) {
  let md = `# ${roadmap.title} Roadmap\n\n`;
  md += `> ${roadmap.description}\n\n`;
  md += `**Estimated Duration:** ~${roadmap.estimatedWeeks} weeks\n\n---\n\n`;
  roadmap.sections.forEach(section => {
    md += `## Phase ${section.phase} — ${section.title}\n\n`;
    section.milestones.forEach(m => {
      const badge = m.type === "concept" ? "📖" : m.type === "tool" ? "🔧" : m.type === "milestone" ? "🏆" : "💪";
      md += `- ${badge} **${m.title}** _(~${m.weeks}w)_\n`;
      if (m.resources.length) md += `  - Resources: ${m.resources.join(", ")}\n`;
    });
    md += "\n";
  });
  return md;
}

export function toJSON(domain, roadmap) {
  return JSON.stringify({ domain, ...roadmap }, null, 2);
}
