/* =========================================================
   THE AWAKENED — THE GAME
   ========================================================= */

const SAVE_KEY = "theAwakenedGameSave";

let gameState = {
  scene: "awakening",
  inventory: [],
  choices: [],
  flags: {}
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
}

      {
        text: "Step away from the tablet.",
        next: "stepAway",
        flag: "rejectedTablet"
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
        flag: "askedVoice"
      },

      {
        text: "Search the chamber.",
        next: "searchChamber",
        flag: "searchedChamber"
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
        flag: "followedWatcher"
      },

      {
        text: "Run toward the entrance.",
        next: "runEntrance",
        flag: "ranEntrance"
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
        flag: "acceptedMark"
      },

      {
        text: "Refuse it.",
        next: "refuseMark",
        flag: "refusedMark"
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
        flag: "readInscription"
      },

      {
        text: "Photograph the inscription.",
        next: "photographInscription",
        flag: "photographedInscription"
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
        flag: "lookedEye"
      },

      {
        text: "Turn around.",
        next: "turnAround",
        flag: "turnedAround"
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
        flag: "openedDoor"
      },

      {
        text: "Search for another way out.",
        next: "searchExit",
        flag: "searchedExit"
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
        next: "endingEscape"
      },

      {
        text: "Stay and discover what awakened.",
        next: "endingDarkness"
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
        next: "turnAround"
      },

      {
        text: "Look closer at the photograph.",
        next: "endingPhotograph"
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

  const screens = document.querySelectorAll(".game-screen");

  screens.forEach(function(screen) {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (!target) {
    console.error("Screen not found:", id);
    return;
  }

  target.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   TITLE SCREEN
   ========================================================= */


function showTitleScreen() {

  showScreen("title-screen");

}

function showInstructions() {

  showScreen("instructions-screen");

}

function returnToTitle() {

  showTitleScreen();

}

/* =========================================================
   TITLE SCREEN
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
    flags: {}
  };

  saveGame(false);

  showScreen("game-screen");

  renderScene();

}

/* =========================================================
   SCENE RENDERING
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


  document.getElementById("chapter-label")
    .textContent = scene.chapter || "";


  document.getElementById("location")
    .textContent = scene.location || "";


  document.getElementById("scene-title")
    .textContent = scene.title || "";


  document.getElementById("story-text")
    .innerHTML = formatStory(scene.text);


  const choicesContainer =
    document.getElementById("choices");

  choicesContainer.innerHTML = "";


  if (scene.ending) {

    showEnding(scene);

    return;

  }


  scene.choices.forEach(choice => {

    const button =
      document.createElement("button");

    button.className = "choice-button";

    button.textContent = choice.text;

    button.onclick = () => {
      makeChoice(choice);
    };

    choicesContainer.appendChild(button);

  });


  if (scene.item) {
    addItem(scene.item);
  }

}


/* =========================================================
   STORY FORMATTING
   ========================================================= */

function formatStory(text) {

  return text
    .trim()
    .split(/\n\s*\n/)
    .map(paragraph => `<p>${paragraph.trim()}</p>`)
    .join("");

}


/* =========================================================
   CHOICES
   ========================================================= */

function makeChoice(choice) {

  if (choice.flag) {
    gameState.flags[choice.flag] = true;
  }

gameState.choices.push(choice.text);

/* =========================
   PLAYER PROGRESSION
   ========================= */

if (choice.knowledge) {
  gameState.knowledge += choice.knowledge;
}

if (choice.awakening) {
  gameState.awakening += choice.awakening;
}

if (choice.trust) {
  gameState.trust += choice.trust;
}

/* =========================
   NEXT SCENE
   ========================= */

gameState.scene = choice.next;

saveGame(false);

renderScene();
   
/* =========================================================
   INVENTORY
   ========================================================= */

function addItem(item) {

  if (!gameState.inventory.includes(item)) {

    gameState.inventory.push(item);

    saveGame(false);

  }

}


function showInventory() {

  const list =
    document.getElementById("inventory-list");

  if (gameState.inventory.length === 0) {

    list.innerHTML =
      "<p>Nothing discovered yet.</p>";

  } else {

    list.innerHTML =
      gameState.inventory
        .map(item => `<p>👁️ ${item}</p>`)
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

  document.getElementById("ending-title")
    .textContent =
      scene.endingTitle || scene.title;


  document.getElementById("ending-text")
    .innerHTML =
      formatStory(scene.endingText || scene.text);


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

    if (showMessage) {

      alert("Game saved.");

    }

    updateContinueButton();

  } catch (error) {

    console.error(
      "Unable to save game:",
      error
    );

  }

}


function loadGame() {

  try {

    const saved =
      localStorage.getItem(SAVE_KEY);

    if (!saved) {
      return false;
    }

    gameState = JSON.parse(saved);

    return true;

  } catch (error) {

    console.error(
      "Unable to load game:",
      error
    );

    return false;

  }

}


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
    document.getElementById("continue-button");

  if (!button) return;

  const saved =
    localStorage.getItem(SAVE_KEY);

  button.disabled = !saved;

}


function returnToTitle() {

  updateContinueButton();

  showTitleScreen();

}


/* =========================================================
   RETURN TO BOOK
   ========================================================= */

function returnToBook() {

  window.location.href = "book.html";

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateContinueButton();

  }
);
