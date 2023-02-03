import {
  defineOption,
  defineSlashSubcommand,
  defineSubcommand,
  defineSubcommandGroup,
} from "chooksie";
//use the discord-music-player package to play music

export default defineSlashSubcommand({
  name: "music",
  description: "Play music!",
  options: [
    defineSubcommand({
      name: "play",
      description: "Play music!",
      type: "SUB_COMMAND",

      async execute(ctx) {
        let queue = ctx.client.player.createQueue(ctx.interaction.guild.id);
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        //check if the user is in a voice channel
        if (!ctx.interaction.member.voice.channel) {
          return await ctx.interaction.reply({
            embeds: [
              {
                title: "You need to be in a voice channel to use this command!",
                color: "RED",
              },
            ],
            ephemeral: true,
          });
        }

        await ctx.interaction.deferReply();
        await queue.join(ctx.interaction.member.voice.channel);
        //get the query from the command
        const query = ctx.interaction.options.getString("query");
        //search for the song - also check if it is a playlist

        let song = await queue.play(query).catch((err) => {
          if (!guildQueue) queue.stop();

          console.error(err);
        });

        await ctx.interaction.followUp({
          embeds: [
            {
              title: "Added to queue",
              description: `[${song.name} - ${song.author}](${song.url})`,
              color: "RANDOM",
              thumbnail: {
                url: song.thumbnail
                  ? song.thumbnail
                  : "https://i.ibb.co/cTxbLpd/LOGO.png",
              },
            },
          ],
        });
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
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        if (guildQueue) guildQueue.stop();

        await ctx.interaction.reply("Stopped the queue!");
      },
    }),
    defineSubcommand({
      name: "skip",
      description: "Skip the current song",
      type: "SUB_COMMAND",

      async execute(ctx) {
        //skip the current song
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);

        if (!ctx.interaction.member.voice.channel)
          return await ctx.interaction.reply({
            embeds: [
              {
                title: "You need to be in a voice channel to use this command!",
                color: "RED",
              },
            ],
            ephemeral: true,
          });
        if (
          ctx.interaction.member.voice.channel.id !== guildQueue.voiceChannel.id
        )
          return await ctx.interaction.reply({
            embeds: [
              {
                title:
                  "You need to be in the same voice channel as the bot to use this command!",
                color: "RED",
              },
            ],
            ephemeral: true,
          });
        if (guildQueue) guildQueue.skip();
        if (guildQueue.nowPlaying === null)
          return await ctx.interaction.reply({
            embeds: [
              {
                title: "Queue is empty!",
                color: "YELLOW",
              },
            ],
          });

        await ctx.interaction.reply({
          embeds: [
            {
              title: "Skipped the current song!",
              description: `Now playing: [${guildQueue.nowPlaying.name} - ${guildQueue.nowPlaying.author}](${guildQueue.nowPlaying.url})`,
              color: "RANDOM",
            },
          ],
        });
      },
    }),
    defineSubcommand({
      name: "playlist",
      description: "Play a playlist",
      type: "SUB_COMMAND",

      async execute(ctx) {
        let queue = ctx.client.player.createQueue(ctx.interaction.guild.id);
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        //check if the user is in a voice channel
        if (!ctx.interaction.member.voice.channel) {
          return await ctx.interaction.reply({
            embeds: [
              {
                title: "You need to be in a voice channel to use this command!",
                color: "RED",
              },
            ],
            ephemeral: true,
          });
        }

        await ctx.interaction.deferReply();
        await queue.join(ctx.interaction.member.voice.channel);
        //get the query from the command
        const query = ctx.interaction.options.getString("query");
        //search for the song - also check if it is a playlist

        let song = await queue.playlist(query).catch((err) => {
          if (!guildQueue) queue.stop();
        });

        await ctx.interaction.followUp({
          embeds: [
            {
              title: "Added to queue",
              description: `[${song.name} - ${song.author}](${song.url})`,
              color: "RANDOM",
              thumbnail: {
                url: song.thumbnail
                  ? song.thumbnail
                  : "https://i.ibb.co/cTxbLpd/LOGO.png",
              },
            },
          ],
        });
      },
      options: [
        defineOption({
          name: "query",
          description: "The playlist you want to play",
          type: "STRING",
          required: true,
        }),
      ],
    }),
  ],
});
