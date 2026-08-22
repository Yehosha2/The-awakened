// app.js
// THE AWAKENED — Book One
// Reader Navigation

let currentPage = 0;

// Get all book pages
const pages = document.querySelectorAll(".page");
// Total pages
const totalPages = pages.length;

// Navigation elements
const nextButton = document.getElementById("nextBtn");
const previousButton = document.getElementById("prevBtn");
const pageCounter = document.getElementById("pageCounter");
const progressBar = document.getElementById("progressBar");

// Show selected page
function showPage(pageNumber) {
  if (totalPages === 0) return;

  // Keep page number inside valid range
  if (pageNumber < 0) {
    pageNumber = 0;
  }

  if (pageNumber >= totalPages) {
    pageNumber = totalPages - 1;
  }

  currentPage = pageNumber;

  // Hide every page
  pages.forEach((page, index) => {
    page.classList.remove("active");

    if (index === currentPage) {
      page.classList.add("active");
    }
  });

  // Update page counter
  if (pageCounter) {
    pageCounter.textContent =
      `Page ${currentPage + 1} of ${totalPages}`;
  }

  // Update progress bar
  if (progressBar) {
    const progress =
      ((currentPage + 1) / totalPages) * 100;

    progressBar.style.width = `${progress}%`;
  }

  // Disable Previous on first page
  if (previousButton) {
    previousButton.disabled = currentPage === 0;
  }

  // Disable Next on final page
  if (nextButton) {
    nextButton.disabled = currentPage === totalPages - 1;
  }

  // Return to top of reader
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Next page
function nextPage() {
  if (currentPage < totalPages - 1) {
    showPage(currentPage + 1);
  }
}

// Previous page
function previousPage() {
  if (currentPage > 0) {
    showPage(currentPage - 1);
  }
}

// Button interactions
if (nextButton) {
  nextButton.addEventListener("click", nextPage);
}

if (previousButton) {
  previousButton.addEventListener("click", previousPage);
}

// Keyboard navigation
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    nextPage();
  }

  if (event.key === "ArrowLeft") {
    previousPage();
  }
});

// Top navigation buttons
document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", function () {
    const pageNumber = parseInt(
      this.getAttribute("data-page"),
      10
    );

    if (!isNaN(pageNumber)) {
      showPage(pageNumber);
    }
  });
});
