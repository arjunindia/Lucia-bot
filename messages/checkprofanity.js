import { defineMessageCommand } from "chooksie";
import fetch from "cross-fetch";

export default defineMessageCommand({
  name: "Check Profanity",
  async execute(ctx) {
    const msg = ctx.interaction.targetMessage;
    const user = ctx.interaction.targetMessage.author.id;
    await fetch(
      `https://www.purgomalum.com/service/containsprofanity?text=${msg.content}&add=${process.env.SWEARWORDS}}`
    )
      .then((res) => res.text())
      .then((data) => {
        if (data == "true") {
          ctx.interaction.reply(
            `This message contains profanity! bad boy <@${user}>!`
          );
        } else {
          ctx.interaction.reply(
            `This message does not seem to contain profanity! you get my pass for today <@${user}>!`
          );
        }
      });
  },
});
