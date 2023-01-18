import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";
export default defineSlashCommand({
  name: "randomanime",
  description: "Get a random anime from MyAnimeList",
  async execute(ctx) {
    await fetch("https://api.jikan.moe/v4/random/anime")
      .then((res) => res.json())
      .then((data) => {
        ctx.interaction.reply({
          embeds: [
            {
              title: data.data.title,
              description: data.data.synopsis,
              url: data.data.url,
              color: 0x00ff00,
              image: {
                url: data.data.images.jpg.large_image_url,
              },
              fields: [
                {
                  name: "Rating",
                  value: `${data.data.rating}`,
                },
                {
                  name: "Rank",
                  value: `${data.data.rank}`,
                },
                {
                  name: "English Title",
                  value: `${
                    data.data.title_english ? data.data.title_english : "N/A"
                  }`,
                },
                {
                  name: "Score",
                  value: `${data.data.score}`,
                  inline: true,
                },
                {
                  name: "Episodes",
                  value: `${data.data.episodes}`,
                  inline: true,
                },
                {
                  name: "Status",
                  value: data.data.status,
                  inline: true,
                },
                {
                  name: "Type",
                  value: data.data.type,
                  inline: true,
                },
                {
                  name: "Source",
                  value: data.data.source,
                  inline: true,
                },
                {
                  name: "Genres",
                  value: data.data.genres.map((genre) => genre.name).join(", "),
                  inline: true,
                },
              ],
            },
          ],
        });
      });
  },
});

/*
EXAMPLE response from https://api.jikan.moe/v4/random/anime

{
  "data": {
    "mal_id": 114,
    "url": "https://myanimelist.net/anime/114/Sakigake_Cromartie_Koukou",
    "images": {
      "jpg": {
        "image_url": "https://cdn.myanimelist.net/images/anime/1419/101839.jpg",
        "small_image_url": "https://cdn.myanimelist.net/images/anime/1419/101839t.jpg",
        "large_image_url": "https://cdn.myanimelist.net/images/anime/1419/101839l.jpg"
      },
      "webp": {
        "image_url": "https://cdn.myanimelist.net/images/anime/1419/101839.webp",
        "small_image_url": "https://cdn.myanimelist.net/images/anime/1419/101839t.webp",
        "large_image_url": "https://cdn.myanimelist.net/images/anime/1419/101839l.webp"
      }
    },
    "trailer": {
      "youtube_id": null,
      "url": null,
      "embed_url": null,
      "images": {
        "image_url": null,
        "small_image_url": null,
        "medium_image_url": null,
        "large_image_url": null,
        "maximum_image_url": null
      }
    },
    "approved": true,
    "titles": [
      {
        "type": "Default",
        "title": "Sakigake!! Cromartie Koukou"
      },
      {
        "type": "Synonym",
        "title": "Sakigake!! Cromartie Koukou"
      },
      {
        "type": "Japanese",
        "title": "魁!! クロマティ高校"
      },
      {
        "type": "English",
        "title": "Cromartie High School"
      }
    ],
    "title": "Sakigake!! Cromartie Koukou",
    "title_english": "Cromartie High School",
    "title_japanese": "魁!! クロマティ高校",
    "title_synonyms": [
      "Sakigake!! Cromartie Koukou"
    ],
    "type": "TV",
    "source": "Manga",
    "episodes": 26,
    "status": "Finished Airing",
    "airing": false,
    "aired": {
      "from": "2003-10-03T00:00:00+00:00",
      "to": "2004-03-26T00:00:00+00:00",
      "prop": {
        "from": {
          "day": 3,
          "month": 10,
          "year": 2003
        },
        "to": {
          "day": 26,
          "month": 3,
          "year": 2004
        }
      },
      "string": "Oct 3, 2003 to Mar 26, 2004"
    },
    "duration": "12 min per ep",
    "rating": "PG-13 - Teens 13 or older",
    "score": 7.9,
    "scored_by": 51952,
    "rank": 728,
    "popularity": 1504,
    "members": 131728,
    "favorites": 1564,
    "synopsis": "Takashi Kamiyama is your typical mild-mannered high school student—polite, aloof, and pacifistic, with a slightly above-average IQ. But would your average high school student really enroll himself at the infamous Cromartie High School, known as a breeding ground for the toughest delinquents out there?\n\nApparently so, as that is exactly what Takashi does, though for reasons he'd rather leave unmentioned. However, one thing is for sure: the \"hard-boiled rabbit in a den full of hungry lions\" is never going to have another dull day. And how could he, now that he's surrounded by mohawked punks, obnoxious robots, and... gorillas? And was that Freddie Mercury riding a horse down the corridor? Follow Takashi as he earnestly dedicates his new high school life to better his school's reputation while his classmates are hellbent on wreaking havoc.\n\n[Written by MAL Rewrite]",
    "background": null,
    "season": "fall",
    "year": 2003,
    "broadcast": {
      "day": "Fridays",
      "time": "01:00",
      "timezone": "Asia/Tokyo",
      "string": "Fridays at 01:00 (JST)"
    },
    "producers": [
      {
        "mal_id": 717,
        "type": "anime",
        "name": "TV Tokyo Music",
        "url": "https://myanimelist.net/anime/producer/717/TV_Tokyo_Music"
      }
    ],
    "licensors": [
      {
        "mal_id": 97,
        "type": "anime",
        "name": "ADV Films",
        "url": "https://myanimelist.net/anime/producer/97/ADV_Films"
      },
      {
        "mal_id": 376,
        "type": "anime",
        "name": "Sentai Filmworks",
        "url": "https://myanimelist.net/anime/producer/376/Sentai_Filmworks"
      },
      {
        "mal_id": 467,
        "type": "anime",
        "name": "Discotek Media",
        "url": "https://myanimelist.net/anime/producer/467/Discotek_Media"
      }
    ],
    "studios": [
      {
        "mal_id": 10,
        "type": "anime",
        "name": "Production I.G",
        "url": "https://myanimelist.net/anime/producer/10/Production_IG"
      }
    ],
    "genres": [
      {
        "mal_id": 4,
        "type": "anime",
        "name": "Comedy",
        "url": "https://myanimelist.net/anime/genre/4/Comedy"
      }
    ],
    "explicit_genres": [

    ],
    "themes": [
      {
        "mal_id": 55,
        "type": "anime",
        "name": "Delinquents",
        "url": "https://myanimelist.net/anime/genre/55/Delinquents"
      },
      {
        "mal_id": 57,
        "type": "anime",
        "name": "Gag Humor",
        "url": "https://myanimelist.net/anime/genre/57/Gag_Humor"
      },
      {
        "mal_id": 23,
        "type": "anime",
        "name": "School",
        "url": "https://myanimelist.net/anime/genre/23/School"
      }
    ],
    "demographics": [
      {
        "mal_id": 27,
        "type": "anime",
        "name": "Shounen",
        "url": "https://myanimelist.net/anime/genre/27/Shounen"
      }
    ]
  }
}

*/
