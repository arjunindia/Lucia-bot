import {
  defineOption,
  defineSlashSubcommand,
  defineSubcommand,
  defineSubcommandGroup,
} from "chooksie";
import fetch from "cross-fetch";

export default defineSlashSubcommand({
  name: "xkcd",
  description: "Get XKCD Comics.",
  options: [
    defineSubcommandGroup({
      name: "get",
      description: "get xkcd comics",
      type: "SUB_COMMAND_GROUP",
      options: [
        defineSubcommand({
          name: "today",
          description: "Get today's XKCD comic.",
          type: "SUB_COMMAND",

          async execute(ctx) {
            await fetch("https://xkcd.com/info.0.json")
              .then((res) => res.json())
              .then((data) => {
                ctx.interaction.reply({
                  embeds: [
                    {
                      type: "rich",
                      title: `${data.title}`,
                      description: "",
                      color: 0x00ffff,
                      image: {
                        url: `${data.img}`,
                        height: 0,
                        width: 0,
                      },
                      footer: {
                        text: `${data.alt}`,
                      },
                    },
                  ],
                });
              });
          },
        }),
        defineSubcommand({
          name: "random",
          description: "Get a random XKCD comic.",
          type: "SUB_COMMAND",

          async execute(ctx) {
            await fetch("https://xkcd.com/info.0.json")
              .then((res) => res.json())
              .then((data) => {
                fetch(
                  `https://xkcd.com/${Math.floor(
                    Math.random() * data.num
                  )}/info.0.json`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    ctx.interaction.reply({
                      //   content: data.title + "\n" + data.img,
                      embeds: [
                        {
                          type: "rich",
                          title: `${data.title}`,
                          description: "",
                          color: 0x00ffff,
                          image: {
                            url: `${data.img}`,
                            height: 0,
                            width: 0,
                          },
                          footer: {
                            text: `${data.alt}`,
                          },
                        },
                      ],
                    });
                  });
              });
          },
        }),
      ],
    }),
  ],
});

/*

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

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
      },
      "footer": {
        "text": `seersfgef`
      }
    }
  ]
});
*/
