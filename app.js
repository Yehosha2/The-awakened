function showSection(sectionId) {

  const sections = document.querySelectorAll(".story-section");

  sections.forEach(section => {
    section.style.display = "none";
  });

  const selectedSection = document.getElementById(sectionId);

  if (selectedSection) {
    selectedSection.style.display = "block";

    selectedSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* =========================================
   THE LEGENDARY NEXT BUTTON
   ========================================= */

let nextPhraseIndex = 0;

const nextPhrases = [

  "You pressed NEXT. The journey continues... 👁️",

  "NEXT knows the way.",

  "You can't stop pressing NEXT, can you?",

  "The button remembers.",

  "Something changed...",

  "Keep going.",

  "There is always another NEXT.",

  "The journey continues.",

  "Light Work. Always. 👁️✊🏿✨"

];


function activateNext() {

  const message =
    document.getElementById("next-message");

  if (!message) {
    return;
  }

  message.textContent =
    nextPhrases[nextPhraseIndex];

  nextPhraseIndex =
    (nextPhraseIndex + 1) %
    nextPhrases.length;

}