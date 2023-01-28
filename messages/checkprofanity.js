import { defineMessageCommand } from "chooksie";
import profanity from "profanity-hindi";

profanity.addWords(
  process.env.SWEARWORDS.split(",").map((word) => word.trim())
);
export default defineMessageCommand({
  name: "Check Profanity",
  async execute(ctx) {
    await ctx.interaction.deferReply();
    const msg = ctx.interaction.targetMessage;
    const user = ctx.interaction.targetMessage.author.id;
    if (profanity.isMessageDirty(msg.content)) {
      await ctx.interaction.followUp({
        content: `Message contains profanity! Bad boy <@${user}>!`,
        allowedMentions: {
          users: [user],
        },
      });
    } else {
      await ctx.interaction.followUp({
        content: `Message is clean! You get my pass for now <@${user}>!`,
        allowedMentions: {
          users: [user],
        },
      });
    }
  },
});
