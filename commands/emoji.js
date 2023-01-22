import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";
export default defineSlashCommand({
  name: "emoji",
  description: "Send a custom emoji - even animated ones!",
  async execute(ctx) {
    ctx.interaction.client.emojis.cache.forEach((emoji) => {
      if (emoji.name === ctx.interaction.options.getString("message")) {
        ctx.interaction.reply({
          content: emoji.toString(),
        });
      }
    });

    // await ctx.interaction.reply({
    //   content: ctx.interaction.options.getString("message"),
    // });
  },
  options: [
    {
      name: "message",
      description: "The message with the emoji you want to send",
      type: "STRING",
      required: true,
    },
  ],
});
