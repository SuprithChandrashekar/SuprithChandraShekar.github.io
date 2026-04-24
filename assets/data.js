/* Portfolio data — grounded in verified resume, project writeups, and target JDs.
   Voice: measured, precise, McKinsey-bio × Collison personal-site.
*/
window.PORTFOLIO_DATA = {
  identity: {
    name: "Suprith Chandra Shekar",
    role: "M.S. Industrial Engineering, UIUC",
    location: "Urbana–Champaign, IL",
    status: "Available Spring 2027",
    tz: "UTC−06",
    since: "2023",
    headshot: "assets/headshot.png",
    email: "Suprith2@illinois.edu",
    phone: "+1 (217) 200-1842",
    linkedin: "https://linkedin.com/in/suprith-c-shekar",
    github: "https://github.com/SuprithChandrashekar",
    resume: "assets/suprith-chandra-shekar-resume.docx"
  },

  /* ---- Hero positioning statement ---- */
  positioning: {
    headline_parts: ["Engineering", "agent systems", "to production", "standards."],
    lede: "I am an engineer working at the intersection of operations research, production AI, and consulting delivery. My graduate studies focus on optimization and manufacturing quality; my current research and building focus on multi-agent systems with Claude. I am seeking applied AI, agent-engineering, and decision-analytics roles commencing Spring 2027.",
    credentials_strip: [
      { k: "M.S. IE", v: "UIUC", sub: "GPA 3.94 · Dec 2026" },
      { k: "Former", v: "Deloitte", sub: "Consultant · Germany delivery" },
      { k: "Published", v: "IJCSNS", sub: "Network security, 2024" },
      { k: "Winner", v: "Anthropic Hackathon", sub: "Claude Node" }
    ]
  },

  /* ---- Projects — full engineering case studies for top 2, structured sections for the rest ---- */
  projects: [
    {
      id: "01",
      slug: "claude-node",
      kicker: "Flagship · Agent Systems",
      title: "Claude Node",
      emTitle: "Node",
      tagline: "An autonomous engineer's operating environment.",
      blurb: "A unified agentic metasystem that treats AI agents as modular compute units within a standardized runtime. Winner of the Anthropic Hackathon; engineered around persistence, context efficiency, and operational safety.",
      case_study: true,
      problem: "Modern AI tools are fragmented. Single-purpose wrappers and isolated chatbots fail to compose into durable engineering workflows. Production-grade agent work requires persistence across sessions, disciplined context management, cross-harness portability, and hard safety guarantees on autonomous file operations.",
      approach: "A three-layer architecture that separates the interface, the runtime, and a persistent supervisor daemon. A Rust TUI (ratatui) communicates with a background daemon over Unix sockets; the daemon owns PTY sessions, git operations, and a SQLite-backed state store. Above this sits an orchestration layer (Node.js, Express, Docker Compose) that implements a supervisor–worker pattern, and a core framework (Everything Claude Code) providing 142+ atomic skills and 36+ specialized agents across twelve language ecosystems.",
      innovations: [
        "Plan–Act–Validate lifecycle — every agent operation proceeds through research, strategy, surgical edits, and automated validation, with a re-evaluation loop on failure",
        "AgentShield — a custom guardrail layer that sanitizes paths, blocks secret reads, and requires manual approval for destructive shell commands",
        "Git Worktree parallelization — the \"Cascade Method\" for running multiple agents against isolated branches simultaneously",
        "Feedback-driven skill evolution — successful sessions are summarized into learned patterns and promoted into reusable skills for subsequent projects",
        "Human-in-the-loop control surfaces via WhatsApp, a web dashboard, and AR wearables (Meta Oakley integration)"
      ],
      sub: [
        { label: "Modules", type: "list", items: [
          "Everything Claude Code — the core framework: 36+ agents, 142+ skills, AgentShield security layer, continuous skill evolution",
          "Agent Overworld — orchestration and command centre with WhatsApp bridge and web dashboard for agent-fleet monitoring",
          "Career Ops — autonomous job-search pipeline evaluating 700+ listings, generating ATS-optimised CVs, managing applications end-to-end",
          "Claude Arena — benchmarking sandbox where agents compete on engineering challenges, driving iterative improvement",
          "VibeVoice — personal voice synthesis and fine-tuning for human–agent interaction",
          "Meta Oakley Tech — AR-wearable integration bridging digital and physical control"
        ]},
        { label: "Stack", type: "stack", items: ["Rust (ratatui)","TypeScript","Python","Go","Node.js","Docker Compose","SQLite","MCP","Anthropic API","WhatsApp API","Unix sockets"] }
      ],
      metrics: [
        { k: "Agents", v: "36+", sub: "specialised" },
        { k: "Skills", v: "142+", sub: "atomic, reusable" },
        { k: "Languages", v: "12+", sub: "ecosystems" },
        { k: "Award", v: "Winner", sub: "Anthropic Hackathon" }
      ],
      links: [
        { label: "GitHub →", href: "https://github.com/SuprithChandrashekar" },
        { label: "Architecture note", href: "#" }
      ]
    },
    {
      id: "02",
      slug: "hft",
      kicker: "Quantitative Research",
      title: "HFT Strategy Generator",
      emTitle: "Strategy",
      tagline: "Maker–taker strategies under NBBO constraints.",
      blurb: "A study of two high-frequency strategies — cross-exchange market making on SPY and venue arbitrage between IEX and NASDAQ — with message-by-message backtesting on 30 January 2020 tick data.",
      case_study: true,
      problem: "Arbitrage in NBBO-regulated markets is structurally difficult: ideal returns deteriorate once routing, slippage, and latency are modelled realistically. The question was whether a disciplined backtest could separate genuine edge from artefacts of frictionless assumptions, and whether parameter sensitivity could be characterised without overfitting.",
      approach: "Two independent strategies. The maker strategy (XEMM) posts passive bid/ask liquidity on IEX and hedges fills with immediate market orders on NASDAQ, continuously reshaping quotes in response to the NASDAQ BBO. The taker strategy detects cross-venue price gaps and executes market orders against them. A custom ITCH 5.0 parser ingested NASDAQ trade messages; the IEX DEEP feed provided BBO and depth. The scope was deliberately narrowed from an initial Future–Spot arbitrage plan on CME Bitcoin Futures / IBIT to SPY venue arbitrage once data constraints became clear — an exercise in honest scope management.",
      innovations: [
        "Ideal-vs-actual return decomposition isolating NBBO routing and slippage effects",
        "Message-by-message backtest at microsecond resolution",
        "Parameter-sensitivity analysis: price-difference offsets traded off max drawdown against total profit, and volume acted cleanly as leverage"
      ],
      sub: [
        { label: "Universe & window", type: "para", text: "SPY on 30 January 2020 — a day of typical large-cap volatility. Single-day scope chosen to allow microsecond-level analysis while being honest about the limits of generalisation." },
        { label: "Stack", type: "stack", items: ["Python","C++ (ITCH parser)","NASDAQ ITCH 5.0","IEX DEEP","pandas","NumPy","backtrader"] },
        { label: "Findings", type: "para", text: "Ideal taker returns showed clear potential; actual returns were frequently negative or breakeven once NBBO routing and queue competition were modelled. The maker strategy exposed a clean drawdown–profit trade-off across price-difference parameters. The honest conclusion was an engineering one: latency, fee structure, and venue selection dominate strategy elegance in this class of problem." }
      ],
      metrics: [
        { k: "Data", v: "Tick-level", sub: "ITCH + DEEP" },
        { k: "Course", v: "A+", sub: "IE 421, UIUC" }
      ],
      links: [
        { label: "Writeup", href: "#" }
      ]
    },
    {
      id: "03",
      slug: "ruflow",
      kicker: "Workflow Automation",
      title: "RuFlow",
      emTitle: "Flow",
      blurb: "An orchestration layer for multi-step operational processes, providing deterministic routing, schema validation, and exponential-backoff retry logic.",
      sub: [
        { label: "Motivation", type: "para", text: "Production agent systems depend on resilient infrastructure rather than ad-hoc prompting. RuFlow provides the reliability primitives — observability, determinism, recovery — that make agent-driven workflows auditable and safe to run unattended." },
        { label: "Stack", type: "stack", items: ["Python","asyncio","Pydantic","OpenTelemetry"] }
      ],
      metrics: [
        { k: "Retry policy", v: "3×", sub: "exp. backoff" },
        { k: "Schema cov.", v: "100%", sub: "strict" }
      ],
      links: [ { label: "GitHub →", href: "https://github.com/SuprithChandrashekar" } ]
    },
    {
      id: "04",
      slug: "openclaw",
      kicker: "Open Source",
      title: "OpenClaw",
      emTitle: "Open",
      blurb: "A lightweight, LLM-agnostic framework for composing tool-calling agents with built-in guardrails. Designed for minimal surface area and composition over inheritance.",
      sub: [
        { label: "Design", type: "para", text: "Extensible across providers and capability sets. Typed tool contracts, provider-agnostic transport, guardrails at the dispatch layer. Built to be read and modified, not to be a dependency." },
        { label: "Stack", type: "stack", items: ["Python","Typed tools","LLM-agnostic","Guardrails"] }
      ],
      metrics: [
        { k: "LoC", v: "~2k", sub: "core" },
        { k: "Providers", v: "3", sub: "supported" }
      ],
      links: [ { label: "GitHub →", href: "https://github.com/SuprithChandrashekar" } ]
    },
    {
      id: "05",
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
        { label: "Stack", type: "stack", items: ["Python","scikit-learn","Minitab","pandas","DMAIC","DFSS (in progress)"] }
      ],
      metrics: [],
      links: []
    },
    {
      id: "06",
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
      id: "07",
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
          "Presented design reviews to faculty advisors and competition judges; drove risk escalation and resolution",
          "Currently mentoring the team's transition from internal-combustion to electric ATV platforms"
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
      body: "Designed phase-gate roadmaps, dependency tracking, and milestone governance for a 200-person cross-functional programme delivering ServiceNow ITSM and ITOM for a global German enterprise. Improved on-time milestone delivery by 30% and reduced project rework by 40%. Facilitated 60+ stakeholder workshops for 1,200+ end users and led a 5-person team on a critical documentation and quality-review initiative."
    },
    {
      period: "Jun 2024 – Dec 2024",
      title: "Deloitte — Consultant, Technical Program Delivery",
      sub: "Bengaluru, India · Promoted ahead of cycle",
      body: "Owned execution governance for multi-site deployment cycles across 30+ system interfaces in a SIAM environment. Standardised SOPs and led defect-resolution for a 10-person cross-functional team, cutting Mean Time-to-Resolution by 40%, improving SLA adherence to 95%, and raising release success rate by 25%."
    },
    {
      period: "Aug 2023 – Dec 2026",
      title: "University of Illinois Urbana–Champaign",
      sub: "M.S. Industrial Engineering · GPA 3.94",
      body: "Concentration in operations research, high-frequency trading technology, and manufacturing quality. A+ grades in OR Models for Manufacturing Systems (IE 410) and High-Frequency Trading Technology (IE 421); Design for Six Sigma currently in progress. Graduate Teaching Assistant supporting student project delivery with documentation standards and design-review checkpoints."
    },
    {
      period: "2024 – present",
      title: "Independent Building — Agent Systems",
      sub: "Claude Node · HFT Strategy Generator · RuFlow · OpenClaw",
      body: "Sustained practice at the intersection of consulting delivery, industrial-engineering rigour, and LLM engineering. Claude Node was awarded an Anthropic Hackathon win. The research agenda centres on production reliability for multi-agent systems: persistence, guardrails, evaluation, and honest observability."
    },
    {
      period: "Aug 2020 – Oct 2020",
      title: "Larsen & Toubro Defense — Manufacturing Engineering Intern",
      sub: "Bengaluru, India",
      body: "Reviewed electromechanical equipment layouts, assembly schematics, and material-flow routes to identify design inefficiencies and support hardware-feasibility planning in a defence manufacturing environment."
    }
  ],

  /* ---- Verified credentials ---- */
  credentials: [
    { k: "GPA", v: "3.94", sub: "UIUC M.S. IE" },
    { k: "IE 410", v: "A+", sub: "OR Models for Mfg Systems" },
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
      window: "Aug 2023 – Dec 2026",
      gpa: "3.94 / 4.00",
      coursework: ["OR Models for Manufacturing Systems (A+)", "High-Frequency Trading Technology (A+)", "Data Science in Manufacturing Quality Control", "Design for Six Sigma (in progress)", "Manufacturing Systems Automation"]
    },
    {
      school: "R.V. College of Engineering",
      degree: "B.E., Mechanical Engineering",
      window: "2018 – Aug 2022",
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
      summary: "A framework for mitigating targeted network attacks — including zero-day exploits and malware classes — through disciplined anonymity protocols and operational hygiene. Initial literature review conducted 2020; formal publication 2024."
    }
  ],

  /* ---- Awards & certifications ---- */
  awards: [
    { label: "Anthropic Hackathon — Winner", detail: "Claude Node metasystem" },
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
    "Cisco — Industrial IoT"
  ],

  /* ---- Skills, tuned to target JDs ---- */
  skills: [
    { group: "LLM & Agents",      items: ["MCP servers","Sub-agents","Agent skills","Tool-calling","Guardrails","Evaluation frameworks","Advanced prompt engineering","Production LLM deployment","Claude Code","GPT-4o","Nemotron 70B"] },
    { group: "Engineering",       items: ["Python","TypeScript","Node.js","Go","Rust","Docker Compose","Git / CI","SQL","asyncio","Unix sockets","REST · SOAP"] },
    { group: "Operations Research", items: ["Linear programming","Integer programming","Network flow","Heuristics & metaheuristics","Simulation","Decision intelligence","Prescriptive analytics","Capacity planning"] },
    { group: "Process & Quality", items: ["DMAIC","DFSS","Six Sigma","Lean · 5S · Kaizen","SPC","FMEA · DFMEA","DFM / DFA","Five Whys · Ishikawa · 8D · SWOT","Root-cause analysis","GD&T"] },
    { group: "Consulting Delivery", items: ["Phase-gate governance","Milestone tracking","Risk escalation","Stakeholder workshops","ServiceNow ITSM / ITOM · CMDB","Client-ready deliverables","SOP standardisation"] },
    { group: "Hardware & CAD",    items: ["SolidWorks","CATIA","NX Unigraphics","Fusion 360","ANSYS Workbench","ANSYS Fluent","Material selection","Reliability testing"] }
  ],

  /* ---- Now feed ---- */
  now: [
    { ts: "This week",  tag: "research", text: "Developing a new evaluation harness for Claude Arena, focused on ground-truth tagging of agent outputs and structured regression detection." },
    { ts: "This month", tag: "teach",    text: "Serving as Graduate Teaching Assistant at UIUC — enforcing documentation standards, design-review checkpoints, and quality controls across student team deliverables." },
    { ts: "Apr 2026",   tag: "ship",     text: "Shipped Career Ops v2: verification scripts now surface validation failures explicitly, preventing résumé drift from reaching production applications." },
    { ts: "Ongoing",    tag: "read",     text: "Following developments in Claude Skills, production MCP server deployments, decision-intelligence for multi-site networks, and self-healing distributed systems." },
    { ts: "Seeking",    tag: "roles",    text: "Applied AI, agent engineering, and decision-analytics roles for Spring 2027 — Anthropic (Forward Deployed Engineering), Tesla (Process Engineering, Energy), ZS Associates (Decision Analytics, Logistics Optimisation), and other AI-forward teams." }
  ],

  /* ---- How I work — methods and values ---- */
  how_i_work: [
    { k: "Plan–Act–Validate", v: "Every substantive change — code, document, or diagram — moves through an explicit research pass, a written strategy, a surgical implementation, and automated validation. The loop is tighter than it looks on paper; the discipline is in refusing to skip stages." },
    { k: "Operational honesty", v: "Agent systems must fail loudly. I design for observability and recovery first and optimise for elegance second. Metrics are stated with context — window, universe, constraints — or not stated at all." },
    { k: "Composition over cleverness", v: "Small, typed, testable units. Modular decoupling so that an agent, a skill, or a subsystem can be replaced without rewriting its neighbours." },
    { k: "Consulting rigour", v: "Two and a half years at Deloitte taught me that execution governance — phase gates, milestone tracking, disciplined escalation — is the difference between a demo and a delivery. I bring that discipline to AI work." }
  ],

  /* ---- Off-hours ---- */
  off_hours: [
    { k: "Formula 1", v: "Long-time fan of the strategy game behind the racing — tyre models, pit windows, safety-car arbitrage." },
    { k: "College Basketball", v: "Illini men's basketball — Champaign Saturdays." },
    { k: "NFL", v: "Follow the season closely; appreciate a well-drawn scheme." },
    { k: "Cricket · IPL", v: "Royal Challengers Bengaluru. Home-team loyalty, long-suffering optimism." },
    { k: "Football", v: "Real Madrid." },
    { k: "Competitive gaming", v: "Valorant and Counter-Strike — long-time player; interested in the aiming / decision-making research literature around FPS." }
  ]
};
