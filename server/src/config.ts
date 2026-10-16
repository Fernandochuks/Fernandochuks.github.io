import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 4000),
  allowDemoAuth: process.env.ALLOW_DEMO_AUTH === 'true',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? 'demo-bot-token',
  telegramBotSecret: process.env.TELEGRAM_BOT_SECRET ?? '',
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/neon_empire',
};
