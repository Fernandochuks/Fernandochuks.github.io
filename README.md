<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CYBERPUNK // TACTICAL GRID</title>
    <style>
        :root {
            --neon-blue: #00f3ff;
            --neon-pink: #ff0055;
            --neon-yellow: #ffe600;
            --dark-bg: #0a0a12;
            --panel-bg: #121324;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            font-family: 'Courier New', Courier, monospace;
        }

        body {
            background-color: var(--dark-bg);
            color: #fff;
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        #sidebar {
            width: 320px;
            background-color: var(--panel-bg);
            border-right: 2px solid var(--neon-blue);
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-shadow: 5px 0 15px rgba(0, 243, 255, 0.2);
            z-index: 10;
        }

        h1 {
            color: var(--neon-pink);
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 5px;
            text-shadow: 0 0 8px var(--neon-pink);
        }

        .subtitle {
            color: var(--neon-blue);
            font-size: 11px;
            margin-bottom: 20px;
            letter-spacing: 1px;
        }

        .resource-panel {
            background: rgba(0, 243, 255, 0.05);
            border: 1px solid var(--neon-blue);
            padding: 12px;
            margin-bottom: 20px;
        }

        .resource {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .resource:last-child {
            margin-bottom: 0;
        }

        .val {
            color: var(--neon-yellow);
            font-weight: bold;
        }

        .controls-title {
            color: var(--neon-blue);
            font-size: 14px;
            margin-bottom: 10px;
            border-bottom: 1px solid var(--neon-blue);
            padding-bottom: 4px;
        }

        .btn {
            background: transparent;
            border: 1px solid var(--neon-blue);
            color: var(--neon-blue);
            padding: 12px;
            margin-bottom: 10px;
            cursor: pointer;
            font-weight: bold;
            text-transform: uppercase;
            transition: all 0.2s;
            text-align: left;
        }

        .btn:hover:not(:disabled) {
            background: var(--neon-blue);
            color: var(--dark-bg);
            box-shadow: 0 0 10px var(--neon-blue);
        }

        .btn:disabled {
            border-color: #444;
            color: #666;
            cursor: not-allowed;
        }

        #end-turn-btn {
            border-color: var(--neon-pink);
            color: var(--neon-pink);
            margin-top: auto;
            text-align: center;
        }

        #end-turn-btn:hover {
            background: var(--neon-pink);
            color: #fff;
            box-shadow: 0 0 10px var(--neon-pink);
        }

        #info-box {
            background: rgba(255, 255, 255, 0.03);
            border: 1px dashed #444;
            padding: 10px;
            font-size: 12px;
            color: #aaa;
            min-height: 100px;
            margin-bottom: 20px;
        }

        #info-box strong {
            color: #fff;
        }

        #game-container {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            background: radial-gradient(circle, #1a1c38 0%, #0a0a12 100%);
        }

        canvas {
            border: 2px solid var(--neon-blue);
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
            background-color: #0d0e1b;
        }

        #turn-indicator {
            position: absolute;
            top: 20px;
            font-size: 18px;
            font-weight: bold;
            color: var(--neon-blue);
            letter-spacing: 2px;
            background: rgba(10, 10, 18, 0.8);
            padding: 8px 16px;
            border: 1px solid var(--neon-blue);
        }
    </style>
</head>
<body>

    <div id="sidebar">
        <h1>Cyberpunk</h1>
        <div class="subtitle">TACTICAL GRID v1.0</div>

        <div class="resource-panel">
            <div class="resource">CREDITS: <span id="res-credits" class="val">100</span></div>
            <div class="resource">DATA NODES: <span id="res-data" class="val">0</span></div>
        </div>

        <div class="controls-title">RECRUITMENT</div>
        <button class="btn" id="buy-runner" onclick="recruit('runner')">
            Hacker Runner (50c)<br>
            <small style="font-weight:normal; font-size:10px;">Fast / Captures Nodes</small>
        </button>
        <button class="btn" id="buy-cyborg" onclick="recruit('cyborg')">
            Street Cyborg (80c)<br>
            <small style="font-weight:normal; font-size:10px;">Heavy Combat Unit</small>
        </button>

        <div class="controls-title" style="margin-top: 15px;">TARGET INFO</div>
        <div id="info-box">Select a unit or node to inspect stats.</div>

        <button class="btn" id="end-turn-btn" onclick="endTurn()">End Turn</button>
    </div>

    <div id="game-container">
        <div id="turn-indicator">PLAYER TURN</div>
        <canvas id="gridCanvas" width="720" height="720"></canvas>
    </div>

    <script>
        const canvas = document.getElementById('gridCanvas');
        const ctx = canvas.getContext('2d');

        const GRID_SIZE = 12;
        const TILE_SIZE = canvas.width / GRID_SIZE;

        // Game State
        let turn = 'player'; // 'player' or 'ai'
        let credits = 100;
        let selectedUnit = null;

        // Map layout (0: Empty, 1: Obstacle/Building, 2: Data Node)
        const map = [
            [0,0,0,0,0,1,0,0,0,0,0,0],
            [0,2,0,0,0,1,0,0,0,2,0,0],
            [0,0,0,1,0,0,0,1,0,0,0,0],
            [0,0,1,1,0,0,0,1,1,0,0,0],
            [0,0,0,0,2,0,0,2,0,0,0,0],
            [1,1,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,1,1],
            [0,0,0,0,2,0,0,2,0,0,0,0],
            [0,0,1,1,0,0,0,1,1,0,0,0],
            [0,0,0,1,0,0,0,1,0,0,0,0],
            [0,2,0,0,0,1,0,0,0,2,0,0],
            [0,0,0,0,0,1,0,0,0,0,0,0]
        ];

        // Owner of nodes: null, 'player', or 'ai'
        const nodeOwners = {};

        // Unit definitions
        const UNIT_TYPES = {
            runner: { name: 'Hacker Runner', hp: 30, atk: 12, range: 1, move: 3, cost: 50, color: '#00f3ff' },
            cyborg: { name: 'Street Cyborg', hp: 60, atk: 25, range: 1, move: 2, cost: 80, color: '#ffe600' }
        };

        let units = [
            { id: 1, type: 'runner', owner: 'player', x: 0, y: 0, hp: 30, maxHp: 30, movesLeft: 3, attacked: false },
            { id: 2, type: 'cyborg', owner: 'player', x: 1, y: 0, hp: 60, maxHp: 60, movesLeft: 2, attacked: false },
            { id: 3, type: 'runner', owner: 'ai', x: 11, y: 11, hp: 30, maxHp: 30, movesLeft: 3, attacked: false },
            { id: 4, type: 'cyborg', owner: 'ai', x: 10, y: 11, hp: 60, maxHp: 60, movesLeft: 2, attacked: false }
        ];

        let unitIdCounter = 5;

        // Initialize Node Owners
        for(let r=0; r<GRID_SIZE; r++){
            for(let c=0; c<GRID_SIZE; c++){
                if(map[r][c] === 2) nodeOwners[`${r},${c}`] = null;
            }
        }

        // --- DRAWING FUNCTIONS ---

        function drawGrid() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let r = 0; r < GRID_SIZE; r++) {
                for (let c = 0; c < GRID_SIZE; c++) {
                    const x = c * TILE_SIZE;
                    const y = r * TILE_SIZE;

                    // Draw base tile
                    ctx.strokeStyle = '#1a1c38';
                    ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);

                    // Draw terrain
                    if (map[r][c] === 1) { // Building
                        ctx.fillStyle = '#1c1d36';
                        ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
                        ctx.strokeStyle = '#ff0055';
                        ctx.strokeRect(x + 4, y + 4, TILE_SIZE - 8, TILE_SIZE - 8);
                    } else if (map[r][c] === 2) { // Data Node
                        const owner = nodeOwners[`${r},${c}`];
                        ctx.fillStyle = owner === 'player' ? 'rgba(0,243,255,0.3)' : owner === 'ai' ? 'rgba(255,0,85,0.3)' : 'rgba(255,230,0,0.2)';
                        ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
                        
                        ctx.fillStyle = owner === 'player' ? '#00f3ff' : owner === 'ai' ? '#ff0055' : '#ffe600';
                        ctx.beginPath();
                        ctx.arc(x + TILE_SIZE/2, y + TILE_SIZE/2, 8, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // Draw highlight overlay for selected unit movement
            if (selectedUnit && selectedUnit.owner === 'player' && turn === 'player') {
                drawMovementRange(selectedUnit);
            }

            // Draw Units
            units.forEach(u => {
                const x = u.x * TILE_SIZE;
                const y = u.y * TILE_SIZE;
                const stats = UNIT_TYPES[u.type];

                // Base indicator
                ctx.fillStyle = u.owner === 'player' ? '#00f3ff' : '#ff0055';
                ctx.beginPath();
                ctx.arc(x + TILE_SIZE/2, y + TILE_SIZE/2, 16, 0, Math.PI * 2);
                ctx.fill();

                // Unit Inner Icon
                ctx.fillStyle = stats.color;
                ctx.fillRect(x + TILE_SIZE/2 - 6, y + TILE_SIZE/2 - 6, 12, 12);

                // Selection Ring
                if (selectedUnit && selectedUnit.id === u.id) {
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
                    ctx.lineWidth = 1;
                }

                // HP Bar
                const hpPercent = u.hp / u.maxHp;
                ctx.fillStyle = '#000';
                ctx.fillRect(x + 6, y + TILE_SIZE - 10, TILE_SIZE - 12, 5);
                ctx.fillStyle = hpPercent > 0.5 ? '#00ff66' : '#ff0055';
                ctx.fillRect(x + 6, y + TILE_SIZE - 10, (TILE_SIZE - 12) * hpPercent, 5);
            });
        }

        function drawMovementRange(unit) {
            ctx.fillStyle = 'rgba(0, 243, 255, 0.15)';
            for (let r = 0; r < GRID_SIZE; r++) {
                for (let c = 0; c < GRID_SIZE; c++) {
                    const dist = Math.abs(unit.x - c) + Math.abs(unit.y - r);
                    if (dist <= unit.movesLeft && map[r][c] !== 1 && !getUnitAt(c, r)) {
                        ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    }
                }
            }
        }

        // --- GAME LOGIC ---

        function getUnitAt(x, y) {
            return units.find(u => u.x === x && u.y === y);
        }

        canvas.addEventListener('click', (e) => {
            if (turn !== 'player') return;

            const rect = canvas.getBoundingClientRect();
            const clickX = Math.floor((e.clientX - rect.left) / TILE_SIZE);
            const clickY = Math.floor((e.clientY - rect.top) / TILE_SIZE);

            const clickedUnit = getUnitAt(clickX, clickY);

            // Unit Selection
            if (clickedUnit) {
                if (clickedUnit.owner === 'player') {
                    selectedUnit = clickedUnit;
                    updateInfoBox(selectedUnit);
                } else if (selectedUnit && selectedUnit.owner === 'player' && !selectedUnit.attacked) {
                    // Attack AI unit
                    const dist = Math.abs(selectedUnit.x - clickX) + Math.abs(selectedUnit.y - clickY);
                    if (dist <= UNIT_TYPES[selectedUnit.type].range) {
                        attackUnit(selectedUnit, clickedUnit);
                    }
                }
                drawGrid();
                return;
            }

            // Movement / Action
            if (selectedUnit && selectedUnit.owner === 'player') {
                const dist = Math.abs(selectedUnit.x - clickX) + Math.abs(selectedUnit.y - clickY);
                if (dist <= selectedUnit.movesLeft && map[clickY][clickX] !== 1) {
                    selectedUnit.x = clickX;
                    selectedUnit.y = clickY;
                    selectedUnit.movesLeft -= dist;

                    // Capture node if on one
                    if (map[clickY][clickX] === 2) {
                        nodeOwners[`${clickY},${clickX}`] = 'player';
                        updateResourcesUI();
                    }
                }
            }

            drawGrid();
        });

        function attackUnit(attacker, defender) {
            const stats = UNIT_TYPES[attacker.type];
            defender.hp -= stats.atk;
            attacker.attacked = true;
            attacker.movesLeft = 0;

            if (defender.hp <= 0) {
                units = units.filter(u => u.id !== defender.id);
                if (selectedUnit && selectedUnit.id === defender.id) selectedUnit = null;
            }

            updateInfoBox(attacker);
            checkWinCondition();
        }

        function recruit(type) {
            if (turn !== 'player') return;
            const cost = UNIT_TYPES[type].cost;
            if (credits < cost) return;

            // Spawn near top-left area
            const spawnPoints = [{x:0, y:0}, {x:1, y:0}, {x:0, y:1}, {x:1, y:1}];
            const freeSpot = spawnPoints.find(p => !getUnitAt(p.x, p.y));

            if (freeSpot) {
                credits -= cost;
                units.push({
                    id: unitIdCounter++,
                    type: type,
                    owner: 'player',
                    x: freeSpot.x,
                    y: freeSpot.y,
                    hp: UNIT_TYPES[type].hp,
                    maxHp: UNIT_TYPES[type].hp,
                    movesLeft: 0,
                    attacked: true
                });
                updateResourcesUI();
                drawGrid();
            } else {
                alert("Spawn zone occupied!");
            }
        }

        function endTurn() {
            if (turn === 'player') {
                turn = 'ai';
                document.getElementById('turn-indicator').innerText = "AI TURN";
                document.getElementById('turn-indicator').style.color = "var(--neon-pink)";
                selectedUnit = null;
                setTimeout(runAITurn, 800);
            }
        }

        function runAITurn() {
            // Process AI movement & attacks
            const aiUnits = units.filter(u => u.owner === 'ai');

            aiUnits.forEach(u => {
                let targets = units.filter(enemy => enemy.owner === 'player');
                if (targets.length === 0) return;

                // Find closest player unit
                let closest = targets[0];
                let minDist = Math.abs(u.x - closest.x) + Math.abs(u.y - closest.y);

                targets.forEach(t => {
                    let d = Math.abs(u.x - t.x) + Math.abs(u.y - t.y);
                    if (d < minDist) {
                        minDist = d;
                        closest = t;
                    }
                });

                // Attack if in range
                if (minDist <= UNIT_TYPES[u.type].range) {
                    attackUnit(u, closest);
                } else {
                    // Step towards target
                    let moveDist = UNIT_TYPES[u.type].move;
                    let dx = Math.sign(closest.x - u.x);
                    let dy = Math.sign(closest.y - u.y);

                    let newX = u.x + (dx * Math.min(moveDist, Math.abs(closest.x - u.x)));
                    let newY = u.y + (dy * Math.min(moveDist, Math.abs(closest.y - u.y)));

                    if (map[newY][newX] !== 1 && !getUnitAt(newX, newY)) {
                        u.x = newX;
                        u.y = newY;
                    }

                    // Check if standing on a Data Node
                    if (map[u.y][u.x] === 2) {
                        nodeOwners[`${u.y},${u.x}`] = 'ai';
                    }
                }
            });

            // Turn reset for Player
            turn = 'player';
            document.getElementById('turn-indicator').innerText = "PLAYER TURN";
            document.getElementById('turn-indicator').style.color = "var(--neon-blue)";

            // Income processing
            let playerNodes = Object.values(nodeOwners).filter(v => v === 'player').length;
            credits += 40 + (playerNodes * 20);

            // Reset unit movement
            units.forEach(u => {
                u.movesLeft = UNIT_TYPES[u.type].move;
                u.attacked = false;
            });

            updateResourcesUI();
            drawGrid();
            checkWinCondition();
        }

        function updateResourcesUI() {
            document.getElementById('res-credits').innerText = credits;
            let playerNodes = Object.values(nodeOwners).filter(v => v === 'player').length;
            document.getElementById('res-data').innerText = playerNodes;

            document.getElementById('buy-runner').disabled = credits < UNIT_TYPES.runner.cost;
            document.getElementById('buy-cyborg').disabled = credits < UNIT_TYPES.cyborg.cost;
        }

        function updateInfoBox(unit) {
            const stats = UNIT_TYPES[unit.type];
            document.getElementById('info-box').innerHTML = `
                <strong>${stats.name}</strong> (${unit.owner.toUpperCase()})<br>
                HP: ${unit.hp}/${unit.maxHp}<br>
                ATK: ${stats.atk}<br>
                Moves Left: ${unit.movesLeft}<br>
                Attacked: ${unit.attacked ? 'Yes' : 'No'}
            `;
        }

        function checkWinCondition() {
            const playerUnits = units.filter(u => u.owner === 'player');
            const aiUnits = units.filter(u => u.owner === 'ai');

            if (aiUnits.length === 0) {
                alert("SYSTEM OVERRIDE SUCCESSFUL: YOU WIN!");
                location.reload();
            } else if (playerUnits.length === 0 && credits < 50) {
                alert("CRITICAL SYSTEM FAILURE: GAME OVER!");
                location.reload();
            }
        }

        // Initialize Display
        updateResourcesUI();
        drawGrid();
    </script>
</body>
</html>
