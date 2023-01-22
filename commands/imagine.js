import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";
import fs from "fs";
export default defineSlashCommand({
  name: "imagine",
  description: "Generate images using the craiyon AI!",
  async execute(ctx) {
    const channelId = ctx.interaction.channelId;
    const channel = ctx.client.channels.cache.get(`${channelId}`);
    console.log(channelId);
    ctx.interaction.deferReply();
    await fetch("https://backend.craiyon.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: ctx.interaction.options.getString("prompt"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const buffer = [0, 0, 0, 0].map((_, i) =>
          Buffer.from(data.images[i], "base64")
        );
        ctx.interaction.followUp({
          files: buffer.map((b, i) => ({
            name: `image${i}.webp`,
            attachment: b,
          })),
        });
      });
  },
  options: [
    {
      name: "prompt",
      description: "Prompt for the image",
      type: "STRING",
      required: true,
    },
  ],
});
