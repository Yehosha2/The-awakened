const button = document.getElementById("reveal");
const message = document.getElementById("message");

button.addEventListener("click", function () {
  message.textContent = "The first door is already open.";
  button.textContent = "THE JOURNEY HAS BEGUN";
});
