/* =========================================
   THE AWAKENED — EPISODES
   ========================================= */


const episodes = [

  {
    number: 1,
    title: "THE TABLET",
    chapter: "chapters/chapter-01.html"
  },

  {
    number: 2,
    title: "THE PROFESSOR",
    chapter: "chapters/chapter-02.html"
  },

  {
    number: 3,
    title: "THE HIDDEN LANGUAGE",
    chapter: "chapters/chapter-03.html"
  },

  {
    number: 4,
    title: "THE FATHER’S NOTEBOOK",
    chapter: "chapters/chapter-04.html"
  },

  {
    number: 5,
    title: "JERICHO",
    chapter: "chapters/chapter-05.html"
  },

  {
    number: 6,
    title: "THE WATCHERS",
    chapter: "chapters/chapter-06.html"
  },

  {
    number: 7,
    title: "THE VOICE",
    chapter: "chapters/chapter-07.html"
  },

  {
    number: 8,
    title: "MAYA",
    chapter: "chapters/chapter-08.html"
  },

  {
    number: 9,
    title: "THE MAN IN THE DARK",
    chapter: "chapters/chapter-09.html"
  },

  {
    number: 10,
    title: "THE MAN WHO RETURNED",
    chapter: "chapters/chapter-10.html"
  },

  {
    number: 11,
    title: "THE CITY THAT REMEMBERED",
    chapter: "chapters/chapter-11.html"
  },

  {
    number: 12,
    title: "Seek and find, knock and the door with be opened",
    chapter: "chapters/chapter-12.html"
  },

  {
    number: 13,
    title: "ONE WHO REMEMBERED",
    chapter: "chapters/chapter-13.html"
  },

  {
    number: 14,
    title: "THE VOICE",
    chapter: "chapters/chapter-14.html"
  },

  {
    number: 15,
    title: "THE EYES IN THE DARK",
    chapter: "chapters/chapter-15.html"
  },

  {
    number: 16,
    title: "THE MONSTER WITHIN",
    chapter: "chapters/chapter-16.html"
  },

  {
    number: 17,
    title: "THE AWAKENING",
    chapter: "chapters/chapter-17.html"
  },

  {
    number: 18,
    title: "THE CITY RISES",
    chapter: "chapters/chapter-18.html"
  },

  {
    number: 19,
    title: "THE FALL",
    chapter: "chapters/chapter-19.html"
  },

  {
    number: 20,
    title: "THE ONES WHO REMEMBER",
    chapter: "chapters/chapter-20.html"
  },

  {
    number: 21,
    title: "THE PRISON",
    chapter: "chapters/chapter-21.html"
  },

  {
    number: 22,
    title: "THE DAUGHTER",
    chapter: "chapters/chapter-22.html"
  },

  {
    number: 23,
    title: "THE AWAKENING",
    chapter: "chapters/chapter-23.html"
  },

  {
    number: 24,
    title: "THE GATE",
    chapter: "chapters/chapter-24.html"
  },

  {
    number: 25,
    title: "THE AWAKENING",
    chapter: "chapters/chapter-25.html"
  },

  {
    number: 26,
    title: "THE FIRST",
    chapter: "chapters/chapter-26.html"
  },

  {
    number: 27,
    title: "THE PRAYER",
    chapter: "chapters/chapter-27.html"
  },

  {
    number: 28,
    title: "THE SKY REMEMBERS",
    chapter: "chapters/chapter-28.html"
  },

  {
    number: 29,
    title: "THE LAST KEEPER",
    chapter: "chapters/chapter-29.html"
  },

  {
    number: 30,
    title: "THE CRADLE",
    chapter: "chapters/chapter-30.html"
  },

  {
    number: 31,
    title: "THE QUIET BETWEEN",
    chapter: "chapters/chapter-31.html"
  },

  {
    number: 32,
    title: "THE VOICE BENEATH THE WATER",
    chapter: "chapters/chapter-32.html"
  },

  {
    number: 33,
    title: "THE MOTHER’S SECRET",
    chapter: "chapters/chapter-33.html"
  },

  {
    number: 34,
    title: "MAYA, MAYA",
    chapter: "chapters/chapter-34.html"
  },

  {
    number: 35,
    title: "THE FIRST MEMORY",
    chapter: "chapters/chapter-35.html"
  },

  {
    number: 36,
    title: "THE NAME BEFORE NAMES",
    chapter: "chapters/chapter-36.html"
  },

  {
    number: 37,
    title: "AWAKE",
    chapter: "chapters/chapter-37.html"
  },

  {
    number: 38,
    title: "THE FALL",
    chapter: "chapters/chapter-38.html"
  },

  {
    number: 39,
    title: "THE KEY",
    chapter: "chapters/chapter-39.html"
  }

];


/* =========================================
   CREATE EPISODE CARD
   ========================================= */

function createEpisodeCard(episode) {

  const card = document.createElement("article");

  card.className = "episode-card";


  card.innerHTML = `

    <div
      class="episode-art"
      aria-hidden="true"
    >

      <div class="episode-eye">
        👁️
      </div>

    </div>


    <div class="episode-info">

      <div class="episode-number">

        EPISODE ${String(episode.number).padStart(2, "0")}

      </div>


      <h2 class="episode-title">

        ${escapeHTML(episode.title)}

      </h2>


      <a
        class="episode-read"
        href="${episode.chapter}"
      >

        ▶ READ EPISODE

      </a>

    </div>

  `;


  return card;

}


/* =========================================
   PROTECT TITLES FROM HTML
   ========================================= */

function escapeHTML(value) {

  return String(value)

    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");

}


/* =========================================
   LOAD EPISODES
   ========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const grid =
      document.getElementById("episodes-grid");


    if (!grid) {
      return;
    }


    episodes.forEach(
      function (episode) {

        grid.appendChild(
          createEpisodeCard(episode)
        );

      }
    );

  }
);