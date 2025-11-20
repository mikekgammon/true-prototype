// ----------------------------------
// COLLAPSIBLE LEFT SIDEBAR (TREE)
// ----------------------------------
const sidebar = document.getElementById("sidebar");
const collapseBtn = document.getElementById("collapseBtn");
const collapseIcon = document.getElementById("collapseIcon");

collapseBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  const collapsed = sidebar.classList.contains("collapsed");
  collapseIcon.textContent = collapsed ? "chevron_right" : "chevron_left";
});

// ----------------------------------
// GOOGLE NAV RAIL — FINAL VERSION
// ----------------------------------
const navRail = document.getElementById("navRail");
const navRailToggle = document.getElementById("navRailToggle");

// 1. Update `<body>` classes so page margin matches rail width
function updateNavRailState() {
  if (navRail.classList.contains("expanded")) {
    document.body.classList.add("nav-rail-expanded");
    document.body.classList.remove("nav-rail-collapsed");
  } else {
    document.body.classList.add("nav-rail-collapsed");
    document.body.classList.remove("nav-rail-expanded");
  }
}

// 2. Toggle rail open/closed when clicking hamburger
navRailToggle.addEventListener("click", () => {
  const isExpanded = navRail.classList.contains("expanded");

  if (isExpanded) {
    // collapse
    navRail.classList.remove("expanded");
    navRail.classList.add("collapsed");
  } else {
    // expand
    navRail.classList.add("expanded");
    navRail.classList.remove("collapsed");
  }

  updateNavRailState();
});

// 3. Ensure rail ALWAYS starts collapsed on load
document.addEventListener("DOMContentLoaded", () => {
  navRail.classList.add("collapsed");
  navRail.classList.remove("expanded");
  updateNavRailState();
});

// ----------------------------------
// TOP MENU TABS (optional)
// ----------------------------------
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const collapseBtn = document.getElementById("collapseBtn");
  const collapseIcon = document.getElementById("collapseIcon");

  collapseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");

    collapseIcon.textContent = sidebar.classList.contains("collapsed")
      ? "chevron_right"
      : "chevron_left";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const collapseBtn = document.getElementById("collapseBtn");
  const collapseIcon = document.getElementById("collapseIcon");

  collapseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");

    collapseIcon.textContent = sidebar.classList.contains("collapsed")
      ? "chevron_right"
      : "chevron_left";
  });
});
