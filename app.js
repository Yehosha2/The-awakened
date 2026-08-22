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


function activateNext() {

  const message = document.getElementById("next-message");

  if (!message) return;

  message.textContent =
    "You pressed NEXT. The journey continues... 👁️";

}