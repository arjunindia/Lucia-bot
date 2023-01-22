import {
  defineOption,
  defineSlashSubcommand,
  defineSubcommand,
  defineSubcommandGroup,
} from "chooksie";
import fetch from "cross-fetch";

export default defineSlashSubcommand({
  name: "valorant",
  description: "Get valorant data.",
  options: [
    defineSubcommandGroup({
      name: "get",
      description: "crosshair, playerdata",
      type: "SUB_COMMAND_GROUP",
      options: [
        defineSubcommand({
          name: "crosshair",
          description: "Get valorant crosshair image from crosshair id.",
          type: "SUB_COMMAND",

          async execute(ctx) {
            await ctx.interaction.reply({
              content: `https://api.henrikdev.xyz/valorant/v1/crosshair/generate?id=${ctx.interaction.options.getString(
                "crosshair_id"
              )}`,
            });
          },
          options: [
            defineOption({
              name: "crosshair_id",
              description: "Crosshair ID",
              type: "STRING",
              required: true,
            }),
          ],
        }),
        defineSubcommand({
          name: "playerdata",
          description: "Get player data from name and tag.",
          type: "SUB_COMMAND",

          async execute(ctx) {
            await ctx.interaction.deferReply();
            await fetch(
              `https://api.henrikdev.xyz/valorant/v1/account/${ctx.interaction.options.getString(
                "playername"
              )}/${ctx.interaction.options.getString("playertag")}`
            )
              .then((res) => res.json())
              .then((data) => {
                ctx.interaction.followUp({
                  embeds: [
                    {
                      title: data.data.name + "#" + data.data.tag,
                      description: "Level: " + data.data.account_level,
                      color: 0x00ffff,
                      image: {
                        url: data.data.card.large,
                        height: 0,
                        width: 0,
                      },
                      fields: [
                        {
                          name: "Region",
                          value: data.data.region,
                          inline: false,
                        },
                        {
                          name: "Puuid",
                          value: data.data.puuid,
                          inline: false,
                        },
                      ],
                      footer: {
                        text: "last updated: " + data.data.last_update,
                      },
                      thumbnail: {
                        url: data.data.card.small,
                        height: 0,
                        width: 0,
                      },
                    },
                  ],
                });
              });
          },
          options: [
            defineOption({
              name: "playername",
              description: "Player Name",
              type: "STRING",
              required: true,
            }),
            defineOption({
              name: "playertag",
              description: "Player Tag",
              type: "STRING",
              required: true,
            }),
          ],
        }),
      ],
    }),
  ],
});
/**
 * 
 * sample player api response:
 * {
  "status": 200,
  "data": {
    "puuid": "7f67cb52-031c-5a91-b4b2-601290a74162",
    "region": "ap",
    "account_level": 228,
    "name": "AkashKannan",
    "tag": "envoy",
    "card": {
      "small": "https://media.valorant-api.com/playercards/7cf06550-432c-8840-f9c7-a6b71ee8521a/smallart.png",
      "large": "https://media.valorant-api.com/playercards/7cf06550-432c-8840-f9c7-a6b71ee8521a/largeart.png",
      "wide": "https://media.valorant-api.com/playercards/7cf06550-432c-8840-f9c7-a6b71ee8521a/wideart.png",
      "id": "7cf06550-432c-8840-f9c7-a6b71ee8521a"
    },
    "last_update": "13 minutes ago",
    "last_update_raw": 1674058338
  }
}
    */
