import {
  defineOption,
  defineSlashSubcommand,
  defineSubcommand,
  defineSubcommandGroup,
} from "chooksie";
//use the discord-music-player package to play music

async function checkSetup(ctx, guildQueue) {
  if (!guildQueue)
    return await ctx.interaction.reply({
      embeds: [
        {
          title: "There is no music playing! Use `/music play` to play a song!",
          color: "RED",
        },
      ],
      ephemeral: true,
    });

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
  if (!guildQueue.connection)
    return await ctx.interaction.reply({
      embeds: [
        {
          title: "There is no music playing!",
          color: "RED",
        },
      ],
      ephemeral: true,
    });

  if (
    ctx.interaction.member.voice.channel.id !== guildQueue.connection.channel.id
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
  return "ok";
}

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
        let valid = true;
        let song = await queue
          .play(query, {
            requestedBy: ctx.interaction.user,
          })
          .catch(async (err) => {
            if (!guildQueue) queue.stop();
            console.error(err);
            await ctx.interaction.followUp({
              embeds: [
                {
                  title: "An error occured while searching for the song!",
                  color: "RED",
                  description: err.message,
                },
              ],
            });
            valid = false;
          });
        if (!valid) return;
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
    defineSubcommand({
      name: "pause",
      description: "Pause the current song",
      type: "SUB_COMMAND",
      async execute(ctx) {
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        let result = await checkSetup(ctx, guildQueue);
        if (result !== "ok") return;
        guildQueue.setPaused(true);
        await ctx.interaction.reply({
          embeds: [
            {
              title: "Paused the current song!",
              color: "YELLOW",
            },
          ],
        });
      },
    }),
    defineSubcommand({
      name: "resume",
      description: "Resume the current song",
      type: "SUB_COMMAND",
      async execute(ctx) {
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        let result = await checkSetup(ctx, guildQueue);
        if (result !== "ok") return;
        guildQueue.setPaused(false);
        await ctx.interaction.reply({
          embeds: [
            {
              title: "Resumed the current song!",
              color: "GREEN",
            },
          ],
        });
      },
    }),
    defineSubcommand({
      name: "loop",
      description: "Loop the current song",
      type: "SUB_COMMAND",
      async execute(ctx) {
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        let result = await checkSetup(ctx, guildQueue);
        if (result !== "ok") return;
        guildQueue.setRepeatMode(ctx.interaction.options.get("loopmode").value);
        await ctx.interaction.reply({
          embeds: [
            {
              title:
                ctx.interaction.options.get("loopmode").value === 0
                  ? "Looping disabled!"
                  : "Looped the current " +
                      ctx.interaction.options.get("loopmode").value ==
                    1
                  ? "song"
                  : "queue" + "!",
              color: "GREEN",
            },
          ],
        });
      },
      options: [
        defineOption({
          name: "loopmode",
          description: "The loop mode you want to use",
          type: "NUMBER",
          required: true,
          choices: [
            {
              name: "Loop the current song",
              value: 1,
            },
            {
              name: "Loop the queue",
              value: 2,
            },
            {
              name: "Disable looping",
              value: 0,
            },
          ],
        }),
      ],
    }),
    defineSubcommand({
      name: "progress",
      description: "Get the progress of the current song",
      type: "SUB_COMMAND",
      async execute(ctx) {
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        checkSetup(ctx, guildQueue);
        let progress = guildQueue.createProgressBar();
        await ctx.interaction.reply({
          embeds: [
            {
              title: "Current song progress",
              description: "`" + progress.prettier + "`",
              color: "RANDOM",
            },
          ],
        });
      },
    }),
    defineSubcommand({
      name: "queue",
      description: "Get the current queue",
      type: "SUB_COMMAND",
      async execute(ctx) {
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        let result = await checkSetup(ctx, guildQueue);
        if (result !== "ok") return;
        let queue = guildQueue.songs.map((song, index) => {
          return `${index + 1}. [${song.name}](${song.url}) requested by ${
            song.requestedBy
          } - [${song.duration}]`;
        });
        await ctx.interaction.reply({
          embeds: [
            {
              title: "Current queue",
              description: queue.join("\n"),
              footer: {
                text: `Total songs: ${guildQueue.songs.length}`,
              },

              color: "RANDOM",
            },
          ],
        });
      },
    }),
    defineSubcommand({
      name: "shuffle",
      description: "Shuffle the current queue",
      type: "SUB_COMMAND",
      async execute(ctx) {
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        let result = await checkSetup(ctx, guildQueue);
        if (result !== "ok") return;
        guildQueue.shuffle();
        await ctx.interaction.reply({
          embeds: [
            {
              title: "Shuffled the current queue!",
              color: "GREEN",
            },
          ],
        });
      },
    }),
    defineSubcommand({
      name: "remove",
      description: "Remove a song from the queue",
      type: "SUB_COMMAND",
      async execute(ctx) {
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        let result = await checkSetup(ctx, guildQueue);
        if (result !== "ok") return;
        let song =
          guildQueue.songs[ctx.interaction.options.get("index").value - 1];
        if (!song) {
          return await ctx.interaction.reply({
            embeds: [
              {
                title: "Invalid index",
                description: "The index you provided is invalid!",
                color: "RED",
              },
            ],
            ephemeral: true,
          });
        }
        guildQueue.remove(ctx.interaction.options.get("index").value - 1);
        await ctx.interaction.reply({
          embeds: [
            {
              title: "Removed a song from the queue",
              description: `[${song.name} - ${song.author}](${song.url})`,
              color: "GREEN",
            },
          ],
        });
      },
      options: [
        defineOption({
          name: "index",
          description: "The index of the song you want to remove",
          type: "NUMBER",
          required: true,
        }),
      ],
    }),
    defineSubcommand({
      name: "clear",
      description: "Clear the current queue",
      type: "SUB_COMMAND",
      async execute(ctx) {
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        let result = await checkSetup(ctx, guildQueue);
        if (result !== "ok") return;
        guildQueue.clearQueue();
        await ctx.interaction.reply({
          embeds: [
            {
              title: "Cleared the current queue!",
              color: "GREEN",
            },
          ],
        });
      },
    }),
    defineSubcommand({
      name: "current",
      description: "Get info about the current song",
      type: "SUB_COMMAND",
      async execute(ctx) {
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        let result = await checkSetup(ctx, guildQueue);
        if (result !== "ok") return;
        let song = guildQueue.songs[0];
        await ctx.interaction.reply({
          embeds: [
            {
              title: "Current song info",
              description: `[${song.name} - ${song.author}](${song.url})\nRequested by ${song.requestedBy}\nDuration: ${song.duration}`,
              thumbnail: {
                url: song.thumbnail,
              },

              color: "RANDOM",
            },
          ],
        });
      },
    }),

    /*
    * This feature is not yet implemented in the library even though it's in the docs

    defineSubcommand({
      name: "move",
      description: "Move a song in the queue",
      type: "SUB_COMMAND",
      async execute(ctx) {
        let guildQueue = ctx.client.player.getQueue(ctx.interaction.guild.id);
        let result = await checkSetup(ctx, guildQueue);
        if (result !== "ok") return;
        let song =
          guildQueue.songs[ctx.interaction.options.get("from").value - 1];
        if (!song) {
          await ctx.interaction.reply({
            embeds: [
              {
                title: "Invalid index",
                description: "The index you provided is invalid!",
                color: "RED",
              },
            ],
            ephemeral: true,
          });
          return;
        }
        if (song.isFirst) {
          await ctx.interaction.reply({
            embeds: [
              {
                title: "Invalid index",
                description: "You can't move the first song!",
                color: "RED",
              },
            ],
            ephemeral: true,
          });
          return;
        }
        guildQueue.move(
          ctx.interaction.options.get("from").value - 1,
          ctx.interaction.options.get("to").value - 1
        );
        await ctx.interaction.reply({
          embeds: [
            {
              title: "Moved a song in the queue",
              description: `[${song.name} - ${song.author}](${
                song.url
              })\nFrom: ${ctx.interaction.options.get("from").value}\nTo: ${
                ctx.interaction.options.get("to").value
              }`,
              color: "GREEN",
            },
          ],
        });
      },
      options: [
        defineOption({
          name: "from",
          description: "The index of the song you want to move",
          type: "NUMBER",
          required: true,
        }),
        defineOption({
          name: "to",
          description: "The index you want to move the song to",
          type: "NUMBER",
          required: true,
        }),
      ],
    }),
    */
  ],
});