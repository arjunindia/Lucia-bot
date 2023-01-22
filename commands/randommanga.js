import { defineSlashCommand } from "chooksie";
import fetch from "cross-fetch";
export default defineSlashCommand({
  name: "randommanga",
  description: "Get a random manga from MyAnimeList",
  async execute(ctx) {
    await ctx.interaction.deferReply();
    await fetch("https://api.jikan.moe/v4/random/manga")
      .then((res) => res.json())
      .then((data) => {
        ctx.interaction.followUp({
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
                  name: "Chapters",
                  value: `${data.data.chapters}`,
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
                  name: "Volumes",
                  value: `${data.data.volumes}`,
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
EXAMPLE response from https://api.jikan.moe/v4/random/manga

{
  "data": {
    "mal_id": 111816,
    "url": "https://myanimelist.net/manga/111816/Blank_Archives",
    "images": {
      "jpg": {
        "image_url": "https://cdn.myanimelist.net/images/manga/1/205412.jpg",
        "small_image_url": "https://cdn.myanimelist.net/images/manga/1/205412t.jpg",
        "large_image_url": "https://cdn.myanimelist.net/images/manga/1/205412l.jpg"
      },
      "webp": {
        "image_url": "https://cdn.myanimelist.net/images/manga/1/205412.webp",
        "small_image_url": "https://cdn.myanimelist.net/images/manga/1/205412t.webp",
        "large_image_url": "https://cdn.myanimelist.net/images/manga/1/205412l.webp"
      }
    },
    "approved": true,
    "titles": [
      {
        "type": "Default",
        "title": "Blank Archives"
      },
      {
        "type": "Japanese",
        "title": "ブランクアーカイヴズ"
      }
    ],
    "title": "Blank Archives",
    "title_english": null,
    "title_japanese": "ブランクアーカイヴズ",
    "title_synonyms": [

    ],
    "type": "Manga",
    "chapters": 12,
    "volumes": 2,
    "status": "Finished",
    "publishing": false,
    "published": {
      "from": "2017-07-07T00:00:00+00:00",
      "to": "2018-07-06T00:00:00+00:00",
      "prop": {
        "from": {
          "day": 7,
          "month": 7,
          "year": 2017
        },
        "to": {
          "day": 6,
          "month": 7,
          "year": 2018
        }
      },
      "string": "Jul 7, 2017 to Jul 6, 2018"
    },
    "score": null,
    "scored": null,
    "scored_by": null,
    "rank": 27611,
    "popularity": 57515,
    "members": 28,
    "favorites": 0,
    "synopsis": null,
    "background": null,
    "authors": [
      {
        "mal_id": 24005,
        "type": "people",
        "name": "Kouda, Ryou",
        "url": "https://myanimelist.net/people/24005/Ryou_Kouda"
      }
    ],
    "serializations": [
      {
        "mal_id": 316,
        "type": "manga",
        "name": "good! Afternoon",
        "url": "https://myanimelist.net/manga/magazine/316/good_Afternoon"
      }
    ],
    "genres": [
      {
        "mal_id": 24,
        "type": "manga",
        "name": "Sci-Fi",
        "url": "https://myanimelist.net/manga/genre/24/Sci-Fi"
      }
    ],
    "explicit_genres": [

    ],
    "themes": [

    ],
    "demographics": [
      {
        "mal_id": 41,
        "type": "manga",
        "name": "Seinen",
        "url": "https://myanimelist.net/manga/genre/41/Seinen"
      }
    ]
  }
}

*/
