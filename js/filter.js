// Simple, dependency-free category filter for the archive page.
(function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const entries = document.querySelectorAll("#entry-list .entry");
  const emptyState = document.getElementById("empty-state");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      entries.forEach((entry) => {
        const matches = filter === "all" || entry.dataset.category === filter;
        entry.style.display = matches ? "" : "none";
        if (matches) visibleCount++;
      });

      emptyState.style.display = visibleCount === 0 ? "block" : "none";
    });
  });
})();
