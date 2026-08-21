/* =========================================
   THE AWAKENED — READER
   BOOK ONE — 38 CHAPTERS
========================================= */

let pages = [];
let currentPage = 0;


/* =========================================
   TABLE OF CONTENTS
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
   CREATE TABLE OF CONTENTS PAGE
========================================= */

function createTOCPage(entries, title) {

  const page =
    document.createElement("section");

  page.className = "page toc";

  let html = `
    <div class="chapter-number">
      THE AWAKENED
    </div>

    <h2>TABLE OF CONTENTS</h2>

    <div class="toc-section-title">
      ${title}
    </div>
  `;

  entries.forEach(function(item) {

    html += `
      <div class="toc-line">
        <span>${item[0]}</span>
        <span>${item[1]}</span>
      </div>
    `;

  });

  page.innerHTML = html;

  return page;
}


/* =========================================
   CREATE 3 TOC PAGES
========================================= */

function createTableOfContents(reader) {

  /* TOC PAGE 1 */

  reader.appendChild(
    createTOCPage(
      chapters.slice(0, 13),
      "Chapters One — Thirteen"
    )
  );


  /* TOC PAGE 2 */

  reader.appendChild(
    createTOCPage(
      chapters.slice(13, 27),
      "Chapters Fourteen — Twenty-Seven"
    )
  );


  /* TOC PAGE 3 */

  reader.appendChild(
    createTOCPage(
      chapters.slice(27, 38),
      "Chapters Twenty-Eight — Thirty-Eight"
    )
  );

}


/* =========================================
   LOAD CHAPTERS
========================================= */

async function loadChapters() {

  const reader =
    document.getElementById("reader");

  if (!reader) {

    console.error(
      "Reader container not found."
    );

    return;

  }


  /* Clear loading message */

  reader.innerHTML = "";


  /* =========================================
     SHOW TABLE OF CONTENTS FIRST
  ========================================= */

  createTableOfContents(reader);


  /* =========================================
     CHAPTER FILE LIST
  ========================================= */

  const files = [];


  for (
    let i = 1;
    i <= 38;
    i++
  ) {

    const number =
      String(i).padStart(2, "0");

    files.push(
      "chapters/chapter-" +
      number +
      ".html"
    );

  }


  /* =========================================
     LOAD EACH CHAPTER
  ========================================= */

  for (const file of files) {

    try {

      console.log(
        "Loading:",
        file
      );


      const response =
        await fetch(file);


      if (!response.ok) {

        console.warn(
          "Chapter not found:",
          file,
          response.status
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


      /* =========================================
         FIND .page ELEMENTS
      ========================================= */

      const chapterPages =
        doc.querySelectorAll(
          ".page"
        );


      if (
        chapterPages.length > 0
      ) {

        chapterPages.forEach(
          function(page) {

            const newPage =
              document.importNode(
                page,
                true
              );

            reader.appendChild(
              newPage
            );

          }
        );

      } else {

        /* =========================================
           FALLBACK — USE <main>
        ========================================= */

        const chapterMain =
          doc.querySelector(
            "main"
          );


        if (chapterMain) {

          const newPage =
            document.createElement(
              "section"
            );

          newPage.className =
            "page";

          newPage.innerHTML =
            chapterMain.innerHTML;

          reader.appendChild(
            newPage
          );

        } else {

          console.warn(
            "No .page or <main> found:",
            file
          );

        }

      }

    } catch (error) {

      console.error(
        "Could not load:",
        file,
        error
      );

    }

  }


  /* =========================================
     FIND ALL READER PAGES
  ========================================= */

  pages =
    reader.querySelectorAll(
      ".page"
    );


  console.log(
    "THE AWAKENED pages loaded:",
    pages.length
  );


  if (
    pages.length === 0
  ) {

    reader.innerHTML = `
      <section class="page active">

        <div class="chapter-number">
          THE AWAKENED
        </div>

        <h2>Reader Error</h2>

        <p>
          No pages could be loaded.
        </p>

      </section>
    `;

    return;

  }


  /* =========================================
     START AT TOC PAGE ONE
  ========================================= */

  currentPage = 0;

  showPage(0);

}


/* =========================================
   SHOW PAGE
========================================= */

function showPage(pageNumber) {

  if (
    !pages.length
  ) {

    return;

  }


  /* Prevent going below page 1 */

  if (
    pageNumber < 0
  ) {

    pageNumber = 0;

  }


  /* Prevent going beyond final page */

  if (
    pageNumber >= pages.length
  ) {

    pageNumber =
      pages.length - 1;

  }


  /* Show selected page */

  pages.forEach(
    function(page, index) {

      page.classList.toggle(
        "active",
        index === pageNumber
      );

    }
  );


  currentPage =
    pageNumber;


  /* =========================================
     PAGE COUNTER
  ========================================= */

  const counter =
    document.getElementById(
      "pageCounter"
    );


  if (counter) {

    counter.textContent =
      "Page " +
      (currentPage + 1) +
      " of " +
      pages.length;

  }


  /* =========================================
     PREVIOUS BUTTON
  ========================================= */

  const previous =
    document.getElementById(
      "previousButton"
    );


  if (previous) {

    previous.disabled =
      currentPage === 0;

  }


  /* =========================================
     NEXT BUTTON
  ========================================= */

  const next =
    document.getElementById(
      "nextButton"
    );


  if (next) {

    next.disabled =
      currentPage ===
      pages.length - 1;

  }


  /* =========================================
     PROGRESS BAR
  ========================================= */

  const progressBar =
    document.getElementById(
      "progressBar"
    );


  if (progressBar) {

    const progress =
      (
        (currentPage + 1) /
        pages.length
      ) * 100;


    progressBar.style.width =
      progress + "%";

  }


  /* =========================================
     RETURN TO TOP
  ========================================= */

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
   TEXT TO SPEECH
========================================= */

function getPageText(page) {

  const clone =
    page.cloneNode(true);


  clone
    .querySelectorAll(
      ".chapter-number, .divider"
    )
    .forEach(
      function(element) {

        element.remove();

      }
    );


  return clone.innerText
    .replace(/\s+/g, " ")
    .trim();

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


  if (
    !pages.length
  ) {

    return;

  }


  window.speechSynthesis.cancel();


  const text =
    getPageText(
      pages[currentPage]
    );


  if (!text) {

    return;

  }


  const speech =
    new SpeechSynthesisUtterance(
      text
    );


  speech.rate = 0.9;
  speech.pitch = 1;
  speech.volume = 1;


  speech.onstart =
    function() {

      const button =
        document.getElementById(
          "readButton"
        );


      if (button) {

        button.textContent =
          "⏸ PAUSE";

      }

    };


  speech.onend =
    function() {

      const button =
        document.getElementById(
          "readButton"
        );


      if (button) {

        button.textContent =
          "🔊 READ";

      }

    };


  speech.onerror =
    function() {

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
      event.key ===
      "ArrowRight"
    ) {

      nextPage();

    }


    if (
      event.key ===
      "ArrowLeft"
    ) {

      previousPage();

    }

  }
);


/* =========================================
   START READER
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadChapters();

  }
);