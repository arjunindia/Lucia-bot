import { defineSlashCommand } from "chooksie";

const options = [
  "🇦",
  "🇧",
  "🇨",
  "🇩",
  "🇪",
  "🇫",
  "🇬",
  "🇭",
  "🇮",
  "🇯",
  "🇰",
  "🇱",
  "🇲",
  "🇳",
  "🇴",
  "🇵",
  "🇶",
  "🇷",
  "🇸",
  "🇹",
  "🇺",
  "🇻",
  "🇼",
  "🇽",
  "🇾",
  "🇿",
];

export default defineSlashCommand({
  name: "poll",
  description: "Start a poll",
  async execute(ctx) {
    if (ctx.interaction.options.getString("options").split(",").length > 26) {
      return await ctx.interaction.reply({
        content: "You can only have up to 26 options",
        ephemeral: true,
      });
    }

    const reply = await ctx.interaction.reply({
      embeds: [
        {
          title: ctx.interaction.options.getString("question"),
          description: ctx.interaction.options
            .getString("options")
            .split(",")
            .map((option, index) => `${options[index]} : ${option}`)
            .join("\n"),
        },
      ],
      fetchReply: true,
    });
    const opts = ctx.interaction.options.getString("options").split(",");

    for (const i of opts.keys()) {
      await reply.react(options[i]);
    }
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
