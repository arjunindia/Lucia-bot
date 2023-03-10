import { defineConfig } from "chooksie";
export default defineConfig({
  token: process.env.BOT_TOKEN,
  devServer: process.env.DEV_SERVER,
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_MEMBERS",
    "GUILD_PRESENCES",
    "GUILD_VOICE_STATES",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
    "GUILD_BANS",
    "GUILD_INTEGRATIONS",
    "MESSAGE_CONTENT",
  ],
});
