// Show plugin UI
figma.showUI(__html__, {width: 250, height: 600});

// Get current pages
const pages = figma.root.children;

let template_pages = [
  {name: "Table Of Contents", exists: false, id: "table-of-contents"},
  {name: "——— Implementation ———", exists: false, id: "implementation"},
  {name: String.fromCodePoint(0x1F50D) + " Implementation review", exists: false, id: "implementation-review"},
  {name: String.fromCodePoint(0x2B50) + " Latest Design", exists: false, id: "latest-design"},
  {name: String.fromCodePoint(0x1F4D0) + " Specification", exists: false, id: "specification"},
  {name: "——— Design ———", exists: false, id: "design"},
  {name: String.fromCodePoint(0x1F4F2) + " Screen Flow", exists: false, id: "screen-flow"},
  {name: String.fromCodePoint(0x1F4F1) + " Prototype", exists: false, id: "prototype"},
  {name: String.fromCodePoint(0x270F) + " Wireframes", exists: false, id: "wireframes"},
  {name: String.fromCodePoint(0x1F4A1) + " Ideation", exists: false, id: "ideation"},
  {name: String.fromCodePoint(0x1F4C8) + " Analysis", exists: false, id: "analysis"},
  {name: String.fromCodePoint(0x1F5C4) + " Archive", exists: false, id: "archive"}
];

for (const page of template_pages) {
  if (pageExists(page.name)) {
    page.exists = true;
  }
}

// Send data to plugin UI
figma.ui.postMessage({"template_pages": template_pages});

function createTemplatePagesThatDoesntExist(template_pages) {
  for (const template_page of template_pages) {
    if (!figma.root.findOne(n => n.name === template_page.name)) {
      figma.createPage().name = template_page.name;
      updateList(template_page.name);
    }
    template_page.exists = true;
  }
  return;
}

function pageExists(page) {
  if (figma.root.findOne(n => n.name === page)) {
    return true;
  } else {
    return false;
  }
}

function updateList(page_name) {
  for (const page of template_pages) {
    if (page.name === page_name) {
      page.exists = true;
    }
  }
  figma.ui.postMessage({"template_pages_update": template_pages});
}

function createTemplatePageThatDoesntExist(page_name) {
  if (!figma.root.findOne(n => n.name === page_name)) {
    figma.createPage().name = page_name;
    updateList(page_name);
  } else {
    figma.notify("Page already exists");
  }
}

// Recieve event from UI
figma.ui.onmessage = (event) => {
  if (event.type === "createAllTemplatePages") {
    createTemplatePagesThatDoesntExist(template_pages);
  }

  if (event.type === "createTemplatePage") {
    createTemplatePageThatDoesntExist(event.pageName);
  }
}



// To Do
// Order of the pages
// [*] Add All Pages
// [*] Add Single Page
// [] Empty state
// [ ] Error handling
// [ ] List with status
// [*] Update list on add
// [ ] Update list on remove
// [*] Update list on add all