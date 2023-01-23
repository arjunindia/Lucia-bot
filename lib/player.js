// /lib/player.js
import { defineOnLoad } from "chooksie";
import { Player } from "discord-music-player";

export const chooksOnLoad = defineOnLoad((ctx) => {
  ctx.client.player = new Player(ctx.client);
});
