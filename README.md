# ⚔️ NEON EMPIRE: WORLD WAR

A cyber-tactical, mobile-first Telegram Mini App and full-stack multiplayer grand strategy game. Built with React, TypeScript, Express, WebSockets, and PostgreSQL schema backing. Combat and simulation logic are strictly **server-authoritative**—the client cannot alter battle outcomes or manipulate resource costs.

---

## 🌟 Features

- **Tactical Holographic World Map**:
  - Interactive territories: Nova Prime, Eastern Coast, Iron Basin, Frostline, Solar Reach, and Deepwater.
  - Ownership states with real-time status: Player-controlled, Rival Empires, and Unclaimed regions.
  - Visual territory defense ratings, terrain attributes, and coordinate grids.

- **Server-Authoritative Military & Combat**:
  - **Dynamic Unit Recruitment**: Train Infantry, Armor divisions, Fighters, Strategic Bombers, and Naval Flotillas.
  - **Dynamic Cost Tooltips**: Real-time batch cost breakdown (Credits `◈`, Supplies `▧`, Fuel `ϟ`, Metal `⬡`) with affordability warnings and prestige projections.
  - **Asynchronous Strike Orders**: Launch Land Invasions, Air Strikes, and Naval Assaults with server-side resolution timers (15s–60s).
  - Background simulation loop calculates defense penetration, territory capture, and generates debrief reports.

- **Empire Management & Defenses**:
  - Monitor core strategic resources: Credits, Supplies, Fuel, and Metal.
  - Fortification matrices: Air Defense, Coastal Defense, Fortifications, and Radar.
  - Commander prestige ranking system.

- **Diplomatic Transmissions & Intelligence**:
  - Send direct dispatches to rival commanders: Messages, Alliance Proposals, Ultimatums, and Peace Treaties.
  - War room reports log combat outcomes, recruitment logs, and diplomatic history with timestamps.

- **Live WebSocket Synchronisation (`/ws`)**:
  - Instant event broadcasts on battle completion, unit enlistment, and territorial shifts.

- **Telegram WebApp & Demo Auth**:
  - Full HMAC cryptographic verification of Telegram `initData`.
  - Seamless local/browser demo fallback for instant playability outside Telegram (`ALLOW_DEMO_AUTH=true`).

- **Imperial Store**:
  - Catalog of elite commander passes, fortress upgrade kits, and war-chest resource bundles.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide Icons |
| **Backend** | Node.js, Express, TypeScript (`tsx`), WebSocket (`ws`), Zod |
| **Database** | PostgreSQL schema (`server/db/schema.sql`) with `pgcrypto` UUIDs |
| **Authentication** | Telegram Mini App `initData` HMAC-SHA256 & Demo Commander Mode |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm, yarn, pnpm, or bun
- *(Optional)* PostgreSQL 14+ for durable database persistence

### Installation

1. **Clone or navigate to the repository:**
   ```bash
   git clone <repository-url>
   cd neon-empire
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment:**
   - Copy `.env.example` to `.env` and configure:
     - DATABASE_URL=postgres://user:pass@localhost:5432/neon_empire
     - TELEGRAM_BOT_TOKEN=xxx
     - TELEGRAM_BOT_SECRET=xxx
     - ALLOW_DEMO_AUTH=true (for local testing)

4. **Database:**
   - Create the database and run migrations / apply schema located at `server/db/schema.sql`.

5. **Run (development):**
   ```bash
   npm run dev
   ```

---

## 📂 Suggested Repository Layout

- /client — React + TypeScript app (Telegram WebApp entry)
- /server — Express, WebSocket, game loop, and REST endpoints
- /server/db — schema.sql and migration scripts
- /scripts — deploy scripts, seeders, and test utilities
- /docs — design docs: combat model, balancing spreadsheets, message formats

---

## 🔐 Security & Server-Authoritative Rules

- All combat resolution, recruitment validation, and resource transfers run on the server. Clients only submit intents (e.g., "launch invasion") and receive authenticated debriefs.
- Use HMAC verification on Telegram initData for WebApp sessions; never trust client-supplied user IDs or balances.
- Validate all WebSocket messages with Zod schemas and run rate-limiting.

---

## 🧠 Core Concepts (Developer Notes)

- Combat is simulated in a deterministic engine: a seeded PRNG with server-only seeds for replayable debriefs.
- Units and buildings include meta fields: { hp, atk, def, speed, cost:{credits,supplies,fuel,metal}, upkeep }
- Territory capture follows a penetration model: penetration = offense - defense; if penetration > threshold then capture occurs after timer.
- Game ticks: background job runs every 5s to process orders, every 1m to run strategic economy updates.

---

## 🛰️ WebSocket Events (/ws)

- CONNECT — client -> server authenticate (session token/HMAC)
- SYNC — server -> client full state snapshot (on join)
- ORDER_PLACED — client -> server place recruitment/attack order
- ORDER_RESOLVED — server -> client order result with debrief
- TERRITORY_UPDATE — server -> client ownership/defense updates
- CHAT_MESSAGE — bi-directional command chat

---

## 🧪 Running Tests and Simulation

- Unit tests for combat model: `npm run test:combat`
- Integration test for order lifecycle: `npm run test:integration`
- Use `scripts/seeders` to create rival empires and scenario snapshots for replay.

---

## 💡 Roadmap

- Add cross-server persistent world shards and inter-shard diplomacy
- Implement atomic market transactions with a central auction house
- Mobile-optimized HUD and controller remapping for accessibility

---

## 📄 License & Contribution

MIT — Contributions welcome. Please open issues and PRs. Include design rationale for gameplay changes (combat balance, economy).

---

If you'd like I can now:
- add badges and a minimal server example and schema stub in `server/db/schema.sql`, or
- create a `neon-empire/` folder and place the README there instead.

Tell me if you want any of those follow-ups; I've replaced the README.md with this NEON EMPIRE README.