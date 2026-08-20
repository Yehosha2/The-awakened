const toc = document.createElement("section");

toc.className = "page";

toc.innerHTML = `
  <div class="chapter-number">
    THE AWAKENED
  </div>

  <h2>Table of Contents</h2>

  <div class="toc-line">
    <span>Chapter One</span>
    <span>The Tablet</span>
  </div>

  <div class="toc-line">
    <span>Chapter Two</span>
    <span>The Professor</span>
  </div>

  <div class="toc-line">
    <span>Chapter Three</span>
    <span>The Hidden Language</span>
  </div>

  <!-- remaining chapters -->

  <div class="toc-line">
    <span>Epilogue</span>
    <span>Love Wins</span>
  </div>
`;

reader.appendChild(toc);