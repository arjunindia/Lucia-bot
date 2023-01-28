import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
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
        subArray = ["shitposting", "okbuddyretard", "whenthe"];
        break;
      case "ProgrammerHumor":
        subArray = [
          "ProgrammerHumor",
          "ProgrammerAnimemes",
          "linuxanimemes",
          "linuxmemes",
        ];
        break;
      case "gaming":
        subArray = [
          "gamingmemes",
          "Genshin_Memepact",
          "ApexLegendsMemes",
          "ValorantMemes",
          "MinecraftMemes",
        ];
        break;
      case "anime":
        subArray = [
          "animemes",
          "animememes",
          "animememe",
          "goodanimemes",
          "okbuddybaka",
        ];
        break;
      case "wholesome":
        subArray = ["wholesomememes", "wholesomemes", "wholesomeanimememes"];
        break;

      default:
        subArray = ["dankmemes", "memes", "meirl", "me_irl"];
    }
    const sub = subArray.sample();
    //ctx.client.r is the reddit client using snoowrap
    const postFn = async () => {
      const post = await ctx.client.r.getSubreddit(sub).getRandomSubmission();
      if (post.over_18) {
        return await postFn();
      }
      return post;
    };
    const post = await postFn();

    if (post.url && post.url.includes("v.red")) {
      ctx.logger.info(
        unescape(post?.preview?.images[0]?.source.url).replaceAll("amp;", "")
      );
      const embed = {
        title: "video: " + post.title,
        url: `https://reddit.com${post.permalink}`,
        image: {
          url: unescape(post?.preview?.images[0]?.source.url).replaceAll(
            "amp;",
            ""
          ),
        },
        footer: {
          text: `Posted by u/${
            post.author.name ? post.author.name : "anonymous"
          } in r/${sub}`,
        },
      };
      await ctx.interaction.followUp({ embeds: [embed] });
      return;
    }
    const embed = {
      title: post.title,
      url: `https://reddit.com${post.permalink}`,
      image: {
        url: post?.url ? post.url : "https://i.imgur.com/0Z0Z0Z0.png",
      },
      footer: {
        text: `Posted by u/${
          post.author.name ? post.author.name : "anonymous"
        } in r/${sub}`,
      },
    };
    await ctx.interaction.followUp({ embeds: [embed] });
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
        {
          name: "Wholesome",
          value: "wholesome",
        },
      ],
    },
  ],
});
