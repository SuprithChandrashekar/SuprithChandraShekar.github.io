/* Every word on the site lives in this file. Edit here, nothing else needs to change.
   The 3D cards, the INFO sheet and the finale letters are all drawn from it. */

export const SITE = {
  identity: {
    name: "Suprith Chandra Shekar",
    code: "SCS",
    role: "Industrial engineer",
    status: "M.S. Industrial Engineering at UIUC, graduating May 2027. Open to full-time roles from June 2027.",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/suprith-c-shekar" },
      { label: "GitHub", href: "https://github.com/SuprithChandrashekar" },
      { label: "VoltBroker", href: "https://voltbroker.vercel.app" }
    ]
  },

  hero: {
    titleLines: ["IT", "STARTED", "WITH", "BRAKES."],
    tagline: "I take the part that isn't allowed to fail.",
    byline: "Suprith Chandra Shekar. Industrial engineer. Deloitte, then Tesla.",
    cue: "Scroll to run"
  },

  /* The short version, shown at the top of INFO. */
  about: [
    "Every job I've had was the same job in a different building.",
    "On a 60-member race team I owned the brakes and the quality gate. At Deloitte I wrote the phase gates for a 200-person ServiceNow programme, then owned release governance across 30+ system interfaces. At UIUC I study quality and operations research, and my thesis is a mixed-reality simulator where clinicians can get a procedure wrong safely. At Tesla I work on Megapack quality.",
    "I go where failure is expensive and build the system that catches it."
  ],

  /* Six sectors along the runway. `at` is the scroll position each nav button jumps to. */
  sectors: [
    { id: "start",   label: "Start",   at: 0.0,   from: 0.0,   caption: "" },
    { id: "builds",  label: "Builds",  at: 0.112, from: 0.09,  caption: "On a race team I owned the brakes. The habit stuck. Six builds, brakes first." },
    { id: "numbers", label: "Numbers", at: 0.372, from: 0.36,  caption: "Six numbers. Each one comes with its context." },
    { id: "method",  label: "Method",  at: 0.598, from: 0.585, caption: "Four dials, set where I work." },
    { id: "route",   label: "Route",   at: 0.778, from: 0.765, caption: "Race bay to Megafactory, with the thread that carried over at each stop." },
    { id: "finish",  label: "Finish",  at: 1.0,   from: 0.945, caption: "" }
  ],

  builds: [
    {
      slug: "helios",
      kicker: "Hardware programme, 4 years",
      title: "Team Helios Racing",
      tagline: "Lead engineer and quality lead. National champions, 2020.",
      blurb: "I owned the braking subsystem for a 60-member student team, from design through validation, and ran the DFMEA quality gates. Four design cycles on a competition ATV. We won Enduro Student India in 2020.",
      meta: [["Role", "Lead, quality"], ["Team", "60 members"], ["Result", "National champion"]],
      stack: ["SolidWorks", "CATIA", "NX", "ANSYS", "DFMEA", "DFM/DFA", "GD&T"],
      links: [{ label: "Case study", href: "projects/helios.html" }]
    },
    {
      slug: "superalloy",
      kicker: "Materials research",
      title: "Superalloy Microstructure",
      tagline: "Stress-transfer pathways in nickel superalloys.",
      blurb: "I modelled SEM microstructures as weighted graphs with grain boundaries as edges, then ran min-cut and community detection to find the load paths most likely to fail.",
      meta: [["Approach", "Graph theory"], ["Subject", "Ni superalloy"], ["Output", "Failure paths"]],
      stack: ["Python", "NetworkX", "SEM image analysis", "Graph theory"],
      links: [{ label: "Case study", href: "projects/superalloy.html" }]
    },
    {
      slug: "quality",
      kicker: "Manufacturing quality",
      title: "Ultrasonic Welding Analytics",
      tagline: "Defect detection on welding sensor streams.",
      blurb: "SPC charts and capability studies on continuous sensor data, with supervised classifiers that flag defect signatures. DOE and measurement-system analysis in Minitab.",
      meta: [["Domain", "Manufacturing"], ["Methods", "SPC, ML"], ["Tools", "Python, Minitab"]],
      stack: ["Python", "scikit-learn", "Minitab", "pandas", "SPC"],
      links: [{ label: "Case study", href: "projects/quality.html" }]
    },
    {
      slug: "hft",
      kicker: "Quantitative research",
      title: "HFT Strategy Generator",
      tagline: "Maker and taker strategies under NBBO constraints.",
      blurb: "Two strategies on SPY, backtested message by message on January 2020 tick data from IEX and NASDAQ. Ideal returns looked good. With routing and queue competition modelled, actual returns were negative or breakeven, and that is what I reported.",
      meta: [["Course", "IE 421, UIUC"], ["Grade", "A+"], ["Data", "ITCH, DEEP"]],
      stack: ["Python", "NASDAQ ITCH 5.0", "IEX DEEP", "pandas", "NumPy"],
      links: [{ label: "Case study", href: "projects/hft.html" }]
    },
    {
      slug: "claude-node",
      kicker: "AI tools and workflow",
      title: "Claude Node",
      tagline: "A workspace for agent experiments.",
      blurb: "Where I learn agent engineering by building: orchestration, workflow automation and MCP tooling with Claude Code. It is a lab. No product is attached.",
      meta: [["Role", "Personal R&D"], ["Focus", "MCP, agents"], ["Status", "Ongoing"]],
      stack: ["Python", "Claude Code", "MCP", "Docker", "JavaScript"],
      links: [{ label: "Case study", href: "projects/claude-node.html" }]
    },
    {
      slug: "voltbroker",
      kicker: "Flagship, product design",
      title: "VoltBroker",
      tagline: "A B2B transformer marketplace, designed and built solo.",
      blurb: "Utility-grade transformers are still bought over phone calls and PDF datasheets. VoltBroker gives procurement teams verified brokers, an RFQ flow and logistics in one place. 15+ pages across 8 transformer categories.",
      meta: [["Role", "Solo design + build"], ["Stack", "Next.js, TS"], ["Status", "Live preview"]],
      stack: ["Next.js", "React", "TypeScript", "Vercel", "Claude Code", "Claude Design"],
      links: [
        { label: "Case study", href: "projects/voltbroker.html" },
        { label: "Live site", href: "https://voltbroker.vercel.app" }
      ]
    }
  ],

  numbers: [
    { value: "3.91", unit: "/4.0", source: "UIUC",        label: "GPA, M.S. Industrial Engineering" },
    { value: "200",  unit: "",     source: "Deloitte",    label: "people on the ServiceNow programme I wrote phase gates for" },
    { value: "30+",  unit: "",     source: "Deloitte",    label: "system interfaces under my release governance" },
    { value: "2.5",  unit: "yrs",  source: "Deloitte",    label: "in consulting, promoted ahead of cycle" },
    { value: "60",   unit: "",     source: "Team Helios", label: "member race team. National champions in 2020" },
    { value: "A+",   unit: "",     source: "UIUC",        label: "in OR Models and in HFT Technology" }
  ],

  /* Each dial runs between two poles. `set` is where the pointer stops, 0 to 1. */
  method: [
    {
      title: "Design in code",
      poles: ["Mockups", "Browser"],
      set: 0.93,
      body: "I prototype in React and Next.js and test every interaction in a real browser. VoltBroker never had a static mockup."
    },
    {
      title: "Systems thinking",
      poles: ["Happy path", "Failure modes"],
      set: 0.86,
      body: "A product is a system with dependencies, constraints and failure modes. I design for the failure modes first."
    },
    {
      title: "AI as a partner",
      poles: ["Solo", "With Claude"],
      set: 0.8,
      body: "Claude Code and Claude Design work with me on layout, component architecture and copy. That is how one person shipped a marketplace."
    },
    {
      title: "Operational honesty",
      poles: ["Impressive", "True"],
      set: 0.97,
      body: "A metric gets its context or it stays out. My losing backtest is on this site for that reason."
    }
  ],

  /* Oldest first, because the story starts with brakes. */
  route: [
    {
      period: "2018 to 2022",
      org: "R.V. College of Engineering",
      role: "B.E. Mechanical. Team Helios Racing, lead engineer and quality lead",
      body: "Owned the braking subsystem on a 60-member race team. National champions at Enduro Student India 2020.",
      thread: "Nothing leaves the bay without an inspection gate."
    },
    {
      period: "2022 to 2024",
      org: "Deloitte",
      role: "Business Analyst, programme management. Bengaluru",
      body: "Phase-gate roadmaps and milestone governance for a 200-person ServiceNow ITSM/ITOM programme at a German enterprise. Pre-sales, RFP responses and executive presentations.",
      thread: "A 200-person plan is a sequence of gates with owners."
    },
    {
      period: "2024",
      org: "Deloitte",
      role: "Consultant, technical programme delivery. Promoted ahead of cycle",
      body: "Execution governance for multi-site deployments across 30+ system interfaces. Wrote the SOPs and led defect resolution for a 10-person team.",
      thread: "Every release is a quality event."
    },
    {
      period: "2025 to 2027",
      org: "University of Illinois",
      role: "M.S. Industrial Engineering, Urbana-Champaign. Teaching assistant",
      body: "Operations research, manufacturing quality and HFT technology. Thesis at the HXRI Lab: a mixed-reality simulator for medical procedure training on Meta Quest 3.",
      thread: "The statistics under the gates. SPC, DOE and measurement-system analysis."
    },
    {
      period: "2026",
      org: "Tesla",
      role: "Quality engineering intern, Megapack",
      body: "Megafactory in Brookshire, Texas, the plant that started building Megapack 3 in August 2026.",
      thread: "The same gates, on a product that sits on the grid."
    }
  ],

  credentials: [
    "ServiceNow Certified System Administrator",
    "Kore.ai Certified Advanced Developer",
    "Published in IJCSNS, Vol. 24, 2024",
    "Promoted early at Deloitte, Business Analyst to Consultant",
    "National champion, Enduro Student India 2020"
  ],

  finale: {
    /* Converges out of the dust at the end of the runway. Wide and tall layouts. */
    linesWide: ["I SPEAK BOARDROOM", "AND FACTORY FLOOR."],
    linesTall: ["I SPEAK", "BOARDROOM", "AND FACTORY", "FLOOR."],
    sub: "At Deloitte I sat where the plan gets approved. At Tesla I stand where it gets built."
  }
};
