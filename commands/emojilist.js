import { defineSlashCommand } from "chooksie";
export default defineSlashCommand({
  name: "emojilist",
  description: "See all the emojis available to be used by the emoji command",
  async execute(ctx) {
    await ctx.interaction.deferReply({
      ephemeral: true,
    });
    const emojis = ctx.client.emojis.cache.map((emoji) => emoji.toString());
    ctx.interaction.followUp({
      content: emojis.join(" "),
      ephemeral: true,
    });
  },
});
