import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";
export default defineSlashCommand({
  name: "wiki",
  description: "Get a random Wikipedia article",
  async execute(ctx) {
    await ctx.interaction.deferReply();
    await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
      .then((res) => res.json())
      .then((data) => {
        ctx.interaction.followUp({
          embeds: [
            {
              title: data.title,
              description: data.extract,
              url: data.content_urls.desktop.page,
              color: 0xe0e1e2,
              thumbnail: {
                url: data.thumbnail.source
                  ? data.thumbnail.source
                  : "https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png",
              },
              footer: {
                text: "Powered by Wikipedia",
              },
            },
          ],
        });
      });
  },
});
