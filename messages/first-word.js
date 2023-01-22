import { defineMessageCommand } from 'chooksie'

export default defineMessageCommand({
  name: 'First Word',
  async execute(ctx) {
    const msg = ctx.interaction.targetMessage;
    const firstWord = msg.content.split(/ +/g)[0];
    await ctx.interaction.reply({
      content: `The first word of the message is: ${firstWord}`,
      allowedMentions: {
        parse: ["users"],
      },
    });
  },
})
