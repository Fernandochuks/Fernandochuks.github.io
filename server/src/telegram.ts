import crypto from 'node:crypto';

export type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
};

export function verifyTelegramInitData(initData: string, botToken: string): TelegramUser | null {
  if (!initData || !botToken) return null;

  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return null;

  params.delete('hash');
  const dataCheckString = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();

  const expectedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  if (crypto.timingSafeEqual(Buffer.from(expectedHash, 'hex'), Buffer.from(hash, 'hex')) === false) {
    return null;
  }

  const user = params.get('user');
  if (!user) return null;

  try {
    const parsed = JSON.parse(user) as TelegramUser;
    return parsed;
  } catch {
    return null;
  }
}
