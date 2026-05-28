// Detailed transformer illustrations — each is a technical/isometric SVG
// Rendered in ink-on-paper style with accent color highlights for live parts

window.TransformerIllus = {
  padmount: (opts = {}) => {
    // Pad-mount: olive-drab enclosure, 3-phase live-front, hinged doors
    const { fill = '#2A2824', accent = '#E8551C', bg = '#EAE5DA' } = opts;
    return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <!-- concrete pad -->
      <rect x="10" y="115" width="180" height="10" fill="#C9C2B0" stroke="${fill}" stroke-width="0.8"/>
      <line x1="10" y1="120" x2="190" y2="120" stroke="${fill}" stroke-width="0.3" stroke-dasharray="2,2"/>
      <!-- back shadow face -->
      <path d="M 40 40 L 160 40 L 160 115 L 40 115 Z" fill="${fill}" opacity="0.12"/>
      <!-- main cabinet -->
      <rect x="35" y="35" width="125" height="80" fill="#8C9278" stroke="${fill}" stroke-width="1.2"/>
      <!-- side face -->
      <path d="M 160 35 L 175 27 L 175 107 L 160 115 Z" fill="#6F7560" stroke="${fill}" stroke-width="1.2"/>
      <!-- top cap -->
      <path d="M 35 35 L 50 27 L 175 27 L 160 35 Z" fill="#A8AE94" stroke="${fill}" stroke-width="1.2"/>
      <!-- door seam center -->
      <line x1="97.5" y1="40" x2="97.5" y2="110" stroke="${fill}" stroke-width="0.8"/>
      <!-- door handles -->
      <rect x="88" y="70" width="6" height="14" fill="none" stroke="${fill}" stroke-width="1"/>
      <rect x="101" y="70" width="6" height="14" fill="none" stroke="${fill}" stroke-width="1"/>
      <!-- pentahead bolts -->
      <circle cx="91" cy="77" r="1" fill="${fill}"/>
      <circle cx="104" cy="77" r="1" fill="${fill}"/>
      <!-- left door panel (HV compartment) indicator strip -->
      <rect x="42" y="42" width="48" height="8" fill="none" stroke="${fill}" stroke-width="0.6"/>
      <text x="44" y="48" font-family="monospace" font-size="4" fill="${fill}">HV COMPARTMENT</text>
      <!-- right door (LV) -->
      <rect x="105" y="42" width="48" height="8" fill="none" stroke="${fill}" stroke-width="0.6"/>
      <text x="107" y="48" font-family="monospace" font-size="4" fill="${fill}">LV COMPARTMENT</text>
      <!-- nameplate -->
      <rect x="125" y="90" width="28" height="16" fill="#DDD8C4" stroke="${fill}" stroke-width="0.5"/>
      <line x1="127" y1="94" x2="151" y2="94" stroke="${fill}" stroke-width="0.3"/>
      <line x1="127" y1="97" x2="151" y2="97" stroke="${fill}" stroke-width="0.3"/>
      <line x1="127" y1="100" x2="151" y2="100" stroke="${fill}" stroke-width="0.3"/>
      <line x1="127" y1="103" x2="143" y2="103" stroke="${fill}" stroke-width="0.3"/>
      <!-- warning triangle -->
      <polygon points="48,96 58,96 53,87" fill="#E8B81C" stroke="${fill}" stroke-width="0.8"/>
      <text x="51.5" y="94" font-family="monospace" font-size="5" fill="${fill}" font-weight="bold">!</text>
      <!-- ground pad bolts -->
      <circle cx="45" cy="113" r="1.5" fill="${fill}"/>
      <circle cx="150" cy="113" r="1.5" fill="${fill}"/>
      <!-- hv/lv labels tiny -->
    </svg>`;
  },

  polemount: (opts = {}) => {
    const { fill = '#2A2824', accent = '#E8551C' } = opts;
    return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <!-- pole -->
      <rect x="95" y="10" width="10" height="125" fill="#8A7855" stroke="${fill}" stroke-width="0.8"/>
      <line x1="97" y1="10" x2="97" y2="135" stroke="${fill}" stroke-width="0.3"/>
      <line x1="103" y1="10" x2="103" y2="135" stroke="${fill}" stroke-width="0.3"/>
      <!-- crossarm -->
      <rect x="35" y="20" width="130" height="6" fill="#8A7855" stroke="${fill}" stroke-width="0.8"/>
      <!-- insulators -->
      <g fill="#DDD8C4" stroke="${fill}" stroke-width="0.6">
        <path d="M 50 13 L 48 20 L 52 20 Z M 49 14 L 51 14 M 48.5 16 L 51.5 16"/>
        <path d="M 100 13 L 98 20 L 102 20 Z M 99 14 L 101 14 M 98.5 16 L 101.5 16"/>
        <path d="M 150 13 L 148 20 L 152 20 Z M 149 14 L 151 14 M 148.5 16 L 151.5 16"/>
      </g>
      <!-- primary lines -->
      <line x1="10" y1="13" x2="190" y2="13" stroke="${fill}" stroke-width="1"/>
      <line x1="10" y1="15" x2="50" y2="15" stroke="${fill}" stroke-width="0.5"/>
      <line x1="150" y1="15" x2="190" y2="15" stroke="${fill}" stroke-width="0.5"/>
      <!-- transformer can (cylindrical) -->
      <ellipse cx="140" cy="58" rx="22" ry="5" fill="#6E7564" stroke="${fill}" stroke-width="0.8"/>
      <rect x="118" y="58" width="44" height="48" fill="#8C9278" stroke="${fill}" stroke-width="1.2"/>
      <ellipse cx="140" cy="106" rx="22" ry="5" fill="#5C6255" stroke="${fill}" stroke-width="0.8"/>
      <!-- cooling ribs -->
      <line x1="120" y1="62" x2="160" y2="62" stroke="${fill}" stroke-width="0.3"/>
      <line x1="120" y1="70" x2="160" y2="70" stroke="${fill}" stroke-width="0.3"/>
      <line x1="120" y1="78" x2="160" y2="78" stroke="${fill}" stroke-width="0.3"/>
      <line x1="120" y1="86" x2="160" y2="86" stroke="${fill}" stroke-width="0.3"/>
      <line x1="120" y1="94" x2="160" y2="94" stroke="${fill}" stroke-width="0.3"/>
      <line x1="120" y1="102" x2="160" y2="102" stroke="${fill}" stroke-width="0.3"/>
      <!-- HV bushing -->
      <rect x="130" y="40" width="4" height="18" fill="#DDD8C4" stroke="${fill}" stroke-width="0.5"/>
      <rect x="129" y="42" width="6" height="1.5" fill="${fill}"/>
      <rect x="129" y="46" width="6" height="1.5" fill="${fill}"/>
      <rect x="129" y="50" width="6" height="1.5" fill="${fill}"/>
      <circle cx="132" cy="38" r="1.5" fill="${fill}"/>
      <!-- LV bushings -->
      <rect x="144" y="50" width="3" height="10" fill="#DDD8C4" stroke="${fill}" stroke-width="0.4"/>
      <rect x="150" y="50" width="3" height="10" fill="#DDD8C4" stroke="${fill}" stroke-width="0.4"/>
      <rect x="156" y="50" width="3" height="10" fill="#DDD8C4" stroke="${fill}" stroke-width="0.4"/>
      <!-- connection wire HV -->
      <path d="M 100 13 Q 116 18 132 38" fill="none" stroke="${fill}" stroke-width="0.8"/>
      <!-- mounting brackets to pole -->
      <rect x="100" y="72" width="20" height="3" fill="${fill}"/>
      <rect x="100" y="92" width="20" height="3" fill="${fill}"/>
      <!-- tag -->
      <rect x="123" y="72" width="14" height="8" fill="#DDD8C4" stroke="${fill}" stroke-width="0.4"/>
    </svg>`;
  },

  substation: (opts = {}) => {
    const { fill = '#2A2824' } = opts;
    return `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
      <!-- pad -->
      <rect x="10" y="120" width="200" height="8" fill="#C9C2B0" stroke="${fill}" stroke-width="0.8"/>
      <!-- main tank body -->
      <rect x="45" y="55" width="110" height="65" fill="#7A6F55" stroke="${fill}" stroke-width="1.2"/>
      <!-- top lid with flanges -->
      <rect x="42" y="50" width="116" height="6" fill="#928870" stroke="${fill}" stroke-width="1"/>
      <!-- radiators left -->
      <g fill="#6F6550" stroke="${fill}" stroke-width="0.6">
        <rect x="30" y="65" width="15" height="50"/>
        <line x1="33" y1="65" x2="33" y2="115" stroke="${fill}" stroke-width="0.3"/>
        <line x1="36" y1="65" x2="36" y2="115" stroke="${fill}" stroke-width="0.3"/>
        <line x1="39" y1="65" x2="39" y2="115" stroke="${fill}" stroke-width="0.3"/>
        <line x1="42" y1="65" x2="42" y2="115" stroke="${fill}" stroke-width="0.3"/>
      </g>
      <!-- radiators right -->
      <g fill="#6F6550" stroke="${fill}" stroke-width="0.6">
        <rect x="155" y="65" width="15" height="50"/>
        <line x1="158" y1="65" x2="158" y2="115" stroke="${fill}" stroke-width="0.3"/>
        <line x1="161" y1="65" x2="161" y2="115" stroke="${fill}" stroke-width="0.3"/>
        <line x1="164" y1="65" x2="164" y2="115" stroke="${fill}" stroke-width="0.3"/>
        <line x1="167" y1="65" x2="167" y2="115" stroke="${fill}" stroke-width="0.3"/>
      </g>
      <!-- fans -->
      <g stroke="${fill}" stroke-width="0.6" fill="#DDD8C4">
        <circle cx="37.5" cy="100" r="5"/>
        <line x1="37.5" y1="95" x2="37.5" y2="105"/>
        <line x1="32.5" y1="100" x2="42.5" y2="100"/>
        <circle cx="162.5" cy="100" r="5"/>
        <line x1="162.5" y1="95" x2="162.5" y2="105"/>
        <line x1="157.5" y1="100" x2="167.5" y2="100"/>
      </g>
      <!-- HV bushings - tall porcelain -->
      <g fill="#E8E3D0" stroke="${fill}" stroke-width="0.7">
        <path d="M 60 14 L 57 50 L 65 50 L 62 14 Z"/>
        <path d="M 80 14 L 77 50 L 85 50 L 82 14 Z"/>
        <path d="M 100 14 L 97 50 L 105 50 L 102 14 Z"/>
      </g>
      <!-- bushing skirts -->
      <g stroke="${fill}" stroke-width="0.4" fill="none">
        <line x1="58" y1="22" x2="64" y2="22"/><line x1="58" y1="28" x2="64" y2="28"/><line x1="58" y1="34" x2="64" y2="34"/><line x1="58" y1="40" x2="64" y2="40"/>
        <line x1="78" y1="22" x2="84" y2="22"/><line x1="78" y1="28" x2="84" y2="28"/><line x1="78" y1="34" x2="84" y2="34"/><line x1="78" y1="40" x2="84" y2="40"/>
        <line x1="98" y1="22" x2="104" y2="22"/><line x1="98" y1="28" x2="104" y2="28"/><line x1="98" y1="34" x2="104" y2="34"/><line x1="98" y1="40" x2="104" y2="40"/>
      </g>
      <!-- top terminals -->
      <circle cx="61" cy="12" r="2" fill="${fill}"/>
      <circle cx="81" cy="12" r="2" fill="${fill}"/>
      <circle cx="101" cy="12" r="2" fill="${fill}"/>
      <!-- LV smaller bushings -->
      <g fill="#E8E3D0" stroke="${fill}" stroke-width="0.5">
        <path d="M 128 35 L 126 50 L 132 50 L 130 35 Z"/>
        <path d="M 142 35 L 140 50 L 146 50 L 144 35 Z"/>
      </g>
      <!-- conservator tank (cylinder top-right) -->
      <ellipse cx="125" cy="48" rx="14" ry="4" fill="#928870" stroke="${fill}" stroke-width="0.8"/>
      <rect x="111" y="48" width="28" height="4" fill="#7A6F55" stroke="${fill}" stroke-width="0.8"/>
      <ellipse cx="125" cy="52" rx="14" ry="4" fill="#5C5342" stroke="${fill}" stroke-width="0.8"/>
      <!-- control cabinet -->
      <rect x="70" y="95" width="22" height="25" fill="#555449" stroke="${fill}" stroke-width="0.8"/>
      <line x1="81" y1="95" x2="81" y2="120" stroke="${fill}" stroke-width="0.4"/>
      <circle cx="79" cy="107" r="0.8" fill="${fill}"/>
      <circle cx="83" cy="107" r="0.8" fill="${fill}"/>
      <!-- nameplate -->
      <rect x="115" y="85" width="32" height="22" fill="#E8E3D0" stroke="${fill}" stroke-width="0.5"/>
      <line x1="117" y1="90" x2="145" y2="90" stroke="${fill}" stroke-width="0.3"/>
      <line x1="117" y1="94" x2="145" y2="94" stroke="${fill}" stroke-width="0.3"/>
      <line x1="117" y1="98" x2="145" y2="98" stroke="${fill}" stroke-width="0.3"/>
      <line x1="117" y1="102" x2="140" y2="102" stroke="${fill}" stroke-width="0.3"/>
      <!-- ground connections -->
      <line x1="50" y1="120" x2="50" y2="128" stroke="${fill}" stroke-width="0.8"/>
      <line x1="150" y1="120" x2="150" y2="128" stroke="${fill}" stroke-width="0.8"/>
    </svg>`;
  },

  drytype: (opts = {}) => {
    const { fill = '#2A2824' } = opts;
    return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <!-- floor -->
      <line x1="10" y1="125" x2="190" y2="125" stroke="${fill}" stroke-width="0.8"/>
      <!-- ventilated enclosure -->
      <rect x="40" y="25" width="120" height="100" fill="#C9C2B0" stroke="${fill}" stroke-width="1.2"/>
      <!-- louver pattern top -->
      <g stroke="${fill}" stroke-width="0.4" fill="none">
        <line x1="45" y1="32" x2="155" y2="32"/>
        <line x1="45" y1="36" x2="155" y2="36"/>
        <line x1="45" y1="40" x2="155" y2="40"/>
        <line x1="45" y1="44" x2="155" y2="44"/>
      </g>
      <!-- center window showing coils -->
      <rect x="55" y="52" width="90" height="55" fill="#0E0E0C" stroke="${fill}" stroke-width="1"/>
      <!-- 3 coil stacks visible through window -->
      <g stroke="#E8E3D0" stroke-width="0.8" fill="none">
        <rect x="63" y="58" width="16" height="42" fill="#B89E6F" opacity="0.9"/>
        <rect x="92" y="58" width="16" height="42" fill="#B89E6F" opacity="0.9"/>
        <rect x="121" y="58" width="16" height="42" fill="#B89E6F" opacity="0.9"/>
      </g>
      <!-- coil windings texture -->
      <g stroke="${fill}" stroke-width="0.25" fill="none">
        ${Array.from({length: 20}, (_,i) => `<line x1="63" y1="${60+i*2}" x2="79" y2="${60+i*2}"/>`).join('')}
        ${Array.from({length: 20}, (_,i) => `<line x1="92" y1="${60+i*2}" x2="108" y2="${60+i*2}"/>`).join('')}
        ${Array.from({length: 20}, (_,i) => `<line x1="121" y1="${60+i*2}" x2="137" y2="${60+i*2}"/>`).join('')}
      </g>
      <!-- iron core showing between coils -->
      <rect x="79" y="55" width="4" height="48" fill="#555449" stroke="${fill}" stroke-width="0.3"/>
      <rect x="108" y="55" width="4" height="48" fill="#555449" stroke="${fill}" stroke-width="0.3"/>
      <!-- louver bottom -->
      <g stroke="${fill}" stroke-width="0.4" fill="none">
        <line x1="45" y1="112" x2="155" y2="112"/>
        <line x1="45" y1="116" x2="155" y2="116"/>
        <line x1="45" y1="120" x2="155" y2="120"/>
      </g>
      <!-- corner bolts -->
      <circle cx="44" cy="29" r="1" fill="${fill}"/>
      <circle cx="156" cy="29" r="1" fill="${fill}"/>
      <circle cx="44" cy="121" r="1" fill="${fill}"/>
      <circle cx="156" cy="121" r="1" fill="${fill}"/>
      <!-- lifting eye -->
      <path d="M 95 25 Q 95 18 100 18 Q 105 18 105 25" fill="none" stroke="${fill}" stroke-width="1"/>
      <!-- nameplate -->
      <rect x="110" y="112" width="30" height="8" fill="#E8E3D0" stroke="${fill}" stroke-width="0.3"/>
      <!-- DANGER label -->
      <rect x="60" y="112" width="30" height="8" fill="#D9392F" stroke="${fill}" stroke-width="0.3"/>
      <text x="62" y="118" font-family="monospace" font-size="5" fill="#FFF" font-weight="bold">DANGER HV</text>
    </svg>`;
  },

  unitsub: (opts = {}) => {
    const { fill = '#2A2824' } = opts;
    return `<svg viewBox="0 0 230 140" xmlns="http://www.w3.org/2000/svg">
      <!-- pad -->
      <rect x="5" y="122" width="220" height="8" fill="#C9C2B0" stroke="${fill}" stroke-width="0.8"/>
      <!-- HV switchgear (left section) -->
      <rect x="15" y="45" width="50" height="77" fill="#5A6A7A" stroke="${fill}" stroke-width="1.2"/>
      <rect x="20" y="52" width="18" height="25" fill="#E8E3D0" stroke="${fill}" stroke-width="0.5"/>
      <rect x="42" y="52" width="18" height="25" fill="#E8E3D0" stroke="${fill}" stroke-width="0.5"/>
      <circle cx="29" cy="64" r="2" fill="#D9392F"/>
      <circle cx="51" cy="64" r="2" fill="#2F7A3E"/>
      <rect x="20" y="85" width="40" height="12" fill="none" stroke="${fill}" stroke-width="0.5"/>
      <text x="22" y="93" font-family="monospace" font-size="5" fill="${fill}">HV SECTION</text>
      <rect x="20" y="102" width="40" height="14" fill="none" stroke="${fill}" stroke-width="0.5"/>
      <!-- transformer (center section) integrated -->
      <rect x="65" y="35" width="80" height="87" fill="#7E8B6E" stroke="${fill}" stroke-width="1.2"/>
      <!-- bushings on top -->
      <g fill="#E8E3D0" stroke="${fill}" stroke-width="0.6">
        <path d="M 78 20 L 76 35 L 82 35 L 80 20 Z"/>
        <path d="M 95 20 L 93 35 L 99 35 L 97 20 Z"/>
        <path d="M 112 20 L 110 35 L 116 35 L 114 20 Z"/>
      </g>
      <g stroke="${fill}" stroke-width="0.3" fill="none">
        <line x1="77" y1="26" x2="81" y2="26"/><line x1="77" y1="30" x2="81" y2="30"/>
        <line x1="94" y1="26" x2="98" y2="26"/><line x1="94" y1="30" x2="98" y2="30"/>
        <line x1="111" y1="26" x2="115" y2="26"/><line x1="111" y1="30" x2="115" y2="30"/>
      </g>
      <!-- cooling radiator bank -->
      <g fill="#6D7960" stroke="${fill}" stroke-width="0.5">
        <rect x="128" y="48" width="14" height="55"/>
        <line x1="131" y1="48" x2="131" y2="103" stroke="${fill}" stroke-width="0.3"/>
        <line x1="134" y1="48" x2="134" y2="103" stroke="${fill}" stroke-width="0.3"/>
        <line x1="137" y1="48" x2="137" y2="103" stroke="${fill}" stroke-width="0.3"/>
      </g>
      <!-- nameplate -->
      <rect x="80" y="65" width="40" height="22" fill="#E8E3D0" stroke="${fill}" stroke-width="0.4"/>
      <line x1="82" y1="70" x2="118" y2="70" stroke="${fill}" stroke-width="0.3"/>
      <line x1="82" y1="74" x2="118" y2="74" stroke="${fill}" stroke-width="0.3"/>
      <line x1="82" y1="78" x2="118" y2="78" stroke="${fill}" stroke-width="0.3"/>
      <line x1="82" y1="82" x2="110" y2="82" stroke="${fill}" stroke-width="0.3"/>
      <!-- LV switchgear (right section) -->
      <rect x="148" y="45" width="70" height="77" fill="#4A545E" stroke="${fill}" stroke-width="1.2"/>
      <g fill="#E8E3D0" stroke="${fill}" stroke-width="0.5">
        <rect x="155" y="55" width="25" height="15"/>
        <rect x="183" y="55" width="25" height="15"/>
        <rect x="155" y="75" width="25" height="15"/>
        <rect x="183" y="75" width="25" height="15"/>
      </g>
      <!-- meter circles -->
      <g stroke="${fill}" stroke-width="0.5" fill="none">
        <circle cx="167" cy="62" r="4"/><line x1="167" y1="62" x2="169" y2="59"/>
        <circle cx="195" cy="62" r="4"/><line x1="195" y1="62" x2="193" y2="60"/>
        <circle cx="167" cy="82" r="4"/><line x1="167" y1="82" x2="170" y2="80"/>
        <circle cx="195" cy="82" r="4"/><line x1="195" y1="82" x2="197" y2="85"/>
      </g>
      <rect x="155" y="100" width="53" height="14" fill="none" stroke="${fill}" stroke-width="0.5"/>
      <text x="158" y="109" font-family="monospace" font-size="5" fill="#E8E3D0">LV DISTRIBUTION</text>
    </svg>`;
  },

  mobile: (opts = {}) => {
    const { fill = '#2A2824' } = opts;
    return `<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
      <!-- road -->
      <line x1="5" y1="128" x2="235" y2="128" stroke="${fill}" stroke-width="0.8"/>
      <line x1="5" y1="131" x2="235" y2="131" stroke="${fill}" stroke-width="0.3" stroke-dasharray="4,3"/>
      <!-- trailer deck -->
      <rect x="15" y="105" width="215" height="12" fill="#3A3833" stroke="${fill}" stroke-width="1"/>
      <!-- gooseneck front -->
      <path d="M 15 105 L 15 95 L 28 88 L 28 105 Z" fill="#3A3833" stroke="${fill}" stroke-width="1"/>
      <!-- transformer tank on trailer -->
      <rect x="80" y="55" width="90" height="50" fill="#7A6F55" stroke="${fill}" stroke-width="1.2"/>
      <rect x="77" y="51" width="96" height="5" fill="#928870" stroke="${fill}" stroke-width="0.8"/>
      <!-- radiators -->
      <g fill="#6F6550" stroke="${fill}" stroke-width="0.5">
        <rect x="68" y="63" width="11" height="38"/>
        <line x1="71" y1="63" x2="71" y2="101" stroke="${fill}" stroke-width="0.3"/>
        <line x1="74" y1="63" x2="74" y2="101" stroke="${fill}" stroke-width="0.3"/>
        <rect x="171" y="63" width="11" height="38"/>
        <line x1="174" y1="63" x2="174" y2="101" stroke="${fill}" stroke-width="0.3"/>
        <line x1="177" y1="63" x2="177" y2="101" stroke="${fill}" stroke-width="0.3"/>
      </g>
      <!-- bushings -->
      <g fill="#E8E3D0" stroke="${fill}" stroke-width="0.6">
        <path d="M 95 25 L 92 51 L 100 51 L 97 25 Z"/>
        <path d="M 115 25 L 112 51 L 120 51 L 117 25 Z"/>
        <path d="M 135 25 L 132 51 L 140 51 L 137 25 Z"/>
        <path d="M 155 38 L 153 51 L 158 51 L 156 38 Z"/>
      </g>
      <g stroke="${fill}" stroke-width="0.3" fill="none">
        <line x1="93" y1="32" x2="99" y2="32"/><line x1="93" y1="38" x2="99" y2="38"/><line x1="93" y1="44" x2="99" y2="44"/>
        <line x1="113" y1="32" x2="119" y2="32"/><line x1="113" y1="38" x2="119" y2="38"/><line x1="113" y1="44" x2="119" y2="44"/>
        <line x1="133" y1="32" x2="139" y2="32"/><line x1="133" y1="38" x2="139" y2="38"/><line x1="133" y1="44" x2="139" y2="44"/>
      </g>
      <!-- terminals -->
      <circle cx="96" cy="23" r="1.5" fill="${fill}"/>
      <circle cx="116" cy="23" r="1.5" fill="${fill}"/>
      <circle cx="136" cy="23" r="1.5" fill="${fill}"/>
      <!-- wheels -->
      <g fill="#0E0E0C" stroke="${fill}" stroke-width="0.6">
        <circle cx="40" cy="120" r="8"/>
        <circle cx="58" cy="120" r="8"/>
        <circle cx="190" cy="120" r="8"/>
        <circle cx="208" cy="120" r="8"/>
      </g>
      <g fill="#555449">
        <circle cx="40" cy="120" r="3"/>
        <circle cx="58" cy="120" r="3"/>
        <circle cx="190" cy="120" r="3"/>
        <circle cx="208" cy="120" r="3"/>
      </g>
      <!-- kingpin / hitch -->
      <rect x="19" y="88" width="10" height="3" fill="${fill}"/>
      <!-- control cabinet on trailer -->
      <rect x="32" y="75" width="22" height="30" fill="#5C5449" stroke="${fill}" stroke-width="0.8"/>
      <rect x="35" y="80" width="16" height="12" fill="#E8E3D0" stroke="${fill}" stroke-width="0.4"/>
      <!-- warning placard -->
      <rect x="180" y="88" width="24" height="14" fill="#E8B81C" stroke="${fill}" stroke-width="0.5" transform="rotate(45 192 95)"/>
      <!-- tie-down chains -->
      <line x1="85" y1="105" x2="80" y2="115" stroke="${fill}" stroke-width="0.6"/>
      <line x1="165" y1="105" x2="170" y2="115" stroke="${fill}" stroke-width="0.6"/>
    </svg>`;
  },

  refurb: (opts = {}) => {
    // Same as padmount but with "TESTED" stamp
    const base = window.TransformerIllus.padmount(opts);
    // Insert a stamp
    return base.replace('</svg>', `
      <g transform="translate(110, 58) rotate(-8)">
        <rect x="0" y="0" width="50" height="16" fill="none" stroke="#D9392F" stroke-width="1.2"/>
        <text x="3" y="11" font-family="monospace" font-size="8" fill="#D9392F" font-weight="bold">TESTED ✓</text>
      </g>
    </svg>`);
  },

  parts: (opts = {}) => {
    const { fill = '#2A2824' } = opts;
    return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <!-- shelf/pegboard -->
      <line x1="10" y1="20" x2="190" y2="20" stroke="${fill}" stroke-width="1"/>
      <line x1="10" y1="75" x2="190" y2="75" stroke="${fill}" stroke-width="1"/>
      <!-- bushings row -->
      <g fill="#E8E3D0" stroke="${fill}" stroke-width="0.7">
        <path d="M 25 25 L 23 70 L 31 70 L 29 25 Z"/>
        <path d="M 48 30 L 46 70 L 54 70 L 52 30 Z"/>
        <path d="M 70 22 L 68 70 L 76 70 L 74 22 Z"/>
      </g>
      <g stroke="${fill}" stroke-width="0.3" fill="none">
        ${[30,36,42,48,54,60,66].map(y => `<line x1="23" y1="${y}" x2="31" y2="${y}"/>`).join('')}
        ${[36,42,48,54,60,66].map(y => `<line x1="46" y1="${y}" x2="54" y2="${y}"/>`).join('')}
        ${[28,34,40,46,52,58,64].map(y => `<line x1="68" y1="${y}" x2="76" y2="${y}"/>`).join('')}
      </g>
      <!-- tap changer (box with dial) -->
      <rect x="95" y="35" width="35" height="35" fill="#5A6A7A" stroke="${fill}" stroke-width="1"/>
      <circle cx="112.5" cy="52" r="11" fill="#E8E3D0" stroke="${fill}" stroke-width="0.8"/>
      <g stroke="${fill}" stroke-width="0.4" fill="none">
        <line x1="112.5" y1="45" x2="112.5" y2="43"/>
        <line x1="117" y1="47" x2="118.5" y2="45.5"/>
        <line x1="119" y1="52" x2="121" y2="52"/>
        <line x1="117" y1="57" x2="118.5" y2="58.5"/>
        <line x1="112.5" y1="59" x2="112.5" y2="61"/>
        <line x1="108" y1="57" x2="106.5" y2="58.5"/>
        <line x1="106" y1="52" x2="104" y2="52"/>
        <line x1="108" y1="47" x2="106.5" y2="45.5"/>
      </g>
      <line x1="112.5" y1="52" x2="117" y2="48" stroke="${fill}" stroke-width="1.2"/>
      <circle cx="112.5" cy="52" r="1" fill="${fill}"/>
      <!-- cooling fan -->
      <g stroke="${fill}" stroke-width="0.8" fill="none">
        <circle cx="160" cy="47" r="15"/>
        <circle cx="160" cy="47" r="3" fill="${fill}"/>
        <path d="M 160 47 L 150 40 Q 155 47 160 47" fill="#5A6A7A"/>
        <path d="M 160 47 L 170 40 Q 165 47 160 47" fill="#5A6A7A"/>
        <path d="M 160 47 L 150 54 Q 155 47 160 47" fill="#5A6A7A"/>
        <path d="M 160 47 L 170 54 Q 165 47 160 47" fill="#5A6A7A"/>
      </g>
      <!-- second shelf - gauges -->
      <g stroke="${fill}" stroke-width="0.8" fill="#E8E3D0">
        <circle cx="30" cy="100" r="12"/>
        <circle cx="30" cy="100" r="1" fill="${fill}"/>
        <line x1="30" y1="100" x2="36" y2="94" stroke="${fill}" stroke-width="1"/>
        <text x="22" y="116" font-family="monospace" font-size="4" fill="${fill}">PSI</text>
      </g>
      <g stroke="${fill}" stroke-width="0.8" fill="#E8E3D0">
        <circle cx="65" cy="100" r="12"/>
        <circle cx="65" cy="100" r="1" fill="${fill}"/>
        <line x1="65" y1="100" x2="60" y2="93" stroke="${fill}" stroke-width="1"/>
        <text x="58" y="116" font-family="monospace" font-size="4" fill="${fill}">TEMP</text>
      </g>
      <!-- breather (desiccant tube) -->
      <rect x="90" y="85" width="10" height="32" fill="#E8E3D0" stroke="${fill}" stroke-width="0.8"/>
      <g fill="#FFA878" stroke="${fill}" stroke-width="0.3">
        ${Array.from({length: 12}, (_,i) => `<circle cx="${93+(i%2)*3}" cy="${90+Math.floor(i/2)*5}" r="1.2"/>`).join('')}
      </g>
      <!-- coil of cable -->
      <g stroke="${fill}" stroke-width="0.8" fill="none">
        <circle cx="140" cy="100" r="14"/>
        <circle cx="140" cy="100" r="10"/>
        <circle cx="140" cy="100" r="6"/>
      </g>
      <!-- surge arrester -->
      <rect x="168" y="82" width="12" height="35" fill="#C9C2B0" stroke="${fill}" stroke-width="0.8"/>
      <g stroke="${fill}" stroke-width="0.3" fill="none">
        ${[88,93,98,103,108,113].map(y => `<ellipse cx="174" cy="${y}" rx="7" ry="1.5"/>`).join('')}
      </g>
    </svg>`;
  },
};

// Unified card illustration getter with consistent styling
window.renderIllus = function(type, opts = {}) {
  const fn = window.TransformerIllus[type] || window.TransformerIllus.padmount;
  return fn(opts);
};
