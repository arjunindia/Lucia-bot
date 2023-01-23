import { defineEvent } from 'chooksie'
import { Player } from "discord-music-player";
export let player;
export default defineEvent({
  name: "ready",
  once: true,
  execute(ctx) {
    ctx.logger.info(`Logged in as ${ctx.client.user.username}!`);
    ctx.client.user.setActivity("Dance Music", { type: "LISTENING" });
    player = new Player(ctx.client);
  },
});

