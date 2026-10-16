export type Terrain = 'urban' | 'coastal' | 'industrial' | 'arctic' | 'desert';

export type Territory = {
  id: string;
  name: string;
  slug: string;
  ownerId: string | null;
  defense: number;
  terrain: Terrain;
  x: number;
  y: number;
};

export type Player = {
  id: string;
  username: string;
  prestige: number;
  credits: number;
  supplies: number;
  fuel: number;
  metal: number;
};

export type OrderType = 'attack' | 'recruit';

export type Order = {
  id: string;
  playerId: string;
  type: OrderType;
  territoryId: string;
  unit?: string;
  amount?: number;
};

const players: Player[] = [
  { id: 'player-1', username: 'Commander Nova', prestige: 52, credits: 5500, supplies: 4600, fuel: 3300, metal: 3100 },
  { id: 'rival-1', username: 'Warden Iron', prestige: 48, credits: 4900, supplies: 4200, fuel: 3000, metal: 2900 },
  { id: 'rival-2', username: 'Khepri Pulse', prestige: 44, credits: 4700, supplies: 4000, fuel: 3150, metal: 2600 },
];

const territories: Territory[] = [
  { id: 'territory-nova-prime', name: 'Nova Prime', slug: 'nova-prime', ownerId: 'player-1', defense: 62, terrain: 'urban', x: 20, y: 45 },
  { id: 'territory-east-coast', name: 'Eastern Coast', slug: 'eastern-coast', ownerId: null, defense: 48, terrain: 'coastal', x: 40, y: 62 },
  { id: 'territory-iron-basin', name: 'Iron Basin', slug: 'iron-basin', ownerId: 'rival-1', defense: 58, terrain: 'industrial', x: 60, y: 50 },
  { id: 'territory-frostline', name: 'Frostline', slug: 'frostline', ownerId: null, defense: 54, terrain: 'arctic', x: 72, y: 28 },
  { id: 'territory-solar-reach', name: 'Solar Reach', slug: 'solar-reach', ownerId: 'rival-2', defense: 49, terrain: 'desert', x: 48, y: 28 },
  { id: 'territory-deepwater', name: 'Deepwater', slug: 'deepwater', ownerId: null, defense: 52, terrain: 'coastal', x: 28, y: 74 },
];

export function getWorldState() {
  return {
    players,
    territories,
    serverTime: new Date().toISOString(),
  };
}

export function getPlayer(playerId: string) {
  return players.find((player) => player.id === playerId) ?? null;
}

export function resolveOrder(order: Order) {
  const player = getPlayer(order.playerId);
  const territory = territories.find((target) => target.id === order.territoryId);

  if (!player || !territory) {
    throw new Error('Invalid player or territory');
  }

  if (order.type === 'recruit') {
    const unitCost = {
      infantry: { credits: 120, supplies: 80, fuel: 20, metal: 60 },
      armor: { credits: 240, supplies: 140, fuel: 80, metal: 120 },
      fighter: { credits: 300, supplies: 130, fuel: 110, metal: 90 },
    };

    const key = (order.unit ?? 'infantry').toLowerCase();
    const cost = unitCost[key as keyof typeof unitCost] ?? unitCost.infantry;

    if (player.credits < cost.credits || player.supplies < cost.supplies || player.fuel < cost.fuel || player.metal < cost.metal) {
      return {
        type: 'recruit',
        ok: false,
        message: 'Insufficient resources for recruitment.',
      };
    }

    player.credits -= cost.credits;
    player.supplies -= cost.supplies;
    player.fuel -= cost.fuel;
    player.metal -= cost.metal;
    player.prestige += 2;

    return {
      type: 'recruit',
      ok: true,
      message: `${order.unit ?? 'Infantry'} recruited successfully.`,
      player,
      territory,
    };
  }

  const offense = 12 + player.prestige * 0.55;
  const defense = territory.defense * 0.85;
  const successChance = Math.max(0.18, Math.min(0.9, (offense - defense + 16) / 36));
  const success = Math.random() < successChance;

  if (success) {
    territory.ownerId = player.id;
    territory.defense = Math.max(18, territory.defense - 14);
    player.credits += 320;
    player.prestige += 6;
    return {
      type: 'attack',
      ok: true,
      message: `Strike successful. ${territory.name} has been captured.`,
      territory,
      player,
    };
  }

  territory.defense = Math.min(90, territory.defense + 8);
  player.prestige = Math.max(1, player.prestige - 2);
  return {
    type: 'attack',
    ok: false,
    message: `Strike failed. Defense held on ${territory.name}.`,
    territory,
    player,
  };
}
