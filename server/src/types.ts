import { WebSocket } from 'ws';
import { z } from 'zod';
import { getWorldState, resolveOrder } from './engine.js';

export const sessionSchema = z.object({
  token: z.string().min(8),
  playerId: z.string().optional(),
});

export type Session = {
  playerId: string;
  username: string;
  token: string;
};

export const sessions = new Map<string, Session>();

export function createSessionForPlayer(playerId: string, username: string) {
  const token = `session-${Math.random().toString(36).slice(2, 12)}`;
  const session = { playerId, username, token };
  sessions.set(token, session);
  return session;
}

export function verifySession(token: string | undefined) {
  if (!token) return null;
  return sessions.get(token) ?? null;
}

export function buildWorldSyncPayload() {
  return {
    type: 'SYNC',
    state: getWorldState(),
    time: new Date().toISOString(),
  };
}

export function handleOrderSubmission(order: any) {
  const result = resolveOrder(order);
  return {
    type: 'ORDER_RESOLVED',
    payload: result,
    time: new Date().toISOString(),
  };
}

export function broadcastToClients(websocketServer: { clients: Set<WebSocket> }, message: unknown) {
  const payload = JSON.stringify(message);
  websocketServer.clients.forEach((connection) => {
    if (connection.readyState === connection.OPEN) {
      connection.send(payload);
    }
  });
}
