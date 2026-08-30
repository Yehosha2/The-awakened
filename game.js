"use strict";

/* =========================================================
   THE AWAKENED — THE GAME
   BOOK → CLUE → PUZZLE → STORY
   ========================================================= */

const SAVE_KEY = "theAwakenedGameSave";


/* =========================================================
   GAME STATE
   ========================================================= */

let gameState = {
  scene: "awakening",
  inventory: [],
  clues: [],
  flags: {},
  bookRead: false
};


/* =========================================================
   STORY SCENES
   ========================================================= */

const scenes = {

  awakening: {

    title: "THE TABLET",

    text:
      "Maya stepped into the chamber. " +
      "The air was cold. Ancient stone surrounded her. " +
      "At the center of the room stood a tablet covered in symbols.",

    choices: [

      {
        text: "EXAMINE THE TABLET",
        next: "tablet"
      },

      {
        text: "SEARCH THE CHAMBER",
        next: "search"
      },

      {
        text: "LEAVE THE CHAMBER",
        next: "leave"
      }

    ]

  },


  tablet: {

    title: "THE INSCRIPTION",

    text:
      "Maya moved closer. The inscription seemed strangely familiar. " +
      "She had seen something like it before.",

    choices: [

      {
        text: "READ THE INSCRIPTION",
        next: "inscription"
      },

      {
        text: "TOUCH THE TABLET",
        next: "touchTablet"
      },

      {
        text: "STEP AWAY",
        next: "awakening"
      }

    ]

  },


  inscription: {

    title: "THE MEMORY",

    text:
      "The symbols form a pattern. " +
      "Maya knows the answer is somewhere in what she has already learned.",

    choices: [

      {
        text: "SEARCH THE BOOK",
        action: "searchBook"
      },

      {
        text: "RETURN TO THE TABLET",
        next: "tablet"
      }

    ]

  },


  search: {

    title: "THE CHAMBER",

    text:
      "Maya searched the walls. Beneath a layer of dust she discovered " +
      "a small metallic object.",

    choices: [

      {
        text: "TAKE THE OBJECT",
        action: "takeArtifact"
      },

      {
        text: "RETURN TO THE TABLET",
        next: "awakening"
      }

    ]

  },


  artifact: {

    title: "THE ARTIFACT",

    text:
      "The object fits perfectly in Maya's hand. " +
      "A strange symbol is engraved on its surface.",

    choices: [

      {
        text: "EXAMINE THE SYMBOL",
        action: "artifactClue"
      },

      {
        text: "RETURN TO THE CHAMBER",
        next: "awakening"
      }

    ]

  },


  touchTablet: {

    title: "THE AWAKENING",

    text:
      "The instant Maya touches the tablet, the symbols begin to glow. " +
      "A vibration moves through the chamber.",

    choices: [

      {
        text: "CONTINUE",
        action: "awaken"
      }

    ]

  },


  awakened: {

    title: "THE EYE OPENS",

    text:
      "A deep vibration moves beneath the stone. " +
      "Somewhere below the chamber, something has awakened.",

    choices: [

      {
        text: "SEARCH FOR THE SOURCE",
        action: "searchSource"
      }

    ]

  },


  lockedDoor: {

    title: "THE LOCKED DOOR",

    text:
      "Maya discovers an ancient door. " +
      "There is no handle. Only a symbol in the center.",

    choices: [

      {
        text: "USE THE BOOK CLUE",
        action: "useBookClue"
      },

      {
        text: "STEP AWAY",
        next: "awakened"
      }

    ]

  },


  doorOpen: {

    title: "THE PASSAGE",

    text:
      "The symbol responds. Stone moves against stone. " +
      "The ancient door opens into darkness.",

    choices: [

      {
        text: "ENTER THE PASSAGE",
        action: "enterPassage"
      }

    ]

  },


  passage: {

    title: "THE DARKNESS",

    text:
      "Maya enters the passage. Behind her, the door closes. " +
      "The darkness stretches ahead. On the stone wall, " +
      "three faint symbols begin to appear.",

    choices: [

      {
        text: "EXAMINE THE SYMBOLS",
        action: "openChapter2"
      },

      {
        text: "CONTINUE INTO THE DARKNESS",
        action: "continueStory"
      }

    ]

  },


  chapter2Complete: {

    title: "THE THREE PHOTOGRAPHS",

    text:
      "Maya studies the three photographs again. " +
      "Baghdad. Israel. Europe. " +
      "Different discoveries. The same symbols. " +
      "The pattern is no longer a coincidence.",

    choices: [

      {
        text: "STUDY THE PHOTOGRAPHS",
        action: "chapter2Reveal"
      },

      {
        text: "CONTINUE",
        next: "passage"
      }

    ]

  },


  chapter2Reveal: {

    title: "THE PATTERN",

    text:
      "The three photographs were taken in different places, " +
      "yet the same symbols appeared in every discovery. " +
      "Maya realizes the tablet is connected to something much older.",

    choices: [

      {
        text: "CONTINUE",
        action: "continueStory"
      }

    ]

  },


  leave: {

    title: "THE EXIT",

    text:
      "Maya steps away from the chamber. " +
      "Something tells her she will have to return.",

    choices: [

      {
        text: "RETURN",
        next: "awakening"
      }

    ]

  }

};


/* =========================================================
   START GAME
   ========================================================= */

function startGame() {

  gameState = {

    scene: "awakening",

    inventory: [],

    clues: [],

    flags: {},

    bookRead: false

  };

  saveGame();

  showScreen("gameScreen");

  renderScene();

}


/* =========================================================
   RENDER SCENE
   ========================================================= */

function renderScene() {

  const scene = scenes[gameState.scene];

  if (!scene) {

    console.error(
      "Scene not found:",
      gameState.scene
    );

    return;

  }


  const title =
    document.getElementById("sceneTitle");

  const text =
    document.getElementById("storyText");

  const choices =
    document.getElementById("choices");


  if (!title || !text || !choices) {

    console.error(
      "Game interface elements are missing."
    );

    return;

  }


  title.textContent =
    scene.title;

  text.textContent =
    scene.text;

  choices.innerHTML = "";


  scene.choices.forEach(function(choice) {

    const button =
      document.createElement("button");

    button.type = "button";

    button.textContent =
      choice.text;


    button.addEventListener(
      "click",
      function() {

        if (choice.next) {

          gameState.scene =
            choice.next;

        }


        if (choice.action) {

          runAction(
            choice.action
          );

        }


        renderScene();

        saveGame();

      }
    );


    choices.appendChild(
      button
    );

  });

}


/* =========================================================
   ACTION ENGINE
   ========================================================= */

function runAction(action) {

  switch (action) {


    case "takeArtifact":

      if (
        !gameState.inventory.includes(
          "Ancient Artifact"
        )
      ) {

        gameState.inventory.push(
          "Ancient Artifact"
        );

      }

      gameState.scene =
        "artifact";

      break;


    case "artifactClue":

      addClue(
        "The artifact contains a symbol connected to the story."
      );

      break;


    case "searchBook":

      openBookForClue();

      break;


    case "awaken":

      gameState.scene =
        "awakened";

      break;


    case "searchSource":

      gameState.scene =
        "lockedDoor";

      break;


    case "useBookClue":

      checkBookClue();

      break;


    case "enterPassage":

      gameState.scene =
        "passage";

      break;


    case "continueStory":

      addClue(
        "Something deeper beneath the city has begun to awaken."
      );

      break;


    case "openChapter2":

      if (
        gameState.flags.chapter2Solved
      ) {

        gameState.scene =
          "chapter2Complete";

      }
      else {

        openChapter2Puzzle();

      }

      break;


    case :

      addClue(
        "Three ancient discoveries share the same symbols."
      );

      gameState.flags.threePhotographs =
        true;

      break;

  }

}


/* =========================================================
   BOOK
   ========================================================= */

function openBook() {

  window.location.href =
    "book.html";

}


function openBookForClue() {

  gameState.bookRead =
    true;

  saveGame();

  window.location.href =
    "book.html";

}


/* =========================================================
   CHAPTER 1 PUZZLE
   ========================================================= */

function checkBookClue() {

  const puzzleScreen =
    document.getElementById(
      "puzzleScreen"
    );

  const answerInput =
    document.getElementById(
      "puzzleAnswer"
    );

  const message =
    document.getElementById(
      "puzzleMessage"
    );


  if (
    !puzzleScreen ||
    !answerInput
  ) {

    alert(
      "Puzzle screen could not be loaded."
    );

    return;

  }


  puzzleScreen.classList.add(
    "active"
  );

  answerInput.value = "";


  if (message) {

    message.textContent =
      "";

  }


  setTimeout(
    function() {

      answerInput.focus();

    },
    100
  );

}


function submitPuzzle() {

  const answerInput =
    document.getElementById(
      "puzzleAnswer"
    );

  const message =
    document.getElementById(
      "puzzleMessage"
    );


  if (!answerInput) {

    return;

  }


  const answer =
    answerInput.value
      .trim()
      .toLowerCase();


  if (
    answer === "yehoshua"
  ) {

    gameState.flags.chapter1Solved =
      true;

    addClue(
      "Chapter 1 has been solved."
    );


    if (message) {

      message.textContent =
        "✓ CORRECT — THE TABLET RESPONDS.";

    }


    setTimeout(
      function() {

        closePanels();

        gameState.scene =
          "doorOpen";

        renderScene();

        saveGame();

      },
      1200
    );

  }
  else {

    if (message) {

      message.textContent =
        "The inscription remains silent.";

    }


    answerInput.value =
      "";

    answerInput.focus();

  }

}


/* =========================================================
   CHAPTER 2 PUZZLE
   ========================================================= */

function openChapter2Puzzle() {

  const screen =
    document.getElementById(
      "chapter2PuzzleScreen"
    );

  const first =
    document.getElementById(
      "photoAnswer1"
    );

  const second =
    document.getElementById(
      "photoAnswer2"
    );

  const third =
    document.getElementById(
      "photoAnswer3"
    );

  const message =
    document.getElementById(
      "chapter2Message"
    );


  if (
    !screen ||
    !first ||
    !second ||
    !third
  ) {

    alert(
      "Chapter 2 puzzle could not be loaded."
    );

    return;

  }


  screen.classList.add(
    "active"
  );

  first.value = "";
  second.value = "";
  third.value = "";


  if (message) {

    message.textContent =
      "";

  }


  setTimeout(
    function() {

      first.focus();

    },
    100
  );

}


function submitChapter2Puzzle() {

  const first =
    document
      .getElementById(
        "photoAnswer1"
      )
      .value
      .trim()
      .toLowerCase();

  const second =
    document
      .getElementById(
        "photoAnswer2"
      )
      .value
      .trim()
      .toLowerCase();

  const third =
    document
      .getElementById(
        "photoAnswer3"
      )
      .value
      .trim()
      .toLowerCase();

  const message =
    document.getElementById(
      "chapter2Message"
    );


  const correct =
    first === "baghdad" &&
    second === "israel" &&
    third === "europe";


  if (correct) {

    gameState.flags.chapter2Solved =
      true;

    addClue(
      "Chapter 2 solved — the three photographs were identified."
    );


    if (message) {

      message.textContent =
        "✓ CORRECT — THREE PLACES. ONE SYMBOL.";

    }


    setTimeout(
      function() {

        closePanels();

        gameState.scene =
          "chapter2Complete";

        renderScene();

        saveGame();

      },
      1200
    );

  }
  else {

    if (message) {

      message.textContent =
        "The order is wrong. Return to Chapter Two.";

    }

  }

}


/* =========================================================
   CLUES
   ========================================================= */

function addClue(text) {

  if (
    !gameState.clues.includes(
      text
    )
  ) {

    gameState.clues.push(
      text
    );

  }


  const notice =
    document.getElementById(
      "clueNotice"
    );


  if (!notice) {

    return;

  }


  notice.textContent =
    "🧩 NEW CLUE DISCOVERED";

  notice.classList.remove(
    "hidden"
  );


  setTimeout(
    function() {

      notice.classList.add(
        "hidden"
      );

    },
    3000
  );

}


/* =========================================================
   INVENTORY
   ========================================================= */

function openInventory() {

  const container =
    document.getElementById(
      "inventory"
    );


  if (!container) {

    return;

  }


  container.innerHTML =
    "";


  if (
    gameState.inventory.length === 0
  ) {

    container.innerHTML =
      "<p>Your inventory is empty.</p>";

  }
  else {

    gameState.inventory.forEach(
      function(item) {

        const div =
          document.createElement(
            "div"
          );

        div.className =
          "item";

        div.textContent =
          "🎒 " + item;

        container.appendChild(
          div
        );

      }
    );

  }


  const screen =
    document.getElementById(
      "inventoryScreen"
    );


  if (screen) {

    screen.classList.add(
      "active"
    );

  }

}


/* =========================================================
   CLUE MENU
   ========================================================= */

function openClues() {

  const container =
    document.getElementById(
      "clues"
    );


  if (!container) {

    return;

  }


  container.innerHTML =
    "";


  if (
    gameState.clues.length === 0
  ) {

    container.innerHTML =
      "<p>No clues discovered yet.</p>";

  }
  else {

    gameState.clues.forEach(
      function(clue) {

        const div =
          document.createElement(
            "div"
          );

        div.className =
          "clueItem";

        div.textContent =
          "🧩 " + clue;

        container.appendChild(
          div
        );

      }
    );

  }


  const screen =
    document.getElementById(
      "clueScreen"
    );


  if (screen) {

    screen.classList.add(
      "active"
    );

  }

}


/* =========================================================
   SAVE GAME
   ========================================================= */

function saveGame() {

  try {

    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify(
        gameState
      )
    );

  }
  catch (error) {

    console.error(
      "Could not save game:",
      error
    );

  }

}


/* =========================================================
   LOAD GAME
   ========================================================= */

function loadGame() {

  const saved =
    localStorage.getItem(
      SAVE_KEY
    );


  if (!saved) {

    alert(
      "No saved game found."
    );

    return;

  }


  try {

    gameState =
      JSON.parse(
        saved
      );


    if (
      !gameState.scene ||
      !scenes[gameState.scene]
    ) {

      throw new Error(
        "Invalid saved scene."
      );

    }


    showScreen(
      "gameScreen"
    );

    renderScene();

  }
  catch (error) {

    console.error(
      error
    );

    alert(
      "The saved game could not be loaded."
    );

  }

}


/* =========================================================
   SCREEN CONTROL
   ========================================================= */

function showScreen(id) {

  document
    .querySelectorAll(
      ".screen"
    )
    .forEach(
      function(screen) {

        screen.classList.remove(
          "active"
        );

      }
    );


  const screen =
    document.getElementById(
      id
    );


  if (screen) {

    screen.classList.add(
      "active"
    );

  }

}


/* =========================================================
   CLOSE PANELS
   ========================================================= */

function closePanels() {

  document
    .querySelectorAll(
      ".overlay"
    )
    .forEach(
      function(panel) {

        panel.classList.remove(
          "active"
        );

      }
    );
