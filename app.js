function showSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


function activateNext() {

  const message = document.getElementById("next-message");

  if (!message) {
    return;
  }

  const messages = [
    "🤣 You pressed NEXT.",
    "👁️ The story is listening.",
    "🖤 Light Work detected.",
    "🔥 Something just awakened.",
    "🌎 Keep going.",
    "🙌🏿 Love wins.",
    "👁️ The next chapter is waiting."
  ];

  const randomMessage =
    messages[Math.floor(Math.random() * messages.length)];

  message.textContent = randomMessage;
}
