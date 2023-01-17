import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";

export default defineSlashCommand({
  name: "animequote",
  description: "Get a random anime quote!",
  async execute(ctx) {
    await fetch("https://animechan.vercel.app/api/random")
      .then((response) => response.json())
      .then((quote) => {
        ctx.interaction.reply({
          content: `**${quote.anime}**\n\n${quote.quote}\n\n-${quote.character}`,
        });
      });
  },
});
