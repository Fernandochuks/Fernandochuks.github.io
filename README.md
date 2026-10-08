<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#080b18">
<title>Crypto Clash</title>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background: #080b18;
    color: #ffffff;
    font-family: Arial, sans-serif;
    min-height: 100vh;
}

.app {
    max-width: 440px;
    min-height: 100vh;
    margin: auto;
    padding: 20px 16px 100px;
    background:
      radial-gradient(ellipse at top, #17244b 0%, #080b18 55%);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
}

.logo {
    font-size: 23px;
    font-weight: 900;
    letter-spacing: 1px;
}

.logo span {
    color: #38f8e2;
}

.badge {
    padding: 8px 12px;
    border-radius: 20px;
    background: #172d39;
    color: #38f8e2;
    font-size: 12px;
}

.card {
    background: rgba(19, 27, 54, .88);
    border: 1px solid #293a66;
    border-radius: 18px;
    padding: 18px;
    margin-bottom: 18px;
}

.label {
    font-size: 12px;
    color: #9caed8;
    text-transform: uppercase;
    letter-spacing: 1.4px;
}

.balance {
    font-size: 34px;
    font-weight: 900;
    margin-top: 8px;
}

.balance span {
    color: #38f8e2;
}

.stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.stat {
    background: #101a34;
    border: 1px solid #25345b;
    padding: 14px;
    border-radius: 14px;
}

.stat strong {
    display: block;
    font-size: 20px;
    margin-top: 8px;
}

.core-area {
    text-align: center;
    padding: 12px 0 22px;
}

.core {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 3px solid #38f8e2;
    margin: 24px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 75px;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    background:
      radial-gradient(circle, #275b86 0%, #123052 45%, #10142d 72%);
    box-shadow:
      0 0 25px rgba(56,248,226,.45),
      inset 0 0 30px rgba(56,248,226,.25);
    transition: transform .08s;
}

.core:active {
    transform: scale(.94);
}

.energy-track {
    height: 12px;
    background: #1d2949;
    border-radius: 10px;
    overflow: hidden;
    margin: 12px 0 8px;
}

.energy-fill {
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #38f8e2, #4f83ff);
    transition: width .2s;
}

button {
    border: 0;
    cursor: pointer;
    color: white;
    font-weight: bold;
    border-radius: 12px;
    padding: 13px;
    background: linear-gradient(110deg, #2877f5, #7b48ef);
}

button:disabled {
    opacity: .45;
    cursor: not-allowed;
}

.wide {
    width: 100%;
    margin-top: 10px;
}

.section-title {
    font-size: 18px;
    margin-bottom: 14px;
}

.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 13px 0;
    border-bottom: 1px solid #283352;
}

.item:last-child {
    border-bottom: 0;
}

.item-info {
    flex: 1;
}

.item-info strong {
    display: block;
    margin-bottom: 5px;
}

.item-info small {
    color: #9caed8;
    font-size: 12px;
}

.item button {
    min-width: 105px;
    font-size: 12px;
}

.nav {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 440px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 12px 5px;
    background: #10172b;
    border-top: 1px solid #293a66;
}

.nav button {
    background: transparent;
    font-size: 11px;
    padding: 8px 2px;
}

.nav button.active {
    color: #38f8e2;
}

.page {
    display: none;
}

.page.active {
    display: block;
}

.notice {
    color: #38f8e2;
    font-size: 13px;
    min-height: 18px;
    margin-top: 12px;
}

.mission {
    margin-bottom: 12px;
}

.progress {
    color: #38f8e2;
    font-size: 12px;
    margin-top: 7px;
}

.rank {
    color: #ffc95b;
    font-weight: bold;
}
</style>
</head>

<body>
<div class="app">

    <header class="header">
        <div class="logo">CRYPTO <span>CLASH</span></div>
        <div class="badge">⚡ SEASON 1</div>
    </header>

    <main id="gamePage" class="page active">

        <section class="card">
            <div class="label">Your coin balance</div>
            <div class="balance"><span id="coins">0</span> CC</div>
            <div style="margin-top:8px;color:#9caed8;font-size:12px">
                Rank: <span class="rank" id="rank">Rookie</span>
            </div>
        </section>

        <section class="stats">
            <div class="stat">
                <div class="label">Per tap</div>
                <strong>⚡ <span id="power">1</span></strong>
            </div>
            <div class="stat">
                <div class="label">Passive / sec</div>
                <strong>🤖 <span id="passive">0</span></strong>
            </div>
        </section>

        <section class="core-area">
            <div class="label">Tap the energy core</div>

            <div class="core" id="core" role="button"
                 aria-label="Tap energy core">⚛️</div>

            <div class="label">
                Energy: <span id="energyText">1000 / 1000</span>
            </div>

            <div class="energy-track">
                <div class="energy-fill" id="energyFill"></div>
            </div>

            <div style="color:#9caed8;font-size:12px">
                Energy regenerates automatically.
            </div>

            <div class="notice" id="notice" aria-live="polite"></div>
        </section>

        <section class="card">
            <h2 class="section-title">🚀 Quick Upgrade</h2>

            <div class="item">
                <div class="item-info">
                    <strong>Power Gloves</strong>
                    <small>Increase coins earned per tap.</small>
                </div>
                <button id="quickUpgrade">Upgrade</button>
            </div>
        </section>

    </main>

    <main id="upgradePage" class="page">
        <section class="card">
            <h2 class="section-title">🚀 Upgrade Laboratory</h2>
            <div id="upgradeList"></div>
        </section>
    </main>

    <main id="missionPage" class="page">
        <section class="card">
            <h2 class="section-title">🎯 Missions</h2>
            <p style="color:#9caed8;font-size:13px;margin-bottom:16px">
                Complete missions to earn bonus coins.
            </p>
            <div id="missionList"></div>
        </section>

        <section class="card">
            <h2 class="section-title">🎁 Daily Reward</h2>
            <p style="color:#9caed8;font-size:13px">
                Return every day to claim your reward.
            </p>
            <button class="wide" id="dailyButton">Claim Daily Reward</button>
            <div class="notice" id="dailyNotice"></div>
        </section>
    </main>

    <main id="profilePage" class="page">
        <section class="card">
            <h2 class="section-title">👤 Player Profile</h2>
            <div class="item">
                <span>Rank</span><strong id="profileRank">Rookie</strong>
            </div>
            <div class="item">
                <span>Total taps</span><strong id="totalTaps">0</strong>
            </div>
            <div class="item">
                <span>Coins earned</span><strong id="totalEarned">0</strong>
            </div>
            <div class="item">
                <span>Tap power</span><strong id="profilePower">1</strong>
            </div>
            <button class="wide" id="resetButton">Reset Local Game</button>
            <p style="font-size:11px;color:#9caed8;margin-top:12px">
                Prototype only. Progress is saved on this device.
            </p>
        </section>
    </main>

</div>

<nav class="nav">
    <button class="active" data-page="gamePage">⚛️<br>Play</button>
    <button data-page="upgradePage">🚀<br>Upgrades</button>
    <button data-page="missionPage">🎯<br>Missions</button>
    <button data-page="profilePage">👤<br>Profile</button>
</nav>

<script>
const SAVE_KEY = "cryptoClashSaveV1";

const initialState = () => ({
    coins: 0,
    energy: 1000,
    maxEnergy: 1000,
    power: 1,
    passive: 0,
    taps: 0,
    totalEarned: 0,
    lastEnergyTime: Date.now(),
    lastDaily: "",
    upgrades: {
        gloves: 0,
        bot: 0,
        battery: 0
    },
    claimedMissions: []
});

let state = loadState();

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
        if (saved && typeof saved === "object") {
            const base = initialState();
            return {
                ...base,
                ...saved,
                upgrades: {...base.upgrades, ...(saved.upgrades || {})},
                claimedMissions: Array.isArray(saved.claimedMissions)
                    ? saved.claimedMissions : []
            };
        }
    } catch (error) {
        console.warn("Save could not be loaded.");
    }
    return initialState();
}

function saveState() {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (error) {
        showNotice("Saving is unavailable in this browser.");
    }
}

function number(n) {
    return Math.floor(n).toLocaleString();
}

function showNotice(message) {
    document.getElementById("notice").textContent = message;
}

function rankName() {
    if (state.totalEarned >= 100000) return "Crypto Legend";
    if (state.totalEarned >= 25000) return "Elite Hacker";
    if (state.totalEarned >= 5000) return "Cyber Warrior";
    if (state.totalEarned >= 1000) return "Rising Trader";
    return "Rookie";
}

function addCoins(amount) {
    if (!Number.isFinite(amount) || amount <= 0) return;
    state.coins += amount;
    state.totalEarned += amount;
}

function tapCore() {
    if (state.energy < 1) {
        showNotice("⚡ Out of energy! Wait for regeneration.");
        return;
    }

    state.energy -= 1;
    state.taps += 1;
    addCoins(state.power);

    showNotice("+" + number(state.power) + " CC earned!");
    render();
    saveState();
}

document.getElementById("core").addEventListener("pointerdown", event => {
    event.preventDefault();
    tapCore();
});

function upgradeCost(type) {
    const levels = state.upgrades[type];

    if (type === "gloves") return Math.floor(50 * Math.pow(1.65, levels));
    if (type === "bot") return Math.floor(150 * Math.pow(1.8, levels));
    if (type === "battery") return Math.floor(100 * Math.pow(1.7, levels));

    return Infinity;
}

function buyUpgrade(type) {
    const cost = upgradeCost(type);

    if (state.coins < cost) {
        showNotice("Not enough CC. Keep tapping!");
        return;
    }

    state.coins -= cost;
    state.upgrades[type] += 1;

    if (type === "gloves") state.power += 1;
    if (type === "bot") state.passive += 1;

    if (type === "battery") {
        state.maxEnergy += 250;
        state.energy = Math.min(
            state.maxEnergy,
            state.energy + 250
        );
    }

    showNotice("Upgrade purchased successfully!");
    render();
    saveState();
}

document.getElementById("quickUpgrade").addEventListener("click", () => {
    buyUpgrade("gloves");
});

const upgrades = [
    {
        type: "gloves",
        icon: "🥊",
        name: "Power Gloves",
        description: "+1 coin per tap."
    },
    {
        type: "bot",
        icon: "🤖",
        name: "Auto Miner",
        description: "+1 coin per second."
    },
    {
        type: "battery",
        icon: "🔋",
        name: "Energy Battery",
        description: "+250 maximum energy."
    }
];

function renderUpgrades() {
    const container = document.getElementById("upgradeList");
    container.innerHTML = "";

    upgrades.forEach(item => {
        const cost = upgradeCost(item.type);
        const row = document.createElement("div");
        row.className = "item";

        const info = document.createElement("div");
        info.className = "item-info";

        const title = document.createElement("strong");
        title.textContent = item.icon + " " + item.name;

        const description = document.createElement("small");
        description.textContent =
            item.description + " Level " + state.upgrades[item.type];

        info.append(title, description);

        const button = document.createElement("button");
        button.textContent = number(cost) + " CC";
        button.disabled = state.coins < cost;
        button.addEventListener("click", () => buyUpgrade(item.type));

        row.append(info, button);
        container.appendChild(row);
    });
}

const missions = [
    {
        id: "tap100",
        title: "First 100 Taps",
        description: "Tap the energy core 100 times.",
        reward: 250,
        check: () => state.taps >= 100
    },
    {
        id: "earn1000",
        title: "Coin Collector",
        description: "Earn 1,000 coins in total.",
        reward: 500,
        check: () => state.totalEarned >= 1000
    },
    {
        id: "upgrade3",
        title: "Upgrade Addict",
        description: "Purchase 3 upgrades.",
        reward: 350,
        check: () =>
            Object.values(state.upgrades).reduce((a, b) => a + b, 0) >= 3
    }
];

function renderMissions() {
    const container = document.getElementById("missionList");
    container.innerHTML = "";

    missions.forEach(mission => {
        const claimed = state.claimedMissions.includes(mission.id);
        const completed = mission.check();

        const box = document.createElement("div");
        box.className = "card mission";
        box.style.marginBottom = "12px";

        const title = document.createElement("strong");
        title.textContent = mission.title;

        const description = document.createElement("p");
        description.textContent = mission.description;
        description.style.cssText =
            "color:#9caed8;font-size:12px;margin-top:7px";

        const reward = document.createElement("div");
        reward.className = "progress";
        reward.textContent = "Reward: " + mission.reward + " CC";

        const button = document.createElement("button");
        button.className = "wide";

        if (claimed) {
            button.textContent = "Reward Claimed";
            button.disabled = true;
        } else if (completed) {
            button.textContent = "Claim Reward";
            button.addEventListener("click", () => {
                if (!mission.check() ||
                    state.claimedMissions.includes(mission.id)) return;

                state.claimedMissions.push(mission.id);
                addCoins(mission.reward);
                render();
                saveState();
            });
        } else {
            button.textContent = "In Progress";
            button.disabled = true;
        }

        box.append(title, description, reward, button);
        container.appendChild(box);
    });
}

function todayKey() {
    const date = new Date();
    return date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0");
}

document.getElementById("dailyButton").addEventListener("click", () => {
    const today = todayKey();

    if (state.lastDaily === today) {
        document.getElementById("dailyNotice").textContent =
            "You have already claimed today's reward.";
        return;
    }

    state.lastDaily = today;
    addCoins(500);

    document.getElementById("dailyNotice").textContent =
        "🎉 You claimed 500 CC!";
    render();
    saveState();
});

function render() {
    document.getElementById("coins").textContent = number(state.coins);
    document.getElementById("power").textContent = number(state.power);
    document.getElementById("passive").textContent = number(state.passive);

    document.getElementById("energyText").textContent =
        number(state.energy) + " / " + number(state.maxEnergy);

    document.getElementById("energyFill").style.width =
        (state.energy / state.maxEnergy * 100) + "%";

    document.getElementById("rank").textContent = rankName();
    document.getElementById("profileRank").textContent = rankName();
    document.getElementById("totalTaps").textContent = number(state.taps);
    document.getElementById("totalEarned").textContent =
        number(state.totalEarned);
    document.getElementById("profilePower").textContent =
        number(state.power);

    document.getElementById("quickUpgrade").textContent =
        number(upgradeCost("gloves")) + " CC";

    document.getElementById("quickUpgrade").disabled =
        state.coins < upgradeCost("gloves");

    renderUpgrades();
    renderMissions();
}

document.querySelectorAll(".nav button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".nav button").forEach(b =>
            b.classList.remove("active")
        );

        button.classList.add("active");

        document.querySelectorAll(".page").forEach(page =>
            page.classList.remove("active")
        );

        document.getElementById(button.dataset.page)
            .classList.add("active");
    });
});

document.getElementById("resetButton").addEventListener("click", () => {
    if (!confirm("Erase all local game progress?")) return;

    state = initialState();
    saveState();
    render();
    document.getElementById("dailyNotice").textContent = "";
    showNotice("Your game has been reset.");
});

function gameTick() {
    const now = Date.now();
    const elapsed = Math.max(
        0,
        Math.min((now - state.lastEnergyTime) / 1000, 3600)
    );

    // Regenerate one energy per second.
    state.energy = Math.min(
        state.maxEnergy,
        state.energy + elapsed
    );

    // Passive mining income.
    if (elapsed > 0 && state.passive > 0) {
        addCoins(state.passive * elapsed);
    }

    state.lastEnergyTime = now;
    render();
    saveState();
}

render();
setInterval(gameTick, 1000);
</script>
</body>
</html>
