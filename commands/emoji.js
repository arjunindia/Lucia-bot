import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";
export default defineSlashCommand({
  name: "emoji",
  description: "Send a custom emoji - even animated ones!",
  async execute(ctx) {
    //get guild from id
    const emoji = ctx.interaction.client.emojis.cache.find(
      (emoji) => emoji.name === ctx.interaction.options.getString("message")
    );

    //send emoji

    await ctx.interaction.reply({
      content: `${
        emoji ? emoji : ctx.interaction.options.getString("message")
      }`,
    });
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
