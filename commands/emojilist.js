import { defineSlashCommand } from "chooksie";
const { MessageEmbed, MessageButton } = require("discord.js");
import paginationEmbed from "discordjs-button-pagination";

const button1 = new MessageButton()
  .setCustomId("previousbtn")
  .setLabel("Previous")
  .setStyle("DANGER");

const button2 = new MessageButton()
  .setCustomId("nextbtn")
  .setLabel("Next")
  .setStyle("SUCCESS");

const buttonList = [button1, button2];

export default defineSlashCommand({
  name: "emojilist",
  description: "See all the emojis available to be used by the emoji command",
  async execute(ctx) {
    // await ctx.interaction.deferReply({
    //   ephemeral: true,
    // });
    const emojis = ctx.client.emojis.cache.map((emoji) => emoji.toString());
    //create pages1 array with 25 emojis per array
    const pages1 = emojis.reduce((acc, cur, i) => {
      if (i % 20 === 0) {
        acc.push([cur]);
      } else {
        acc[acc.length - 1].push(cur);
      }
      return acc;
    }, []);

    //create pages array with 25 emojis per array
    const pages = pages1.map((page) => {
      const embed = new MessageEmbed()
        .setTitle("Emoji List")
        .setDescription("Emojis available to be used by the emoji command")
        .addFields(
          {
            name: "Emojis",
            value: page.join(" "),
          },
          {
            name: "How to use",
            value:
              "Use the emoji command like this: `/emoji message:`your message here [your emoji name here] and so on [with any amount of emojis]`",
          }
        )
        .setColor("RANDOM");
      return embed;
    });
    ctx.logger.info(JSON.stringify(pages1));
    paginationEmbed(ctx.interaction, pages, buttonList, true, 120000);
  },
});
