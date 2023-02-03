import { defineSlashCommand } from "chooksie";
import { MessageButton, MessageActionRow } from "discord.js";

export default defineSlashCommand({
  name: "poll",
  description: "Create a poll",
  async execute(ctx) {
    const question = ctx.interaction.options.getString("question");
    const options = ctx.interaction.options.getString("options").split(",");

    if (options.length > 10)
      return await ctx.interaction.reply({
        embeds: [
          {
            title: "You can only have up to 10 options!",
            color: "RED",
          },
        ],
        ephemeral: true,
      });

    const buttons = options.map((option) => {
      return new MessageButton()
        .setLabel(option)
        .setStyle("PRIMARY")
        .setCustomId(option);
    });

    const buttonRow = new MessageActionRow().addComponents(buttons);

    await ctx.interaction.reply({
      embeds: [
        {
          title: question,
          color: "RANDOM",
        },
      ],
      components: [buttonRow],
    });
  },
  options: [
    {
      name: "question",
      description: "The question to ask",
      type: "STRING",
      required: true,
    },
    {
      name: "options",
      description: "The options to choose from, comma separated",
      type: "STRING",
      required: true,
    },
  ],
});
