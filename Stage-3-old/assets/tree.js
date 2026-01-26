// ---------------------------
// TREE DATA + CORE FUNCTIONS
// ---------------------------

// Create a node
function createNode({ id, label, type = "section", isExpanded = false, selected = false, children = [] }) {
    return { id, label, type, isExpanded, selected, children };
}

// Depth-based icon logic
function getIconForNode(node, depth = 0) {
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

    // CLICK HANDLER
    row.addEventListener("click", (e) => {

        if (e.target.classList.contains("tree-kebab")) return;

        // UPDATED SITE-LINK MAPPING
        const sitePageMap = {
            site_admiralty: "site-overview.html",        // ⭐ updated
            site_andover: "site-andover.html",
            site_angel: "site-angel.html",
            site_viaduct: "site-viaduct.html",
            site_whitehouse: "site-whitehouse.html"
        };

        if (sitePageMap[node.id]) {
            window.location.href = sitePageMap[node.id];
            return;
        }

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
// FINAL STRUCTURE: PUB SITES
// -----------------------------

const rootAllSites = createNode({
    id: "all_sites",
    label: "All Sites",
    isExpanded: true,
    children: [
        createNode({ id: "site_admiralty", label: "The Admiralty" }),
        createNode({ id: "site_andover", label: "The Andover Arms" }),
        createNode({ id: "site_angel", label: "The Angel & Crown" }),
        createNode({ id: "site_viaduct", label: "The Viaduct Tavern" }),
        createNode({ id: "site_whitehouse", label: "The White House" })
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

const sections = [
    rootAllSites,
    rootFavourites,
    rootLastViewed
];


// -----------------------------
// DOMContentLoaded → HIGHLIGHT
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {

    const page = window.location.pathname.split("/").pop();

    const pageToNode = {
        "site-overview.html": "site_admiralty",      // ⭐ updated
        "site-andover.html": "site_andover",
        "site-angel.html": "site_angel",
        "site-viaduct.html": "site_viaduct",
        "site-whitehouse.html": "site_whitehouse"
    };

    sections.forEach(section => {
        section.selected = false;
        if (section.children) section.children.forEach(child => child.selected = false);
    });

    if (pageToNode[page]) {
        const id = pageToNode[page];
        const match = rootAllSites.children.find(n => n.id === id);
        if (match) {
            match.selected = true;
            rootAllSites.isExpanded = true;
        }
    }

    renderTree();
});
