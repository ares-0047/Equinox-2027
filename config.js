module.exports = {
    EVENT_NAME: "EQUINOX 2027",
    TAGLINE: "Ideas Without Borders. Innovation Without Limits.",
    DESCRIPTION: "EQUINOX 2027 is a 36-hour international hybrid hackathon hosted by Quantum University in Roorkee, India, bringing together innovators to build solutions for real-world challenges.",
    KEYWORDS: "EQUINOX 2027, international hackathon, hybrid hackathon, Quantum University hackathon, student innovation, IoT, artificial intelligence, cybersecurity, sustainability",
    DATE: "24 February 2027 (Tentative)",
    DURATION: "36 hours",
    VENUE: "Shyamji Auditorium, Quantum University, Roorkee, Uttarakhand, India",
    PARTICIPATION_FORMAT: "Hybrid (On-campus & International Online)",
    HOST_INSTITUTION: "Quantum University",
    UNIVERSITY_URL: "https://quantumuniversity.edu.in/",
    
    ORGANISERS: [
        {name: "Horizon IoT Club", slug: "horizon", desc: "Focused on connected technologies, IoT, and innovation."},
        {name: "Velocity", slug: "velocity", desc: "Quantum University Gaming and Game Development Club."},
        {name: "International Partnership Office (IPO)", slug: "ipo", desc: "Quantum University's international collaboration and partnership office."}
    ],

    DEVELOPERS: [
        {name: "Ashutosh Kumar Singh", role: "Lead Developer", bio: "The backbone of the Website, shaping the entire architecture of Equinox", image: "/ashutosh.jpeg", linkedin: "https://www.linkedin.com/in/ashutosh-kumar-singh-bb589a380/"},
        {name: "Praneel Kumar Labh", role: "Design Engineer", bio: "Architect of the entire visual Language of Equinox, its branding and its design philosophy.", image: "/praneel.jpeg", linkedin: "https://www.linkedin.com/in/praneellabh/"},
        {name: "Utkrisht Kaushik", role: "Front-end Developer", bio: "Built the responsive interface and interactive sections for the site.", image: "/utkrisht.jpeg", linkedin: "https://www.linkedin.com/in/utkrisht-kaushik-564972381/"},
        {name: "Suraj Jana", role: "Tester", bio: "Tested the website flow and helped make every page reliable for visitors.", image: "/suraj.jpeg", linkedin: "https://www.linkedin.com/in/suraj-jana-845223386/"}
    ],

    CLUBS: {
        velocity: {
            name: "Velocity",
            label: "Gaming & Game Development Club, Quantum University",
            intro: "Velocity is the Gaming and Game Development Club of Quantum University, dedicated to bringing together gaming enthusiasts, developers, programmers, and technology innovators under one community.",
            images: ["/velocity-1.jpg", "/velocity-2.jpg", "/velocity-3.jpg", "/velocity-4.jpg", "/velocity-5.jpg"],
            paragraphs: [
                "The club aims to bridge the gap between gaming and technology by encouraging students to explore game development, competitive gaming, artificial intelligence, software development, and emerging digital technologies.",
                "Through gaming tournaments, hands-on workshops, technical sessions, hackathons, and collaborative initiatives, Velocity provides students with opportunities to develop practical skills, showcase their creativity, and work on innovative projects. The club promotes teamwork, technical excellence, and a culture of learning through experimentation.",
                "As a co-organiser of Equinox 2027, Velocity contributes to the event's technical vision, hackathon coordination, participant engagement, and gaming-oriented initiatives, helping create an environment where innovation meets competition."
            ]
        },
        horizon: {
            name: "Horizon",
            label: "IoT Club, Quantum University",
            intro: "Horizon is the Internet of Things (IoT) Club at Quantum University, focused on exploring the intersection of connected devices, embedded systems, automation, and intelligent technologies.",
            images: ["/horizon-1.jpg", "/horizon-2.jpg", "/horizon-3.jpg", "/horizon-4.jpg", "/horizon-5.png"],
            paragraphs: [
                "The club encourages students to transform ideas into practical solutions by combining hardware, software, sensors, networking, and emerging technologies.",
                "Through technical workshops, hands-on projects, innovation challenges, and collaborative development activities, Horizon provides a platform for students to experiment with IoT applications and develop solutions for real-world problems. Its areas of interest include smart systems, connected devices, automation, embedded technology, and the integration of IoT with artificial intelligence.",
                "As a co-organiser of Equinox 2027, Horizon brings its focus on hardware innovation, connected technologies, and practical engineering to the hackathon, encouraging participants to develop solutions that connect the digital and physical worlds."
            ]
        },
        ipo: {
            name: "International Partnership Office (IPO)",
            label: "Quantum University",
            intro: "The International Partnership Office (IPO) at Quantum University works to foster international collaboration, strengthen global academic relationships, and create opportunities for cross-cultural learning and engagement.",
            images: ["/ipo-1.jpg", "/ipo-2.jpg", "/ipo-3.jpg", "/ipo-4.jpg", "/ipo-5.jpg"],
            paragraphs: [
                "The office supports initiatives that connect the university with international institutions, organisations, experts, and student communities.",
                "By promoting global partnerships, international engagement, collaborative programmes, and knowledge exchange, IPO contributes to expanding students' exposure to global perspectives and emerging opportunities. Its initiatives help create an environment where diverse ideas, cultures, and academic experiences come together.",
                "As a collaborating partner of Equinox 2027, IPO supports the event's international outlook by contributing to global outreach, international engagement, and opportunities for collaboration among participants from different backgrounds and regions."
            ]
        }
    },
    
    CONTACT_EMAIL: "equinox@quantumuniversity.edu.in",
    UNSTOP_URL: "",
    GOOGLE_FORM_URL: "",
    PARTNERSHIP_URL: "",

    SPONSORS: [
        { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/courses/Java-backend-live?source=google&medium=cpc&device=c&keyword=geeksforgeeks%20java&matchtype=b&campaignid=10445850397&adgroup=175940308275&gad_source=1&gad_campaignid=10445850397&gbraid=0AAAAAC9yBkBboDY3dx3yvMwi4u6C5wH82&gclid=Cj0KCQjwrvHWBhDKARIsABmp7h2cdVICSc2WYUS8QU_DV1_lfT-PTfL9VxzgY_u7FZ6tHD0vvhP5g5QaAsWvEALw_wcB", logo: "/sponsor-geeksforgeeks.svg", alt: "GeeksforGeeks — A computer science portal" },
        { name: "Unstop", url: "https://unstop.com/", logo: "/sponsor-unstop.svg", alt: "Unstop — Competitions and internships platform" },
        { name: "CodeCrafters", url: "https://codecrafters.io/", logo: "/sponsor-codecrafters.svg", alt: "CodeCrafters — Build your own" },
        { name: "TruScholar", url: "https://www.truscholar.io/", logo: "/sponsor-truscholar.svg", alt: "TruScholar — Digital credentials" },
        { name: "Osen", url: "https://osen.live/", logo: "/sponsor-osen.svg", alt: "Osen — Live platform" },
        { name: "Fueler", url: "https://fueler.io/", logo: "/sponsor-fueler.svg", alt: "Fueler — Proof of work" }
    ],

    TRACKS: [
        {
            id: 1,
            title: "Edge Intelligence and Industrial IoT",
            shortTitle: "Industrial IoT",
            desc: "Build intelligent distributed systems combining low-power edge nodes, sensor telemetries, and autonomous real-time processing.",
            icon: "cpu",
            image: "/track-01-iot.jpg",
            highlights: [
                "Edge sensor pipelines & real-time telemetry",
                "Industrial anomaly detection on edge microcontrollers",
                "Ultra-low latency device-to-cloud mesh protocols",
                "Autonomous factory & infrastructure resilience"
            ],
            tags: ["MQTT", "TinyML", "ESP32 / Raspberry Pi", "SCADA"]
        },
        {
            id: 2,
            title: "Digital Twins and Serious Games",
            shortTitle: "Digital Twins",
            desc: "Develop interactive 3D simulations, real-world digital replicas, and game-engine environments for practical testing and operations.",
            icon: "monitor",
            image: "/track-02-twins.jpg",
            highlights: [
                "Real-time 3D physical simulation & state mirroring",
                "Serious game mechanics for industrial workforce training",
                "Bi-directional spatial telemetry synchronization",
                "Predictive maintenance through synthetic operational stress"
            ],
            tags: ["Three.js / WebGL", "Unity / Unreal", "Physics Engine", "Telemetry"]
        },
        {
            id: 3,
            title: "Cybersecurity and Post-Quantum Security",
            shortTitle: "Cybersecurity",
            desc: "Design tamper-proof architectures, post-quantum cryptographic schemes, zero-trust models, and intelligent threat defense layers.",
            icon: "shield",
            image: "/track-03-cyber.jpg",
            highlights: [
                "Post-quantum cryptographic key exchange primitives",
                "Zero-trust continuous verification architectures",
                "Hardware enclave computing & verifiable proofs",
                "Automated anomaly mitigation & tamper-proof logging"
            ],
            tags: ["Post-Quantum Cryptography", "Zero-Trust", "WebAssembly", "Enclave"]
        },
        {
            id: 4,
            title: "Public Technology and Digital Governance",
            shortTitle: "Digital Governance",
            desc: "Develop accessible civic technology, verifiable public records, and transparent digital platforms that improve community services.",
            icon: "users",
            image: "/track-04-gov.jpg",
            highlights: [
                "Verifiable citizen credentials & decentralized identity",
                "Transparent municipal resource allocation dashboards",
                "Open data APIs with strict privacy guarantees",
                "Accessible multimodal civic engagement interfaces"
            ],
            tags: ["Decentralized ID", "Open Data APIs", "CivicTech", "WCAG 2.2"]
        },
        {
            id: 5,
            title: "Sustainability and SDG Innovation",
            shortTitle: "SDG Innovation",
            desc: "Create technology-driven solutions addressing clean energy, environmental sensing, circular resources, and the UN Sustainable Development Goals.",
            icon: "globe",
            flagship: true,
            image: "/track-05-sdg.jpg",
            highlights: [
                "Renewable microgrid load balancing & energy optimization",
                "Distributed environmental telemetry & air/water monitoring",
                "Circular economy asset lifecycle tracking",
                "Quantitative UN Sustainable Development Goal metrics"
            ],
            tags: ["Smart Grid", "Carbon Telemetry", "UN SDGs", "Resource Efficiency"]
        }
    ],
    
    SCHEDULE: [
        {event: "Registration Opens", time: "15 November 2026"},
        {event: "Registration Closes", time: "18 February 2027"},
        {event: "Opening Ceremony", time: "24 February 2027"},
        {event: "Challenge Briefing", time: "24 February 2027"},
        {event: "Build Period", time: "24–25 February 2027"},
        {event: "Project Submission", time: "25 February 2027"},
        {event: "Evaluation and Closing", time: "25 February 2027"}
    ]
};