export const projects = [
  {
    title: "Task Hero",
    status: "Completed",
    description: "A versatile Android application designed to streamline daily life by combining a powerful to-do list with a simple yet effective credit/debit ledger.",
    longDescription: "Task Hero is a versatile Android application designed to streamline daily life by combining a powerful to-do list with a simple yet effective credit/debit ledger. Built entirely with modern Android technologies, it demonstrates a robust, scalable, and maintainable app architecture.\n\n**Key Features:**\n- Intuitive To-Do List: Effortlessly manage your daily tasks. Add, edit, complete, and delete items with a clean and reactive user interface.\n- Credit/Debit Book: Keep track of informal financial transactions. Log money lent or borrowed with individuals, view detailed transaction histories, and see total balances at a glance.\n- Persistent Data Storage: All tasks and financial records are saved locally using a Room database, ensuring your data is safe and available even after the app is closed.\n- Built-in Calculator: A convenient, integrated calculator for quick computations without needing to switch apps.\n\n**Technical Implementation & Architecture:**\nThis project showcases a mastery of modern Android development best practices and libraries, including 100% Kotlin & Coroutines, Jetpack Compose for a reactive UI, MVVM architecture, Room for local persistence, Hilt for dependency injection, and Navigation-Compose for in-app navigation.",
    techStack: ["Kotlin", "Coroutines", "Jetpack Compose", "MVVM", "Room", "Hilt", "Navigation-Compose"],
    repo: "https://github.com/Adarshsanthosh470/TASK_HERO-app",
    demo: "https://github.com/Adarshsanthosh470/TASK_HERO-app/releases/download/v2.0/Task_hero.apk",
    demoText: "Download APK",
    mediaUrl: "/task-hero.png"
  },
  {
    title: "Codeless Portfolio Creator",
    status: "Completed",
    description: "A modern, no-code portfolio builder that empowers users to design, customize, and publish a professional portfolio in minutes.",
    longDescription: "Codeless Portfolio is a modern, no-code portfolio builder that empowers users to design, customize, and publish a professional portfolio in minutes — without writing a single line of code. Built with a strong focus on usability, performance, and reliability, the platform combines a clean visual editor with a robust backend to deliver a seamless publishing experience.\n\n**Key Highlights:**\n- Visual No-Code Editor: Create portfolios effortlessly with a user-friendly interface.\n- Secure Authentication: Passwordless login using email OTP for a smooth experience.\n- Instant Publishing: Dynamic routing serves public portfolios at unique URLs (/username).\n- Smart Limits: Built-in publish rate-limiting system to ensure fair platform usage.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Auth", "Netlify"],
    repo: "https://github.com/Adarshsanthosh470/codelessportfolio",
    demo: "https://codelessportfolio.netlify.app/",
    demoText: "Website",
    mediaUrl: "/codeless-portfolio.png"
  },
  {
    title: "Draw Buddy Magic",
    status: "Completed",
    description: "An AI-powered web application that enables users to upload, compare, and process images in a clean, intuitive interface.",
    longDescription: "Draw Buddy Magic is an AI-powered web application that enables users to upload, compare, and process images in a clean, intuitive interface. Built with React, TypeScript, and TailwindCSS, the app focuses on a minimal design and seamless user experience — ideal for digital artists, designers, and creative enthusiasts.\n\n**Algorithmic Grayscale Conversion:** Precisely converted the 3-channel (RGB) input image into a single-channel grayscale image to serve as the sketch base.\n**Inverted Gaussian Blur:** Implemented the crucial step of inverting the grayscale image and applying a Gaussian Blur (with a 21x21 kernel) to create the 'soft negative' used for blending.\n**Color Dodge Blend Engine:** Architected the final and most critical feature: using cv2.divide to mathematically blend the base grayscale image with the blurred negative, creating the high-contrast, realistic pencil lines.\n**Simple UI (via Lovable):** Deployed a clean, intuitive web interface allowing for image upload, side-by-side (Original vs. Sketch) comparison, and a 'Download Sketch' button.\n\nThe project showcases a deep understanding of foundational computer vision principles and algorithm implementation. It highlights the ability to deconstruct a complex artistic effect into its core mathematical components and build a precise, technology-driven solution from scratch.",
    techStack: ["React", "TypeScript", "TailwindCSS", "OpenCV", "Computer Vision"],
    repo: "https://github.com/Adarshsanthosh470/draw-buddy-magic.git",
    demo: "https://draw-buddy-magic.netlify.app/",
    demoText: "Website",
    mediaUrl: "/draw-buddy.png"
  },
  {
    title: "My Garage",
    status: "In Development",
    description: "A high-utility Android application designed to eliminate vehicle compliance stress by automating the tracking of document expiries and fuel performance.",
    longDescription: "My Garage is a high-utility Android application designed to eliminate vehicle compliance stress by automating the tracking of document expiries and fuel performance. Built with a 'Privacy-First' philosophy, it serves as a secure, local vault for vehicle data, demonstrating a sophisticated use of background scheduling and persistent storage. The app is initially deployed but still in development.\n\n**Key Features:**\n- Multi-Vehicle Dashboard: Manage a complete personal garage (Petrol, Diesel, EV, or Hybrid) with a dynamic health status indicator (🟢/🟡/🔴).\n- Automated Compliance Tracking: Background monitoring for Insurance, PUC, and Road Tax expiries with proactive alerts.\n- Smart Reminder System: Battery-efficient notifications that trigger at 10:00 AM two days before and on the day of expiry.\n- Fuel Analytics & Mileage Logs: Real-time km/L and cost-per-kilometer calculations with persistent logs for long-term tracking.\n- Secure Local Storage: 100% offline architecture storing registration details and RC document paths locally to ensure user privacy.\n\n**Technical Implementation & Architecture:**\nDemonstrates advanced use of system-level Android APIs and modern architecture: 100% Kotlin & Coroutines, Jetpack Compose (Material 3), MVVM, Room Database for local persistence, and WorkManager for robust background scheduling.",
    techStack: ["Kotlin", "Coroutines", "Jetpack Compose", "Material 3", "MVVM", "Room", "WorkManager"],
    repo: "https://github.com/Adarshsanthosh470/My_Garage.git",
    demo: "https://github.com/Adarshsanthosh470/My_Garage/releases/download/v2.0/My.Garage.v2.0.apk",
    demoText: "Download APK",
    mediaUrl: "/my-garage.png"
  },
  {
    title: "Smart Online Voting System",
    status: "In Development",
    description: "An innovative digital platform designed to modernize and secure the voting process through advanced technology and user-centric design.",
    longDescription: "The Smart Online Voting System is an innovative digital platform designed to modernize and secure the voting process through advanced technology and user-centric design. Inspired by Apple’s design language and Dieter Rams’ principles of minimalism, the system delivers a seamless, elegant, and trustworthy voting experience. Built using React, Tailwind CSS, Node.js, and Express, the platform ensures a clean interface, smooth navigation, and robust backend performance. The system incorporates dual authentication for maximum security — users must verify their identity through both credentials and facial recognition. A YOLO-based face authentication module is implemented to validate each voter’s identity in real time. During the login phase, the system performs face comparison between the live camera feed and the stored registration photo, ensuring that only authorized voters can access their accounts. This eliminates the risk of duplicate votes and unauthorized access. The admin dashboard enables efficient management of voter data, candidate profiles, and real-time vote counting. The voting process is encrypted, transparent, and tamper-proof, ensuring fairness and accountability throughout the election cycle. This project highlights the potential of AI-driven security, real-time validation, and modern UI design in building next-generation e-governance platforms — combining convenience, security, and trust in one powerful system.",
    techStack: ["React", "Tailwind CSS", "Node.js", "Express", "YOLO", "AI"],
    repo: "https://github.com/Adarshsanthosh470/vote-guardian-system-89218",
    demo: "#",
    demoText: "No Demo",
    mediaUrl: "/smart-voting.png"
  },
  
  {
    title: "AI Platform for Missing Child & Human Trafficking Detection",
    status: "Completed",
    description: "A sophisticated Django-based web application designed to assist law enforcement and investigators in locating missing persons and identifying victims of human trafficking using advanced AI and facial recognition.",
    longDescription: "The AI Platform for Missing Child & Human Trafficking Detection is a sophisticated Django-based web application engineered to assist law enforcement agencies and investigators in locating missing persons and identifying victims of human trafficking. This system leverages cutting-edge AI technology to provide actionable intelligence and accelerate investigations.\n\n**Core Technology & AI Engine:**\nThe platform utilizes a Python-based AI engine powered by DeepFace, achieving 99.2% similarity accuracy in facial recognition matching. This enables precise identification of missing persons across diverse visual data sources.\n\n**Data Integration & Intelligence:**\nThe system integrates multiple data streams seamlessly:\n- CCTV feeds from surveillance networks\n- FIR (First Information Report) databases\n- Travel records and border crossing data\n- Social media intelligence through advanced Natural Language Processing (NLP)\n- Real-time crowdsourced citizen tips\n\n**Key Features:**\n- **Investigator Dashboard:** Centralized command center providing real-time insights, case management, and investigation tracking with intuitive data visualization.\n- **Citizen Tip Collection System:** Public-facing interface enabling citizens to submit leads and information securely and confidentially.\n- **Automated Social Media Monitoring:** Real-time scanning of social platforms to detect potential leads, suspicious activity, and trafficking indicators.\n- **Multi-Platform Cross-Referencing:** Intelligent algorithm that correlates information across all integrated data sources to identify patterns and connections.\n- **High-Precision Facial Matching:** AI-powered image recognition comparing missing person photos against CCTV footage and social media imagery.\n\n**Methodology & Workflow:**\n1. **Data Collection:** Aggregates information from CCTV, FIR databases, travel records, and social media through secure APIs.\n2. **Image Processing:** Applies advanced computer vision techniques to enhance and standardize images for optimal analysis.\n3. **Facial Recognition:** Compares processed images against the missing persons database using the DeepFace engine.\n4. **Alert Generation:** Immediately notifies investigators upon a potential match, providing all data points.\n5. **Intelligence Reporting:** Generates comprehensive reports to support investigative decision-making.",
    techStack: ["Django", "Python", "DeepFace", "OpenCV", "NLP", "React", "PostgreSQL", "REST APIs"],
    repo: "#",
    demo: "#",
    demoText: "No Demo",
    mediaUrl: "/missing-child-detection.png"
  }
];


