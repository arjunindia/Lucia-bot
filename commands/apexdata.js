import { defineSlashCommand } from "chooksie";
import { defineOption } from "chooksie";
import fetch from "cross-fetch";
export default defineSlashCommand({
  name: "apexdata",
  description: "Get Apex Legends Player data",
  async execute(ctx) {
    await ctx.interaction.deferReply("Loading...");
    await fetch(
      `https://api.mozambiquehe.re/bridge?auth=${
        process.env.APEXKEY
      }&player=${ctx.interaction.options.getString(
        "playername"
      )}&platform=${ctx.interaction.options.getString("platform")}`
    )
      .then((res) => res.text())
      .then((dataval) => {
        const data = JSON.parse(dataval);
        ctx.interaction.followUp(
          data.Error
            ? {
                content: data.Error,
                ephemeral: true,
              }
            : {
                embeds: [
                  {
                    title: data.global.name,
                    description: data.global.platform,
                    color: 0x00ff00,
                    thumbnail: {
                      url: data.global.rank.rankImg,
                    },
                    fields: [
                      {
                        name: "Level",
                        value: `${data.global.level}`,
                        inline: true,
                      },
                      {
                        name: "Rank",
                        value: `${data.global.rank.rankName}`,
                        inline: true,
                      },
                      {
                        name: "Arena",
                        value: `${data.global.arena.rankName}`,
                        inline: true,
                      },
                      {
                        name: "Battlepass",
                        value: `${data.global.battlepass.level}`,
                        inline: true,
                      },
                      {
                        name: "Kills",
                        value: `${data.total.kills.value}`,
                        inline: true,
                      },
                      {
                        name: "K/D",
                        value: `${data.total.kd.value}`,
                        inline: true,
                      },
                    ],
                  },
                ],
              }
        );
      });
  },
  options: [
    {
      name: "playername",
      description: "Your player name",
      type: "STRING",
      required: true,
    },
    {
      name: "platform",
      description: "Your platform",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "PC",
          value: "PC",
        },
        {
          name: "XBOX",
          value: "X1",
        },
        {
          name: "PlayStation",
          value: "PS4",
        },
      ],
    },
  ],
});
//https://api.mozambiquehe.re/bridge?auth=YOUR_API_KEY&player=PLAYER_NAME&platform=PLATFORM
/*
{
    "global": {
        "name": "arjunbroepic",
        "uid": 1009220804728,
        "avatar": "",
        "platform": "PC",
        "level": 5,
        "toNextLevelPercent": 1,
        "internalUpdateCount": 11,
        "bans": {
            "isActive": false,
            "remainingSeconds": 0,
            "last_banReason": "NONE"
        },
        "rank": {
            "rankScore": 0,
            "rankName": "Unranked",
            "rankDiv": 0,
            "ladderPosPlatform": -1,
            "rankImg": "https:\/\/api.mozambiquehe.re\/assets\/ranks\/unranked4.png",
            "rankedSeason": "season15_split_2"
        },
        "arena": {
            "rankScore": 0,
            "rankName": "Unranked",
            "rankDiv": 0,
            "ladderPosPlatform": -1,
            "rankImg": "https:\/\/api.mozambiquehe.re\/assets\/ranks\/unranked4.png",
            "rankedSeason": "arenas15_split_2"
        },
        "battlepass": {
            "level": "-1",
            "history": {
                "season1": -1,
                "season2": -1,
                "season3": -1,
                "season4": -1,
                "season5": -1,
                "season6": -1,
                "season7": -1,
                "season8": -1,
                "season9": -1,
                "season10": -1,
                "season11": -1,
                "season12": -1,
                "season13": -1,
                "season14": -1
            }
        },
        "internalParsingVersion": 1,
        "badges": null,
        "levelPrestige": 0
    },
    "realtime": {
        "lobbyState": "open",
        "isOnline": 0,
        "isInGame": 1,
        "canJoin": 0,
        "partyFull": 0,
        "selectedLegend": "Lifeline",
        "currentState": "offline",
        "currentStateSinceTimestamp": -1,
        "currentStateAsText": "Offline"
    },
    "legends": {
        "selected": {
            "LegendName": "Lifeline",
            "data": [
                {
                    "name": "BR Kills",
                    "value": 0,
                    "key": "kills",
                    "global": false
                }
            ],
            "gameInfo": {
                "skin": "Original",
                "skinRarity": "None",
                "frame": "Rookie Card",
                "frameRarity": "Common",
                "pose": "Peace",
                "poseRarity": "Common",
                "intro": "None",
                "introRarity": "None",
                "badges": [
                    {
                        "name": "Account Level",
                        "value": 6,
                        "category": "Account Badges"
                    },
                    {
                        "name": null,
                        "value": 0,
                        "category": "Account Badges"
                    },
                    {
                        "name": null,
                        "value": 0,
                        "category": "Account Badges"
                    }
                ]
            },
            "ImgAssets": {
                "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/lifeline.png",
                "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/lifeline.jpg"
            }
        },
        "all": {
            "Revenant": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/revenant.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/revenant.jpg"
                }
            },
            "Crypto": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/crypto.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/crypto.jpg"
                }
            },
            "Horizon": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/horizon.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/horizon.jpg"
                }
            },
            "Gibraltar": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/gibraltar.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/gibraltar.jpg"
                }
            },
            "Wattson": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/wattson.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/wattson.jpg"
                }
            },
            "Fuse": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/fuse.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/fuse.jpg"
                }
            },
            "Bangalore": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/bangalore.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/bangalore.jpg"
                }
            },
            "Wraith": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/wraith.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/wraith.jpg"
                }
            },
            "Octane": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/octane.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/octane.jpg"
                }
            },
            "Bloodhound": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/bloodhound.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/bloodhound.jpg"
                }
            },
            "Caustic": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/caustic.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/caustic.jpg"
                }
            },
            "Lifeline": {
                "data": [
                    {
                        "name": "BR Kills",
                        "value": 0,
                        "key": "kills",
                        "rank": {
                            "rankPos": "NOT_CALCULATED_YET",
                            "topPercent": "NOT_CALCULATED_YET"
                        },
                        "rankPlatformSpecific": {
                            "rankPos": "NOT_CALCULATED_YET",
                            "topPercent": "NOT_CALCULATED_YET"
                        }
                    }
                ],
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/lifeline.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/lifeline.jpg"
                }
            },
            "Pathfinder": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/pathfinder.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/pathfinder.jpg"
                }
            },
            "Loba": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/loba.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/loba.jpg"
                }
            },
            "Mirage": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/mirage.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/mirage.jpg"
                }
            },
            "Rampart": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/rampart.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/rampart.jpg"
                }
            },
            "Valkyrie": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/valkyrie.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/valkyrie.jpg"
                }
            },
            "Seer": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/seer.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/seer.jpg"
                }
            },
            "Ash": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/ash.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/ash.jpg"
                }
            },
            "Mad Maggie": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/mad maggie.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/mad maggie.jpg"
                }
            },
            "Newcastle": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/newcastle.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/newcastle.jpg"
                }
            },
            "Vantage": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/vantage.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/vantage.jpg"
                }
            },
            "Catalyst": {
                "ImgAssets": {
                    "icon": "https:\/\/api.mozambiquehe.re\/assets\/icons\/catalyst.png",
                    "banner": "https:\/\/api.mozambiquehe.re\/assets\/banners\/catalyst.jpg"
                }
            }
        }
    },
    "mozambiquehere_internal": {
        "isNewToDB": true,
        "claimedBy": "1674053843",
        "APIAccessType": "BASIC",
        "ClusterID": "6",
        "rate_limit": {
            "max_per_second": 2,
            "current_req": null
        },
        "clusterSrv": "MAIN-CLUSTER-2"
    },
    "ALS": {
        "isALSDataEnabled": false
    },
    "total": {
        "kills": {
            "name": "BR Kills",
            "value": 0
        },
        "kd": {
            "value": "-1",
            "name": "KD"
        }
    }
}

*/
