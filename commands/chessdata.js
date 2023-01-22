import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";

export default defineSlashCommand({
  name: "chessdata",
  description: "Get chess.com data from username",
  async execute(ctx) {
    await ctx.interaction.deferReply();
    const username = ctx.interaction.options.getString("username");
    let elo = 0;
    await fetch(`https://api.chess.com/pub/player/${username}/stats`)
      .then((response) => response.json())
      .then((quote) => {
        if (quote.chess_blitz !== undefined) {
          elo = quote.chess_blitz.last.rating;
        }
        if (quote.chess_rapid !== undefined) {
          elo = quote.chess_rapid.last.rating;
        }
        if (quote.chess_bullet !== undefined) {
          elo = quote.chess_bullet.last.rating;
        }
      });

    await fetch(`https://api.chess.com/pub/player/${username}`)
      .then((response) => response.json())
      .then((quote) => {
        if (quote.url !== undefined) {
          ctx.interaction.followUp({
            embeds: [
              {
                type: "rich",
                title: `Chess.com data for ${quote.name}`,
                description: `user ${quote.username}`,
                color: 0x00ffff,
                fields: [
                  {
                    name: `Status`,
                    value: `${quote.status}`,
                    inline: true,
                  },
                  {
                    name: `Followers`,
                    value: `${quote.followers}`,
                    inline: true,
                  },
                  {
                    name: `is streamer`,
                    value: `${quote.is_streamer}`,
                    inline: true,
                  },
                  {
                    name: `profile url`,
                    value: `${quote.url}`,
                    inline: true,
                  },
                  {
                    name: `Elo`,
                    value: `${elo}`,
                    inline: true,
                  },
                ],
                thumbnail: {
                  url: `${
                    quote.avatar
                      ? quote.avatar
                      : "https://placehold.jp/df5dc7/ffffff/150x150.png?text=Error"
                  }`,
                  height: 0,
                  width: 0,
                },
              },
            ],
          });
        } else {
          ctx.interaction.followUp({
            content: `User ${username} not found`,
          });
        }
      });
  },
  options: [
    {
      name: "username",
      description: "The username of the chess.com player",
      type: "STRING",
      required: true,
    },
  ],
});
/**
 * 
 * const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.2'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `GG`,
      "description": `GRGR`,
      "color": 0x00FFFF,
      "fields": [
        {
          "name": `AEFA`,
          "value": `AFWE`,
          "inline": true
        }
      ],
      "thumbnail": {
        "url": `https://google.com`,
        "height": 0,
        "width": 0
      }
    }
  ]
});
 */
