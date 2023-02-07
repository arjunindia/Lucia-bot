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
          description: `**Name:**${
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
          }\n**URL:** ${results[0].url}`,
          thumbnail: {
            url: results[0].thumbnail,
          },
          color: "RANDOM",
          footer: {
            text:
              "Not what you were looking for? Try [Yandex Reverse Image Search](https://yandex.com/images/search?rpt=imageview&img_url=" +
              url +
              ")",
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
