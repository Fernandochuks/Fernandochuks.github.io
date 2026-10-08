‎<!DOCTYPE html>
‎<html lang="en">
‎<head>
‎    <meta charset="UTF-8">
‎    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
‎    <title>Cyberpunk: Syndicate Wars</title>
‎    <!-- Telegram Web App SDK for seamless mobile integration -->
‎    <script src="https://telegram.org"></script>
‎    <style>
‎        :root {
‎            --bg-color: #0a0a12;
‎            --panel-color: #121225;
‎            --neon-blue: #00f0ff;
‎            --neon-green: #39ff14;
‎            --neon-pink: #ff007f;
‎            --text-color: #e0e0ff;
‎            --muted-text: #7070a0;
‎        }
‎
‎        * {
‎            box-sizing: border-box;
‎            margin: 0;
‎            padding: 0;
‎            user-select: none;
‎            -webkit-user-select: none;
‎            font-family: 'Courier New', Courier, monospace;
‎        }
‎
‎        body {
‎            background-color: var(--bg-color);
‎            color: var(--text-color);
‎            overflow: hidden;
‎            width: 100vw;
‎            height: 100vh;
‎            display: flex;
‎            flex-direction: column;
‎        }
‎
‎        /* Top Header Panel */
‎        header {
‎            background: linear-gradient(180deg, rgba(18, 18, 37, 1) 0%, rgba(10, 10, 18, 0) 100%);
‎            padding: 20px;
‎            text-align: center;
‎            border-bottom: 1px solid rgba(0, 240, 255, 0.2);
‎        }
‎
‎        header h1 {
‎            font-size: 1.5rem;
‎            color: var(--neon-blue);
‎            text-transform: uppercase;
‎            letter-spacing: 4px;
‎            text-shadow: 0 0 10px var(--neon-blue);
‎            margin-bottom: 5px;
‎        }
‎
‎        .balance-container {
‎            font-size: 1.8rem;
‎            font-weight: bold;
‎            color: var(--neon-green);
‎            text-shadow: 0 0 10px var(--neon-green);
‎            margin: 10px 0 5px 0;
‎        }
‎
‎        .rate-container {
‎            font-size: 0.85rem;
‎            color: var(--muted-text);
‎        }
‎
‎        .rate-container span {
‎            color: var(--neon-blue);
‎        }
‎
‎        /* Main Viewport Workspace */
‎        main {
‎            flex: 1;
‎            overflow-y: auto;
‎            padding: 20px;
‎            padding-bottom: 90px; /* Space for fixed bottom navigation */
‎        }
‎
‎        .tab-content {
‎            display: none;
‎        }
‎
‎        .tab-content.active {
‎            display: block;
‎        }
‎
‎        /* Central Node Animation Visuals */
‎        .node-display {
‎            display: flex;
‎            flex-direction: column;
‎            align-items: center;
‎            justify-content: center;
‎            margin-top: 20px;
‎        }
‎
‎        .core-circle {
‎            width: 160px;
‎            height: 160px;
‎            border-radius: 50%;
‎            border: 3px dashed var(--neon-blue);
‎            display: flex;
‎            align-items: center;
‎            justify-content: center;
‎            box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
‎            animation: spin 20s linear infinite;
‎            margin-bottom: 30px;
‎            position: relative;
‎        }
‎
‎        @keyframes spin { 100% { transform: rotate(360deg); } }
‎
‎        .core-inner {
‎            width: 120px;
‎            height: 120px;
‎            border-radius: 50%;
‎            background: var(--panel-color);
‎            border: 2px solid var(--neon-pink);
‎            box-shadow: inset 0 0 15px rgba(255, 0, 127, 0.4);
‎            animation: pulse 2s infinite ease-in-out;
‎        }
‎
‎        @keyframes pulse {
‎            0% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 0, 127, 0.4); }
‎            50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(255, 0, 127, 0.8); }
‎            100% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 0, 127, 0.4); }
‎        }
‎
‎        .stats-panel {
‎            background-color: var(--panel-color);
‎            border: 1px solid rgba(112, 112, 160, 0.2);
‎            width: 100%;
‎            border-radius: 8px;
‎            padding: 15px;
‎        }
‎
‎        .stat-row {
‎            display: flex;
‎            justify-content: space-between;
‎            margin-bottom: 8px;
‎            font-size: 0.9rem;
‎        }
‎
‎        .stat-row:last-child { margin-bottom: 0; }
‎        .stat-label { color: var(--muted-text); }
‎        .stat-val { color: var(--text-color); font-weight: bold; }
‎
‎        /* Upgrade System Lists */
‎        .upgrade-card {
‎            background-color: var(--panel-color);
‎            border-left: 4px solid var(--neon-blue);
‎            border-top: 1px solid rgba(112, 112, 160, 0.2);
‎            border-right: 1px solid rgba(112, 112, 160, 0.2);
‎            border-bottom: 1px solid rgba(112, 112, 160, 0.2);
‎            border-radius: 4px;
‎            padding: 15px;
‎            margin-bottom: 15px;
‎            display: flex;
‎            justify-content: space-between;
‎            ali
