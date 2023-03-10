import { defineSlashCommand } from "chooksie";
export default defineSlashCommand({
  name: "sauce",
  description: "Get the source of an image!",
  async execute(ctx) {
    await ctx.interaction.deferReply();
    const url = ctx.interaction.options.getString("url");
    const results = await ctx.client.sagiri(url, {
      results: 1,
    });
    console.log(results[0].raw);
    if (!results[0]) {
      return await ctx.interaction.editReply({
        embeds: [
          {
            title: "No results found!",
            color: "RED",
          },
        ],
      });
    }
    await ctx.interaction.editReply({
      embeds: [
        {
          title: "Sauce",
          description: `
          **Index Name**:${results[0].raw.header.index_name}
          \N**Name:**${
            results[0].raw.data.source
              ? results[0].raw.data.source
              : results[0].raw.data.title
              ? results[0].raw.data.title
              : results[0].raw.data.material
              ? results[0].raw.data.material
              : results[0].raw.data.part
              ? results[0].raw.data.part
              : results[0].raw.data.name
          }\n **Author:** ${results[0].authorName}\n**Source:** ${
            results[0].site
          }\n**URL:** ${results[0].url}
          \n**Similarity:** ${results[0].similarity}
          \nNot what you were looking for? Try [Yandex Reverse Image Search](https://yandex.com/images/search?rpt=imageview&img_url=${encodeURIComponent(
            url
          )})
          `,
          thumbnail: {
            url: results[0].thumbnail,
          },
          color: "RANDOM",
          footer: {
            text: "Powered by SauceNAO",
            iconURL:
              "https://cdn.discordapp.com/attachments/1064865079167811618/1072478945389326336/saucenao_23437.webp",
            icon_url:
              "https://cdn.discordapp.com/attachments/1064865079167811618/1072478945389326336/saucenao_23437.webp",
          },
        },
      ],
    });
  },
  options: [
    {
      name: "url",
      description: "The URL of the image to get the source of",
      type: "STRING",
      required: true,
    },
  ],
});
