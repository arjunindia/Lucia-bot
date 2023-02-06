// /lib/player.js
import { defineOnLoad } from "chooksie";
import sagiri from "sagiri";

export const chooksOnLoad = defineOnLoad((ctx) => {
  ctx.client.sagiri = sagiri(process.env.SAGIRI_TOKEN);
});
