/* =========================================
   THE AWAKENED — BOOK ONE READER
   38 CHAPTERS
========================================= */

let pages = [];
let currentPage = 0;


/* =========================================
   CHAPTER TITLES
========================================= */

const chapters = [
  ["Chapter One", "THE TABLET"],
  ["Chapter Two", "THE PROFESSOR"],
  ["Chapter Three", "THE HIDDEN LANGUAGE"],
  ["Chapter Four", "THE FATHER'S NOTEBOOK"],
  ["Chapter Five", "JERICHO"],
  ["Chapter Six", "THE WATCHERS"],
  ["Chapter Seven", "THE VOICE"],
  ["Chapter Eight", "MAYA"],
  ["Chapter Nine", "THE MAN IN THE DARK"],
  ["Chapter Ten", "THE MAN WHO RETURNED"],
  ["Chapter Eleven", "THE CITY THAT REMEMBERED"],
  ["Chapter Twelve", "Seek and find, knock and the door with be opened"],
  ["Chapter Thirteen", "ONE WHO REMEMBERED"],

  ["Chapter Fourteen", "THE VOICE"],
  ["Chapter Fifteen", "THE EYES IN THE DARK"],
  ["Chapter Sixteen", "THE MONSTER WITHIN"],
  ["Chapter Seventeen", "THE AWAKENING"],
  ["Chapter Eighteen", "THE CITY RISES"],
  ["Chapter Nineteen", "THE FALL"],
  ["Chapter Twenty", "BEFORE MAYA"],
  ["Chapter Twenty-One", "THE BETRAYAL"],
  ["Chapter Twenty-Two", "THE HUNGER BELOW"],
  ["Chapter Twenty-Three", "THE SHOMRIM"],
  ["Chapter Twenty-Four", "THE FIRST NAME"],
  ["Chapter Twenty-Five", "THE ONE WHO WAITED"],
  ["Chapter Twenty-Six", "THE AWAKENING"],
  ["Chapter Twenty-Seven", "THE REVELATION"],

  ["Chapter Twenty-Eight", "THE SKY REMEMBERS"],
  ["Chapter Twenty-Nine", "THE LAST KEEPER"],
  ["Chapter Thirty", "Earth stood still"],
  ["Chapter Thirty-One", "THE QUIET BETWEEN"],
  ["Chapter Thirty-Two", "THE VOICE BENEATH THE WATER"],
  ["Chapter Thirty-Three", "THE MOTHER'S SECRET"],
  ["Chapter Thirty-Four", "MAYA, MAYA"],
  ["Chapter Thirty-Five", "THE FIRST MEMORY"],
  ["Chapter Thirty-Six", "THE NAME BEFORE NAMES"],
  ["Chapter Thirty-Seven", "AWAKE"],
  ["Chapter Thirty-Eight", "THE DIFFERENCE"]
];


/* =========================================
   CREATE A READER PAGE
========================================= */

function makePage(content) {

  const page = document.createElement("section");

  page.className = "page";

  page.innerHTML = content;

  return page;
}


/* =========================================
   CREATE TABLE OF CONTENTS
========================================= */

function createTOC() {

  const reader = document.getElementById("reader");

  if (!reader) return;

  reader.innerHTML = "";


  /* TOC PAGE 1 */

  let toc1 = `
    <div class="chapter-number">
      THE AWAKENED
    </div>

    <h1>TABLE OF CONTENTS</h1>

    <div class="divider">✦ ✦ ✦</div>
  `;

  chapters.slice(0, 13).forEach(function(chapter) {

    toc1 += `
      <p>
        <strong>${chapter[0]}</strong><br>
        ${chapter[1]}
      </p>
    `;

  });

  reader.appendChild(
    makePage(toc1)
  );


  /* TOC PAGE 2 */

  let toc2 = `
    <div class="chapter-number">
      THE AWAKENED
    </div>

    <h2>TABLE OF CONTENTS</h2>

    <div class="divider">✦ ✦ ✦</div>
  `;

  chapters.slice(13, 27).forEach(function(chapter) {

    toc2 += `
      <p>
        <strong>${chapter[0]}</strong><br>
        ${chapter[1]}
      </p>
    `;

  });

  reader.appendChild(
    makePage(toc2)
  );


  /* TOC PAGE 3 */

  let toc3 = `
    <div class="chapter-number">
      THE AWAKENED
    </div>

    <h2>TABLE OF CONTENTS</h2>

    <div class="divider">✦ ✦ ✦</div>
  `;

  chapters.slice(27, 38).forEach(function(chapter) {

    toc3 += `
      <p>
        <strong>${chapter[0]}</strong><br>
        ${chapter[1]}
      </p>
    `;

  });

  reader.appendChild(
    makePage(toc3)
  );


  updatePages();

}


/* =========================================
   LOAD CHAPTERS
========================================= */

async function loadChapters() {

  const reader = document.getElementById("reader");

  if (!reader) return;


  /* Show TOC FIRST */

  createTOC();


  /*
     Load chapters after the TOC
     has already appeared.
  */

  for (let i = 1; i <= 38; i++) {

    const number =
      String(i).padStart(2, "0");

    const file =
      `chapters/chapter-${number}.html`;

    try {

      const response =
        await fetch(file);

      if (!response.ok) {

        console.warn(
          "Chapter not found:",
          file
        );

        continue;
      }


      const html =
        await response.text();


      const parser =
        new DOMParser();


      const doc =
        parser.parseFromString(
          html,
          "text/html"
        );


      const chapterPages =
        doc.querySelectorAll(
          ".page"
        );


      if (chapterPages.length > 0) {

        chapterPages.forEach(function(page) {

          reader.appendChild(
            document.importNode(
              page,
              true
            )
          );

        });

      } else {

        const main =
          doc.querySelector("main");

        if (main) {

          const page =
            makePage(
              main.innerHTML
            );

          reader.appendChild(page);

        }

      }


      updatePages();


    } catch (error) {

      console.warn(
        "Could not load:",
        file,
        error
      );

    }

  }

}


/* =========================================
   UPDATE PAGE LIST
========================================= */

function updatePages() {

  const reader =
    document.getElementById("reader");

  if (!reader) return;


  pages =
    Array.from(
      reader.querySelectorAll(".page")
    );


  if (!pages.length) return;


  showPage(currentPage);

}


/* =========================================
   SHOW PAGE
========================================= */

function showPage(number) {

  if (!pages.length) return;


  if (number < 0) {

    number = 0;

  }


  if (number >= pages.length) {

    number =
      pages.length - 1;

  }


  pages.forEach(function(page, index) {

    page.classList.toggle(
      "active",
      index === number
    );

  });


  currentPage = number;


  /* PAGE COUNTER */

  const counter =
    document.getElementById(
      "pageCounter"
    );

  if (counter) {

    counter.textContent =
      `Page ${currentPage + 1} of ${pages.length}`;

  }


  /* PREVIOUS BUTTON */

  const previous =
    document.getElementById(
      "previousButton"
    );

  if (previous) {

    previous.disabled =
      currentPage === 0;

  }


  /* NEXT BUTTON */

  const next =
    document.getElementById(
      "nextButton"
    );

  if (next) {

    next.disabled =
      currentPage === pages.length - 1;

  }


  /* PROGRESS */

  const progress =
    document.getElementById(
      "progressBar"
    );

  if (progress) {

    const percent =
      (
        (currentPage + 1) /
        pages.length
      ) * 100;

    progress.style.width =
      percent + "%";

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================
   NEXT PAGE
========================================= */

function nextPage() {

  if (
    currentPage <
    pages.length - 1
  ) {

    if (
      window.speechSynthesis
    ) {

      window.speechSynthesis.cancel();

    }

    showPage(
      currentPage + 1
    );

  }

}


/* =========================================
   PREVIOUS PAGE
========================================= */

function previousPage() {

  if (
    currentPage > 0
  ) {

    if (
      window.speechSynthesis
    ) {

      window.speechSynthesis.cancel();

    }

    showPage(
      currentPage - 1
    );

  }

}


/* =========================================
   READ CURRENT PAGE
========================================= */

function readCurrentPage() {

  if (
    !("speechSynthesis" in window)
  ) {

    alert(
      "Text-to-speech is not supported."
    );

    return;

  }


  if (!pages.length) return;


  window.speechSynthesis.cancel();


  const clone =
    pages[currentPage]
      .cloneNode(true);


  clone
    .querySelectorAll(
      ".chapter-number, .divider"
    )
    .forEach(function(element) {

      element.remove();

    });


  const text =
    clone.innerText
      .replace(/\s+/g, " ")
      .trim();


  if (!text) return;


  const speech =
    new SpeechSynthesisUtterance(
      text
    );


  speech.rate = 0.9;
  speech.pitch = 1;
  speech.volume = 1;


  speech.onstart = function() {

    const button =
      document.getElementById(
        "readButton"
      );

    if (button) {

      button.textContent =
        "⏸ PAUSE";

    }

  };


  speech.onend = function() {

    const button =
      document.getElementById(
        "readButton"
      );

    if (button) {

      button.textContent =
        "🔊 READ";

    }

  };


  window.speechSynthesis.speak(
    speech
  );

}


/* =========================================
   READ / PAUSE / RESUME
========================================= */

function toggleReading() {

  if (
    !window.speechSynthesis
  ) {

    alert(
      "Text-to-speech is not supported."
    );

    return;

  }


  const button =
    document.getElementById(
      "readButton"
    );


  if (
    window.speechSynthesis.speaking
  ) {

    if (
      window.speechSynthesis.paused
    ) {

      window.speechSynthesis.resume();

      if (button) {

        button.textContent =
          "⏸ PAUSE";

      }

    } else {

      window.speechSynthesis.pause();

      if (button) {

        button.textContent =
          "▶️ RESUME";

      }

    }

  } else {

    readCurrentPage();

  }

}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "ArrowRight"
    ) {

      nextPage();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      previousPage();

    }

  }
);


/* =========================================
   START
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadChapters();

  }
);
