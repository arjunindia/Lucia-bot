import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";
export default defineSlashCommand({
  name: "emoji",
  description: "Send a custom emoji - even animated ones!",
  async execute(ctx) {
    //regex to select all words between square brackets
    const regex = /\[(.*?)\]/g;
    //get the message from the command
    const message = ctx.interaction.options.getString("message");
    //get all the words between square brackets
    const matches = message.match(regex);
    //if there are no matches, send the message as is
    if (!matches) {
      await ctx.interaction.reply(message);
      return;
    }
    //get all the emojis from the message
    const emojis = matches.map((match) => match.replace(/[\[\]]/g, ""));
    //get the emojis from the client
    const clientEmojis = ctx.client.emojis.cache;
    //get the emojis
    const emojiObjects = emojis.map((emoji) => {
      //get the emoji from the client
      const emojiObject = clientEmojis.find((e) => e.name === emoji);
      //if the emoji is not found, return the emoji name
      if (!emojiObject) return emoji;
      //if the emoji is found, return the emoji object
      return emojiObject;
    });
    //get the emoji ids
    const emojiIds = emojiObjects.map((emoji) => {
      //if the emoji is not found, return the emoji name
      if (typeof emoji === "string") return emoji;
      //if the emoji is found, return the emoji id
      return emoji.id;
    });
    //create a webhook to send the message
    const webhook = await ctx.interaction.channel.createWebhook(
      //webhook name is user nickname
      ctx.interaction.member.nickname || ctx.interaction.user.username,
      {
        avatar: ctx.interaction.user.displayAvatarURL(),
      }
    );

    //send the message with the emojis withot @everyone and @here mentions through the webhook
    await fetch(
      `https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message.replace(regex, (match) => {
            //get the emoji name
            const emojiName = match.replace(/[\[\]]/g, "");
            //get the emoji object
            const emojiObject = emojiObjects.find((e) => e.name === emojiName);
            //if the emoji is not found, return the emoji name
            if (typeof emojiObject === "string") return emojiObject;
            if (emojiObject?.animated === undefined) return `[${emojiName}]`;
            //if the emoji is found, return the emoji id
            return `<${emojiObject.animated ? "a" : ""}:${emojiObject.name}:${
              emojiObject.id
            }>`;
          }),
          allowed_mentions: {
            parse: ["users"],
          },
        }),
      }
    );
    //delete the webhook
    await webhook.delete();
    await ctx.interaction.reply({
      content: "Sent the message!",
      ephemeral: true,
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
