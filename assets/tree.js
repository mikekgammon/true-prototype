// ---------------------------
// TREE DATA + CORE FUNCTIONS
// ---------------------------

// Create a node
function createNode({ id, label, type = "section", isExpanded = false, selected = false, children = [] }) {
    return { id, label, type, isExpanded, selected, children };
}

// Depth-based icon logic
function getIconForNode(node, depth = 0) {
    // Only TOP LEVEL (depth 0) shows a folder icon
    if (depth === 0 && node.type === "section") {
        return "<span class='material-symbols-outlined'>folder</span>";
    }
    return "";
}

// Render a node
function renderNode(node, depth = 0) {

    const row = document.createElement("div");
    row.className = "tree-row";
    row.dataset.id = node.id;

    if (node.selected) row.classList.add("selected");

    const left = document.createElement("div");
    left.className = "tree-row-left";

    const iconWrapper = document.createElement("div");
    iconWrapper.className = "tree-row-icon";
    iconWrapper.innerHTML = getIconForNode(node, depth);

    const label = document.createElement("div");
    label.className = "tree-row-label";
    label.textContent = node.label;

    left.appendChild(iconWrapper);
    left.appendChild(label);

    const right = document.createElement("div");
    right.className = "tree-row-right";

    const kebab = document.createElement("span");
    kebab.className = "material-symbols-outlined tree-kebab";
    kebab.textContent = "more_vert";
    right.appendChild(kebab);

    row.appendChild(left);
    row.appendChild(right);

    // ------------------------------------
    // CLICK HANDLER (links + expand toggle)
    // ------------------------------------
    row.addEventListener("click", (e) => {

        // Ignore clicks on the kebab menu
        if (e.target.classList.contains("tree-kebab")) return;

        // 👉 LINKS FOR SPECIFIC SITES
        if (node.id === "site1") {
            window.location.href = "site-overview.html";
            return;
        }

        if (node.id === "site2") {
            window.location.href = "site_2_overview.html";
            return;
        }

        if (node.id === "site3") {
            window.location.href = "site_3_overview.html";
            return;
        }

        // Default behaviour: expand/collapse
        node.isExpanded = !node.isExpanded;
        renderTree();
    });

    const container = document.createElement("div");

    if (node.children && node.children.length > 0 && node.isExpanded) {

        const childContainer = document.createElement("div");
        childContainer.className = "tree-children";

        node.children.forEach((child) => {
            childContainer.appendChild(renderNode(child, depth + 1));
        });

        container.appendChild(row);
        container.appendChild(childContainer);

    } else {
        container.appendChild(row);
    }

    return container;
}

// Render entire tree
function renderTree() {
    const container = document.getElementById("treeContainer");
    container.innerHTML = "";
    sections.forEach((section) => {
        container.appendChild(renderNode(section, 0));
    });
}

// -----------------------------
// FINAL STRUCTURE (NO PORTFOLIO)
// -----------------------------

const rootAllSites = createNode({
    id: "all_sites",
    label: "All Sites",
    isExpanded: false,  // default closed
    children: [
        createNode({ id: "site1", label: "Barnston Beach Site" }),
        createNode({ id: "site2", label: "Site 2" }),
        createNode({ id: "site3", label: "Site 3" })
    ]
});

const rootFavourites = createNode({
    id: "favourites",
    label: "Favourites",
    isExpanded: false,
    children: []
});

const rootLastViewed = createNode({
    id: "last_viewed",
    label: "Last Viewed",
    isExpanded: false,
    children: []
});

// -----------------------------
// MASTER ROOT LIST
// -----------------------------
const sections = [
    rootAllSites,
    rootFavourites,
    rootLastViewed
];

// -----------------------------
// UNIFIED DOM CONTENT LOADED
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {

    const page = window.location.pathname.split("/").pop();

    // Reset all selections
    sections.forEach(section => {
        section.selected = false;
        section.children.forEach(child => child.selected = false);
    });

    // Page → menu item mapping
    if (page === "site-overview.html") {
        rootAllSites.children.find(n => n.id === "site1").selected = true;
        rootAllSites.isExpanded = true;
    }

    if (page === "site_2_overview.html") {
        rootAllSites.children.find(n => n.id === "site2").selected = true;
        rootAllSites.isExpanded = true;
    }

    if (page === "site_3_overview.html") {
        rootAllSites.children.find(n => n.id === "site3").selected = true;
        rootAllSites.isExpanded = true;
    }

    // Render once with correct state
    renderTree();
});
