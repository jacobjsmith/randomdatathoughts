// Simple, dependency-free category filter for the archive page.
// Also reads the URL hash (archive.html#finance) so the section nav can link straight to a topic.
(function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const entries = document.querySelectorAll("#entry-list .entry");
  const emptyState = document.getElementById("empty-state");

  function applyFilter(filter) {
    let visibleCount = 0;

    buttons.forEach((b) => {
      b.setAttribute("aria-pressed", b.dataset.filter === filter ? "true" : "false");
    });

    entries.forEach((entry) => {
      const matches = filter === "all" || entry.dataset.category === filter;
      entry.style.display = matches ? "" : "none";
      if (matches) visibleCount++;
    });

    emptyState.style.display = visibleCount === 0 ? "block" : "none";
  }

  function filterFromHash() {
    const hash = window.location.hash.slice(1);
    const known = Array.from(buttons).some((b) => b.dataset.filter === hash);
    applyFilter(known ? hash : "all");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      history.replaceState(null, "", filter === "all" ? window.location.pathname : "#" + filter);
      applyFilter(filter);
    });
  });

  window.addEventListener("hashchange", filterFromHash);
  filterFromHash();
})();
