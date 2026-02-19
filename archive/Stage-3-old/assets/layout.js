// ------------------------------------------
//  SAFE INITIALISATION HELPERS
// ------------------------------------------
function $(id) {
  return document.getElementById(id);
}


// ------------------------------------------
//  DOM READY WRAPPER
// ------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // NAV RAIL COLLAPSE TOGGLE (LEFT)
  // ================================
  const navRail = $("navRail");
  const navRailToggle = $("navRailToggle");

  if (navRail && navRailToggle) {
    navRailToggle.addEventListener("click", () => {
      navRail.classList.toggle("collapsed");
      document.body.classList.toggle("nav-rail-collapsed");
    });
  }


  // ================================
  // SAFE SIDEBAR COLLAPSE LOGIC
  // (Does not error if sidebar removed)
  // ================================
  const sidebar = $("sidebar");
  const collapseBtn = $("collapseBtn");
  const collapseIcon = $("collapseIcon");

  if (sidebar && collapseBtn && collapseIcon) {
    collapseBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");

      collapseIcon.textContent =
        sidebar.classList.contains("collapsed")
          ? "chevron_right"
          : "chevron_left";
    });
  }


  // ================================
  // AI PANEL – OPEN / CLOSE
  // ================================
  const aiPanel = $("aiPanel");
  const aiToggleBtn = $("aiToggleBtn");
  const aiCloseBtn = $("aiCloseBtn");

  if (aiToggleBtn && aiPanel) {
    aiToggleBtn.addEventListener("click", () => {
      aiPanel.classList.add("open");
    });
  }

  if (aiCloseBtn && aiPanel) {
    aiCloseBtn.addEventListener("click", () => {
      aiPanel.classList.remove("open");
    });
  }


  // ================================
  // CONTEXT MENU (IF USED)
  // ================================
  const contextMenu = $("contextMenu");

  if (contextMenu) {
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("tree-kebab")) {
        contextMenu.style.display = "none";
      }
    });

    document.addEventListener("contextmenu", (e) => {
      if (e.target.classList.contains("tree-kebab")) {
        e.preventDefault();
        contextMenu.style.display = "block";
        contextMenu.style.left = e.pageX + "px";
        contextMenu.style.top = e.pageY + "px";
      }
    });
  }

});
document.addEventListener("click", (e) => {
  const wrapper = e.target.closest(".usage-filter");

  // Close dropdown if clicking outside
  document.querySelectorAll(".usage-dropdown.open")
    .forEach(d => d.classList.remove("open"));

  if (wrapper) {
    const dropdown = wrapper.querySelector(".usage-dropdown");
    dropdown.classList.toggle("open");
  }
});

(function () {
  const btn = document.getElementById("pageKebabBtn");
  const menu = document.getElementById("pageKebabMenu");
  if (!btn || !menu) return;

  function closeMenu() {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

(function () {
  const btn = document.querySelector(".chart-kebab-btn");
  const menu = document.querySelector(".chart-kebab-menu");
  if (!btn || !menu) return;

  function closeMenu() {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

// VALUE FILTER PANEL TOGGLE (add to your existing JS file, or in a <script> tag)
(() => {
  const btn = document.querySelector(".filters-btn");
  const panel = document.getElementById("valueFilterPanel");
  const overlay = document.getElementById("valueFilterOverlay");
  const closeBtn = document.getElementById("valueFilterClose");
  const clearBtn = document.getElementById("valueFilterClear");

  if (!btn || !panel || !overlay) return;

  const applyBtn = document.getElementById("valueFilterApply");

applyBtn?.addEventListener("click", () => {
  window.location.href = "index-true-savings-filtered.html";
});


  const focusableSelector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  let lastFocused = null;

  function openPanel() {
    lastFocused = document.activeElement;

    overlay.hidden = false;
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");

    // Focus first focusable control inside panel
    const first = panel.querySelector(focusableSelector);
    if (first) first.focus();
  }

  function closePanel() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    overlay.hidden = true;

    if (lastFocused) lastFocused.focus();
  }

  // Wire up
  btn.addEventListener("click", () => {
    const isOpen = panel.classList.contains("is-open");
    isOpen ? closePanel() : openPanel();
  });

  overlay.addEventListener("click", closePanel);
  closeBtn?.addEventListener("click", closePanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("is-open")) {
      closePanel();
    }
  });

  // Clear just unchecks the options (UI only)
  clearBtn?.addEventListener("click", () => {
    panel.querySelectorAll('input[type="checkbox"]').forEach(cb => (cb.checked = false));
  });
})();
