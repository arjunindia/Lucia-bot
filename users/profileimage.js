import { defineUserCommand } from "chooksie";

export default defineUserCommand({
  name: "Get Profile Image",
  async execute(ctx) {
    const user = ctx.interaction.user;
    const target = ctx.interaction.targetUser;
    await ctx.interaction.reply(
      `${target.username}'s avatar\n ${target.avatarURL({ dynamic: true })}`
    );
  },
});
