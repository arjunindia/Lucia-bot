// /lib/player.js
import { defineOnLoad } from "chooksie";
import { Player } from "discord-music-player";

export const chooksOnLoad = defineOnLoad((ctx) => {
  ctx.client.player = new Player(ctx.client, {
    timeout: 10000,
  });
  ctx.client.player
    .on("songFirst", (message, track) => {
      ctx.client.user.setActivity(`${track.name}`, {
        type: "STREAMING",
        url: track.url,
      });
    })
    .on("queueDestroyed", (message) => {
      ctx.client.user.setActivity("Dance Music", { type: "LISTENING" });
    })
    .on("queueEnd", (message) => {
      ctx.client.user.setActivity("Dance Music", { type: "LISTENING" });
    })
    .on("channelEmpty", (message) => {
      ctx.client.user.setActivity("Dance Music", { type: "LISTENING" });
    })
    .on("clientDisconnect", (message) => {
      ctx.client.user.setActivity("Dance Music", { type: "LISTENING" });
    })
    .on("error", (error, queue) => {
      console.log(`Error: ${error} in ${queue.guild.name}`);
    })
    .on("songChanged", (message, newTrack, oldTrack) => {
      // check if the queue is empty
      if (!newTrack) {
        ctx.client.user.setActivity("Dance Music", { type: "LISTENING" });
      } else {
        ctx.client.user.setActivity(`${newTrack.name}`, {
          type: "STREAMING",
          url: newTrack.url,
        });
      }
    });

});
