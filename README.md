<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Telegram Casino Mini App</title>

  <!-- Telegram WebApp SDK -->
  <script src="https://telegram.org/js/telegram-web-app.js"></script>

  <style>
    :root {
      --bg-color: var(--tg-theme-bg-color, #17212b);
      --text-color: var(--tg-theme-text-color, #ffffff);
      --hint-color: var(--tg-theme-hint-color, #708499);
      --button-color: var(--tg-theme-button-color, #5288c1);
      --button-text-color: var(--tg-theme-button-text-color, #ffffff);
      --secondary-bg: var(--tg-theme-secondary-bg-color, #232e3c);
      --accent-color: #f39c12;
    }

    * {
      box-sizing: border-box;
      user-select: none;
    }

    body {
      margin: 0;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }

    .header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--secondary-bg);
      border-radius: 12px;
      margin-bottom: 20px;
    }

    .user-info {
      font-weight: 600;
      font-size: 14px;
    }

    .balance-box {
      font-weight: 700;
      color: var(--accent-color);
      font-size: 16px;
    }

    .nav-tabs {
      display: flex;
      gap: 10px;
      width: 100%;
      margin-bottom: 20px;
    }

    .tab-btn {
      flex: 1;
      padding: 10px;
      background: var(--secondary-bg);
      color: var(--text-color);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .tab-btn.active {
      background: var(--button-color);
      color: var(--button-text-color);
    }

    .game-card {
      display: none;
      width: 100%;
      background: var(--secondary-bg);
      border-radius: 16px;
      padding: 24px 16px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .game-card.active {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Slot Machine Styling */
    .slots-container {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin: 20px 0;
      background: rgba(0, 0, 0, 0.3);
      padding: 16px;
      border-radius: 12px;
      width: 100%;
    }

    .reel {
      width: 70px;
      height: 70px;
      background: var(--bg-color);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      border: 2px solid var(--accent-color);
    }

    /* Roulette Styling */
    .roulette-board {
      display: flex;
      gap: 10px;
      margin: 20px 0;
      width: 100%;
    }

    .bet-opt {
      flex: 1;
      padding: 16px 8px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      border: 2px solid transparent;
    }

    .bet-red { background: #e74c3c; color: #fff; }
    .bet-black { background: #2c3e50; color: #fff; }
    .bet-opt.selected { border-color: #fff; transform: scale(1.05); }

    .wheel-result {
      font-size: 48px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
    }

    /* Shared Controls */
    .bet-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .bet-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: var(--button-color);
      color: var(--button-text-color);
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }

    .action-btn {
      width: 100%;
      padding: 14px;
      background: var(--button-color);
      color: var(--button-text-color);
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
    }

    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .status-msg {
      margin-top: 12px;
      min-height: 20px;
      font-size: 14px;
      color: var(--hint-color);
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <div class="user-info" id="username">Player</div>
    <div class="balance-box">💰 <span id="balance">1000</span></div>
  </div>

  <!-- Game Selector -->
  <div class="nav-tabs">
    <button class="tab-btn active" onclick="switchTab('slots')">🎰 Slots</button>
    <button class="tab-btn" onclick="switchTab('roulette')">🎯 Roulette</button>
  </div>

  <!-- Slot Machine Game -->
  <div id="slots-game" class="game-card active">
    <h2>Lucky Slots</h2>
    <div class="slots-container">
      <div class="reel" id="reel1">🎰</div>
      <div class="reel" id="reel2">🎰</div>
      <div class="reel" id="reel3">🎰</div>
    </div>
    
    <div class="bet-controls">
      <button class="bet-btn" onclick="adjustBet(-50)">-</button>
      <span>Bet: 💰 <strong id="slot-bet">50</strong></span>
      <button class="bet-btn" onclick="adjustBet(50)">+</button>
    </div>

    <button class="action-btn" id="spin-btn" onclick="spinSlots()">SPIN</button>
    <div class="status-msg" id="slot-status">Match 3 to win 10x! Match 2 to win 2x.</div>
  </div>

  <!-- Roulette Game -->
  <div id="roulette-game" class="game-card">
    <h2>Red or Black</h2>
    <div class="wheel-result" id="roulette-result">❓</div>

    <div class="roulette-board">
      <div class="bet-opt bet-red" id="opt-red" onclick="selectRouletteColor('RED')">RED (2x)</div>
      <div class="bet-opt bet-black" id="opt-black" onclick="selectRouletteColor('BLACK')">BLACK (2x)</div>
    </div>

    <div class="bet-controls">
      <button class="bet-btn" onclick="adjustBet(-50)">-</button>
      <span>Bet: 💰 <strong id="roulette-bet">50</strong></span>
      <button class="bet-btn" onclick="adjustBet(50)">+</button>
    </div>

    <button class="action-btn" id="roulette-btn" onclick="playRoulette()">PLAY ROULETTE</button>
    <div class="status-msg" id="roulette-status">Pick a color to start.</div>
  </div>

  <script>
    // Initialize Telegram WebApp SDK
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand(); // Expand Mini App to full height

    // State Variables
    let balance = 1000;
    let currentBet = 50;
    let selectedColor = null;
    const slotSymbols = ['🍒', '🍋', '🍇', '🔔', '💎', '7️⃣'];

    // Load User Data from Telegram
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const user = tg.initDataUnsafe.user;
      document.getElementById('username').innerText = user.first_name || user.username || 'Player';
    }

    function updateUI() {
      document.getElementById('balance').innerText = balance;
      document.getElementById('slot-bet').innerText = currentBet;
      document.getElementById('roulette-bet').innerText = currentBet;
    }

    function switchTab(tab) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.game-card').forEach(card => card.classList.remove('active'));

      if (tab === 'slots') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('slots-game').classList.add('active');
      } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('roulette-game').classList.add('active');
      }
    }

    function adjustBet(amount) {
      if (currentBet + amount >= 10 && currentBet + amount <= balance) {
        currentBet += amount;
        updateUI();
        if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
      }
    }

    // --- SLOT MACHINE LOGIC ---
    function spinSlots() {
      if (balance < currentBet) {
        tg.showAlert("Insufficient balance!");
        return;
      }

      balance -= currentBet;
      updateUI();

      const spinBtn = document.getElementById('spin-btn');
      spinBtn.disabled = true;
      document.getElementById('slot-status').innerText = "Spinning...";

      if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');

      let spins = 0;
      const interval = setInterval(() => {
        document.getElementById('reel1').innerText = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        document.getElementById('reel2').innerText = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        document.getElementById('reel3').innerText = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        spins++;

        if (spins > 15) {
          clearInterval(interval);
          finalizeSlotSpin();
        }
      }, 80);
    }

    function finalizeSlotSpin() {
      const r1 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
      const r2 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
      const r3 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];

      document.getElementById('reel1').innerText = r1;
      document.getElementById('reel2').innerText = r2;
      document.getElementById('reel3').innerText = r3;

      let winAmount = 0;
      if (r1 === r2 && r2 === r3) {
        winAmount = currentBet * 10;
        document.getElementById('slot-status').innerText = `🎉 JACKPOT! You won ${winAmount}!`;
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
      } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        winAmount = currentBet * 2;
        document.getElementById('slot-status').innerText = `😃 2-of-a-kind! You won ${winAmount}!`;
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
      } else {
        document.getElementById('slot-status').innerText = "❌ No luck this time. Try again!";
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('error');
      }

      balance += winAmount;
      updateUI();
      document.getElementById('spin-btn').disabled = false;
    }

    // --- ROULETTE LOGIC ---
    function selectRouletteColor(color) {
      selectedColor = color;
      document.getElementById('opt-red').classList.toggle('selected', color === 'RED');
      document.getElementById('opt-black').classList.toggle('selected', color === 'BLACK');
      if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
    }

    function playRoulette() {
      if (!selectedColor) {
        tg.showAlert("Please select Red or Black first!");
        return;
      }
      if (balance < currentBet) {
        tg.showAlert("Insufficient balance!");
        return;
      }

      balance -= currentBet;
      updateUI();

      const rouletteBtn = document.getElementById('roulette-btn');
      rouletteBtn.disabled = true;
      document.getElementById('roulette-status').innerText = "Spinning wheel...";

      let turns = 0;
      const interval = setInterval(() => {
        const tempColor = Math.random() > 0.5 ? '🟥' : '⬛';
        document.getElementById('roulette-result').innerText = tempColor;
        turns++;

        if (turns > 12) {
          clearInterval(interval);
          finalizeRoulette();
        }
      }, 100);
    }

    function finalizeRoulette() {
      const isRed = Math.random() > 0.5;
      const outcome = isRed ? 'RED' : 'BLACK';
      document.getElementById('roulette-result').innerText = isRed ? '🟥' : '⬛';

      if (selectedColor === outcome) {
        const winAmount = currentBet * 2;
        balance += winAmount;
        document.getElementById('roulette-status').innerText = `🎉 Correct! Landed on ${outcome}. You won ${winAmount}!`;
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
      } else {
        document.getElementById('roulette-status').innerText = `❌ Landed on ${outcome}. Better luck next time!`;
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('error');
      }

      updateUI();
      document.getElementById('roulette-btn').disabled = false;
    }

    updateUI();
  </script>
</body>
</html>
