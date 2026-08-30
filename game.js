"use strict";

/* =========================================================
   THE AWAKENED — THE GAME
   BOOK → CLUE → GAME ENGINE
   ========================================================= */

const SAVE_KEY = "theAwakenedGameSave";

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
      "Maya enters the passage. Behind her, the door closes.",

    choices: [
      {
        text: "CONTINUE",
        action: "continueStory"
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

  showScreen("gameScreen");
  renderScene();
}


/* =========================================================
   RENDER SCENE
   ========================================================= */

function renderScene() {

  const scene = scenes[gameState.scene];

  if (!scene) return;

  const title =
    document.getElementById("sceneTitle");

  const text =
    document.getElementById("storyText");

  const choices =
    document.getElementById("choices");

  if (!title || !text || !choices) return;

  title.textContent = scene.title;

  text.textContent = scene.text;

  choices.innerHTML = "";


  scene.choices.forEach(function(choice) {

    const button =
      document.createElement("button");

    button.textContent = choice.text;


    button.onclick = function() {

      if (choice.next) {
        gameState.scene = choice.next;
      }

      if (choice.action) {
        runAction(choice.action);
      }

      renderScene();

      saveGame();

    };


    choices.appendChild(button);

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

      gameState.scene = "artifact";

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

      gameState.scene = "awakened";

      break;


    case "searchSource":

      gameState.scene = "lockedDoor";

      break;


    case "useBookClue":

      checkBookClue();

      break;


    case "enterPassage":

      gameState.scene = "passage";

      break;


    case "continueStory":

      addClue(
        "Something deeper beneath the city has begun to awaken."
      );

      break;

  }

}


/* =========================================================
   OPEN BOOK
   ========================================================= */

function openBookForClue() {

  gameState.bookRead = true;

  saveGame();

  window.location.href = "book.html";

}


/* =========================================================
   BOOK CLUE PUZZLE
   ========================================================= */

function checkBookClue() {

  const puzzleScreen =
    document.getElementById("puzzleScreen");

  const answerInput =
    document.getElementById("puzzleAnswer");

  const message =
    document.getElementById("puzzleMessage");


  if (!puzzleScreen || !answerInput) {

    alert(
      "The puzzle screen could not be found."
    );

    return;

  }


  puzzleScreen.classList.add("active");

  answerInput.value = "";

  if (message) {
    message.textContent = "";
  }


  setTimeout(function() {

    answerInput.focus();

  }, 100);

}


/* =========================================================
   SUBMIT CHAPTER 1 ANSWER
   ========================================================= */

function submitPuzzle() {

  const answerInput =
    document.getElementById("puzzleAnswer");

  const message =
    document.getElementById("puzzleMessage");


  if (!answerInput) return;


  const answer =
    answerInput.value
      .trim()
      .toLowerCase();


  /*
    CHAPTER 1 BOOK CLUE

    The player must discover this
    by reading the book.
  */

  if (answer === "yehoshua") {

    gameState.flags.chapter1Solved = true;

    addClue(
      "Chapter 1 solved — the name was recognized."
    );

    if (message) {

      message.textContent =
        "✓ CORRECT — THE TABLET RESPONDS.";

    }


    setTimeout(function() {

      closePanels();

      gameState.scene = "doorOpen";

      renderScene();

      saveGame();

    }, 1200);

  }

  else {

    if (message) {

      message.textContent =
        "The inscription remains silent.";

    }

    answerInput.value = "";

    answerInput.focus();

  }

}


/* =========================================================
   ADD CLUE
   ========================================================= */

function addClue(text) {

  if (!gameState.clues.includes(text)) {

    gameState.clues.push(text);

  }


  const notice =
    document.getElementById("clueNotice");


  if (!notice) return;


  notice.textContent =
    "🧩 NEW CLUE DISCOVERED";

  notice.classList.remove("hidden");


  setTimeout(function() {

    notice.classList.add("hidden");

  }, 3000);

}


/* =========================================================
   INVENTORY
   ========================================================= */

function openInventory() {

  const container =
    document.getElementById("inventory");


  if (!container) return;


  container.innerHTML = "";


  if (gameState.inventory.length === 0) {

    container.innerHTML =
      "<p>Your inventory is empty.</p>";

  }

  else {

    gameState.inventory.forEach(
      function(item) {

        const div =
          document.createElement("div");

        div.className = "item";

        div.textContent =
          "🎒 " + item;

        container.appendChild(div);

      }
    );

  }


  document
    .getElementById("inventoryScreen")
    .classList.add("active");

}


/* =========================================================
   CLUES
   ========================================================= */

function openClues() {

  const container =
    document.getElementById("clues");


  if (!container) return;


  container.innerHTML = "";


  if (gameState.clues.length === 0) {

    container.innerHTML =
      "<p>No clues discovered yet.</p>";

  }

  else {

    gameState.clues.forEach(
      function(clue) {

        const div =
          document.createElement("div");

        div.className =
          "clueItem";

        div.textContent =
          "🧩 " + clue;

        container.appendChild(div);

      }
    );

  }


  document
    .getElementById("clueScreen")
    .classList.add("active");

}


/* =========================================================
   SAVE GAME
   ========================================================= */

function saveGame() {

  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify(gameState)
  );

}


/* =========================================================
   LOAD GAME
   ========================================================= */

function loadGame() {

  const saved =
    localStorage.getItem(SAVE_KEY);


  if (!saved) {

    alert("No saved game found.");

    return;

  }


  try {

    gameState =
      JSON.parse(saved);

    showScreen("gameScreen");

    renderScene();

  }

  catch (error) {

    console.error(error);

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
    .querySelectorAll(".screen")
    .forEach(function(screen) {

      screen.classList.remove("active");

    });


  const screen =
    document.getElementById(id);


  if (screen) {

    screen.classList.add("active");

  }

}


/* =========================================================
   CLOSE PANELS
   ========================================================= */

function closePanels() {

  document
    .querySelectorAll(".overlay")
    .forEach(function(panel) {

      panel.classList.remove("active");

    });

}

/* =========================================================
   OPEN BOOK
   ========================================================= */

function openBook() {

  window.location.href = "book.html";

}
