import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";
export default defineSlashCommand({
  name: "shorten",
  description: "Shorten links using gotiny!",
  async execute(ctx) {
    await fetch("https://gotiny.cc/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: ctx.interaction.options.getString("url"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        ctx.interaction.reply({
          content: `Your shortened link is: https://gotiny.cc/${data[0].code}`,
        });
      });
  },
  options: [
    {
      name: "url",
      description: "The URL you want to shorten",
      type: "STRING",
      required: true,
    },
  ],
});
