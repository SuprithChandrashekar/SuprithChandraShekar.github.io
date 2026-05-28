/* Additional technical illustrations for non-VoltBroker projects.
   Same ink-on-paper register as TransformerIllus — monochromatic, hand-typed,
   one accent stripe, no decorative noise. */

window.ExtraIllus = {

  /* ---------- VoltBroker site preview ---------- */
  vbpreview: (opts = {}) => {
    const { fill = '#2A2824', accent = '#E8551C' } = opts;
    const p = '#FBF9F3';
    const bg = '#F4F1EA';
    const bg2 = '#EAE5DA';
    const line = '#C9C2B0';
    const ink2 = '#5A564C';

    // Inventory card helper
    const card = (x, y) => `
      <rect x="${x}" y="${y}" width="62" height="72" fill="${p}" stroke="${line}" stroke-width="0.6"/>
      <rect x="${x}" y="${y}" width="62" height="36" fill="${bg2}" stroke="none"/>
      <line x1="${x}" y1="${y+36}" x2="${x+62}" y2="${y+36}" stroke="${line}" stroke-width="0.4"/>
      <rect x="${x+4}" y="${y+6}" width="54" height="24" fill="${fill}" opacity="0.06"/>
      <rect x="${x+16}" y="${y+12}" width="30" height="16" fill="${fill}" opacity="0.08"/>
      <rect x="${x+4}" y="${y+40}" width="36" height="4" fill="${fill}" opacity="0.5"/>
      <rect x="${x+4}" y="${y+48}" width="50" height="3" fill="${fill}" opacity="0.15"/>
      <rect x="${x+4}" y="${y+54}" width="42" height="3" fill="${fill}" opacity="0.15"/>
      <rect x="${x+4}" y="${y+62}" width="20" height="4" fill="${accent}" opacity="0.7"/>
      <text x="${x+28}" y="${y+66}" font-family="monospace" font-size="3" fill="${accent}" opacity="0.6">RFQ →</text>
    `;

    return `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
      <!-- Browser chrome -->
      <rect x="0" y="0" width="320" height="220" fill="${bg}" stroke="${fill}" stroke-width="1.2"/>
      <!-- Title bar -->
      <rect x="0" y="0" width="320" height="16" fill="${fill}"/>
      <circle cx="10" cy="8" r="2.5" fill="#E85050"/>
      <circle cx="18" cy="8" r="2.5" fill="#E8B81C"/>
      <circle cx="26" cy="8" r="2.5" fill="#2F7A3E"/>
      <rect x="44" y="4" width="120" height="8" rx="2" fill="rgba(255,255,255,0.1)"/>
      <text x="60" y="10" font-family="monospace" font-size="4" fill="rgba(255,255,255,0.5)">voltbroker.vercel.app</text>

      <!-- VB Header — 3 rows like the real site -->
      <!-- Utility bar -->
      <rect x="0" y="16" width="320" height="10" fill="#0E0E0C"/>
      <text x="8" y="23" font-family="monospace" font-size="3.5" fill="rgba(255,255,255,0.4)">B2B TRANSFORMER EXCHANGE</text>
      <circle cx="290" cy="21" r="1.5" fill="#2FD07A"/>
      <text x="294" y="23" font-family="monospace" font-size="3" fill="rgba(255,255,255,0.4)">LIVE</text>

      <!-- Brand bar -->
      <rect x="0" y="26" width="320" height="18" fill="#0E0E0C" stroke="none"/>
      <line x1="0" y1="26" x2="320" y2="26" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
      <!-- Logo mark -->
      <rect x="8" y="29" width="12" height="12" fill="none" stroke="${p}" stroke-width="0.8"/>
      <rect x="10" y="31" width="8" height="8" fill="none" stroke="${accent}" stroke-width="0.5"/>
      <text x="14" y="38" text-anchor="middle" font-family="monospace" font-size="6" fill="${p}" font-weight="bold">V</text>
      <!-- Wordmark -->
      <text x="24" y="39" font-family="monospace" font-size="7" fill="${p}" font-weight="bold">VOLTBROKER</text>
      <!-- Search bar -->
      <rect x="110" y="30" width="140" height="11" fill="none" stroke="${p}" stroke-width="0.8"/>
      <text x="116" y="38" font-family="monospace" font-size="4" fill="rgba(255,255,255,0.35)">⌕ Search transformers...</text>
      <!-- CTA -->
      <rect x="260" y="30" width="52" height="11" fill="${accent}"/>
      <text x="268" y="38" font-family="monospace" font-size="4" fill="${p}">POST RFQ</text>

      <!-- Nav bar -->
      <rect x="0" y="44" width="320" height="12" fill="#0E0E0C"/>
      <line x1="0" y1="44" x2="320" y2="44" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
      <text x="12" y="52" font-family="monospace" font-size="3.5" fill="rgba(255,255,255,0.6)">◧ MARKETPLACE</text>
      <text x="72" y="52" font-family="monospace" font-size="3.5" fill="rgba(255,255,255,0.4)">▦ CATALOG</text>
      <text x="112" y="52" font-family="monospace" font-size="3.5" fill="rgba(255,255,255,0.4)">⌕ LIBRARY</text>
      <text x="152" y="52" font-family="monospace" font-size="3.5" fill="rgba(255,255,255,0.4)">◇ FOR BROKERS</text>

      <!-- Page body -->
      <rect x="0" y="56" width="320" height="164" fill="${bg}"/>

      <!-- Section eyebrow -->
      <text x="12" y="72" font-family="monospace" font-size="3.5" fill="${accent}">◈ 02 / FEATURED INVENTORY</text>
      <!-- Section title -->
      <text x="12" y="82" font-family="sans-serif" font-size="9" fill="${fill}" font-weight="800">Stocked &amp; ready.</text>
      <text x="12" y="92" font-family="sans-serif" font-size="6" fill="${ink2}">Ships this quarter. Verified units from active brokers.</text>

      <!-- Inventory card grid (4 cards) -->
      ${card(12, 100)}
      ${card(80, 100)}
      ${card(148, 100)}
      ${card(216, 100)}

      <!-- Orange banner at bottom -->
      <rect x="0" y="184" width="320" height="28" fill="${accent}"/>
      <text x="12" y="200" font-family="sans-serif" font-size="7" fill="${p}" font-weight="700">Sourcing for a project?</text>
      <text x="12" y="208" font-family="monospace" font-size="4" fill="${p}" opacity="0.85">Post one RFQ, reach all verified brokers.</text>
      <rect x="252" y="194" width="56" height="14" fill="${fill}"/>
      <text x="260" y="204" font-family="monospace" font-size="4.5" fill="${p}">START RFQ →</text>

      <!-- Footer sliver -->
      <rect x="0" y="212" width="320" height="8" fill="#0E0E0C"/>
      <text x="8" y="217" font-family="monospace" font-size="2.8" fill="rgba(255,255,255,0.35)">© 2026 VOLTBROKER LLC · UL LISTED BROKER NETWORK</text>
    </svg>`;
  },

  /* ---------- 02 Claude Node ---------- Suprith's life & career neural map */
  nodes: (opts = {}) => {
    const { fill = '#2A2824', accent = '#E8551C' } = opts;
    const p = '#FBF9F3';
    const dimFill = '#8A8473';
    // Always use true dark ink for text inside cream boxes,
    // regardless of whether fill is light (dark-bg mode) or dark.
    const ink = '#2A2824';
    const inkDim = '#8A8473';

    // Node helper — larger, readable
    const node = (x,y,w,h,label,sub,active) => {
      const bg = active ? accent : p;
      const fg = active ? p : ink;
      const fgSub = active ? p : inkDim;
      const bdr = active ? ink : inkDim;
      return `<g>
        <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${bg}" stroke="${bdr}" stroke-width="${active?1.4:0.8}"/>
        <text x="${x+w/2}" y="${y+h/2+(sub?-2:3)}" text-anchor="middle" font-family="monospace" font-size="${active?7.5:7}" fill="${fg}" font-weight="${active?'bold':'normal'}">${label}</text>
        ${sub?`<text x="${x+w/2}" y="${y+h/2+6}" text-anchor="middle" font-family="monospace" font-size="4.5" fill="${fgSub}">${sub}</text>`:''}
      </g>`;
    };

    // Small tag node
    const tag = (x,y,w,label,active) => {
      const bg = active ? accent : p;
      const fg = active ? p : ink;
      return `<g>
        <rect x="${x}" y="${y}" width="${w}" height="16" fill="${bg}" stroke="${active?ink:inkDim}" stroke-width="0.6"/>
        <text x="${x+w/2}" y="${y+11}" text-anchor="middle" font-family="monospace" font-size="5.5" fill="${fg}">${label}</text>
      </g>`;
    };

    // Smooth bezier connector: starts horizontal from source, curves to target
    const curve = (x1,y1,x2,y2,isAccent) => {
      const mx = (x1+x2)/2;
      const col = isAccent ? accent : fill;
      const op = isAccent ? 0.55 : 0.25;
      const sw = isAccent ? 1 : 0.7;
      return `<path d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}" fill="none" stroke="${col}" stroke-width="${sw}" opacity="${op}"/>`;
    };

    // Vertical step connector (orthogonal)
    const vstep = (x1,y1,x2,y2,isAccent) => {
      const my = (y1+y2)/2;
      const col = isAccent ? accent : fill;
      const op = isAccent ? 0.55 : 0.25;
      const sw = isAccent ? 1 : 0.7;
      return `<path d="M${x1},${y1} L${x1},${my} L${x2},${my} L${x2},${y2}" fill="none" stroke="${col}" stroke-width="${sw}" opacity="${op}"/>`;
    };

    // Straight dashed connector
    const dash = (x1,y1,x2,y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${fill}" stroke-width="0.5" opacity="0.18" stroke-dasharray="3,2"/>`;

    // Connection endpoint dot
    const cdot = (x,y,isAccent) => `<circle cx="${x}" cy="${y}" r="2" fill="${isAccent?accent:fill}" opacity="${isAccent?0.7:0.35}"/>`;

    // Cluster label
    const clabel = (x,y,t) => `<text x="${x}" y="${y}" font-family="monospace" font-size="5" fill="${fill}" opacity="0.35" font-weight="500">${t}</text>`;

    return `<svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg">
      <!-- faint grid -->
      <g stroke="${fill}" stroke-width="0.08" opacity="0.09">
        ${Array.from({length:26},(_,i)=>`<line x1="0" y1="${i*15}" x2="480" y2="${i*15}"/>`).join('')}
        ${Array.from({length:33},(_,i)=>`<line x1="${i*15}" y1="0" x2="${i*15}" y2="380"/>`).join('')}
      </g>

      <!-- ═══ TITLE & STAMPS ═══ -->
      <text x="16" y="18" font-family="monospace" font-size="6" fill="${fill}" opacity="0.7" font-weight="600">SUPRITH CHANDRA SHEKAR · CAREER TOPOLOGY</text>
      <text x="464" y="18" text-anchor="end" font-family="monospace" font-size="5" fill="${dimFill}">REV. 2026.Q2</text>

      <!-- ═══ COLUMN 1: EDUCATION + CAREER (left) ═══ -->
      ${clabel(20,38,'EDUCATION')}
      ${node(16,44,88,28,'RVCE','B.E. MECH · 8.05',false)}
      ${node(16,86,88,28,'UIUC','M.S. IE · 3.91',true)}
      <!-- vertical flow -->
      ${vstep(60,72,60,86,true)}
      ${cdot(60,72,false)}
      ${cdot(60,86,true)}

      <!-- Courses branching right from UIUC -->
      ${tag(116,44,68,'IE 421 · A+',false)}
      ${tag(116,64,68,'IE 412 · A+',false)}
      ${tag(116,84,68,'IE 532 · A',false)}
      ${tag(116,104,68,'ME 453 · A−',false)}
      ${curve(104,100,116,52,true)}
      ${curve(104,100,116,72,true)}
      ${curve(104,100,116,92,false)}
      ${curve(104,100,116,112,false)}

      ${clabel(20,130,'CAREER')}
      ${node(16,136,88,24,'L&T DEFENSE','INTERN · 2020',false)}
      ${node(16,172,88,24,'DELOITTE BA','2022 — 2024',false)}
      ${node(16,208,88,28,'CONSULTANT','2024 · EARLY PROMO',true)}
      ${node(16,250,88,24,'GTA · UIUC','HT 504 · 2026',false)}
      <!-- career vertical flow -->
      ${vstep(60,114,60,136,false)}
      ${vstep(60,160,60,172,false)}
      ${vstep(60,196,60,208,true)}
      ${vstep(60,236,60,250,false)}
      ${cdot(60,136,false)}
      ${cdot(60,172,false)}
      ${cdot(60,208,true)}
      ${cdot(60,250,false)}

      <!-- Career sub-tags -->
      ${tag(116,140,68,'ServiceNow',false)}
      ${tag(116,174,68,'SIAM · 30+',false)}
      ${curve(104,148,116,148,false)}
      ${curve(104,184,116,182,false)}

      <!-- ═══ COLUMN 2: PROJECTS + RESEARCH + PRINCIPLES (center) ═══ -->
      ${clabel(200,38,'RESEARCH')}
      ${node(196,44,90,28,'HXRI LAB','V&V LEAD · THESIS',true)}
      ${tag(196,80,90,'DFSS · CTQ · FMEA',false)}
      ${vstep(241,72,241,80,false)}

      ${clabel(200,112,'PROJECTS')}
      ${node(196,118,90,24,'HFT STRATEGY','SPY · ITCH · DEEP',false)}
      ${node(196,150,90,24,'QUALITY','SPC · ML · WELD',false)}
      ${node(196,182,90,24,'SUPERALLOY','GRAPH · MIN-CUT',false)}

      <!-- Course → Project connections (clean curves from right edge of courses to left edge of projects) -->
      ${curve(184,52,196,130,true)}
      ${curve(184,112,196,162,false)}
      ${curve(184,92,196,194,false)}
      ${cdot(184,52,true)}
      ${cdot(196,130,true)}
      ${cdot(184,112,false)}
      ${cdot(196,162,false)}
      ${cdot(184,92,false)}
      ${cdot(196,194,false)}

      ${clabel(200,222,'PRINCIPLES')}
      ${tag(196,228,90,'DESIGN IN CODE',false)}
      ${tag(196,250,90,'SYSTEMS THINKING',false)}
      ${tag(196,272,90,'AI AS PARTNER',false)}
      ${tag(196,294,90,'OP. HONESTY',false)}

      <!-- ═══ CENTRAL IDENTITY NODE ═══ -->
      <rect x="186" y="322" width="110" height="34" fill="${accent}" stroke="${fill}" stroke-width="1.5"/>
      <text x="241" y="339" text-anchor="middle" font-family="monospace" font-size="10" fill="${p}" font-weight="bold">SUPRITH</text>
      <text x="241" y="350" text-anchor="middle" font-family="monospace" font-size="4.5" fill="${p}" opacity="0.85">DESIGNER · ENGINEER · 2026</text>
      <!-- Principles → Identity -->
      ${vstep(241,310,241,322,true)}
      ${cdot(241,310,true)}
      ${cdot(241,322,true)}

      <!-- ═══ COLUMN 3: VENTURES + SKILLS (right) ═══ -->
      ${clabel(356,38,'VENTURES')}
      ${node(352,44,110,32,'VOLTBROKER','CO-FOUNDER · CEO',true)}
      <circle cx="358" cy="50" r="3" fill="#2FD07A"/>
      <text x="366" y="47" font-family="monospace" font-size="4" fill="#2FD07A">LIVE</text>
      ${tag(352,86,52,'NEXT.JS',false)}
      ${tag(408,86,54,'SUPABASE',false)}
      ${tag(352,106,52,'DESIGN SYS',false)}
      ${tag(408,106,54,'INVESTOR',false)}
      <!-- VB sub-connections -->
      ${vstep(378,76,378,86,false)}
      ${vstep(435,76,435,86,false)}
      ${vstep(378,102,378,106,false)}
      ${vstep(435,102,435,106,false)}

      ${node(352,134,110,24,'CLAUDE NODE','AI · MCP · AGENTS',false)}

      <!-- UIUC → VoltBroker (main career arc) — clean curve -->
      ${curve(104,100,352,60,true)}
      ${cdot(104,100,true)}
      ${cdot(352,60,true)}

      <!-- UIUC → HXRI -->
      ${curve(104,94,196,58,true)}
      ${cdot(196,58,true)}

      ${clabel(356,174,'SKILLS')}
      ${tag(352,180,52,'PRODUCT',false)}
      ${tag(408,180,54,'PYTHON/TS',false)}
      ${tag(352,200,52,'AI/AGENTS',false)}
      ${tag(408,200,54,'REACT',false)}
      ${tag(352,220,52,'OR/QUALITY',false)}
      ${tag(408,220,54,'CAD',false)}
      ${tag(352,240,52,'CONSULTING',false)}
      ${tag(408,240,54,'DOCKER',false)}

      ${clabel(356,270,'OFF-HOURS')}
      ${tag(352,276,52,'F1',false)}
      ${tag(408,276,54,'ILLINI',false)}
      ${tag(352,296,52,'IPL · RCB',false)}
      ${tag(408,296,54,'VALORANT',false)}

      <!-- Skills / Interests → Identity -->
      ${dash(378,256,241,322)}
      ${dash(378,312,296,346)}

      <!-- Helios cluster (bottom-left) -->
      ${clabel(20,286,'HELIOS · HARDWARE')}
      ${node(16,292,88,28,'TEAM HELIOS','LEAD · 60 MEMBERS',true)}
      ${tag(16,328,88,'◈ NATIONAL CHAMPION',true)}
      ${vstep(60,320,60,328,true)}
      ${tag(116,296,68,'BRAKING SUB',false)}
      ${tag(116,316,68,'DFM · DFMEA',false)}
      ${curve(104,306,116,304,false)}
      ${curve(104,306,116,324,false)}
      <!-- RVCE → Helios -->
      ${vstep(40,72,40,292,false)}
      ${cdot(40,72,false)}
      ${cdot(40,292,false)}
      <!-- Helios → Identity -->
      ${curve(104,320,186,339,true)}
      ${cdot(104,320,true)}
      ${cdot(186,339,true)}

      <!-- Publication node -->
      ${tag(300,44,46,'IJCSNS',false)}
      ${curve(286,58,300,52,false)}

      <!-- ═══ TIMELINE SPINE ═══ -->
      <line x1="16" y1="366" x2="462" y2="366" stroke="${fill}" stroke-width="0.8" opacity="0.4"/>
      ${[
        [16,'2018'],[72,'2020'],[150,'2022'],[240,'2024'],[320,'2025'],[400,'2026'],[450,'2027']
      ].map(([x,t])=>`
        <line x1="${x}" y1="362" x2="${x}" y2="370" stroke="${fill}" stroke-width="0.5" opacity="0.4"/>
        <text x="${x}" y="378" text-anchor="middle" font-family="monospace" font-size="5" fill="${fill}" opacity="0.5">${t}</text>
      `).join('')}
      ${cdot(16,366,false)}<text x="16" y="360" text-anchor="middle" font-family="monospace" font-size="4" fill="${dimFill}">RVCE</text>
      ${cdot(55,366,true)}<text x="55" y="360" text-anchor="middle" font-family="monospace" font-size="4" fill="${accent}">HELIOS</text>
      ${cdot(150,366,false)}<text x="150" y="360" text-anchor="middle" font-family="monospace" font-size="4" fill="${dimFill}">DELOITTE</text>
      ${cdot(240,366,true)}<text x="240" y="360" text-anchor="middle" font-family="monospace" font-size="4" fill="${accent}">PROMO</text>
      ${cdot(320,366,true)}<text x="320" y="360" text-anchor="middle" font-family="monospace" font-size="4" fill="${accent}">UIUC</text>
      ${cdot(400,366,true)}<text x="400" y="360" text-anchor="middle" font-family="monospace" font-size="4" fill="${accent}">VB</text>
      ${cdot(450,366,'#2FD07A')}<text x="450" y="360" text-anchor="middle" font-family="monospace" font-size="4" fill="#2FD07A">SPRING</text>
      <circle cx="400" cy="366" r="6" fill="${accent}" opacity="0.12">
        <animate attributeName="r" values="4;10;4" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite"/>
      </circle>

      <!-- ═══ FOOTER STAMPS ═══ -->
      <text x="16" y="378" font-family="monospace" font-size="4" fill="${dimFill}" opacity="0.5">BENGALURU → CHAMPAIGN · 2018—2027</text>

    </svg>`;
  },

  /* ---------- 03 HFT — multi-indicator trading terminal ---------- */
  orderbook: (opts = {}) => {
    const { fill = '#2A2824', accent = '#E8551C' } = opts;
    const ink = '#2A2824';
    const p = '#FBF9F3';
    const green = '#2F7A3E';
    const red = '#C23F0A';
    const dimLine = '#C9C2B0';

    // Generate candlestick data
    const candles = [];
    let price = 331.20;
    for (let i = 0; i < 32; i++) {
      const open = price;
      const delta = (Math.sin(i * 0.3) * 0.15 + (Math.random() - 0.48) * 0.2);
      const close = open + delta;
      const high = Math.max(open, close) + Math.random() * 0.12;
      const low = Math.min(open, close) - Math.random() * 0.12;
      const vol = 40 + Math.random() * 50 + (Math.abs(delta) > 0.1 ? 30 : 0);
      candles.push({ o: open, c: close, h: high, l: low, vol, bull: close >= open });
      price = close;
    }

    // Scale helpers
    const allPrices = candles.flatMap(c => [c.h, c.l]);
    const pMin = Math.min(...allPrices) - 0.05;
    const pMax = Math.max(...allPrices) + 0.05;
    const pRange = pMax - pMin;
    const chartTop = 28, chartBot = 128, chartLeft = 36, chartRight = 300;
    const chartW = chartRight - chartLeft;
    const chartH = chartBot - chartTop;
    const yP = (v) => chartBot - ((v - pMin) / pRange) * chartH;
    const barW = (chartW / candles.length) * 0.7;
    const gap = chartW / candles.length;

    // Simple moving averages
    const sma = (period) => {
      const result = [];
      for (let i = 0; i < candles.length; i++) {
        if (i < period - 1) { result.push(null); continue; }
        let sum = 0;
        for (let j = i - period + 1; j <= i; j++) sum += candles[j].c;
        result.push(sum / period);
      }
      return result;
    };
    const sma5 = sma(5);
    const sma12 = sma(12);

    const smaPath = (data, color) => {
      const pts = data.map((v, i) => v !== null ? `${chartLeft + i * gap + gap / 2},${yP(v).toFixed(1)}` : null).filter(Boolean);
      if (pts.length < 2) return '';
      return `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.7"/>`;
    };

    // RSI calculation (simplified)
    const rsiData = [];
    for (let i = 0; i < candles.length; i++) {
      if (i < 5) { rsiData.push(50); continue; }
      let gains = 0, losses = 0;
      for (let j = i - 4; j <= i; j++) {
        const d = candles[j].c - candles[j].o;
        if (d > 0) gains += d; else losses -= d;
      }
      const rs = losses === 0 ? 100 : gains / losses;
      rsiData.push(100 - (100 / (1 + rs)));
    }

    // Volume chart area
    const volTop = 136, volBot = 165;
    const volH = volBot - volTop;
    const maxVol = Math.max(...candles.map(c => c.vol));

    // RSI chart area
    const rsiTop = 173, rsiBot = 200;
    const rsiH = rsiBot - rsiTop;

    // Price grid lines
    const pStep = pRange / 4;
    const gridLines = Array.from({ length: 5 }, (_, i) => pMin + i * pStep);

    return `<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect x="0" y="0" width="340" height="220" fill="${p}" stroke="${ink}" stroke-width="0.8"/>

      <!-- Header strip -->
      <rect x="0" y="0" width="340" height="16" fill="${ink}"/>
      <text x="6" y="11" font-family="monospace" font-size="5" fill="${p}" font-weight="600">SPY · CROSS-VENUE ANALYSIS</text>
      <text x="180" y="11" font-family="monospace" font-size="4" fill="rgba(255,255,255,0.5)">IEX ⇄ NASDAQ · 30 JAN 2020</text>
      <circle cx="316" cy="8" r="2" fill="${green}"/>
      <text x="320" y="10" font-family="monospace" font-size="3.5" fill="rgba(255,255,255,0.5)">LIVE</text>

      <!-- Price panel label -->
      <text x="6" y="26" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.45">PRICE (USD)</text>
      <text x="${chartRight}" y="26" text-anchor="end" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.45">TICK · μs RESOLUTION</text>

      <!-- Price chart frame -->
      <rect x="${chartLeft}" y="${chartTop}" width="${chartW}" height="${chartH}" fill="none" stroke="${dimLine}" stroke-width="0.4"/>

      <!-- Horizontal gridlines + labels -->
      ${gridLines.map(v => `
        <line x1="${chartLeft}" y1="${yP(v).toFixed(1)}" x2="${chartRight}" y2="${yP(v).toFixed(1)}" stroke="${dimLine}" stroke-width="0.3" stroke-dasharray="2,2"/>
        <text x="${chartLeft - 3}" y="${(yP(v) + 1.5).toFixed(1)}" text-anchor="end" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">${v.toFixed(2)}</text>
      `).join('')}

      <!-- NBBO band -->
      <rect x="${chartLeft}" y="${yP(331.28).toFixed(1)}" width="${chartW}" height="${Math.abs(yP(331.28) - yP(331.15)).toFixed(1)}" fill="${accent}" opacity="0.06"/>
      <line x1="${chartLeft}" y1="${yP(331.28).toFixed(1)}" x2="${chartRight}" y2="${yP(331.28).toFixed(1)}" stroke="${accent}" stroke-width="0.4" stroke-dasharray="1.5,1.5" opacity="0.4"/>
      <line x1="${chartLeft}" y1="${yP(331.15).toFixed(1)}" x2="${chartRight}" y2="${yP(331.15).toFixed(1)}" stroke="${accent}" stroke-width="0.4" stroke-dasharray="1.5,1.5" opacity="0.4"/>
      <text x="${chartRight + 2}" y="${(yP(331.28) + 1).toFixed(1)}" font-family="monospace" font-size="3" fill="${accent}" opacity="0.6">NBBO</text>

      <!-- Candlesticks -->
      ${candles.map((c, i) => {
        const x = chartLeft + i * gap + (gap - barW) / 2;
        const xMid = chartLeft + i * gap + gap / 2;
        const yHigh = yP(c.h);
        const yLow = yP(c.l);
        const yOpen = yP(c.o);
        const yClose = yP(c.c);
        const bodyTop = Math.min(yOpen, yClose);
        const bodyH = Math.max(Math.abs(yOpen - yClose), 0.5);
        const color = c.bull ? green : red;
        return `
          <line x1="${xMid.toFixed(1)}" y1="${yHigh.toFixed(1)}" x2="${xMid.toFixed(1)}" y2="${yLow.toFixed(1)}" stroke="${color}" stroke-width="0.5"/>
          <rect x="${x.toFixed(1)}" y="${bodyTop.toFixed(1)}" width="${barW.toFixed(1)}" height="${bodyH.toFixed(1)}" fill="${c.bull ? p : color}" stroke="${color}" stroke-width="0.6"/>
        `;
      }).join('')}

      <!-- Moving averages -->
      ${smaPath(sma5, '#1F6FBF')}
      ${smaPath(sma12, accent)}

      <!-- MA legend -->
      <line x1="${chartLeft + 4}" y1="${chartBot - 6}" x2="${chartLeft + 14}" y2="${chartBot - 6}" stroke="#1F6FBF" stroke-width="1"/>
      <text x="${chartLeft + 16}" y="${chartBot - 4}" font-family="monospace" font-size="3" fill="${ink}" opacity="0.5">SMA-5</text>
      <line x1="${chartLeft + 40}" y1="${chartBot - 6}" x2="${chartLeft + 50}" y2="${chartBot - 6}" stroke="${accent}" stroke-width="1"/>
      <text x="${chartLeft + 52}" y="${chartBot - 4}" font-family="monospace" font-size="3" fill="${ink}" opacity="0.5">SMA-12</text>

      <!-- Volume panel -->
      <text x="6" y="${volTop - 2}" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.45">VOLUME</text>
      <rect x="${chartLeft}" y="${volTop}" width="${chartW}" height="${volH}" fill="none" stroke="${dimLine}" stroke-width="0.4"/>
      ${candles.map((c, i) => {
        const x = chartLeft + i * gap + (gap - barW) / 2;
        const h = (c.vol / maxVol) * (volH - 2);
        const color = c.bull ? green : red;
        return `<rect x="${x.toFixed(1)}" y="${(volBot - h).toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="${color}" opacity="0.55"/>`;
      }).join('')}

      <!-- RSI panel -->
      <text x="6" y="${rsiTop - 2}" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.45">RSI (5)</text>
      <rect x="${chartLeft}" y="${rsiTop}" width="${chartW}" height="${rsiH}" fill="none" stroke="${dimLine}" stroke-width="0.4"/>
      <!-- RSI overbought/oversold zones -->
      <rect x="${chartLeft}" y="${rsiTop}" width="${chartW}" height="${rsiH * 0.3}" fill="${red}" opacity="0.04"/>
      <rect x="${chartLeft}" y="${rsiTop + rsiH * 0.7}" width="${chartW}" height="${rsiH * 0.3}" fill="${green}" opacity="0.04"/>
      <line x1="${chartLeft}" y1="${rsiTop + rsiH * 0.3}" x2="${chartRight}" y2="${rsiTop + rsiH * 0.3}" stroke="${dimLine}" stroke-width="0.3" stroke-dasharray="2,2"/>
      <line x1="${chartLeft}" y1="${rsiTop + rsiH * 0.7}" x2="${chartRight}" y2="${rsiTop + rsiH * 0.7}" stroke="${dimLine}" stroke-width="0.3" stroke-dasharray="2,2"/>
      <text x="${chartLeft - 3}" y="${rsiTop + rsiH * 0.3 + 1.5}" text-anchor="end" font-family="monospace" font-size="3" fill="${ink}" opacity="0.4">70</text>
      <text x="${chartLeft - 3}" y="${rsiTop + rsiH * 0.7 + 1.5}" text-anchor="end" font-family="monospace" font-size="3" fill="${ink}" opacity="0.4">30</text>
      <!-- RSI line -->
      <polyline points="${rsiData.map((v, i) => `${chartLeft + i * gap + gap / 2},${(rsiBot - (v / 100) * rsiH).toFixed(1)}`).join(' ')}" fill="none" stroke="#1F6FBF" stroke-width="0.8" opacity="0.7"/>

      <!-- Bottom info strip -->
      <rect x="0" y="206" width="340" height="14" fill="${ink}"/>
      <text x="6" y="214" font-family="monospace" font-size="4" fill="rgba(255,255,255,0.5)">XEMM MAKER · IEX → NASDAQ HEDGE</text>
      <text x="200" y="214" font-family="monospace" font-size="3.5" fill="rgba(255,255,255,0.4)">ITCH 5.0 · TICK-BY-TICK · 30/01/2020</text>
      <text x="334" y="214" text-anchor="end" font-family="monospace" font-size="3.5" fill="${accent}">IE 421 · A+</text>
    </svg>`;
  },

  /* ---------- 04 Ultrasonic Weld Quality Dashboard ----------
     Based on ME 453 Group 7 project: 69 experiments, Power/Force sensors,
     Fisher-ratio feature selection, 3-class monitoring (Good/Cold/Excessive) */
  spc: (opts = {}) => {
    const { fill = '#2A2824', accent = '#E8551C' } = opts;
    const ink = '#2A2824';
    const p = '#FBF9F3';
    const green = '#2F7A3E';
    const red = '#C23F0A';
    const blue = '#1F6FBF';
    const caution = '#E8B81C';
    const dimLine = '#C9C2B0';
    const cold = '#1F6FBF';
    const good = '#2F7A3E';
    const excessive = '#C23F0A';

    // ─── Panel 1: Power signal with main-weld extraction ───
    const p1L = 42, p1R = 210, p1T = 30, p1B = 72;
    const pwrPts = [];
    for (let i = 0; i < 80; i++) {
      const t = i / 80;
      let v;
      if (t < 0.1) v = 0.05 + Math.random() * 0.03;
      else if (t < 0.15) v = 0.05 + (t - 0.1) / 0.05 * 0.85;
      else if (t < 0.75) v = 0.9 + Math.sin(t * 30) * 0.05 + (Math.random() - 0.5) * 0.04;
      else if (t < 0.82) v = 0.9 - (t - 0.75) / 0.07 * 0.7;
      else v = 0.2 * Math.exp(-(t - 0.82) * 10) + 0.03;
      pwrPts.push(v);
    }
    const pwrPath = pwrPts.map((v, i) => {
      const x = p1L + (i / (pwrPts.length - 1)) * (p1R - p1L);
      const y = p1B - v * (p1B - p1T);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    const mwStart = p1L + 0.1 * (p1R - p1L);
    const mwEnd = p1L + 0.75 * (p1R - p1L);

    // ─── Panel 2: Fisher ratio comparison ───
    const p2L = 222, p2R = 336, p2T = 30, p2B = 72;
    const fisherData = [
      { label: 'PWR_MAX', v: 8.2, sensor: 'power' },
      { label: 'PWR_MEAN', v: 6.9, sensor: 'power' },
      { label: 'PWR_STD', v: 5.8, sensor: 'power' },
      { label: 'PWR_E', v: 5.7, sensor: 'power' },
      { label: 'F_F1_FRQ', v: 1.8, sensor: 'force' },
      { label: 'F_F1_MAG', v: 1.2, sensor: 'force' },
      { label: 'F_F2_FRQ', v: 0.8, sensor: 'force' },
      { label: 'F_F2_MAG', v: 0.6, sensor: 'force' },
    ];
    const fMax = 9;
    const fBarH = ((p2B - p2T) - 4) / fisherData.length - 1;

    // ─── Panel 3: Control chart — Power_Max, 3 classes ───
    const p3L = 42, p3R = 210, p3T = 90, p3B = 138;
    const clMean = 3370, clUcl = 4723, clLcl = 2018;
    const ctrlPts = [];
    for (let i = 0; i < 28; i++) {
      let v = clMean + Math.sin(i * 0.4) * 400 + (Math.random() - 0.5) * 300;
      if (i === 5) v = 1600;
      if (i === 19) v = 1850;
      if (i === 22) v = 5100;
      const cls = v < clLcl ? 'cold' : v > clUcl ? 'excessive' : 'good';
      ctrlPts.push({ v, cls });
    }
    const ctrlY = (v) => p3B - ((v - 1200) / (5600 - 1200)) * (p3B - p3T);
    const ctrlGap = (p3R - p3L) / (ctrlPts.length - 1);

    // ─── Panel 4: Classifier comparison ───
    const p4L = 222, p4R = 336, p4T = 90, p4B = 138;
    const classifiers = [
      { name: 'LOG REG', acc: 0.521, auc: 0.543 },
      { name: 'RF', acc: 0.510, auc: 0.530 },
      { name: 'GBT', acc: 0.505, auc: 0.525 },
      { name: 'SVM', acc: 0.498, auc: 0.510 },
      { name: 'KNN', acc: 0.490, auc: 0.505 },
      { name: 'NB', acc: 0.485, auc: 0.480 },
    ];
    const clBarW = ((p4R - p4L) - 20) / classifiers.length - 2;

    // ─── Panel 5: Confusion matrix ───
    const cmL = 42, cmT = 156;
    const mdL = 180, mdT = 156;

    return `<svg viewBox="0 0 348 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="348" height="220" fill="${p}" stroke="${ink}" stroke-width="0.8"/>
      <rect x="0" y="0" width="348" height="16" fill="${ink}"/>
      <text x="6" y="11" font-family="monospace" font-size="5" fill="${p}" font-weight="600">ME 453 · ULTRASONIC WELD QUALITY</text>
      <text x="200" y="11" font-family="monospace" font-size="4" fill="rgba(255,255,255,0.5)">69 EXPERIMENTS · POWER + FORCE · 3 CLASS</text>
      <circle cx="334" cy="8" r="2" fill="${green}"/>

      <!-- PANEL 1: Power signal -->
      <text x="6" y="27" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">POWER SIGNAL · 1 kHz · MAIN-WELD EXTRACTION</text>
      <rect x="${p1L}" y="${p1T}" width="${p1R - p1L}" height="${p1B - p1T}" fill="none" stroke="${dimLine}" stroke-width="0.4"/>
      <rect x="${mwStart}" y="${p1T}" width="${mwEnd - mwStart}" height="${p1B - p1T}" fill="${good}" opacity="0.06"/>
      <line x1="${mwStart}" y1="${p1T}" x2="${mwStart}" y2="${p1B}" stroke="${good}" stroke-width="0.5" stroke-dasharray="2,1.5"/>
      <line x1="${mwEnd}" y1="${p1T}" x2="${mwEnd}" y2="${p1B}" stroke="${good}" stroke-width="0.5" stroke-dasharray="2,1.5"/>
      <text x="${(mwStart + mwEnd) / 2}" y="${p1T - 2}" text-anchor="middle" font-family="monospace" font-size="3" fill="${good}">MAIN-WELD</text>
      <text x="${mwStart - 4}" y="${p1T - 2}" text-anchor="end" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.4">PRE</text>
      <text x="${mwEnd + 4}" y="${p1T - 2}" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.4">POST</text>
      ${[0.25, 0.5, 0.75].map(f => {
        const y = p1B - f * (p1B - p1T);
        return '<line x1="'+p1L+'" y1="'+y+'" x2="'+p1R+'" y2="'+y+'" stroke="'+dimLine+'" stroke-width="0.2" stroke-dasharray="2,2"/>';
      }).join('')}
      <path d="${pwrPath}" fill="none" stroke="${blue}" stroke-width="1"/>
      <text x="${p1L - 2}" y="${p1T + 3}" text-anchor="end" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.4">5kW</text>
      <text x="${p1L - 2}" y="${p1B}" text-anchor="end" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.4">0</text>

      <!-- PANEL 2: Fisher ratio bars -->
      <text x="${p2L}" y="27" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">FISHER RATIO · POWER vs FORCE</text>
      <rect x="${p2L}" y="${p2T}" width="${p2R - p2L}" height="${p2B - p2T}" fill="none" stroke="${dimLine}" stroke-width="0.4"/>
      ${fisherData.map((f, i) => {
        const y = p2T + 2 + i * (fBarH + 1);
        const barW = (f.v / fMax) * (p2R - p2L - 40);
        const col = f.sensor === 'power' ? accent : blue;
        return '<text x="'+(p2L+2)+'" y="'+(y+fBarH-1)+'" font-family="monospace" font-size="3" fill="'+ink+'" opacity="0.5">'+f.label+'</text><rect x="'+(p2L+34)+'" y="'+y+'" width="'+barW.toFixed(1)+'" height="'+fBarH+'" fill="'+col+'" opacity="0.6"/>';
      }).join('')}
      <rect x="${p2L + 2}" y="${p2B + 3}" width="6" height="4" fill="${accent}" opacity="0.6"/>
      <text x="${p2L + 10}" y="${p2B + 6.5}" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">POWER (6.67)</text>
      <rect x="${p2L + 52}" y="${p2B + 3}" width="6" height="4" fill="${blue}" opacity="0.6"/>
      <text x="${p2L + 60}" y="${p2B + 6.5}" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">FORCE (1.17)</text>

      <!-- PANEL 3: Control chart -->
      <text x="6" y="${p3T - 3}" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">POWER_MAX · CONTROL LIMITS · μ ± 3σ</text>
      <rect x="${p3L}" y="${p3T}" width="${p3R - p3L}" height="${p3B - p3T}" fill="none" stroke="${dimLine}" stroke-width="0.4"/>
      <line x1="${p3L}" y1="${ctrlY(clUcl)}" x2="${p3R}" y2="${ctrlY(clUcl)}" stroke="${red}" stroke-width="0.5" stroke-dasharray="3,2"/>
      <line x1="${p3L}" y1="${ctrlY(clMean)}" x2="${p3R}" y2="${ctrlY(clMean)}" stroke="${ink}" stroke-width="0.5"/>
      <line x1="${p3L}" y1="${ctrlY(clLcl)}" x2="${p3R}" y2="${ctrlY(clLcl)}" stroke="${red}" stroke-width="0.5" stroke-dasharray="3,2"/>
      <text x="${p3R + 2}" y="${ctrlY(clUcl) + 1.5}" font-family="monospace" font-size="2.5" fill="${red}">UCL 4723</text>
      <text x="${p3R + 2}" y="${ctrlY(clMean) + 1.5}" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">CL 3370</text>
      <text x="${p3R + 2}" y="${ctrlY(clLcl) + 1.5}" font-family="monospace" font-size="2.5" fill="${red}">LCL 2018</text>
      <rect x="${p3L}" y="${p3T}" width="${p3R - p3L}" height="${ctrlY(clUcl) - p3T}" fill="${excessive}" opacity="0.04"/>
      <rect x="${p3L}" y="${ctrlY(clLcl)}" width="${p3R - p3L}" height="${p3B - ctrlY(clLcl)}" fill="${cold}" opacity="0.04"/>
      <polyline points="${ctrlPts.map((pt, i) => (p3L + i * ctrlGap).toFixed(1)+','+ctrlY(pt.v).toFixed(1)).join(' ')}" fill="none" stroke="${ink}" stroke-width="0.6"/>
      ${ctrlPts.map((pt, i) => {
        const cx = p3L + i * ctrlGap;
        const cy = ctrlY(pt.v);
        const col = pt.cls === 'cold' ? cold : pt.cls === 'excessive' ? excessive : good;
        const r = pt.cls === 'good' ? 1.5 : 2.5;
        return '<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+r+'" fill="'+(pt.cls==='good'?p:col)+'" stroke="'+col+'" stroke-width="0.6"/>';
      }).join('')}
      <circle cx="${p3L + 4}" cy="${p3B + 5}" r="2" fill="${good}"/>
      <text x="${p3L + 8}" y="${p3B + 6.5}" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">GOOD</text>
      <circle cx="${p3L + 30}" cy="${p3B + 5}" r="2" fill="${cold}"/>
      <text x="${p3L + 34}" y="${p3B + 6.5}" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">COLD</text>
      <circle cx="${p3L + 56}" cy="${p3B + 5}" r="2" fill="${excessive}"/>
      <text x="${p3L + 60}" y="${p3B + 6.5}" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">EXCESSIVE</text>
      <text x="${p3L + 100}" y="${p3B + 6.5}" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.35">MISDETECT: 35.1%</text>

      <!-- PANEL 4: Classifier comparison -->
      <text x="${p4L}" y="${p4T - 3}" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">FORD DATASET · ML CLASSIFIERS · AUC</text>
      <rect x="${p4L}" y="${p4T}" width="${p4R - p4L}" height="${p4B - p4T}" fill="none" stroke="${dimLine}" stroke-width="0.4"/>
      <line x1="${p4L}" y1="${p4B - ((0.5 - 0.45) / 0.12) * (p4B - p4T)}" x2="${p4R}" y2="${p4B - ((0.5 - 0.45) / 0.12) * (p4B - p4T)}" stroke="${red}" stroke-width="0.3" stroke-dasharray="2,1.5"/>
      <text x="${p4R + 2}" y="${p4B - ((0.5 - 0.45) / 0.12) * (p4B - p4T) + 1.5}" font-family="monospace" font-size="2.5" fill="${red}" opacity="0.6">RANDOM</text>
      ${classifiers.map((c, i) => {
        const x = p4L + 10 + i * (clBarW + 2);
        const h = ((c.auc - 0.45) / 0.12) * (p4B - p4T);
        const best = i === 0;
        return '<rect x="'+x+'" y="'+(p4B-h).toFixed(1)+'" width="'+clBarW+'" height="'+h.toFixed(1)+'" fill="'+(best?accent:blue)+'" opacity="'+(best?0.7:0.35)+'"/><text x="'+(x+clBarW/2)+'" y="'+(p4B+6)+'" text-anchor="middle" font-family="monospace" font-size="2.5" fill="'+ink+'" opacity="0.5">'+c.name+'</text><text x="'+(x+clBarW/2)+'" y="'+(p4B-h-2)+'" text-anchor="middle" font-family="monospace" font-size="2.5" fill="'+(best?accent:ink)+'" opacity="'+(best?1:0.5)+'">'+c.auc.toFixed(2)+'</text>';
      }).join('')}
      <text x="${p4L + 2}" y="${p4B + 12}" font-family="monospace" font-size="2.5" fill="${accent}">◈ LOG REG BEST · AUC 0.543</text>

      <!-- PANEL 5: Confusion matrix -->
      <text x="6" y="${cmT - 3}" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">CONFUSION MATRIX · LOG. REGRESSION</text>
      <rect x="${cmL}" y="${cmT}" width="30" height="18" fill="${good}" opacity="0.2" stroke="${dimLine}" stroke-width="0.4"/>
      <rect x="${cmL + 30}" y="${cmT}" width="30" height="18" fill="${red}" opacity="0.1" stroke="${dimLine}" stroke-width="0.4"/>
      <rect x="${cmL}" y="${cmT + 18}" width="30" height="18" fill="${red}" opacity="0.1" stroke="${dimLine}" stroke-width="0.4"/>
      <rect x="${cmL + 30}" y="${cmT + 18}" width="30" height="18" fill="${good}" opacity="0.2" stroke="${dimLine}" stroke-width="0.4"/>
      <text x="${cmL + 15}" y="${cmT + 12}" text-anchor="middle" font-family="monospace" font-size="6" fill="${good}" font-weight="bold">707</text>
      <text x="${cmL + 45}" y="${cmT + 12}" text-anchor="middle" font-family="monospace" font-size="6" fill="${red}">51</text>
      <text x="${cmL + 15}" y="${cmT + 30}" text-anchor="middle" font-family="monospace" font-size="6" fill="${red}">656</text>
      <text x="${cmL + 45}" y="${cmT + 30}" text-anchor="middle" font-family="monospace" font-size="6" fill="${good}" font-weight="bold">63</text>
      <text x="${cmL + 15}" y="${cmT + 40}" text-anchor="middle" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.4">PRED 0</text>
      <text x="${cmL + 45}" y="${cmT + 40}" text-anchor="middle" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.4">PRED 1</text>
      <text x="${cmL - 3}" y="${cmT + 10}" text-anchor="end" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.4">ACT 0</text>
      <text x="${cmL - 3}" y="${cmT + 28}" text-anchor="end" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.4">ACT 1</text>
      <text x="${cmL + 74}" y="${cmT + 6}" font-family="monospace" font-size="3" fill="${ink}" opacity="0.45">ACC</text>
      <text x="${cmL + 74}" y="${cmT + 13}" font-family="monospace" font-size="5.5" fill="${ink}" font-weight="bold">52.1%</text>
      <text x="${cmL + 74}" y="${cmT + 21}" font-family="monospace" font-size="3" fill="${ink}" opacity="0.45">PREC</text>
      <text x="${cmL + 74}" y="${cmT + 28}" font-family="monospace" font-size="5.5" fill="${ink}" font-weight="bold">53.5%</text>
      <text x="${cmL + 74}" y="${cmT + 36}" font-family="monospace" font-size="3" fill="${ink}" opacity="0.45">F1</text>
      <text x="${cmL + 74}" y="${cmT + 43}" font-family="monospace" font-size="5.5" fill="${ink}" font-weight="bold">41.5%</text>

      <!-- PANEL 6: Misdetection table -->
      <text x="${mdL}" y="${mdT - 3}" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">MISDETECTION RATES · μ±3σ LIMITS</text>
      <rect x="${mdL}" y="${mdT}" width="158" height="44" fill="none" stroke="${dimLine}" stroke-width="0.4"/>
      <text x="${mdL + 4}" y="${mdT + 10}" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">FEATURE</text>
      <text x="${mdL + 70}" y="${mdT + 10}" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">LIMITS</text>
      <text x="${mdL + 130}" y="${mdT + 10}" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">MISS%</text>
      <line x1="${mdL}" y1="${mdT + 13}" x2="${mdL + 158}" y2="${mdT + 13}" stroke="${dimLine}" stroke-width="0.3"/>
      <text x="${mdL + 4}" y="${mdT + 21}" font-family="monospace" font-size="3.5" fill="${accent}">Power_Max</text>
      <text x="${mdL + 70}" y="${mdT + 21}" font-family="monospace" font-size="3.5" fill="${ink}">2018 — 4723</text>
      <text x="${mdL + 130}" y="${mdT + 21}" font-family="monospace" font-size="3.5" fill="${accent}" font-weight="bold">35.1%</text>
      <text x="${mdL + 4}" y="${mdT + 30}" font-family="monospace" font-size="3.5" fill="${ink}">Power_Mean</text>
      <text x="${mdL + 70}" y="${mdT + 30}" font-family="monospace" font-size="3.5" fill="${ink}">1528 — 4116</text>
      <text x="${mdL + 130}" y="${mdT + 30}" font-family="monospace" font-size="3.5" fill="${ink}">54.1%</text>
      <text x="${mdL + 4}" y="${mdT + 39}" font-family="monospace" font-size="3.5" fill="${ink}">Pressure</text>
      <text x="${mdL + 70}" y="${mdT + 39}" font-family="monospace" font-size="3.5" fill="${ink}">10.3 — 76.9</text>
      <text x="${mdL + 130}" y="${mdT + 39}" font-family="monospace" font-size="3.5" fill="${ink}">75.7%</text>

      <!-- Footer -->
      <rect x="0" y="206" width="348" height="14" fill="${ink}"/>
      <text x="6" y="214" font-family="monospace" font-size="4" fill="rgba(255,255,255,0.5)">PYTHON · scikit-learn · MINITAB · pandas · SPC</text>
      <text x="196" y="214" font-family="monospace" font-size="3.5" fill="rgba(255,255,255,0.4)">69 EXP · GOOD/COLD/EXCESSIVE · FISHER SELECT</text>
      <text x="342" y="214" text-anchor="end" font-family="monospace" font-size="3.5" fill="${accent}">ME 453 · A−</text>
    </svg>`;
  },

  /* ---------- 05 Superalloy Microstructure — Network Analysis Dashboard ----------
     IE 532 Final Project: Network-based analysis of γ' precipitate microstructures.
     851 particles, k=8 NN, SparkX min-cut λ=3, Win communities Q=0.76, 9 domains.
     Active rafting (33% elongated), secondary creep stage. */
  grain: (opts = {}) => {
    const { fill = '#2A2824', accent = '#E8551C' } = opts;
    const ink = '#2A2824';
    const p = '#FBF9F3';
    const green = '#2F7A3E';
    const red = '#C23F0A';
    const blue = '#1F6FBF';
    const dimLine = '#C9C2B0';
    const caution = '#E8B81C';

    // Generate a realistic-looking precipitate network (simplified 2D projection)
    // Seed-based pseudo-random for consistent rendering
    const seed = (n) => ((Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1;
    
    // Generate ~60 visible particles in panel 1 area
    const particles = [];
    for (let i = 0; i < 65; i++) {
      const x = 18 + seed(i * 3) * 140;
      const y = 34 + seed(i * 3 + 1) * 110;
      const r = 2.5 + seed(i * 3 + 2) * 3.5;
      // Assign community (0-8)
      const comm = Math.floor(seed(i * 7 + 5) * 9);
      particles.push({ x, y, r, comm, id: i });
    }

    // Community colors (muted, distinguishable)
    const commColors = [
      '#4A7FB5', '#7BAA5E', '#C47E3F', '#8B6BAF', '#B85C5C',
      '#5BA3A3', '#AA8D5B', '#6B8BBF', '#A3736B'
    ];

    // Generate edges (k=8 nearest neighbors, but show subset for clarity)
    const edges = [];
    for (let i = 0; i < particles.length; i++) {
      const dists = particles.map((p2, j) => ({
        j, d: Math.sqrt((particles[i].x - p2.x) ** 2 + (particles[i].y - p2.y) ** 2)
      })).filter(d => d.j !== i).sort((a, b) => a.d - b.d);
      // Connect to 4 nearest (visual subset of k=8)
      for (let k = 0; k < Math.min(4, dists.length); k++) {
        const j = dists[k].j;
        if (!edges.some(e => (e[0] === i && e[1] === j) || (e[0] === j && e[1] === i))) {
          edges.push([i, j, dists[k].d]);
        }
      }
    }

    // Pick 3 "SparkX cut" edges (longest edges near the middle)
    const midEdges = edges.filter(e => {
      const mx = (particles[e[0]].x + particles[e[1]].x) / 2;
      return mx > 60 && mx < 120;
    }).sort((a, b) => b[2] - a[2]);
    const cutEdgeIndices = new Set();
    for (let i = 0; i < Math.min(3, midEdges.length); i++) {
      cutEdgeIndices.add(edges.indexOf(midEdges[i]));
    }

    // Panel 1: SEM + Network overlay
    const p1Particles = particles.map(pt => 
      '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="' + pt.r.toFixed(1) + '" fill="' + ink + '" opacity="0.12" stroke="' + ink + '" stroke-width="0.3"/>'
    ).join('');
    
    const p1Edges = edges.map((e, idx) => {
      const p1 = particles[e[0]], p2 = particles[e[1]];
      const isCut = cutEdgeIndices.has(idx);
      const col = isCut ? accent : '#5BA3A3';
      const sw = isCut ? 1.5 : 0.4;
      const op = isCut ? 0.9 : 0.35;
      return '<line x1="' + p1.x.toFixed(1) + '" y1="' + p1.y.toFixed(1) + '" x2="' + p2.x.toFixed(1) + '" y2="' + p2.y.toFixed(1) + '" stroke="' + col + '" stroke-width="' + sw + '" opacity="' + op + '"/>';
    }).join('');

    const p1Nodes = particles.map(pt =>
      '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="1.5" fill="' + accent + '" opacity="0.7"/>'
    ).join('');

    // Panel 2: Community detection (same layout, colored by community)
    const p2X = 190; // offset
    const p2Particles = particles.map(pt => {
      const col = commColors[pt.comm];
      return '<circle cx="' + (pt.x + p2X - 16).toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="' + (pt.r * 0.8).toFixed(1) + '" fill="' + col + '" opacity="0.5" stroke="' + col + '" stroke-width="0.5"/>';
    }).join('');
    
    const p2Edges = edges.map((e, idx) => {
      const p1 = particles[e[0]], p2 = particles[e[1]];
      const sameComm = p1.comm === p2.comm;
      const isCut = cutEdgeIndices.has(idx);
      if (isCut) {
        return '<line x1="' + (p1.x + p2X - 16).toFixed(1) + '" y1="' + p1.y.toFixed(1) + '" x2="' + (p2.x + p2X - 16).toFixed(1) + '" y2="' + p2.y.toFixed(1) + '" stroke="' + accent + '" stroke-width="2" opacity="0.9"/>';
      }
      if (!sameComm) {
        return '<line x1="' + (p1.x + p2X - 16).toFixed(1) + '" y1="' + p1.y.toFixed(1) + '" x2="' + (p2.x + p2X - 16).toFixed(1) + '" y2="' + p2.y.toFixed(1) + '" stroke="' + ink + '" stroke-width="0.3" opacity="0.15" stroke-dasharray="1.5,1"/>';
      }
      return '<line x1="' + (p1.x + p2X - 16).toFixed(1) + '" y1="' + p1.y.toFixed(1) + '" x2="' + (p2.x + p2X - 16).toFixed(1) + '" y2="' + p2.y.toFixed(1) + '" stroke="' + commColors[p1.comm] + '" stroke-width="0.3" opacity="0.25"/>';
    }).join('');

    // Panel 3: Degree distribution histogram
    const degrees = particles.map(pt => {
      return edges.filter(e => e[0] === pt.id || e[1] === pt.id).length;
    });
    const maxDeg = Math.max(...degrees);
    const degBins = Array(maxDeg + 1).fill(0);
    degrees.forEach(d => degBins[d]++);
    const maxBinVal = Math.max(...degBins);
    const histL = 18, histR = 158, histT = 168, histB = 210;

    // Panel 4: Key metrics table
    const metricsL = 174;

    return `<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="380" height="240" fill="${p}" stroke="${ink}" stroke-width="0.8"/>

      <!-- Header -->
      <rect x="0" y="0" width="380" height="16" fill="${ink}"/>
      <text x="6" y="11" font-family="monospace" font-size="5" fill="${p}" font-weight="600">γ/γ′ MICROSTRUCTURE · NETWORK ANALYSIS</text>
      <text x="210" y="11" font-family="monospace" font-size="4" fill="rgba(255,255,255,0.5)">NI-BASE SUPERALLOY · SEM 15kV · IE 532</text>
      <circle cx="366" cy="8" r="2" fill="${green}"/>

      <!-- ═══ PANEL 1: SEM + Network overlay ═══ -->
      <text x="6" y="27" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">NETWORK CONSTRUCTION · 851 NODES · k=8 NN</text>
      <rect x="6" y="30" width="162" height="120" fill="${ink}" opacity="0.04" stroke="${dimLine}" stroke-width="0.4"/>
      
      <!-- Simulated SEM background texture -->
      <rect x="6" y="30" width="162" height="120" fill="${ink}" opacity="0.03"/>
      
      <!-- Particle bodies (γ' precipitates) -->
      ${p1Particles}
      
      <!-- Network edges -->
      ${p1Edges}
      
      <!-- Node centroids -->
      ${p1Nodes}

      <!-- SparkX cut label -->
      <text x="92" y="155" text-anchor="middle" font-family="monospace" font-size="3" fill="${accent}">◈ SPARKX CUT EDGES (λ=3)</text>
      
      <!-- Scale bar -->
      <line x1="120" y1="145" x2="155" y2="145" stroke="${ink}" stroke-width="0.8"/>
      <line x1="120" y1="143" x2="120" y2="147" stroke="${ink}" stroke-width="0.5"/>
      <line x1="155" y1="143" x2="155" y2="147" stroke="${ink}" stroke-width="0.5"/>
      <text x="137" y="143" text-anchor="middle" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">5 μm</text>

      <!-- ═══ PANEL 2: Win communities + SparkX ═══ -->
      <text x="${metricsL}" y="27" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">WIN COMMUNITIES · Q=0.76 · 9 DOMAINS</text>
      <rect x="${metricsL}" y="30" width="162" height="120" fill="${ink}" opacity="0.02" stroke="${dimLine}" stroke-width="0.4"/>
      
      ${p2Edges}
      ${p2Particles}

      <!-- Community legend -->
      ${commColors.slice(0, 5).map((c, i) => 
        '<rect x="' + (metricsL + 4 + i * 22) + '" y="152" width="8" height="4" fill="' + c + '" opacity="0.6"/><text x="' + (metricsL + 14 + i * 22) + '" y="155.5" font-family="monospace" font-size="2.5" fill="' + ink + '" opacity="0.4">C' + i + '</text>'
      ).join('')}
      <text x="${metricsL + 120}" y="155.5" font-family="monospace" font-size="2.5" fill="${accent}">— SPARKX CUT</text>

      <!-- ═══ PANEL 3: Degree distribution ═══ -->
      <text x="6" y="166" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">DEGREE DISTRIBUTION · AVG k̄ = 8.3</text>
      <rect x="${histL}" y="${histT}" width="${histR - histL}" height="${histB - histT}" fill="none" stroke="${dimLine}" stroke-width="0.4"/>
      ${degBins.map((v, i) => {
        if (v === 0) return '';
        const bw = (histR - histL) / degBins.length;
        const x = histL + i * bw;
        const h = (v / maxBinVal) * (histB - histT - 4);
        return '<rect x="' + (x + 0.5).toFixed(1) + '" y="' + (histB - h - 1).toFixed(1) + '" width="' + (bw - 1).toFixed(1) + '" height="' + h.toFixed(1) + '" fill="' + blue + '" opacity="0.5"/>';
      }).join('')}
      <!-- Mean line -->
      <line x1="${histL + (8.3 / (maxDeg + 1)) * (histR - histL)}" y1="${histT}" x2="${histL + (8.3 / (maxDeg + 1)) * (histR - histL)}" y2="${histB}" stroke="${accent}" stroke-width="0.5" stroke-dasharray="2,1.5"/>
      <text x="${histL + (8.3 / (maxDeg + 1)) * (histR - histL) + 2}" y="${histT + 6}" font-family="monospace" font-size="2.5" fill="${accent}">k̄=8.3</text>

      <!-- ═══ PANEL 4: Key metrics table ═══ -->
      <text x="${metricsL}" y="166" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">KEY NETWORK METRICS</text>
      <rect x="${metricsL}" y="${histT}" width="200" height="${histB - histT}" fill="none" stroke="${dimLine}" stroke-width="0.4"/>
      
      <!-- Row 1 -->
      <text x="${metricsL + 4}" y="177" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">PARTICLES</text>
      <text x="${metricsL + 50}" y="177" font-family="monospace" font-size="4" fill="${ink}" font-weight="bold">851</text>
      <text x="${metricsL + 72}" y="177" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">EDGES</text>
      <text x="${metricsL + 100}" y="177" font-family="monospace" font-size="4" fill="${ink}" font-weight="bold">3,529</text>
      <text x="${metricsL + 132}" y="177" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">DENSITY</text>
      <text x="${metricsL + 168}" y="177" font-family="monospace" font-size="4" fill="${ink}" font-weight="bold">0.98%</text>

      <line x1="${metricsL}" y1="180" x2="${metricsL + 200}" y2="180" stroke="${dimLine}" stroke-width="0.3"/>
      
      <!-- Row 2 -->
      <text x="${metricsL + 4}" y="188" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">CLUSTER C</text>
      <text x="${metricsL + 50}" y="188" font-family="monospace" font-size="4" fill="${ink}" font-weight="bold">0.53</text>
      <text x="${metricsL + 72}" y="188" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">MOD. Q</text>
      <text x="${metricsL + 100}" y="188" font-family="monospace" font-size="4" fill="${accent}" font-weight="bold">0.76</text>
      <text x="${metricsL + 132}" y="188" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">COMMS</text>
      <text x="${metricsL + 168}" y="188" font-family="monospace" font-size="4" fill="${ink}" font-weight="bold">9</text>

      <line x1="${metricsL}" y1="191" x2="${metricsL + 200}" y2="191" stroke="${dimLine}" stroke-width="0.3"/>
      
      <!-- Row 3 -->
      <text x="${metricsL + 4}" y="199" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">MIN-CUT λ</text>
      <text x="${metricsL + 50}" y="199" font-family="monospace" font-size="4" fill="${accent}" font-weight="bold">3</text>
      <text x="${metricsL + 72}" y="199" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">d̄ PART</text>
      <text x="${metricsL + 100}" y="199" font-family="monospace" font-size="4" fill="${ink}" font-weight="bold">408nm</text>
      <text x="${metricsL + 132}" y="199" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">Vf γ′</text>
      <text x="${metricsL + 168}" y="199" font-family="monospace" font-size="4" fill="${ink}" font-weight="bold">58.3%</text>

      <line x1="${metricsL}" y1="202" x2="${metricsL + 200}" y2="202" stroke="${dimLine}" stroke-width="0.3"/>
      
      <!-- Row 4: Conclusions -->
      <text x="${metricsL + 4}" y="209" font-family="monospace" font-size="3" fill="${accent}">◈ ACTIVE RAFTING · 33% ELONGATED · SECONDARY CREEP</text>
      <text x="${metricsL + 4}" y="215" font-family="monospace" font-size="3" fill="${accent}">◈ CUT CHANNELS: 504—662nm · VULN RATIO 0.90</text>

      <!-- Footer -->
      <rect x="0" y="226" width="380" height="14" fill="${ink}"/>
      <text x="6" y="234" font-family="monospace" font-size="4" fill="rgba(255,255,255,0.5)">PYTHON · NetworkX · scikit-image · WATERSHED</text>
      <text x="200" y="234" font-family="monospace" font-size="3.5" fill="rgba(255,255,255,0.4)">851 γ′ · k=8 NN · STOER-WAGNER · LOUVAIN</text>
      <text x="374" y="234" text-anchor="end" font-family="monospace" font-size="3.5" fill="${accent}">IE 532 · A</text>
    </svg>`;
  },

  /* ---------- 06 Disc Brake System — Scientific Schematic ----------
     Caliper-disc assembly with animated clamping + FEA thermal heatmap.
     Suprith owned braking subsystem for Team Helios Racing. */
  atv: (opts = {}) => {
    const { fill = '#2A2824', accent = '#E8551C' } = opts;
    const ink = '#2A2824';
    const p = '#FBF9F3';
    const dimLine = '#C9C2B0';
    const green = '#2F7A3E';
    const blue = '#1F6FBF';

    return `<svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="380" height="260" fill="${p}" stroke="${ink}" stroke-width="0.8"/>

      <!-- Header -->
      <rect x="0" y="0" width="380" height="16" fill="${ink}"/>
      <text x="6" y="11" font-family="monospace" font-size="5" fill="${p}" font-weight="600">DISC BRAKE ASSEMBLY · TEAM HELIOS RACING</text>
      <text x="240" y="11" font-family="monospace" font-size="4" fill="rgba(255,255,255,0.5)">ESI 2020 · NATIONAL CHAMPION · BRAKING SUB</text>
      <circle cx="366" cy="8" r="2" fill="${green}"/>

      <!-- ═══ LEFT: Disc brake cross-section schematic ═══ -->
      <text x="10" y="30" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">CALIPER-DISC ASSEMBLY · CROSS SECTION</text>

      <!-- Mounting bracket -->
      <rect x="36" y="44" width="12" height="120" fill="${ink}" opacity="0.12" stroke="${ink}" stroke-width="0.8"/>
      <text x="42" y="170" text-anchor="middle" font-family="monospace" font-size="3" fill="${ink}" opacity="0.4">BRACKET</text>
      <!-- Mounting bolts -->
      <circle cx="42" cy="54" r="3" fill="none" stroke="${ink}" stroke-width="0.8"/>
      <circle cx="42" cy="54" r="1" fill="${ink}"/>
      <circle cx="42" cy="154" r="3" fill="none" stroke="${ink}" stroke-width="0.8"/>
      <circle cx="42" cy="154" r="1" fill="${ink}"/>

      <!-- Brake disc (rotor) — center -->
      <rect x="88" y="38" width="8" height="132" fill="${ink}" opacity="0.15" stroke="${ink}" stroke-width="1"/>
      <!-- Disc ventilation slots -->
      <line x1="90" y1="48" x2="94" y2="48" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="58" x2="94" y2="58" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="68" x2="94" y2="68" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="78" x2="94" y2="78" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="88" x2="94" y2="88" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="98" x2="94" y2="98" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="108" x2="94" y2="108" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="118" x2="94" y2="118" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="128" x2="94" y2="128" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="138" x2="94" y2="138" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="148" x2="94" y2="148" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <line x1="90" y1="158" x2="94" y2="158" stroke="${ink}" stroke-width="0.4" opacity="0.5"/>
      <text x="92" y="178" text-anchor="middle" font-family="monospace" font-size="3" fill="${ink}" opacity="0.5">DISC</text>

      <!-- Inner pad (left of disc) — animated clamp -->
      <rect x="76" y="58" width="10" height="92" fill="${accent}" opacity="0.3" stroke="${accent}" stroke-width="0.8">
        <animate attributeName="x" values="76;82;76" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
      </rect>
      <!-- Outer pad (right of disc) — animated clamp -->
      <rect x="98" y="58" width="10" height="92" fill="${accent}" opacity="0.3" stroke="${accent}" stroke-width="0.8">
        <animate attributeName="x" values="98;94;98" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
      </rect>
      <text x="72" y="185" text-anchor="middle" font-family="monospace" font-size="3" fill="${accent}">INNER PAD</text>
      <text x="112" y="185" text-anchor="middle" font-family="monospace" font-size="3" fill="${accent}">OUTER PAD</text>

      <!-- Caliper body -->
      <path d="M 58 50 L 58 158 L 126 158 L 126 50 Z" fill="none" stroke="${ink}" stroke-width="1.2"/>
      <path d="M 58 50 Q 58 40 68 40 L 116 40 Q 126 40 126 50" fill="none" stroke="${ink}" stroke-width="1.2"/>
      <text x="92" y="46" text-anchor="middle" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">CALIPER</text>

      <!-- Piston (hydraulic) — animated -->
      <rect x="58" y="78" width="16" height="24" fill="${ink}" opacity="0.25" stroke="${ink}" stroke-width="0.6">
        <animate attributeName="width" values="16;10;16" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
      </rect>
      <text x="50" y="93" text-anchor="end" font-family="monospace" font-size="3" fill="${ink}" opacity="0.5">PISTON</text>

      <!-- Hydraulic line -->
      <path d="M 58 90 L 30 90 L 30 200 L 70 200" fill="none" stroke="${ink}" stroke-width="1" stroke-dasharray="3,2"/>
      <text x="34" y="198" font-family="monospace" font-size="3" fill="${ink}" opacity="0.5">HYDRAULIC LINE</text>

      <!-- Brake pedal indicator -->
      <rect x="70" y="194" width="50" height="14" fill="${accent}" opacity="0.15" stroke="${accent}" stroke-width="0.6">
        <animate attributeName="opacity" values="0.15;0.5;0.15" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
      </rect>
      <text x="95" y="203" text-anchor="middle" font-family="monospace" font-size="4" fill="${accent}" font-weight="bold">PEDAL PRESS</text>

      <!-- Force arrows (animated) -->
      <g opacity="0.7">
        <line x1="70" y1="104" x2="78" y2="104" stroke="${accent}" stroke-width="1.2" marker-end="url(#arrowR)">
          <animate attributeName="x2" values="78;84;78" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
        </line>
        <line x1="114" y1="104" x2="106" y2="104" stroke="${accent}" stroke-width="1.2" marker-end="url(#arrowL)">
          <animate attributeName="x2" values="106;100;106" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
        </line>
        <text x="92" y="100" text-anchor="middle" font-family="monospace" font-size="3" fill="${accent}">F_CLAMP</text>
      </g>

      <!-- Arrow markers -->
      <defs>
        <marker id="arrowR" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <path d="M0,0 L4,2 L0,4" fill="${accent}"/>
        </marker>
        <marker id="arrowL" markerWidth="4" markerHeight="4" refX="1" refY="2" orient="auto">
          <path d="M4,0 L0,2 L4,4" fill="${accent}"/>
        </marker>
      </defs>

      <!-- Dimension lines -->
      <line x1="88" y1="34" x2="96" y2="34" stroke="${ink}" stroke-width="0.4"/>
      <line x1="88" y1="32" x2="88" y2="36" stroke="${ink}" stroke-width="0.4"/>
      <line x1="96" y1="32" x2="96" y2="36" stroke="${ink}" stroke-width="0.4"/>
      <text x="92" y="32" text-anchor="middle" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">8mm</text>

      <!-- ═══ RIGHT: FEA Thermal / Stress Heatmap ═══ -->
      <text x="152" y="30" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">FEA · FORCE-DEFORMATION HEATMAP · DISC FACE</text>

      <!-- Disc face (front view) as circle -->
      <circle cx="260" cy="110" r="68" fill="none" stroke="${ink}" stroke-width="1"/>
      <circle cx="260" cy="110" r="24" fill="${p}" stroke="${ink}" stroke-width="0.6"/>
      <!-- Hub bolts -->
      <circle cx="260" cy="90" r="2" fill="${ink}" opacity="0.5"/>
      <circle cx="260" cy="130" r="2" fill="${ink}" opacity="0.5"/>
      <circle cx="244" cy="102" r="2" fill="${ink}" opacity="0.5"/>
      <circle cx="276" cy="102" r="2" fill="${ink}" opacity="0.5"/>
      <circle cx="244" cy="118" r="2" fill="${ink}" opacity="0.5"/>
      <circle cx="276" cy="118" r="2" fill="${ink}" opacity="0.5"/>

      <!-- Heatmap rings (concentric gradient simulation) -->
      <!-- Outer ring — cool (low stress) -->
      <circle cx="260" cy="110" r="64" fill="none" stroke="#1F6FBF" stroke-width="8" opacity="0.15"/>
      <!-- Mid-outer ring -->
      <circle cx="260" cy="110" r="56" fill="none" stroke="#1F6FBF" stroke-width="8" opacity="0.25"/>
      <!-- Mid ring — warm transition -->
      <circle cx="260" cy="110" r="48" fill="none" stroke="#E8B81C" stroke-width="8" opacity="0.25"/>
      <!-- Inner-mid ring — hot -->
      <circle cx="260" cy="110" r="40" fill="none" stroke="${accent}" stroke-width="8" opacity="0.35"/>
      <!-- Inner ring — hottest (pad contact zone) -->
      <circle cx="260" cy="110" r="32" fill="none" stroke="${accent}" stroke-width="6" opacity="0.55">
        <animate attributeName="opacity" values="0.55;0.8;0.55" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
      </circle>

      <!-- Pad contact arc (where calipers clamp) — highlighted -->
      <path d="M 260 42 A 68 68 0 0 1 328 110" fill="none" stroke="${accent}" stroke-width="2" opacity="0.7" stroke-dasharray="3,2">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
      </path>
      <text x="332" y="78" font-family="monospace" font-size="3" fill="${accent}">PAD CONTACT</text>
      <text x="332" y="84" font-family="monospace" font-size="3" fill="${accent}">ZONE</text>

      <!-- Ventilation slots on disc face -->
      ${Array.from({length: 12}, (_, i) => {
        const ang = (i / 12) * Math.PI * 2;
        const r1 = 28, r2 = 62;
        const x1 = 260 + Math.cos(ang) * r1;
        const y1 = 110 + Math.sin(ang) * r1;
        const x2 = 260 + Math.cos(ang) * r2;
        const y2 = 110 + Math.sin(ang) * r2;
        return '<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+ink+'" stroke-width="0.3" opacity="0.2"/>';
      }).join('')}

      <!-- Heatmap legend -->
      <rect x="340" y="50" width="8" height="12" fill="#1F6FBF" opacity="0.2"/>
      <rect x="340" y="62" width="8" height="12" fill="#1F6FBF" opacity="0.35"/>
      <rect x="340" y="74" width="8" height="12" fill="#E8B81C" opacity="0.35"/>
      <rect x="340" y="86" width="8" height="12" fill="${accent}" opacity="0.45"/>
      <rect x="340" y="98" width="8" height="12" fill="${accent}" opacity="0.7"/>
      <text x="352" y="57" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">0 MPa</text>
      <text x="352" y="76" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">85</text>
      <text x="352" y="95" font-family="monospace" font-size="2.5" fill="${ink}" opacity="0.5">170</text>
      <text x="352" y="108" font-family="monospace" font-size="2.5" fill="${accent}">250 MPa</text>
      <text x="344" y="46" font-family="monospace" font-size="3" fill="${ink}" opacity="0.4">σ_vM</text>

      <!-- Max deformation callout -->
      <circle cx="260" cy="78" r="4" fill="none" stroke="${accent}" stroke-width="0.8" stroke-dasharray="1.5,1">
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <line x1="264" y1="75" x2="300" y2="55" stroke="${accent}" stroke-width="0.5"/>
      <text x="302" y="53" font-family="monospace" font-size="3" fill="${accent}">δ_MAX = 0.042mm</text>
      <text x="302" y="59" font-family="monospace" font-size="3" fill="${accent}">σ_vM = 247 MPa</text>

      <!-- Spec table bottom -->
      <line x1="152" y1="190" x2="370" y2="190" stroke="${dimLine}" stroke-width="0.4"/>
      <text x="152" y="200" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">MATERIAL</text>
      <text x="200" y="200" font-family="monospace" font-size="3.5" fill="${ink}">GREY CAST IRON · FC250</text>
      <text x="152" y="210" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">OD / ID</text>
      <text x="200" y="210" font-family="monospace" font-size="3.5" fill="${ink}">Ø220mm / Ø120mm</text>
      <text x="152" y="220" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">PAD μ</text>
      <text x="200" y="220" font-family="monospace" font-size="3.5" fill="${ink}">0.38 (semi-metallic)</text>
      <text x="280" y="200" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">CLAMP F</text>
      <text x="320" y="200" font-family="monospace" font-size="3.5" fill="${ink}">8.2 kN</text>
      <text x="280" y="210" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">TORQUE</text>
      <text x="320" y="210" font-family="monospace" font-size="3.5" fill="${ink}">342 Nm</text>
      <text x="280" y="220" font-family="monospace" font-size="3.5" fill="${ink}" opacity="0.5">TEMP</text>
      <text x="320" y="220" font-family="monospace" font-size="3.5" fill="${ink}">T_max 680°C</text>

      <!-- Footer -->
      <rect x="0" y="246" width="380" height="14" fill="${ink}"/>
      <text x="6" y="254" font-family="monospace" font-size="4" fill="rgba(255,255,255,0.5)">SOLIDWORKS · ANSYS WORKBENCH · DFM/DFA · DFMEA</text>
      <text x="240" y="254" font-family="monospace" font-size="3.5" fill="rgba(255,255,255,0.4)">TEAM HELIOS · 60 MEMBERS · 4 DESIGN CYCLES</text>
      <text x="374" y="254" text-anchor="end" font-family="monospace" font-size="3.5" fill="${accent}">◈ CHAMPION</text>
    </svg>`;
  }
};


/* Unified getter — prefers TransformerIllus from the design system,
   falls back to ExtraIllus for portfolio-specific diagrams. */
window.getIllus = function (type, opts = {}) {
  if (window.TransformerIllus && window.TransformerIllus[type]) {
    return window.TransformerIllus[type](opts);
  }
  if (window.ExtraIllus && window.ExtraIllus[type]) {
    return window.ExtraIllus[type](opts);
  }
  return '';
};
