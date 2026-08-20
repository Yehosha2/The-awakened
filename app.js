/* =========================================
   THE AWAKENED — READER
========================================= */

let pages = [];
let currentPage = 0;


/* =========================================
   TABLE OF CONTENTS
========================================= */

const chapters = [
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
   CREATE TOC PAGE
========================================= */

function createTOC(entries, title) {

  const page =
    document.createElement("section");

  page.className = "page toc";

  let html = `
    <div class="chapter-number">
      THE AWAKENED
    </div>

    <h2>Table of Contents</h2>

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
   LOAD EVERYTHING
========================================= */

async function loadChapters() {

  const reader =
    document.getElementById("reader");

  if (!reader) {
    console.error("Reader not found.");
    return;
  }

  /* Clear loading message */

  reader.innerHTML = "";


  /* =========================================
     TABLE OF CONTENTS — PAGE 1
  ========================================= */

  reader.appendChild(
    createTOC(
      chapters.slice(0, 13),
      "Chapters One — Thirteen"
    )
  );


  /* =========================================
     TABLE OF CONTENTS — PAGE 2
  ========================================= */

  reader.appendChild(
    createTOC(
      chapters.slice(13, 27),
      "Chapters Fourteen — Twenty-Seven"
    )
  );


  /* =========================================
     TABLE OF CONTENTS — PAGE 3
  ========================================= */

  const finalTOC =
    chapters.slice(27, 40);

  finalTOC.push([
    "Epilogue",
    "Love Wins"
  ]);

  reader.appendChild(
    createTOC(
      finalTOC,
      "Chapters Twenty-Eight — Forty"
    )
  );


  /* =========================================
     CHAPTER FILES
  ========================================= */

  const files = [];

  for (
    let i = 1;
    i <= 40;
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

  files.push(
    "chapters/epilogue.html"
  );


  /* =========================================
     LOAD CHAPTER FILES
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
          "Could not load:",
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


      /* Look for .page */

      const chapterPages =
        doc.querySelectorAll(
          ".page"
        );


      if (
        chapterPages.length
      ) {

        chapterPages.forEach(
          function(page) {

            reader.appendChild(
              document.importNode(
                page,
                true
              )
            );

          }
        );

      } else {

        /* Fallback to main */

        const main =
          doc.querySelector(
            "main"
          );

        if (main) {

          const page =
            document.createElement(
              "section"
            );

          page.className =
            "page";

          page.innerHTML =
            main.innerHTML;

          reader.appendChild(
            page
          );

        }

      }

    } catch (error) {

      console.error(
        "Error loading:",
        file,
        error
      );

    }

  }


  /* =========================================
     GET ALL PAGES
  ========================================= */

  pages =
    reader.querySelectorAll(
      ".page"
    );


  console.log(
    "Total pages:",
    pages.length
  );


  if (!pages.length) {

    reader.innerHTML = `
      <section class="page active">
        <h2>THE AWAKENED</h2>
        <p>No pages could be loaded.</p>
      </section>
    `;

    return;
  }


  /* =========================================
     START ON TOC PAGE 1
  ========================================= */

  currentPage = 0;

  showPage(0);

}


/* =========================================
   SHOW PAGE
========================================= */

function showPage(number) {

  if (!pages.length) {
    return;
  }

  if (number < 0) {
    number = 0;
  }

  if (
    number >= pages.length
  ) {
    number =
      pages.length - 1;
  }


  pages.forEach(
    function(page, index) {

      page.classList.toggle(
        "active",
        index === number
      );

    }
  );


  currentPage =
    number;


  /* Page counter */

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


  /* Previous */

  const previous =
    document.getElementById(
      "previousButton"
    );

  if (previous) {

    previous.disabled =
      currentPage === 0;

  }


  /* Next */

  const next =
    document.getElementById(
      "nextButton"
    );

  if (next) {

    next.disabled =
      currentPage ===
      pages.length - 1;

  }


  /* Progress */

  const progress =
    document.getElementById(
      "progressBar"
    );

  if (progress) {

    progress.style.width =
      (
        (
          currentPage + 1
        ) /
        pages.length *
        100
      ) + "%";

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================
   NEXT
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
   PREVIOUS
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


function readCurrentPage() {

  if (
    !("speechSynthesis" in window)
  ) {

    alert(
      "Text-to-speech is not supported."
    );

    return;
  }

  if (!pages.length) {
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


  window.speechSynthesis.speak(
    speech
  );

}


/* =========================================
   READ / PAUSE
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
   KEYBOARD
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
   START
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadChapters();

  }
);