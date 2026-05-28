/* Portfolio data — content. Same source as upstream, lightly re-shaped for the new layout. */
window.PORTFOLIO_DATA = {
  identity: {
    name: "Suprith Chandra Shekar",
    short: "Suprith",
    role: "M.S. Industrial Engineering, UIUC",
    location: "Urbana–Champaign, IL",
    locShort: "Champaign, IL",
    status: "Available Spring 2027",
    tz: "UTC−06",
    since: "2025",
    email: "suprithchandrashekar@gmail.com",
    linkedin: "https://linkedin.com/in/suprith-c-shekar",
    github: "https://github.com/SuprithChandrashekar",
    resume: "assets/suprith-chandra-shekar-resume.docx",
    voltbroker: "https://voltbroker.vercel.app"
  },

  hero: {
    edition: "2026 EDITION · VOL. II",
    line1: "Designing",
    line2: "systems",
    line2em: true,
    line3: "people",
    line4: "trust.",
    sub: "Engineer, designer, and consultant working at the intersection of industrial systems thinking, AI-native product design, and delivery rigour. I shipped <span class=\"hl\">VoltBroker</span> — a full B2B marketplace — end-to-end using AI tools. Graduate work at <span class=\"hl\">UIUC</span> in operations, quality, and decision intelligence. Two-and-a-half years at <span class=\"hl\">Deloitte</span> before that.",
    stats: [
      { k: "Position",   v: "Designer · Engineer", sub: "PRODUCT · APPLIED AI" },
      { k: "Studying",   v: "M.S. IE — UIUC",      sub: "GPA 3.91 · DEC 2026" },
      { k: "Shipped",    v: "VoltBroker",           sub: "B2B MARKETPLACE · 2025" },
      { k: "Available",  v: "Spring 2027",          sub: "FULL-TIME · OPEN TO RELOCATION" }
    ]
  },

  telemetry: [
    { k: "GPA", v: "3.91", u: "/4.0", sub: "UIUC · M.S. IE" },
    { k: "Projects shipped", v: "06", sub: "Selected work" },
    { k: "Consulting", v: "2.5", u: "YRS", sub: "Deloitte · BLR" },
    { k: "Published", v: "IJCSNS", sub: "Vol.24 · 2024" },
    { k: "Available", v: "Q1", u: "2027", sub: "Spring · USA" }
  ],

  /* ---- Projects ---- */
  projects: [
    {
      id: "01",
      slug: "voltbroker",
      kicker: "Flagship · Product Design",
      title: "Volt",
      titleRest: "Broker",
      tagline: "A B2B transformer marketplace — designed and built end-to-end.",
      blurb: "A full-stack marketplace for utility-grade transformers. Procurement teams at data centres, EPCs, and utilities find verified brokers, submit RFQs, and coordinate logistics. Information architecture, visual system, every page from landing to checkout — designed and shipped solo.",
      meta: [
        { k: "Role",     v: "Solo design + build" },
        { k: "Stack",    v: "Next.js · TS" },
        { k: "Status",   v: "Pre-launch" }
      ],
      illus: "vbpreview",
      caseStudy: true,
      problem: "The industrial transformer market — a multi-billion dollar space — still runs on phone calls, PDF datasheets, and personal broker relationships. Procurement teams waste weeks sourcing a single unit. There is no centralised, searchable marketplace with standardised specs, verified suppliers, and integrated logistics.",
      approach: "Designed the product end-to-end using Claude Code, Claude Design, and Claude Projects as the primary design and development tools. Started with user research into procurement workflows at utilities and EPCs. Built the information architecture around how buyers actually search — by kVA, voltage class, application, or urgency. Designed a visual system inspired by industrial equipment catalogues: high-contrast, data-dense, and typographically precise. Every interaction was prototyped in code rather than static mockups.",
      innovations: [
        "AI-native design workflow — Claude as a design partner for layout, component architecture, and copy, iterating in code rather than Figma-to-handoff.",
        "Industrial visual language — a design system built around precision typography, commodity tickers, technical spec cards, and dense data presentation.",
        "RFQ-first interaction model — the product centres on the buyer's specification flow, not a traditional e-commerce browse pattern.",
        "Responsive information density — desktop layouts show data-rich category grids and specification tables; mobile collapses gracefully without losing critical decision data."
      ],
      scope: [
        "Product strategy and information architecture",
        "Complete visual design system — typography, colour, spacing, component library",
        "8 category pages, marketplace landing, broker onboarding flow, RFQ engine",
        "Responsive design across desktop, tablet, and mobile breakpoints",
        "Micro-interactions: commodity ticker, category filtering, spec search, quick-quote modal",
        "SEO, OG metadata, and accessibility — skip-links, ARIA, semantic HTML"
      ],
      stack: ["Next.js","React","TypeScript","Vercel","Claude Code","Claude Design","SVG illustration"],
      metrics: [
        { k: "Pages",      v: "15+", sub: "designed & built" },
        { k: "Categories", v: "8",   sub: "transformer types" },
        { k: "Status",     v: "Live", sub: "voltbroker.vercel.app" }
      ],
      links: [
        { label: "Live site", href: "https://voltbroker.vercel.app", primary: true },
        { label: "GitHub",    href: "https://github.com/SuprithChandrashekar" }
      ]
    },
    {
      id: "02",
      slug: "claude-node",
      kicker: "AI Tools & Workflow",
      title: "Claude",
      titleRest: "Node",
      tagline: "A personal workspace for AI-agent experimentation.",
      blurb: "An active learning environment exploring AI-agent deployment patterns, workflow automation, and modular tooling using Claude Code. Not a product — a place where I learn agent engineering by doing.",
      meta: [
        { k: "Role",   v: "Personal R&D" },
        { k: "Focus",  v: "MCP · Agents" },
        { k: "Status", v: "Ongoing" }
      ],
      illus: "nodes",
      caseStudy: false,
      stack: ["Python","Claude Code","MCP","Docker","JavaScript"],
      sections: [
        {
          label: "What it is",
          body: "A parent workspace containing experiments in agent orchestration, workflow automation, and AI-assisted development. Not a production system — an active learning environment where I explore how AI agents can be composed, evaluated, and improved through hands-on building."
        }
      ],
      links: [
        { label: "GitHub", href: "https://github.com/SuprithChandrashekar" }
      ]
    },
    {
      id: "03",
      slug: "hft",
      kicker: "Quantitative Research",
      title: "HFT Strategy",
      titleRest: " Generator",
      tagline: "Maker–taker strategies under NBBO constraints.",
      blurb: "A study of two high-frequency strategies — cross-exchange market-making on SPY and venue arbitrage between IEX and NASDAQ — with message-by-message backtesting on tick data from January 2020.",
      meta: [
        { k: "Course", v: "IE 421 · UIUC" },
        { k: "Grade",  v: "A+" },
        { k: "Data",   v: "ITCH · DEEP" }
      ],
      illus: "orderbook",
      caseStudy: true,
      problem: "Arbitrage in NBBO-regulated markets is structurally difficult: ideal returns deteriorate once routing, slippage, and latency are modelled realistically. The question was whether a disciplined backtest could separate genuine edge from artefacts of frictionless assumptions.",
      approach: "Two independent strategies. The maker strategy (XEMM) posts passive bid/ask liquidity on IEX and hedges fills with immediate market orders on NASDAQ. The taker strategy detects cross-venue price gaps and executes against them. A custom ITCH 5.0 parser ingested NASDAQ trade messages; the IEX DEEP feed provided BBO and depth. The scope was deliberately narrowed from an initial Future–Spot arbitrage plan to SPY venue arbitrage once data constraints became clear — an exercise in honest scope management.",
      innovations: [
        "Ideal-vs-actual return decomposition isolating NBBO routing and slippage effects.",
        "Message-by-message backtest at microsecond resolution.",
        "Parameter-sensitivity analysis across price-difference offsets and volume leverage."
      ],
      findings: "Ideal taker returns showed clear potential; actual returns were frequently negative or breakeven once NBBO routing and queue competition were modelled. The honest conclusion was an engineering one — latency, fee structure, and venue selection dominate strategy elegance in this class of problem.",
      stack: ["Python","NASDAQ ITCH 5.0","IEX DEEP","pandas","NumPy"],
      links: []
    },
    {
      id: "04",
      slug: "quality",
      kicker: "Manufacturing Quality",
      title: "Ultrasonic Welding",
      titleRest: " Analytics",
      tagline: "Real-time defect detection on welding sensor streams.",
      blurb: "Statistical process control and supervised-learning classification on ultrasonic welding sensor streams — surfacing defect signatures in continuous production data.",
      meta: [
        { k: "Domain",  v: "Manufacturing" },
        { k: "Methods", v: "SPC · ML" },
        { k: "Tools",   v: "Python · Minitab" }
      ],
      illus: "spc",
      caseStudy: false,
      sections: [
        {
          label: "Methods",
          list: [
            "SPC charts and capability studies across continuous sensor streams",
            "Supervised classification pipelines for defect identification and failure-pattern recognition",
            "Design of Experiments and measurement-system analysis in Minitab"
          ]
        }
      ],
      stack: ["Python","scikit-learn","Minitab","pandas","SPC"],
      links: []
    },
    {
      id: "05",
      slug: "superalloy",
      kicker: "Materials Research",
      title: "Superalloy",
      titleRest: " Microstructure",
      tagline: "Stress-transfer pathways in nickel-based superalloys.",
      blurb: "A graph-theoretic analysis of SEM microstructures — modelling grain boundaries as a weighted network and surfacing the reliability-critical load paths.",
      meta: [
        { k: "Approach", v: "Graph theory" },
        { k: "Subject",  v: "Ni superalloy" },
        { k: "Output",   v: "Failure paths" }
      ],
      illus: "grain",
      caseStudy: false,
      sections: [
        {
          label: "Approach",
          body: "Modelled microstructures as weighted graphs with grain-boundary edges. Applied min-cut and community-detection algorithms to surface reliability-critical load paths — an OR-native treatment of a traditionally metallurgical problem."
        }
      ],
      stack: ["Python","NetworkX","SEM image analysis","Graph theory"],
      links: []
    },
    {
      id: "06",
      slug: "helios",
      kicker: "Hardware Program · 4 yrs",
      title: "Team Helios",
      titleRest: " Racing",
      tagline: "Lead Engineer · National champion 2020.",
      blurb: "Lead Engineer and Quality Lead for a 60-member student team. National champion at Enduro Student India 2020 — four iterative design cycles on a competition-grade ATV. Where the discipline started.",
      meta: [
        { k: "Role",   v: "Lead · Quality" },
        { k: "Team",   v: "60 members" },
        { k: "Result", v: "National Champion" }
      ],
      illus: "atv",
      caseStudy: false,
      sections: [
        {
          label: "Scope",
          list: [
            "Owned end-to-end hardware development for the braking subsystem across design, build, industrialisation, and validation phases",
            "Directed DFM/DFA discipline and DFMEA-aligned quality gates; enforced material inspection standards and managed prototype sourcing",
            "Coordinated across mechanical, electrical, and structural workstreams as the central point of contact for subsystem validation",
            "Presented design reviews to faculty advisors and competition judges; drove risk escalation and resolution"
          ]
        }
      ],
      stack: ["SolidWorks","CATIA","NX Unigraphics","ANSYS Workbench","ANSYS Fluent","DFMEA","DFM/DFA","GD&T"],
      metrics: [
        { k: "Team",      v: "60",   sub: "members" },
        { k: "Endurance", v: "4h+",  sub: "validated" },
        { k: "Result",    v: "Nat'l",sub: "champion · ESI 2020" }
      ],
      links: []
    }
  ],

  /* ---- Professional trajectory ---- */
  arc: [
    {
      period: "Jan 2025 — present",
      title: "University of Illinois Urbana–Champaign",
      sub: "M.S. Industrial Engineering · GPA 3.91",
      body: "Operations research, high-frequency trading technology, manufacturing quality. A+ in OR Models for Manufacturing Systems and HFT Technology. Graduate Teaching Assistant. Thesis at HXRI Lab — a mixed-reality simulator for medical procedural training on Meta Quest 3."
    },
    {
      period: "2025 — present",
      title: "Independent — Product Design & AI",
      sub: "VoltBroker · Claude Node · Portfolio",
      body: "Designed and shipped VoltBroker end-to-end using Claude Code and Claude Design as primary tools. Building at the intersection of product design, AI-native workflows, and industrial systems thinking."
    },
    {
      period: "Jun 2024 — Dec 2024",
      title: "Deloitte — Consultant, Technical Program Delivery",
      sub: "Bengaluru · promoted ahead of cycle",
      body: "Owned execution governance for multi-site deployment cycles across 30+ system interfaces in a SIAM environment. Standardised SOPs and led defect-resolution for a 10-person cross-functional team — improved release success rates, reduced resolution time, strengthened SLA adherence."
    },
    {
      period: "Aug 2022 — May 2024",
      title: "Deloitte — Business Analyst, Program Management",
      sub: "Bengaluru · ServiceNow ITSM/ITOM",
      body: "Designed phase-gate roadmaps and milestone governance for a 200-person cross-functional programme delivering ServiceNow ITSM/ITOM for a global German enterprise. Facilitated stakeholder workshops and led a 5-person documentation initiative. Led pre-sales — RFP responses and executive presentations."
    },
    {
      period: "Aug 2018 — Aug 2022",
      title: "R.V. College of Engineering",
      sub: "B.E. Mechanical · Team Helios Racing",
      body: "Bachelor's in mechanical engineering. Four years as Lead Engineer and Quality Lead for Team Helios — national champions at Enduro Student India 2020. Where I learnt to ship hardware on a deadline with a team."
    }
  ],

  /* ---- How I work ---- */
  how_i_work: [
    { k: "Design in code", v: "I prototype directly in React and Next.js rather than handing off static mockups. VoltBroker was designed entirely this way — every interaction decision was tested in a real browser, not a design tool. The design-to-development loop collapses." },
    { k: "Systems thinking", v: "Four years of industrial engineering and two-and-a-half years of consulting taught me to see products as systems — dependencies, constraints, failure modes, feedback loops. I design for the whole system, not just the happy path." },
    { k: "AI as a partner", v: "I use Claude Code and Claude Design as active collaborators — for layout exploration, component architecture, copywriting, and rapid iteration. This is how I shipped a complete marketplace as a solo designer-developer." },
    { k: "Operational honesty", v: "Metrics are stated with context or not at all. Designs are tested against real constraints. I'd rather ship something true than something impressive." }
  ],

  /* ---- Credentials ---- */
  credentials: [
    { k: "GPA",         v: "3.91",      sub: "UIUC M.S. IE" },
    { k: "IE 412",      v: "A+",        sub: "OR Models" },
    { k: "IE 421",      v: "A+",        sub: "HFT Tech" },
    { k: "Promotion",   v: "Early",     sub: "Deloitte BA→Consultant" },
    { k: "Publication", v: "IJCSNS",    sub: "Vol. 24 · 2024" },
    { k: "Champion",    v: "National",  sub: "Enduro Student India" }
  ]
};
