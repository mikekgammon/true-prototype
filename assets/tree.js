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

    row.addEventListener("click", (e) => {
        if (e.target.classList.contains("tree-kebab")) return;
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

// All Sites is now the ROOT LEVEL
const rootAllSites = createNode({
    id: "all_sites",
    label: "All Sites",
    isExpanded: true,
    children: [
        createNode({ id: "site1", label: "Barnston Beach Site", selected: true }),
        createNode({ id: "site2", label: "Site 2" }),
        createNode({ id: "site3", label: "Site 3" })
    ]
});

// Favourites
const rootFavourites = createNode({
    id: "favourites",
    label: "Favourites",
    isExpanded: false,
    children: []
});

// Last Viewed
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
// INITIAL RENDER
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    renderTree();
});
