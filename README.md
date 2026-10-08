# Fernandochuks.github.io
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  <title>Cyberpunk: Syndicate Wars</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <style>
    :root {
      --bg: #080b14;
      --bg-2: #0e1320;
      --panel: #121a2b;
      --panel-2: #172235;
      --panel-3: #1c2a40;
      --neon-blue: #00f0ff;
      --neon-green: #39ff14;
      --neon-pink: #ff007f;
      --neon-yellow: #ffd166;
      --text: #eaf6ff;
      --muted: #8b9bb3;
      --danger: #ff5c7a;
      --warning: #ffb703;
      --shadow-blue: rgba(0, 240, 255, 0.25);
      --shadow-pink: rgba(255, 0, 127, 0.4);
      --shadow-green: rgba(57, 255, 20, 0.25);
      --line: rgba(123, 170, 255, 0.18);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
      font-family: "Courier New", Courier, monospace;
    }

    html, body {
      width: 100%;
      height: 100%;
      background: var(--bg);
      color: var(--text);
      overflow: hidden;
    }

    body {
      display: flex;
      flex-direction: column;
    }

    header {
      position: relative;
      z-index: 2;
      padding: 18px 18px 12px;
      background: linear-gradient(180deg, rgba(17, 25, 39, 1) 0%, rgba(8, 11, 20, 0.2) 100%);
      border-bottom: 1px solid var(--line);
    }

    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }

    .title {
      font-size: 1.3rem;
      color: var(--neon-blue);
      text-transform: uppercase;
      letter-spacing: 0.18em;
      text-shadow: 0 0 12px var(--shadow-blue);
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 8px;
      border-radius: 999px;
      font-size: 0.66rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: 1px solid rgba(57, 255, 20, 0.4);
      color: var(--neon-green);
      background: rgba(57, 255, 20, 0.08);
    }

    .header-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 10px;
    }

    .stat-box {
      background: rgba(18, 26, 43, 0.7);
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 10px 12px;
      min-height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .stat-label {
      font-size: 0.66rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 6px;
    }

    .stat-value {
      font-size: 1.05rem;
      font-weight: bold;
      color: var(--text);
      letter-spacing: 0.05em;
    }

    .stat-value.green { color: var(--neon-green); }
    .stat-value.blue { color: var(--neon-blue); }
    .stat-value.pink { color: var(--neon-pink); }
    .stat-value.yellow { color: var(--neon-yellow); }

    main {
      flex: 1;
      overflow-y: auto;
      padding: 16px 18px 88px;
      background:
        radial-gradient(circle at top center, rgba(0, 240, 255, 0.07), transparent 35%),
        linear-gradient(180deg, rgba(8, 11, 20, 1) 0%, rgba(11, 18, 29, 1) 100%);
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .section-title {
      color: var(--neon-blue);
      text-transform: uppercase;
      letter-spacing: 0.14em;
      font-size: 0.72rem;
      margin-bottom: 14px;
      opacity: 0.9;
    }

    .node-display {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 18px 0 26px;
    }

    .core-ring {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 3px dashed var(--neon-blue);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: spin 20s linear infinite;
      box-shadow: 0 0 18px var(--shadow-blue);
      background: radial-gradient(circle, rgba(0, 240, 255, 0.03), transparent 70%);
    }

    .core-ring::before,
    .core-ring::after {
      content: "";
      position: absolute;
      inset: -14px;
      border-radius: 50%;
      border: 1px solid rgba(0, 240, 255, 0.16);
      animation: pulseRing 4s infinite ease-out;
    }

    .core-ring::after {
      inset: 16px;
      border-color: rgba(255, 0, 127, 0.18);
      animation-delay: 1.5s;
    }

    @keyframes spin {
      100% { transform: rotate(360deg); }
    }

    @keyframes pulseRing {
      0% { transform: scale(0.96); opacity: 0.7; }
      50% { transform: scale(1.04); opacity: 1; }
      100% { transform: scale(0.96); opacity: 0.7; }
    }

    .core-inner {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: radial-gradient(circle at center, rgba(255, 0, 127, 0.18), rgba(18, 26, 43, 1));
      border: 2px solid var(--neon-pink);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 18px rgba(255, 0, 127, 0.25), 0 0 24px rgba(255, 0, 127, 0.18);
      animation: pulse 2.2s infinite ease-in-out;
      font-size: 0.82rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--neon-blue);
      text-shadow: 0 0 12px var(--shadow-blue);
    }

    @keyframes pulse {
      0% { transform: scale(1); box-shadow: inset 0 0 18px rgba(255, 0, 127, 0.25), 0 0 20px rgba(255, 0, 127, 0.2); }
      50% { transform: scale(1.06); box-shadow: inset 0 0 18px rgba(255, 0, 127, 0.32), 0 0 30px rgba(255, 0, 127, 0.55); }
      100% { transform: scale(1); box-shadow: inset 0 0 18px rgba(255, 0, 127, 0.25), 0 0 20px rgba(255, 0, 127, 0.2); }
    }

    .meter-group {
      margin-top: 10px;
      display: grid;
      gap: 12px;
    }

    .meter {
      background: rgba(18, 26, 43, 0.75);
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 12px 12px 10px;
    }

    .meter-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--muted);
      margin-bottom: 8px;
    }

    .meter-bar {
      height: 10px;
      width: 100%;
      background: rgba(255,255,255,0.05);
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.08);
    }

    .meter-fill {
      height: 100%;
      width: 0%;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--neon-blue), var(--neon-green));
      box-shadow: 0 0 14px rgba(0, 240, 255, 0.35);
      transition: width 0.2s ease, background 0.2s ease;
    }

    .meter-fill.warn {
      background: linear-gradient(90deg, var(--warning), var(--danger));
      box-shadow: 0 0 14px rgba(255, 183, 3, 0.3);
    }

    .card-list {
      display: grid;
      gap: 12px;
    }

    .card {
      background: linear-gradient(180deg, rgba(18, 26, 43, 0.96), rgba(12, 18, 29, 1));
      border: 1px solid var(--line);
      border-left: 4px solid var(--neon-blue);
      border-radius: 8px;
      padding: 12px 12px 10px;
      box-shadow: inset 0 0 16px rgba(255,255,255,0.02);
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }

    .card-name {
      font-weight: bold;
      letter-spacing: 0.05em;
      color: var(--text);
    }

    .tag {
      display: inline-block;
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 4px 7px;
      border-radius: 999px;
      border: 1px solid rgba(57, 255, 20, 0.35);
      background: rgba(57, 255, 20, 0.08);
      color: var(--neon-green);
    }

    .tag.warn {
      color: var(--neon-yellow);
      border-color: rgba(255, 209, 102, 0.35);
      background: rgba(255, 209, 102, 0.08);
    }

    .tag.pink {
      color: var(--neon-pink);
      border-color: rgba(255, 0, 127, 0.35);
      background: rgba(255, 0, 127, 0.08);
    }

    .card-copy {
      color: var(--muted);
      font-size: 0.76rem;
      line-height: 1.6;
      margin-bottom: 10px;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-top: 8px;
    }

    .reward {
      color: var(--neon-green);
      font-size: 0.72rem;
      font-weight: bold;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .button {
      border: 1px solid rgba(0, 240, 255, 0.5);
      background: rgba(0, 240, 255, 0.08);
      color: var(--neon-blue);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .button:hover,
    .button:active {
      transform: translateY(-1px);
      box-shadow: 0 0 18px rgba(0, 240, 255, 0.18);
    }

    .button.secondary {
      border-color: rgba(255, 0, 127, 0.5);
      background: rgba(255, 0, 127, 0.08);
      color: var(--neon-pink);
    }

    .button:disabled {
      opacity: 0.45;
      cursor: default;
      transform: none;
      box-shadow: none;
    }

    .bottom-nav {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 74px;
      background: rgba(9, 12, 20, 0.96);
      border-top: 1px solid rgba(0, 240, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 18px;
      backdrop-filter: blur(10px);
      z-index: 10;
    }

    .nav-btn {
      flex: 1;
      height: 100%;
      background: transparent;
      border: 0;
      color: var(--muted);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 0.64rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      cursor: pointer;
    }

    .nav-btn.active {
      color: var(--neon-blue);
      text-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
    }

    .nav-icon {
      font-size: 1.1rem;
      line-height: 1;
    }

    @media (max-width: 360px) {
      .title {
        letter-spacing: 0.12em;
      }

      .header-stats {
        grid-template-columns: 1fr;
      }

      .core-ring {
        width: 152px;
        height: 152px;
      }

      .core-inner {
        width: 104px;
        height: 104px;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="title-row">
      <div class="title">Syndicate Wars</div>
      <div class="status-pill" id="threatBadge">Stable</div>
    </div>

    <div class="header-stats">
      <div class="stat-box">
        <div class="stat-label">Credits</div>
        <div class="stat-value green" id="balance">$0</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Income / sec</div>
        <div class="stat-value blue" id="incomeRate">0</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Heat</div>
        <div class="stat-value yellow" id="heatValue">0%</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Integrity</div>
        <div class="stat-value pink" id="integrityValue">100%</div>
      </div>
    </div>
  </header>

  <main>
    <section id="tab-node" class="tab-content active">
      <div class="section-title">Node Status</div>

      <div class="node-display">
        <div class="core-ring">
          <div class="core-inner">CPU</div>
        </div>
      </div>

      <div class="meter-group">
        <div class="meter">
          <div class="meter-head">
            <span>Signal</span>
            <span id="signalText">100%</span>
          </div>
          <div class="meter-bar">
            <div id="signalBar" class="meter-fill"></div>
          </div>
        </div>

        <div class="meter">
          <div class="meter-head">
            <span>Heat</span>
            <span id="heatText">0%</span>
          </div>
          <div class="meter-bar">
            <div id="heatBar" class="meter-fill warn"></div>
          </div>
        </div>

        <div class="meter">
          <div class="meter-head">
            <span>Integrity</span>
            <span id="integrityText">100%</span>
          </div>
          <div class="meter-bar">
            <div id="integrityBar" class="meter-fill"></div>
          </div>
        </div>
      </div>
    </section>

    <section id="tab-ops" class="tab-content">
      <div class="section-title">Operations</div>
      <div id="missionList" class="card-list"></div>
    </section>

    <section id="tab-arsenal" class="tab-content">
      <div class="section-title">Arsenal / Upgrades</div>
      <div id="upgradeList" class="card-list"></div>
    </section>
  </main>

  <nav class="bottom-nav">
    <button class="nav-btn active" data-target="tab-node">
      <span class="nav-icon">◉</span>
      <span>Node</span>
    </button>
    <button class="nav-btn" data-target="tab-ops">
      <span class="nav-icon">✦</span>
      <span>Ops</span>
    </button>
    <button class="nav-btn" data-target="tab-arsenal">
      <span class="nav-icon">▣</span>
      <span>Arsenal</span>
    </button>
  </nav>

  <script>
    const SAVE_KEY = "cyberpunk_syndicate_wars_v1";

    const missionDefs = [
      {
        id: "ghostScan",
        name: "Ghost Scan",
        desc: "Sweep abandoned districts for forgotten caches of stolen data.",
        reward: 45,
        heat: 8,
        risk: 6,
        cooldown: 12,
        tag: "Fast"
      },
      {
        id: "relayHijack",
        name: "Relay Hijack",
        desc: "Redirect encrypted traffic through compromised relay nodes.",
        reward: 90,
        heat: 16,
        risk: 12,
        cooldown: 18,
        tag: "Risk"
      },
      {
        id: "vaultDrill",
        name: "Vault Drill",
        desc: "Break into a blacksite vault and extract encrypted funding records.",
        reward: 180,
        heat: 24,
        risk: 18,
        cooldown: 28,
        tag: "High"
      },
      {
        id: "droneRaid",
        name: "Drone Raid",
        desc: "Deploy assault drones to sabotage hostile infrastructure.",
        reward: 260,
        heat: 30,
        risk: 24,
        cooldown: 40,
        tag: "Heavy"
      }
    ];

    const upgradeDefs = [
      {
        id: "relay",
        name: "Relay Mesh",
        desc: "Build a passive network of rogue relays that collect traffic.",
        baseCost: 70,
        scale: 1.55,
        income: 6,
        heat: -1
      },
      {
        id: "cloak",
        name: "Ghost Cloak",
        desc: "Mask your node signature and reduce incoming threat pressure.",
        baseCost: 95,
        scale: 1.6,
        signal: 12,
        heat: -4
      },
      {
        id: "firewall",
        name: "Adaptive Firewall",
        desc: "Hardens the node against breaches and keeps integrity stable.",
        baseCost: 140,
        scale: 1.7,
        integrity: 12,
        heat: -2
      },
      {
        id: "drones",
        name: "Strike Drones",
        desc: "Launch autonomous units that harvest data and strike intruders.",
        baseCost: 220,
        scale: 1.8,
        income: 18,
        heat: 2
      },
      {
        id: "core",
        name: "Blacksite Core",
        desc: "Upgrades your central node into a premium extraction engine.",
        baseCost: 360,
        scale: 1.92,
        income: 30,
        signal: 16,
        integrity: 20
      }
    ];

    const defaultState = {
      balance: 120,
      incomeRate: 6,
      signal: 100,
      heat: 12,
      integrity: 100,
      reputation: 0,
      wave: 1,
      lastTick: Date.now(),
      cooldowns: {},
      upgrades: {
        relay: 0,
        cloak: 0,
        firewall: 0,
        drones: 0,
        core: 0
      }
    };

    let state = loadGame();

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function formatMoney(value) {
      if (value >= 1000000) return "$" + (value / 1000000).toFixed(2) + "M";
      if (value >= 1000) return "$" + (value / 1000).toFixed(2) + "K";
      return "$" + Math.floor(value);
    }

    function getUpgradeCost(def) {
      return Math.round(def.baseCost * Math.pow(def.scale, state.upgrades[def.id] || 0));
    }

    function getIncomeRate() {
      let total = state.incomeRate || 0;

      for (const def of upgradeDefs) {
        const level = state.upgrades[def.id] || 0;
        if (def.income) total += def.income * level;
      }

      return total;
    }

    function getThreatLevel() {
      const threat = state.heat + state.wave * 8;
      if (threat < 30) return "Stable";
      if (threat < 55) return "Pressed";
      if (threat < 75) return "Critical";
      return "Overrun";
    }

    function saveGame() {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    }

    function loadGame() {
      const saved = localStorage.getItem(SAVE_KEY);
      if (!saved) return JSON.parse(JSON.stringify(defaultState));
      try {
        const parsed = JSON.parse(saved);
        return { ...JSON.parse(JSON.stringify(defaultState)), ...parsed, upgrades: { ...defaultState.upgrades, ...(parsed.upgrades || {}) } };
      } catch (e) {
        return JSON.parse(JSON.stringify(defaultState));
      }
    }

    function buyUpgrade(id) {
      const def = upgradeDefs.find(item => item.id === id);
      if (!def) return;
      const cost = getUpgradeCost(def);
      if (state.balance < cost) return;

      state.balance -= cost;
      state.upgrades[id] = (state.upgrades[id] || 0) + 1;

      if (def.signal) state.signal = clamp((state.signal || 100) + def.signal, 0, 100);
      if (def.integrity) state.integrity = clamp(state.integrity + def.integrity, 0, 100);
      if (def.heat) state.heat = clamp(state.heat + def.heat, 0, 100);

      // Sync income rate
      state.incomeRate = getIncomeRate();

      refreshUI();
      saveGame();
    }

    function runMission(id) {
      const mission = missionDefs.find(item => item.id === id);
      if (!mission) return;

      const now = Date.now();
      const cooldown = state.cooldowns[id] || 0;
      if (cooldown > now) return;

      // mission success
      const reward = mission.reward + (state.wave * 8) + (state.reputation * 0.25);
      state.balance += reward;
      state.reputation += 2 + Math.floor(mission.reward / 35);
      state.heat = clamp(state.heat + mission.heat, 0, 100);
      state.integrity = clamp(state.integrity - mission.risk, 0, 100);
      state.signal = clamp(state.signal - Math.floor(mission.risk / 3), 0, 100);

      // If mission is too risky, create a chance to take extra damage
      if (state.heat > 80) {
        state.integrity = clamp(state.integrity - 8, 0, 100);
      }

      state.cooldowns[id] = now + mission.cooldown * 1000;
      state.wave += 1;

      refreshUI();
      saveGame();
    }

    function renderMissions() {
      const list = document.getElementById("missionList");
      list.innerHTML = missionDefs.map(mission => {
        const now = Date.now();
        const readyIn = (state.cooldowns[mission.id] || 0) - now;
        const ready = readyIn <= 0;

        return `
          <div class="card">
            <div class="card-header">
              <div class="card-name">${mission.name}</div>
              <span class="tag ${mission.tag === "Risk" || mission.tag === "High" || mission.tag === "Heavy" ? "warn" : ""}">${mission.tag}</span>
            </div>
            <div class="card-copy">
              ${mission.desc}
            </div>
            <div class="card-footer">
              <span class="reward">Reward: ${formatMoney(mission.reward)}</span>
              <button class="button secondary" ${ready ? "" : "disabled"} data-mission="${mission.id}">
                ${ready ? "Run" : `${Math.ceil(readyIn / 1000)}s`}
              </button>
            </div>
          </div>
        `;
      }).join("");
    }

    function renderUpgrades() {
      const list = document.getElementById("upgradeList");
      list.innerHTML = upgradeDefs.map(def => {
        const level = state.upgrades[def.id] || 0;
        const cost = getUpgradeCost(def);
        const affordable = state.balance >= cost;

        return `
          <div class="card">
            <div class="card-header">
              <div class="card-name">${def.name}</div>
              <span class="tag pink">Lv ${level}</span>
            </div>
            <div class="card-copy">${def.desc}</div>
            <div class="card-footer">
              <span class="reward">Cost: ${formatMoney(cost)}</span>
              <button class="button" data-upgrade="${def.id}" ${affordable ? "" : "disabled"}>
                Upgrade
              </button>
            </div>
          </div>
        `;
      }).join("");
    }

    function refreshUI() {
      const balance = document.getElementById("balance");
      const incomeRate = document.getElementById("incomeRate");
      const heatValue = document.getElementById("heatValue");
      const integrityValue = document.getElementById("integrityValue");
      const threatBadge = document.getElementById("threatBadge");
      const signalText = document.getElementById("signalText");
      const heatText = document.getElementById("heatText");
      const integrityText = document.getElementById("integrityText");
      const signalBar = document.getElementById("signalBar");
      const heatBar = document.getElementById("heatBar");
      const integrityBar = document.getElementById("integrityBar");

      const currentIncome = getIncomeRate();
      state.incomeRate = currentIncome;

      balance.textContent = formatMoney(state.balance);
      incomeRate.textContent = `${currentIncome.toFixed(1)}`;
      heatValue.textContent = `${Math.round(state.heat)}%`;
      integrityValue.textContent = `${Math.round(state.integrity)}%`;

      signalText.textContent = `${Math.round(state.signal)}%`;
      heatText.textContent = `${Math.round(state.heat)}%`;
      integrityText.textContent = `${Math.round(state.integrity)}%`;

      signalBar.style.width = `${state.signal}%`;
      heatBar.style.width = `${state.heat}%`;
      integrityBar.style.width = `${state.integrity}%`;

      threatBadge.textContent = getThreatLevel();
      if (getThreatLevel() === "Stable") {
        threatBadge.style.color = "var(--neon-green)";
        threatBadge.style.background = "rgba(57,255,20,0.08)";
        threatBadge.style.borderColor = "rgba(57,255,20,0.4)";
      } else if (getThreatLevel() === "Pressed") {
        threatBadge.style.color = "var(--neon-yellow)";
        threatBadge.style.background = "rgba(255,209,102,0.08)";
        threatBadge.style.borderColor = "rgba(255,209,102,0.4)";
      } else if (getThreatLevel() === "Critical") {
        threatBadge.style.color = "var(--neon-pink)";
        threatBadge.style.background = "rgba(255,0,127,0.08)";
        threatBadge.style.borderColor = "rgba(255,0,127,0.4)";
      } else {
        threatBadge.style.color = "var(--danger)";
        threatBadge.style.background = "rgba(255,92,122,0.08)";
        threatBadge.style.borderColor = "rgba(255,92,122,0.4)";
      }

      renderMissions();
      renderUpgrades();
    }

    function tickGame() {
      const now = Date.now();
      const dt = (now - state.lastTick) / 1000;
      state.lastTick = now;

      const passiveIncome = getIncomeRate() * dt;
      state.balance += passiveIncome;

      // Passive stabilization
      if (state.integrity < 100 && state.heat < 60) {
        state.integrity = clamp(state.integrity + 0.8 * dt, 0, 100);
      }

      // Heat behavior
      state.heat = clamp(state.heat + (state.wave * 0.15 * dt) - (state.upgrades.cloak || 0) * 0.35 * dt, 0, 100);

      // Signal and integrity decay
      if (state.heat > 60) {
        state.signal = clamp(state.signal - ((state.heat - 60) * 0.08 * dt), 0, 100);
        state.integrity = clamp(state.integrity - ((state.heat - 55) * 0.09 * dt), 0, 100);
      } else {
        state.signal = clamp(state.signal + 0.35 * dt, 0, 100);
      }

      // System collapse protection
      if (state.integrity <= 0) {
        state.integrity = 100;
        state.heat = Math.max(15, state.heat - 25);
        state.balance = Math.max(0, state.balance * 0.7);
        state.signal = 70;
      }

      // Increase hostile pressure over time
      if (Math.random() < 0.012 * dt * state.wave) {
        state.heat = clamp(state.heat + 2.4, 0, 100);
      }

      // Keep rate from drifting
      state.incomeRate = getIncomeRate();

      refreshUI();
      saveGame();
    }

    document.addEventListener("click", (event) => {
      const missionBtn = event.target.closest("[data-mission]");
      if (missionBtn) {
        runMission(missionBtn.dataset.mission);
        return;
      }

      const upgradeBtn = event.target.closest("[data-upgrade]");
      if (upgradeBtn) {
        buyUpgrade(upgradeBtn.dataset.upgrade);
        return;
      }

      const navBtn = event.target.closest(".nav-btn");
      if (navBtn) {
        const target = navBtn.dataset.target;
        document.querySelectorAll(".tab-content").forEach(tab => {
          tab.classList.toggle("active", tab.id === target);
        });
        document.querySelectorAll(".nav-btn").forEach(btn => {
          btn.classList.toggle("active", btn.dataset.target === target);
        });
      }
    });

    // Telegram WebApp integration (optional)
    const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg) {
      tg.expand();
      tg.enableClosingConfirmation();
      tg.setHeaderColor("#080b14");
      tg.setBackgroundColor("#080b14");
    }

    refreshUI();
    setInterval(tickGame, 1000);
  </script>
</body>
</html>
