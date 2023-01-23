import {
  defineOption,
  defineSlashSubcommand,
  defineSubcommand,
  defineSubcommandGroup,
} from "chooksie";
import { Player } from "discord-music-player";
//use the discord-music-player package to play music
let player;
let queue;
let guildQueue;
export default defineSlashSubcommand({
  name: "music",
  description: "Play music!",
  options: [
    defineSubcommandGroup({
      name: "now",
      description: "Play music!",
      type: "SUB_COMMAND_GROUP",
      options: [
        defineSubcommand({
          name: "play",
          description: "Play music!",
          type: "SUB_COMMAND",

          async execute(ctx) {
            //get the player from the client
            let player = new Player(ctx.client);
            console.log(player);
            ctx.interaction.deferReply();
            queue = player.createQueue(ctx.interaction.guild.id);
            guildQueue = player.getQueue(ctx.interaction.guild.id);
            await queue.join(ctx.interaction.member.voice.channel);
            //get the query from the command
            const query = ctx.interaction.options.getString("query");
            //search for the song - also check if it is a playlist

            let song = await queue.play(query).catch((err) => {
              if (!guildQueue) queue.stop();
              console.error(err);
            });
            //send the song name
            await ctx.interaction.followUp(`Playing ${song.name}!`);
          },
          options: [
            defineOption({
              name: "query",
              description: "The song you want to play",
              type: "STRING",
              required: true,
            }),
          ],
        }),
        defineSubcommand({
          name: "stop",
          description: "Stop music",
          type: "SUB_COMMAND",

          async execute(ctx) {
            //stop the queue
            if (guildQueue) {
              guildQueue.stop();
            }
            await ctx.interaction.reply("Stopped the queue!");
          },
        }),
      ],
    }),
  ],
});
