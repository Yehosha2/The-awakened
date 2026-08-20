/* =========================================
   THE AWAKENED — READER
   Complete Reader Controller
========================================= */

let pages = [];
let currentPage = 0;


/* =========================================
   TABLE OF CONTENTS
========================================= */

const tableOfContents = [

  ["Chapter One", "The Tablet"],
  ["Chapter Two", "The Professor"],
  ["Chapter Three", "The Hidden Language"],
  ["Chapter Four", "The Father's Notebook"],
  ["Chapter Five", "No Man's Land"],
  ["Chapter Six", "The Watchers"],
  ["Chapter Seven", "The Voice"],
  ["Chapter Eight", "Hidden Eyes"],
  ["Chapter Nine", "The Man in the Dark"],
  ["Chapter Ten", "The Monster Within Samarian"],
  ["Chapter Eleven", "The Awakening Within"],
  ["Chapter Twelve", "The Door"],
  ["Chapter Thirteen", "The Presence"],
  ["Chapter Fourteen", "The Forgotten Voice"],
  ["Chapter Fifteen", "Before the Beginning"],
  ["Chapter Sixteen", "The Mother of Life"],
  ["Chapter Seventeen", "The Keepers"],
  ["Chapter Eighteen", "The Witness"],
  ["Chapter Nineteen", "The First Memory"],
  ["Chapter Twenty", "The Hidden Truth"],
  ["Chapter Twenty-One", "The Ancient Path"],
  ["Chapter Twenty-Two", "The Return"],
  ["Chapter Twenty-Three", "The Revelation"],
  ["Chapter Twenty-Four", "The Awakening"],
  ["Chapter Twenty-Five", "The Mark"],
  ["Chapter Twenty-Six", "The Messenger"],
  ["Chapter Twenty-Seven", "The Prophecy"],
  ["Chapter Twenty-Eight", "The Lost Name"],
  ["Chapter Twenty-Nine", "The Beginning"],
  ["Chapter Thirty", "The Choice"],
  ["Chapter Thirty-One", "The Crossing"],
  ["Chapter Thirty-Two", "The Secret"],
  ["Chapter Thirty-Three", "The Watchers Return"],
  ["Chapter Thirty-Four", "The Last Tablet"],
  ["Chapter Thirty-Five", "The Voice Within"],
  ["Chapter Thirty-Six", "The Door Opens"],
  ["Chapter Thirty-Seven", "The Truth"],
  ["Chapter Thirty-Eight", "The Awakening"],
  ["Chapter Thirty-Nine", "The Final Memory"],
  ["Chapter Forty", "The Beginning After the Beginning"]

];


/* =========================================
   CREATE TABLE OF CONTENTS PAGE
========================================= */

function createTableOfContents() {

  const toc =
    document.createElement("section");

  toc.className = "page toc";

  let tocHTML = `

    <div class="chapter-number">
      THE AWAKENED
    </div>

    <h2>Table of Contents</h2>

  `;


  tableOfContents.forEach(
    function(chapter) {

      tocHTML += `

        <div class="toc-line">

          <span>
            ${chapter[0]}
          </span>

          <span>
            ${chapter[1]}
          </span>

        </div>

      `;

    }
  );


  tocHTML += `

    <div class="toc-line">

      <span>
        Epilogue
      </span>

      <span>
        Love Wins
      </span>

    </div>

  `;


  toc.innerHTML =
    tocHTML;


  return toc;
}


/* =========================================
   LOAD CHAPTERS
========================================= */

async function loadChapters() {

  const reader =
    document.getElementById(
      "reader"
    );


  if (!reader) {

    console.error(
      "Reader container not found."
    );

    return;

  }


  /* Clear reader */

  reader.innerHTML = "";


  /* =========================================
     ADD TABLE OF CONTENTS FIRST
  ========================================= */

  const toc =
    createTableOfContents();


  reader.appendChild(
    toc
  );


  /* =========================================
     CHAPTER FILE LIST
  ========================================= */

  const chapters = [];


  /* CHAPTERS 1–40 */

  for (
    let i = 1;
    i <= 40;
    i++
  ) {

    const number =
      String(i).padStart(
        2,
        "0"
      );


    chapters.push(
      "chapters/chapter-" +
      number +
      ".html"
    );

  }


  /* EPILOGUE */

  chapters.push(
    "chapters/epilogue.html"
  );


  /* =========================================
     LOAD EACH FILE
  ========================================= */

  for (
    const file of chapters
  ) {

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
         FIND .PAGE ELEMENTS
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
     FIND ALL LOADED PAGES
  ========================================= */

  pages =
    reader.querySelectorAll(
      ".page"
    );


  console.log(
    "Total pages loaded:",
    pages.length
  );


  /* =========================================
     NOTHING LOADED
  ========================================= */

  if (
    pages.length === 0
  ) {

    reader.innerHTML = `

      <section class="page">

        <div class="chapter-number">
          THE AWAKENED
        </div>

        <h2>Reader Error</h2>

        <p>
          No chapters could be loaded.
        </p>

        <p>
          Please check the browser
          console for details.
        </p>

      </section>

    `;

    return;

  }


  /* =========================================
     START AT TABLE OF CONTENTS
  ========================================= */

  currentPage = 0;

  showPage(0);

}


/* =========================================
   SHOW PAGE
========================================= */

function showPage(
  pageNumber
) {

  if (
    !pages.length
  ) {

    return;

  }


  /* Prevent going below first page */

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


  /* =========================================
     HIDE / SHOW PAGES
  ========================================= */

  pages.forEach(
    function(
      page,
      index
    ) {

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
     SCROLL TO TOP
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

    /* Stop speech */

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

    /* Stop speech */

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
   GET PAGE TEXT
========================================= */

function getPageText(
  page
) {

  const clone =
    page.cloneNode(
      true
    );


  /* Remove decorative elements */

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
    .replace(
      /\s+/g,
      " "
    )
    .trim();

}


/* =========================================
   READ CURRENT PAGE
========================================= */

function readCurrentPage() {

  if (
    !(
      "speechSynthesis"
      in window
    )
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


  /* Stop existing speech */

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


  speech.rate =
    0.9;


  speech.pitch =
    1;


  speech.volume =
    1;


  /* =========================================
     SPEECH START
  ========================================= */

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


  /* =========================================
     SPEECH END
  ========================================= */

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


  /* =========================================
     SPEECH ERROR
  ========================================= */

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
   TOGGLE READING
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


  /* =========================================
     CURRENTLY SPEAKING
  ========================================= */

  if (
    window.speechSynthesis.speaking
  ) {

    /* PAUSED */

    if (
      window.speechSynthesis.paused
    ) {

      window.speechSynthesis.resume();


      if (button) {

        button.textContent =
          "⏸ PAUSE";

      }


    } else {

      /* PAUSE */

      window.speechSynthesis.pause();


      if (button) {

        button.textContent =
          "▶️ RESUME";

      }

    }


  } else {

    /* START READING */

    readCurrentPage();

  }

}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
  "keydown",
  function(event) {

    /* Right Arrow = Next */

    if (
      event.key ===
      "ArrowRight"
    ) {

      nextPage();

    }


    /* Left Arrow = Previous */

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