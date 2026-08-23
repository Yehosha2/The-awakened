/* =========================================================
   THE AWAKENED — THE GAME
   COMPLETE GAME ENGINE
   ========================================================= */

"use strict";

const SAVE_KEY = "theAwakenedGameSave";


/* =========================================================
   GAME STATE
   ========================================================= */

let gameState = {
  scene: "awakening",
  inventory: [],
  choices: [],
  flags: {},
  knowledge: 0,
  awakening: 0,
  trust: 0
};


/* =========================================================
   SCENES
   ========================================================= */

const scenes = {

  awakening: {
    chapter: "PROLOGUE",
    location: "THE EXCAVATION",
    title: "THE TABLET",

    text: `
      The room beneath the excavation site is colder
      than it should be.

      Maya Reed slowly raises her lantern.

      Dust hangs motionless in the air.

      Then she sees it.

      A tablet buried beneath the stone floor.

      There is no writing on its surface.

      Only a single symbol.

      An eye.

      Maya reaches toward it.

      The moment her fingers touch the stone,
      something speaks inside the darkness.
    `,

    choices: [
      {
        text: "Touch the symbol.",
        next: "touchTablet",
        flag: "touchedTablet",
        awakening: 1
      },

      {
        text: "Step away from the tablet.",
        next: "stepAway",
        flag: "rejectedTablet",
        knowledge: 1
      }
    ]
  },


  touchTablet: {
    chapter: "CHAPTER I",
    location: "THE EXCAVATION",
    title: "THE VOICE",

    text: `
      The tablet is warm.

      Impossible.

      Maya pulls her hand away.

      A whisper moves through the chamber.

      Not through the air.

      Through her.

      "You have returned."

      Maya freezes.

      She has never heard the voice before.

      Yet somehow...

      she remembers it.
    `,

    item: "The Tablet",

    choices: [
      {
        text: "Ask: Who are you?",
        next: "askVoice",
        flag: "askedVoice",
        knowledge: 1,
        trust: 1
      },

      {
        text: "Search the chamber.",
        next: "searchChamber",
        flag: "searchedChamber",
        knowledge: 2
      }
    ]
  },


  stepAway: {
    chapter: "CHAPTER I",
    location: "THE EXCAVATION",
    title: "THE WATCHER",

    text: `
      Maya steps backward.

      The lantern flickers.

      Once.

      Twice.

      Then darkness.

      When the light returns,
      the tablet is gone.

      Maya looks toward the entrance.

      Someone is standing there.

      A silhouette.

      Watching her.

      An eye catches the light.
    `,

    choices: [
      {
        text: "Follow the figure.",
        next: "followWatcher",
        flag: "followedWatcher",
        awakening: 1
      },

      {
        text: "Run toward the entrance.",
        next: "runEntrance",
        flag: "ranEntrance",
        knowledge: 1
      }
    ]
  },


  askVoice: {
    chapter: "CHAPTER II",
    location: "THE CHAMBER",
    title: "THE KEEPER",

    text: `
      "Who are you?"

      The chamber becomes completely silent.

      Then the voice answers.

      "I am the Keeper."

      Maya's heart begins to race.

      "Keeper of what?"

      The answer comes almost immediately.

      "Wisdom."

      A second symbol appears beneath the eye.

      Maya realizes the tablet is not an artifact.

      It is a key.
    `,

    item: "The Keeper's Mark",

    choices: [
      {
        text: "Take the mark.",
        next: "takeMark",
        flag: "acceptedMark",
        awakening: 2,
        trust: 1
      },

      {
        text: "Refuse it.",
        next: "refuseMark",
        flag: "refusedMark",
        knowledge: 1,
        trust: -1
      }
    ]
  },


  searchChamber: {
    chapter: "CHAPTER II",
    location: "THE CHAMBER",
    title: "THE HIDDEN LANGUAGE",

    text: `
      Maya searches the walls.

      Beneath centuries of dust,
      she finds writing.

      The characters are unfamiliar.

      Yet they resemble something she has studied before.

      Ancient Samaritan script.

      At the center of the inscription is a phrase:

      "The Keeper remembers what the world forgot."
    `,

    item: "Ancient Inscription",

    choices: [
      {
        text: "Read the inscription aloud.",
        next: "readInscription",
        flag: "readInscription",
        knowledge: 2,
        awakening: 1
      },

      {
        text: "Photograph the inscription.",
        next: "photographInscription",
        flag: "photographedInscription",
        knowledge: 1
      }
    ]
  },


  followWatcher: {
    chapter: "CHAPTER II",
    location: "THE TUNNEL",
    title: "THE EYES",

    text: `
      Maya follows the figure into the tunnel.

      Footsteps echo ahead.

      Then stop.

      She raises the lantern.

      Nothing.

      But the walls are covered with eyes.

      Hundreds of them.

      Some are carved.

      Some appear painted.

      One of them moves.
    `,

    choices: [
      {
        text: "Look directly into the moving eye.",
        next: "lookEye",
        flag: "lookedEye",
        awakening: 2
      },

      {
        text: "Turn around.",
        next: "turnAround",
        flag: "turnedAround",
        knowledge: 1
      }
    ]
  },


  runEntrance: {
    chapter: "CHAPTER II",
    location: "THE EXCAVATION",
    title: "THE DOOR",

    text: `
      Maya runs.

      But the entrance is no longer there.

      In its place stands an ancient stone door.

      It was not there before.

      Something has changed.

      The eye symbol is carved into the center.

      Maya realizes the chamber has chosen her.
    `,

    choices: [
      {
        text: "Open the door.",
        next: "openDoor",
        flag: "openedDoor",
        awakening: 2
      },

      {
        text: "Search for another way out.",
        next: "searchExit",
        flag: "searchedExit",
        knowledge: 1
      }
    ]
  },


  takeMark: {
    chapter: "CHAPTER III",
    location: "THE CHAMBER",
    title: "THE AWAKENING",

    text: `
      Maya touches the mark.

      Light fills the chamber.

      Images flash through her mind.

      Ancient cities.

      Flooded lands.

      A voice speaking before the first words were written.

      Then she sees them.

      The Watchers.

      They are looking directly at her.

      One whispers:

      "The Witness has awakened."
    `,

    ending: true,

    endingTitle: "THE WITNESS",

    endingText: `
      Maya opens her eyes.

      The chamber is gone.

      She is standing somewhere else.

      Somewhere that should not exist.

      And for the first time,
      she understands the truth:

      She was never searching for the past.

      The past was searching for her.
    `
  },


  refuseMark: {
    chapter: "CHAPTER III",
    location: "THE CHAMBER",
    title: "THE CHOICE",

    text: `
      Maya refuses the mark.

      The light disappears.

      The voice becomes silent.

      For a moment,
      everything seems normal.

      Then the tablet cracks.

      Something beneath the chamber begins to wake.
    `,

    choices: [
      {
        text: "Leave the chamber.",
        next: "endingEscape",
        knowledge: 1
      },

      {
        text: "Stay and discover what awakened.",
        next: "endingDarkness",
        awakening: 2
      }
    ]
  },


  readInscription: {
    chapter: "CHAPTER III",
    location: "THE CHAMBER",
    title: "THE MEMORY",

    text: `
      Maya reads the inscription.

      The moment she speaks the final word,
      every lantern in the chamber ignites.

      The inscription changes.

      New words appear.

      Her name.

      Maya Reed.

      Beneath it:

      "THE WITNESS."
    `,

    ending: true,

    endingTitle: "THE WITNESS",

    endingText: `
      The ancient language knew her name
      thousands of years before she was born.

      Somewhere beyond the chamber,
      something opens its eyes.
    `
  },


  photographInscription: {
    chapter: "CHAPTER III",
    location: "THE CHAMBER",
    title: "THE IMAGE",

    text: `
      Maya photographs the inscription.

      The flash illuminates the entire chamber.

      When she looks at the photograph,
      she sees something that was not visible before.

      A face.

      Standing behind her.
    `,

    choices: [
      {
        text: "Turn around.",
        next: "turnAround",
        awakening: 1
      },

      {
        text: "Look closer at the photograph.",
        next: "endingPhotograph",
        knowledge: 2
      }
    ]
  },


  lookEye: {
    chapter: "CHAPTER III",
    location: "THE TUNNEL",
    title: "THE EYE",

    text: `
      Maya looks directly into the moving eye.

      Everything stops.

      The sound disappears.

      The air disappears.

      Even time seems to disappear.

      Then a voice speaks:

      "You see."

      Maya whispers:

      "What?"

      "Everything."
    `,

    ending: true,

    endingTitle: "THE EYE",

    endingText: `
      Maya sees the world differently now.

      The walls.

      The symbols.

      The hidden doors.

      The watchers.

      They were always there.

      She simply could not see them.
    `
  },


  turnAround: {
    chapter: "CHAPTER III",
    location: "THE TUNNEL",
    title: "THE PRESENCE",

    text: `
      Maya turns around.

      Nothing is there.

      She exhales.

      Then something whispers directly beside her ear:

      "Do not turn around again."
    `,

    ending: true,

    endingTitle: "THE PRESENCE",

    endingText: `
      Maya closes her eyes.

      Behind her,
      something smiles.
    `
  },


  openDoor: {
    chapter: "CHAPTER III",
    location: "THE STONE DOOR",
    title: "BEFORE THE BEGINNING",

    text: `
      Maya places her hand against the eye.

      The door opens.

      Beyond it is not another chamber.

      It is a sky filled with stars.

      A voice speaks:

      "Before the beginning,
      there was a witness."
    `,

    ending: true,

    endingTitle: "BEFORE THE BEGINNING",

    endingText: `
      Maya steps through.

      The door closes behind her.

      The world will never be the same.
    `
  },


  searchExit: {
    chapter: "CHAPTER III",
    location: "THE CHAMBER",
    title: "NO MAN'S LAND",

    text: `
      Maya searches the walls.

      She finds an old passage.

      It leads upward.

      She climbs.

      At the top she emerges into daylight.

      But the landscape is wrong.

      The excavation site is gone.

      She is standing in a desert.

      And something enormous is moving beneath the sand.
    `,

    ending: true,

    endingTitle: "NO MAN'S LAND",

    endingText: `
      Maya watches the sand move.

      Somewhere beneath her feet,
      an ancient world is waking.
    `
  },


  endingEscape: {
    chapter: "EPILOGUE",
    location: "THE SURFACE",
    title: "THE ESCAPE",

    text: `
      Maya reaches the surface.

      The excavation is quiet.

      She looks back.

      The entrance has disappeared.
    `,

    ending: true,

    endingTitle: "THE ESCAPE",

    endingText: `
      Maya survived.

      But she knows the truth.

      Some doors are not meant to be opened.

      And some doors,
      once opened,
      never close.
    `
  },


  endingDarkness: {
    chapter: "EPILOGUE",
    location: "THE CHAMBER",
    title: "THE DARKNESS",

    text: `
      Maya stays.

      The chamber grows darker.

      Something moves beneath the stone.

      She raises her lantern.

      Two eyes open in the darkness.

      Then a third.

      Then hundreds.
    `,

    ending: true,

    endingTitle: "THE WATCHERS",

    endingText: `
      Maya finally understands.

      The Watchers were never guarding the chamber.

      They were waiting inside it.
    `
  },


  endingPhotograph: {
    chapter: "EPILOGUE",
    location: "THE CHAMBER",
    title: "THE FACE",

    text: `
      Maya zooms in on the photograph.

      The face becomes clearer.

      It looks exactly like her.

      But older.

      Much older.

      The photograph suddenly changes.
    `,

    ending: true,

    endingTitle: "THE OTHER MAYA",

    endingText: `
      Maya drops the camera.

      On the screen,
      the older version of herself opens her eyes.
    `
  }

};


/* =========================================================
   SCREEN MANAGEMENT
   ========================================================= */

function showScreen(id) {

  document
    .querySelectorAll(".game-screen")
    .forEach(function(screen) {
      screen.classList.remove("active");
    });

  const target =
    document.getElementById(id);

  if (!target) {
    console.error("Screen not found:", id);
    return;
  }

  target.classList.add("active");

  window.scrollTo(0, 0);
}


/* =========================================================
   TITLE / MENU
   ========================================================= */

function showTitleScreen() {
  showScreen("title-screen");
}


function showInstructions() {
  showScreen("instructions-screen");
}


function startNewGame() {

  gameState = {
    scene: "awakening",
    inventory: [],
    choices: [],
    flags: {},
    knowledge: 0,
    awakening: 0,
    trust: 0
  };

  saveGame(false);

  showScreen("game-screen");

  renderScene();
}


function returnToTitle() {

  updateContinueButton();

  showScreen("title-screen");
}


/* =========================================================
   SCENE RENDERING
   ========================================================= */

function renderScene() {

  const scene =
    scenes[gameState.scene];

  if (!scene) {

    console.error(
      "Scene not found:",
      gameState.scene
    );

    gameState.scene = "awakening";

    renderScene();

    return;
  }


  const chapterLabel =
    document.getElementById("chapter-label");

  const location =
    document.getElementById("location");

  const sceneTitle =
    document.getElementById("scene-title");

  const storyText =
    document.getElementById("story-text");

  const choicesContainer =
    document.getElementById("choices");


  if (chapterLabel) {
    chapterLabel.textContent =
      scene.chapter || "";
  }


  if (location) {
    location.textContent =
      scene.location || "";
  }


  if (sceneTitle) {
    sceneTitle.textContent =
      scene.title || "";
  }


  if (storyText) {
    storyText.innerHTML =
      formatStory(scene.text || "");
  }


  if (choicesContainer) {
    choicesContainer.innerHTML = "";
  }


  if (scene.item) {
    addItem(scene.item);
  }


  if (scene.ending) {

    showEnding(scene);

    return;
  }


  if (!Array.isArray(scene.choices)) {

    console.error(
      "No choices found for:",
      gameState.scene
    );

    return;
  }


  scene.choices.forEach(function(choice) {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "choice-button";

    button.textContent =
      choice.text;

    button.addEventListener(
      "click",
      function() {
        makeChoice(choice);
      }
    );

    choicesContainer.appendChild(button);

  });
}


/* =========================================================
   STORY FORMATTING
   ========================================================= */

function formatStory(text) {

  return String(text)
    .trim()
    .split(/\n\s*\n/)
    .map(function(paragraph) {
      return "<p>" +
        paragraph.trim() +
        "</p>";
    })
    .join("");
}


/* =========================================================
   CHOICE / PROGRESSION SYSTEM
   ========================================================= */

function makeChoice(choice) {

  if (!choice) {
    return;
  }


  if (choice.flag) {

    gameState.flags[choice.flag] = true;

  }


  gameState.choices.push(
    choice.text
  );


  if (typeof choice.knowledge === "number") {

    gameState.knowledge +=
      choice.knowledge;

  }


  if (typeof choice.awakening === "number") {

    gameState.awakening +=
      choice.awakening;

  }


  if (typeof choice.trust === "number") {

    gameState.trust +=
      choice.trust;

  }


  if (!choice.next) {

    console.error(
      "Choice has no next scene:",
      choice
    );

    return;
  }


  if (!scenes[choice.next]) {

    console.error(
      "Next scene does not exist:",
      choice.next
    );

    return;
  }


  gameState.scene =
    choice.next;


  saveGame(false);

  renderScene();
}


/* =========================================================
   INVENTORY
   ========================================================= */

function addItem(item) {

  if (!item) {
    return;
  }


  if (!Array.isArray(gameState.inventory)) {
    gameState.inventory = [];
  }


  if (
    !gameState.inventory.includes(item)
  ) {

    gameState.inventory.push(item);

    saveGame(false);

  }
}


function showInventory() {

  const list =
    document.getElementById(
      "inventory-list"
    );

  if (!list) {
    return;
  }


  if (
    !gameState.inventory ||
    gameState.inventory.length === 0
  ) {

    list.innerHTML =
      "<p>Nothing discovered yet.</p>";

  } else {

    list.innerHTML =
      gameState.inventory
        .map(function(item) {
          return "<p>👁️ " +
            item +
            "</p>";
        })
        .join("");

  }


  showScreen("inventory-screen");
}


function closeInventory() {

  showScreen("game-screen");
}


/* =========================================================
   ENDINGS
   ========================================================= */

function showEnding(scene) {

  const endingTitle =
    document.getElementById(
      "ending-title"
    );

  const endingText =
    document.getElementById(
      "ending-text"
    );


  const knowledge =
    gameState.knowledge || 0;

  const awakening =
    gameState.awakening || 0;

  const trust =
    gameState.trust || 0;


  let finalTitle =
    scene.endingTitle ||
    scene.title ||
    "THE AWAKENING";


  let finalText =
    scene.endingText ||
    scene.text ||
    "";


  /*
   * TRUE WITNESS
   */

  if (
    knowledge >= 4 &&
    awakening >= 3
  ) {

    finalTitle =
      "THE WITNESS";

    finalText = `
      Maya opens her eyes.

      The chamber is gone.

      The symbols are no longer mysterious.

      She understands what they were showing her.

      The Watchers.

      The Keeper.

      The ancient language.

      They were all connected.

      She was never searching for the past.

      The past was searching for her.

      Somewhere beyond the darkness,
      something opens its eyes.

      Maya finally understands.

      She is the Witness.
    `;
  }


  /*
   * AWAKENING
   */

  else if (
    awakening >= 3
  ) {

    finalTitle =
      "THE AWAKENING";

    finalText = `
      Light fills the chamber.

      Maya sees images of ancient cities,
      forgotten languages,
      and watchers hidden beyond time.

      Something inside her has awakened.

      She does not understand everything yet.

      But she knows one thing.

      The journey has only begun.
    `;
  }


  /*
   * SEEKER
   */

  else if (
    knowledge >= 3
  ) {

    finalTitle =
      "THE SEEKER";

    finalText = `
      Maya escapes the chamber.

      She carries the knowledge
      of what she discovered.

      The symbols.

      The inscription.

      The Keeper.

      There are still questions.

      But now she knows where to look.

      The truth was never lost.

      It was hidden.
    `;
  }


  /*
   * KEEPER'S CHOICE
   */

  else if (
    trust >= 2
  ) {

    finalTitle =
      "THE KEEPER'S CHOICE";

    finalText = `
      Maya feels the presence
      watching from the darkness.

      But it does not attack.

      Instead, the voice speaks again.

      "You chose to listen."

      Maya realizes the Keeper
      has been waiting.

      The path ahead remains hidden.

      But the door is open.
    `;
  }


  if (endingTitle) {

    endingTitle.textContent =
      finalTitle;

  }


  if (endingText) {

    endingText.innerHTML =
      formatStory(finalText);

  }


  showScreen("ending-screen");
}


/* =========================================================
   SAVE SYSTEM
   ========================================================= */

function saveGame(showMessage = true) {

  try {

    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify(gameState)
    );

    updateContinueButton();


    if (showMessage) {

      alert("Game saved.");

    }

  } catch (error) {

    console.error(
      "Unable to save game:",
      error
    );

  }
}


/* =========================================================
   LOAD SYSTEM
   ========================================================= */

function loadGame() {

  try {

    const saved =
      localStorage.getItem(
        SAVE_KEY
      );

    if (!saved) {
      return false;
    }


    const loaded =
      JSON.parse(saved);


    gameState = {

      scene:
        loaded.scene ||
        "awakening",

      inventory:
        Array.isArray(
          loaded.inventory
        )
          ? loaded.inventory
          : [],

      choices:
        Array.isArray(
          loaded.choices
        )
          ? loaded.choices
          : [],

      flags:
        loaded.flags &&
        typeof loaded.flags === "object"
          ? loaded.flags
          : {},

      knowledge:
        Number(loaded.knowledge) || 0,

      awakening:
        Number(loaded.awakening) || 0,

      trust:
        Number(loaded.trust) || 0

    };


    if (!scenes[gameState.scene]) {

      gameState.scene =
        "awakening";

    }


    return true;

  } catch (error) {

    console.error(
      "Unable to load game:",
      error
    );

    return false;
  }
}


/* =========================================================
   CONTINUE
   ========================================================= */

function continueGame() {

  if (!loadGame()) {

    startNewGame();

    return;
  }


  showScreen("game-screen");

  renderScene();
}


/* =========================================================
   CONTINUE BUTTON
   ========================================================= */

function updateContinueButton() {

  const button =
    document.getElementById(
      "continue-button"
    );

  if (!button) {
    return;
  }


  let saved = null;

  try {

    saved =
      localStorage.getItem(
        SAVE_KEY
      );

  } catch (error) {

    console.error(
      "Unable to check save:",
      error
    );

  }


  button.disabled =
    !saved;
}


/* =========================================================
   RETURN TO BOOK
   ========================================================= */

function returnToBook() {

  window.location.href =
    "book.html";
}

/* =========================================================
   ENDING BUTTONS
   ========================================================= */

function setupEndingButtons() {

  const playAgainButton =
    document.getElementById("play-again-button");

  const returnBookButton =
    document.getElementById("return-book-button");


  if (playAgainButton) {

    playAgainButton.addEventListener(
      "click",
      function() {

        startNewGame();

      }
    );

  }


  if (returnBookButton) {

    returnBookButton.addEventListener(
      "click",
      function() {

        returnToBook();

      }
    );

  }

}

/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateContinueButton();

    setupEndingButtons();

    showScreen("title-screen");

  }
);
