import { defineSlashCommand } from "chooksie";

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

export default defineSlashCommand({
  name: "meme",
  description: "Get a random meme from a variety of subreddits",
  async execute(ctx) {
    await ctx.interaction.deferReply();
    let subArray = [];
    switch (ctx.interaction.options.getString("type")) {
      case "dankmemes":
        subArray = ["dankmemes", "memes", "meirl", "me_irl"];
        break;
      case "shitposting":
        subArray = ["shitposting", "ppnojutsu", "okbuddyretard"];
        break;
      case "ProgrammerHumor":
        subArray = ["ProgrammerHumor"];
        break;
      case "gaming":
        subArray = [
          "gamingmemes",
          "Genshin_Memepact",
          "ApexLegendsMemes",
          "ValorantMemes",
        ];
        break;
      case "anime":
        subArray = ["animemes", "animememes", "animememe", "okbuddybaka"];
        break;

      default:
        subArray = ["dankmemes", "memes", "meirl", "me_irl"];
    }
    const sub = subArray.sample();
    //ctx.client.r is the reddit client using snoowrap
    const post = await ctx.client.r.getSubreddit(sub).getRandomSubmission();
    const embed = {
      title: post.title,
      url: `https://reddit.com${post.permalink}`,
      image: {
        url: post?.url ? post.url : post?.preview?.images[0]?.source,
      },
      footer: {
        text: `Posted by u/${
          post.author.name ? post.author.name : "anonymous"
        } in r/${sub}`,
      },
    };
    ctx.interaction.followUp({ embeds: [embed] });
  },
  options: [
    {
      name: "type",
      description: "The type of meme you want to get",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "Meme",
          value: "dankmemes",
        },
        {
          name: "Shitpost",
          value: "shitposting",
        },
        {
          name: "Programmer Humor",
          value: "ProgrammerHumor",
        },
        {
          name: "Gaming",
          value: "gaming",
        },
        {
          name: "Anime",
          value: "anime",
        },
      ],
    },
  ],
});
