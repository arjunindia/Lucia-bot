import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";
export default defineSlashCommand({
  name: "news",
  description: "Get the latest news from a variety of sources",
  async execute(ctx) {
    await ctx.interaction.deferReply();
    await fetch(
      `https://api.currentsapi.services/v1/latest-news?language=en&apiKey=${process.env.CURRENTS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        //limit to 10 news articles
        data.news = data.news.slice(0, 10);
        ctx.interaction.followUp({
          embeds: data.news.map((news) => ({
            title: news.title,
            description: news.description,
            url: news.url,
            image: {
              url: news.image === "None" ? null : news.image,
            },
            footer: {
              text: news.author,
            },
          })),
        });
      });
  },
});
