import { defineButtonHandler } from "chooksie";
import { MessageButton, MessageActionRow } from "discord.js";
export default defineButtonHandler({
  customId: "pong",
  async execute(ctx) {
    const button = new MessageButton()
      .setCustomId("pong")
      .setStyle("PRIMARY")
      .setEmoji("🏓")
      .setLabel("Ping");
    await ctx.interaction.reply({
      content: "Pong! " + ctx.client.ws.ping + "ms",
      components: [new MessageActionRow().addComponents(button)],
    });
  },
});
