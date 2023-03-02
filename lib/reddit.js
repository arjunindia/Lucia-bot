// /lib/player.js
import { defineOnLoad } from "chooksie";
import Snoowrap from "snoowrap";

export const chooksOnLoad = defineOnLoad((ctx) => {
  const r = new Snoowrap({
    userAgent: process.env.USERAGENT,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    username: process.env["RD-USERNAME"],
    password: process.env["RD-PASSWORD"],
  });
  r.config({ continueAfterRatelimitError: true, debug: true });
  ctx.client.r = r;
});
