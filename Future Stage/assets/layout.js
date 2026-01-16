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
