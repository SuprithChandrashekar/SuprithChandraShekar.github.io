/* Portfolio data — grounded in verified facts (GROUND_TRUTH.md, May 2026).
   Repositioned for Product Design roles: design thinking, systems craft, end-to-end ownership.
*/
window.PORTFOLIO_DATA = {
  identity: {
    name: "Suprith Chandra Shekar",
    role: "M.S. Industrial Engineering, UIUC",
    location: "Urbana–Champaign, IL",
    status: "Available Spring 2027",
    tz: "UTC−06",
    since: "2025",
    headshot: "assets/headshot.png",
    email: "Suprith2@illinois.edu",
    phone: "+1 (217) 200-1842",
    linkedin: "https://linkedin.com/in/suprith-c-shekar",
    github: "https://github.com/SuprithChandrashekar",
    resume: "assets/suprith-chandra-shekar-resume.docx"
  },

  /* ---- Hero positioning statement ---- */
  positioning: {
    headline_parts: ["Designing", "systems", "people", "trust."],
    lede: "I am an engineer and designer working at the intersection of industrial systems thinking, AI-native product design, and consulting delivery. I designed and shipped VoltBroker — a full B2B marketplace — end-to-end using AI tools, from product direction to pixel-level craft. My graduate work at UIUC focuses on optimization, quality, and decision intelligence. I bring the rigour of engineering to the creative process of product design.",
    credentials_strip: [
      { k: "M.S. IE", v: "UIUC", sub: "GPA 3.91 · Dec 2026" },
      { k: "Former", v: "Deloitte", sub: "Consultant · Germany delivery" },
      { k: "Published", v: "IJCSNS", sub: "Network security, 2024" },
      { k: "Shipped", v: "VoltBroker", sub: "Full-stack product design" }
    ]
  },

  /* ---- Projects ---- */
  projects: [
    {
      id: "01",
      slug: "voltbroker",
      kicker: "Flagship · Product Design",
      title: "VoltBroker",
      emTitle: "Volt",
      tagline: "A B2B transformer marketplace, designed and built end-to-end.",
      blurb: "A full-stack B2B marketplace for industrial transformers — procurement teams at data centres, EPCs, and utilities find verified brokers, submit RFQs, and coordinate logistics. Designed the complete product: information architecture, visual system, interaction patterns, responsive layouts, and every page from landing to checkout.",
      case_study: true,
      problem: "The industrial transformer market — a multi-billion dollar space — still runs on phone calls, PDF datasheets, and personal broker relationships. Procurement teams waste weeks sourcing a single unit. There is no centralised, searchable marketplace with standardised specs, verified suppliers, and integrated logistics.",
      approach: "Designed the product end-to-end using Claude Code, Claude Design, and Claude Projects as the primary design and development tools. Started with user research into procurement workflows at utilities and EPCs. Built the information architecture around how buyers actually search (by kVA, voltage class, application, or urgency). Designed a visual system inspired by industrial equipment catalogues — high-contrast, data-dense, and typographically precise. Every interaction was prototyped in code (Next.js, React, TypeScript) rather than static mockups.",
      innovations: [
        "AI-native design workflow — used Claude as a design partner for layout decisions, component architecture, and copy, iterating in code rather than Figma-to-handoff",
        "Industrial visual language — a design system built around precision typography (Archivo, IBM Plex Mono), commodity tickers, technical spec cards, and dense data presentation",
        "RFQ-first interaction model — the product centres on the buyer's specification flow, not a traditional e-commerce browse pattern",
        "Responsive information density — desktop layouts show data-rich category grids and specification tables; mobile collapses gracefully without losing critical decision data"
      ],
      sub: [
        { label: "Design scope", type: "list", items: [
          "Product strategy and information architecture",
          "Complete visual design system (typography, colour, spacing, component library)",
          "8 category pages, marketplace landing, broker onboarding flow, RFQ engine",
          "Responsive design across desktop, tablet, and mobile breakpoints",
          "Micro-interactions: commodity ticker, category filtering, spec search, quick-quote modal",
          "SEO, OG metadata, and accessibility (skip-links, ARIA, semantic HTML)"
        ]},
        { label: "Stack", type: "stack", items: ["Next.js","React","TypeScript","Vercel","Claude Code","Claude Design","SVG illustration"] }
      ],
      metrics: [
        { k: "Pages", v: "15+", sub: "designed & built" },
        { k: "Categories", v: "8", sub: "transformer types" },
        { k: "Status", v: "Pre-launch", sub: "voltbroker.vercel.app" }
      ],
      links: [
        { label: "Live site →", href: "https://voltbroker.vercel.app" },
        { label: "GitHub →", href: "https://github.com/SuprithChandrashekar" }
      ]
    },
    {
      id: "02",
      slug: "claude-node",
      kicker: "AI Tools & Workflow",
      title: "Claude Node",
      emTitle: "Node",
      tagline: "A personal workspace for AI agent experimentation.",
      blurb: "A workspace environment for exploring AI agent deployment patterns, workflow automation, and modular tooling using Claude Code. Built as a side project to learn agent engineering by doing — experimenting with MCP configurations, agent skills, and iterative development approaches.",
      case_study: false,
      sub: [
        { label: "What it is", type: "para", text: "A parent workspace containing experiments in agent orchestration, workflow automation, and AI-assisted development. Not a production system — an active learning environment where I explore how AI agents can be composed, evaluated, and improved through hands-on building." },
        { label: "Stack", type: "stack", items: ["Python","Claude Code","MCP","Docker","JavaScript"] }
      ],
      metrics: [],
      links: [
        { label: "GitHub →", href: "https://github.com/SuprithChandrashekar" }
      ]
    },
    {
      id: "03",
      slug: "hft",
      kicker: "Quantitative Research · Course Project",
      title: "HFT Strategy Generator",
      emTitle: "Strategy",
      tagline: "Maker–taker strategies under NBBO constraints.",
      blurb: "A study of two high-frequency strategies — cross-exchange market making on SPY and venue arbitrage between IEX and NASDAQ — with message-by-message backtesting on 30 January 2020 tick data.",
      case_study: true,
      problem: "Arbitrage in NBBO-regulated markets is structurally difficult: ideal returns deteriorate once routing, slippage, and latency are modelled realistically. The question was whether a disciplined backtest could separate genuine edge from artefacts of frictionless assumptions.",
      approach: "Two independent strategies. The maker strategy (XEMM) posts passive bid/ask liquidity on IEX and hedges fills with immediate market orders on NASDAQ. The taker strategy detects cross-venue price gaps and executes against them. A custom ITCH 5.0 parser ingested NASDAQ trade messages; the IEX DEEP feed provided BBO and depth. The scope was deliberately narrowed from an initial Future–Spot arbitrage plan to SPY venue arbitrage once data constraints became clear — an exercise in honest scope management.",
      innovations: [
        "Ideal-vs-actual return decomposition isolating NBBO routing and slippage effects",
        "Message-by-message backtest at microsecond resolution",
        "Parameter-sensitivity analysis across price-difference offsets and volume leverage"
      ],
      sub: [
        { label: "Findings", type: "para", text: "Ideal taker returns showed clear potential; actual returns were frequently negative or breakeven once NBBO routing and queue competition were modelled. The honest conclusion was an engineering one: latency, fee structure, and venue selection dominate strategy elegance in this class of problem." },
        { label: "Stack", type: "stack", items: ["Python","NASDAQ ITCH 5.0","IEX DEEP","pandas","NumPy"] }
      ],
      metrics: [
        { k: "Data", v: "Tick-level", sub: "ITCH + DEEP" },
        { k: "Course", v: "A+", sub: "IE 421, UIUC" }
      ],
      links: []
    },
    {
      id: "04",
      slug: "quality",
      kicker: "Manufacturing Quality",
      title: "Ultrasonic Welding Quality Analytics",
      emTitle: "Quality",
      blurb: "Statistical process control and supervised-learning classification on ultrasonic welding sensor streams for real-time defect detection.",
      sub: [
        { label: "Methods", type: "list", items: [
          "SPC charts and capability studies across continuous sensor streams",
          "Supervised classification pipelines for defect identification and failure-pattern recognition",
          "Design of Experiments and measurement-system analysis in Minitab"
        ]},
        { label: "Stack", type: "stack", items: ["Python","scikit-learn","Minitab","pandas","SPC"] }
      ],
      metrics: [],
      links: []
    },
    {
      id: "05",
      slug: "superalloy",
      kicker: "Materials Research",
      title: "Superalloy Microstructure Failure Analysis",
      emTitle: "Failure",
      blurb: "A graph-theoretic analysis of SEM microstructures to identify critical stress-transfer pathways in nickel-based superalloys.",
      sub: [
        { label: "Approach", type: "para", text: "Modelled microstructures as weighted graphs with grain-boundary edges. Applied min-cut and community-detection algorithms to surface reliability-critical load paths — an OR-native treatment of a traditionally metallurgical problem." },
        { label: "Stack", type: "stack", items: ["Python","NetworkX","SEM image analysis","Graph theory"] }
      ],
      metrics: [],
      links: []
    },
    {
      id: "06",
      slug: "helios",
      kicker: "Hardware Program · 4 years",
      title: "Team Helios Racing",
      emTitle: "Helios",
      blurb: "Lead Engineer and Quality Lead for a 60-member student team. National champion at Enduro Student India 2020; four iterative design cycles on a competition-grade ATV.",
      sub: [
        { label: "Scope", type: "list", items: [
          "Owned end-to-end hardware development for the braking subsystem across design, build, industrialisation, and validation phases",
          "Directed DFM/DFA discipline and DFMEA-aligned quality gates; enforced material inspection standards and managed prototype sourcing",
          "Coordinated across mechanical, electrical, and structural workstreams as the central point of contact for subsystem validation",
          "Presented design reviews to faculty advisors and competition judges; drove risk escalation and resolution"
        ]},
        { label: "Stack", type: "stack", items: ["SolidWorks","CATIA","NX Unigraphics","ANSYS Workbench","ANSYS Fluent","DFMEA","DFM/DFA","GD&T"] }
      ],
      metrics: [
        { k: "Team", v: "60", sub: "members" },
        { k: "Endurance", v: "4h+", sub: "validated" },
        { k: "Result", v: "National", sub: "champion · ESI 2020" }
      ],
      links: []
    }
  ],

  /* ---- Professional trajectory ---- */
  arc: [
    {
      period: "Aug 2022 – May 2024",
      title: "Deloitte — Business Analyst, Program Management",
      sub: "Bengaluru, India",
      body: "Designed phase-gate roadmaps, dependency tracking, and milestone governance for a 200-person cross-functional programme delivering ServiceNow ITSM and ITOM for a global German enterprise. Improved milestone delivery and reduced rework through structured governance. Facilitated stakeholder workshops and led a 5-person team on a documentation and quality-review initiative. Led pre-sales efforts including RFP responses and executive presentations. Designed a ServiceNow healthcare portal demo POC."
    },
    {
      period: "Jun 2024 – Dec 2024",
      title: "Deloitte — Consultant, Technical Program Delivery",
      sub: "Bengaluru, India · Promoted ahead of cycle",
      body: "Owned execution governance for multi-site deployment cycles across 30+ system interfaces in a SIAM environment. Standardised SOPs and led defect-resolution for a 10-person cross-functional team, improving release success rates, reducing resolution time, and strengthening SLA adherence. Mix of technical ServiceNow configuration work and process/coordination delivery."
    },
    {
      period: "Jan 2025 – Dec 2026",
      title: "University of Illinois Urbana–Champaign",
      sub: "M.S. Industrial Engineering · GPA 3.91",
      body: "Concentration in operations research, high-frequency trading technology, and manufacturing quality. A+ in OR Models for Manufacturing Systems and HFT Technology. Graduate Teaching Assistant supporting applied engineering project delivery. Thesis research at HXRI Lab on a mixed-reality simulator for medical procedural training (Meta Quest 3, Unity, MRTK2)."
    },
    {
      period: "2025 – present",
      title: "Independent Building — Product Design & AI",
      sub: "VoltBroker · Claude Node · Portfolio",
      body: "Designed and shipped VoltBroker (voltbroker.vercel.app) — a B2B transformer marketplace — end-to-end using Claude Code and Claude Design as primary tools. Building at the intersection of product design, AI-native workflows, and industrial systems thinking."
    },
    {
      period: "Aug 2020 – Oct 2020",
      title: "Larsen & Toubro Defense — Mechanical Engineering Intern",
      sub: "Bengaluru, India",
      body: "Reviewed equipment layouts, system schematics, and engineering specifications in a defence manufacturing environment."
    }
  ],

  /* ---- Verified credentials ---- */
  credentials: [
    { k: "GPA", v: "3.91", sub: "UIUC M.S. IE" },
    { k: "IE 412", v: "A+", sub: "OR Models for Mfg Systems" },
    { k: "IE 421", v: "A+", sub: "HFT Technology" },
    { k: "Promotion", v: "Early", sub: "Deloitte · BA → Consultant" },
    { k: "Publication", v: "IJCSNS", sub: "Vol. 24 No. 4 · April 2024" },
    { k: "National", v: "Champion", sub: "Enduro Student India 2020" }
  ],

  /* ---- Education detail ---- */
  education: [
    {
      school: "University of Illinois Urbana–Champaign",
      degree: "M.S., Industrial Engineering",
      window: "Jan 2025 – Dec 2026",
      gpa: "3.91 / 4.00",
      coursework: ["OR Models for Manufacturing Systems (A+)", "High-Frequency Trading Technology (A+)", "Data Visualization (A)", "Applied Statistics (A)", "Analysis of Network Data (A)", "Data Science in Manufacturing Quality Control (A–)", "Design for Six Sigma (A)", "Stats of Big Data & Clustering (A–)"]
    },
    {
      school: "R.V. College of Engineering",
      degree: "B.E., Mechanical Engineering",
      window: "Aug 2018 – Aug 2022",
      gpa: "8.05 / 10.00",
      coursework: ["Machine Design", "Finite Element Analysis", "Statics & Dynamics", "Product Design & Development", "Manufacturing Processes"]
    }
  ],

  /* ---- Publications ---- */
  publications: [
    {
      title: "Network Security Practices through Anonymity",
      venue: "International Journal of Computer Science & Network Security (IJCSNS)",
      ref: "Vol. 24, No. 4, pp. 155–162",
      date: "April 2024",
      coauthors: ["Prof. Smitha G R", "Ujwal Mirji"],
      summary: "A framework for mitigating targeted network attacks through disciplined anonymity protocols and operational hygiene. Initial literature review conducted 2020; formal publication 2024."
    }
  ],

  /* ---- Awards & certifications ---- */
  awards: [
    { label: "National Champion — Enduro Student India", detail: "Team Helios Racing · NMIET · Feb 2020" },
    { label: "Certified Ready Engineer", detail: "Tata Technologies — Advanced automobile design: body-in-white, plastics & trims, DFM" }
  ],
  certifications: [
    "ServiceNow Certified System Administrator (CSA)",
    "Kore.ai Certified Advanced Developer",
    "Kore.ai Experience Optimisation Platform Developer",
    "Liveperson — Messaging Foundation Conversational AI",
    "Coursera — Python Data Structures",
    "Coursera — Aerial Robotics",
    "NPTEL — Rapid Manufacturing",
    "Tata Technologies — iGET it",
    "Cisco — Industrial IoT",
    "CITI Program — Human Subjects Research (UICOMP)"
  ],

  /* ---- Skills ---- */
  skills: [
    { group: "Product Design",    items: ["End-to-end product ownership","Information architecture","Visual design systems","Responsive layout","Interaction design","Prototyping in code","Component libraries","Typography & colour","Accessibility (ARIA, semantic HTML)","AI-native design workflow (Claude Code, Claude Design)"] },
    { group: "Engineering",       items: ["Python","TypeScript","JavaScript","React","Next.js","Node.js","Docker","Git / CI","SQL","REST · SOAP","HTML/CSS"] },
    { group: "AI & Agents",       items: ["Claude Code","Claude Design","MCP configuration","Prompt engineering","Agent skills","Tool-calling patterns","GPT-4o"] },
    { group: "Operations Research", items: ["Linear programming","Integer programming","Network flow","Simulation","Capacity planning","Statistical modelling","SPC","Decision intelligence"] },
    { group: "Consulting Delivery", items: ["Phase-gate governance","Milestone tracking","Stakeholder workshops","ServiceNow ITSM / ITOM · CMDB","RFP/proposal development","SOP standardisation","Agile / Scrum / Kanban"] },
    { group: "Hardware & CAD",    items: ["SolidWorks","CATIA","NX Unigraphics","Fusion 360","ANSYS Workbench","ANSYS Fluent","DFM/DFA","GD&T"] }
  ],

  /* ---- Now feed ---- */
  now: [
    { ts: "This week",  tag: "build",  text: "Iterating on VoltBroker's broker onboarding flow and RFQ engine — refining interaction patterns and information density for procurement workflows." },
    { ts: "This month", tag: "teach",  text: "Serving as Graduate Teaching Assistant at UIUC — supporting applied engineering project delivery with documentation standards and design-review checkpoints." },
    { ts: "This month", tag: "research", text: "Thesis work at HXRI Lab: system testing for a mixed-reality medical training simulator (Meta Quest 3, Unity, MRTK2)." },
    { ts: "Ongoing",    tag: "read",   text: "Following developments in AI-native design tools, conversational interfaces, production MCP deployments, and design systems at scale." },
    { ts: "Seeking",    tag: "roles",  text: "Product Design, Applied AI, and decision-analytics roles for Spring 2027 — teams building AI-driven products where design thinking and engineering rigour intersect." }
  ],

  /* ---- How I work ---- */
  how_i_work: [
    { k: "Design in code", v: "I prototype directly in React and Next.js rather than handing off static mockups. VoltBroker was designed entirely this way — every interaction decision was tested in a real browser, not a design tool. This collapses the design–development feedback loop." },
    { k: "Systems thinking", v: "Four years of industrial engineering training and two and a half years of consulting delivery taught me to see products as systems — with dependencies, constraints, failure modes, and feedback loops. I design for the whole system, not just the happy path." },
    { k: "AI as a design partner", v: "I use Claude Code and Claude Design as active collaborators in the design process — for layout exploration, component architecture, copywriting, and rapid iteration. This is how I shipped a complete marketplace as a solo designer-developer." },
    { k: "Operational honesty", v: "Metrics are stated with context or not stated at all. Designs are tested against real constraints. I would rather ship something true than something impressive." }
  ],

  /* ---- Off-hours ---- */
  off_hours: [
    { k: "Formula 1", v: "Long-time fan of the strategy game behind the racing — tyre models, pit windows, safety-car arbitrage." },
    { k: "College Basketball", v: "Illini men's basketball — Champaign Saturdays." },
    { k: "NFL", v: "Follow the season closely; appreciate a well-drawn scheme." },
    { k: "Cricket · IPL", v: "Royal Challengers Bengaluru. Home-team loyalty, long-suffering optimism." },
    { k: "Football", v: "Real Madrid." },
    { k: "Competitive gaming", v: "Valorant and Counter-Strike — long-time player." }
  ]
};
