new StoryEngine({
  story: story,
  first: "start",
  tagsAllowed: true,
  wordBeforeInventory: "inventory: ",
  emptyInventoryWord: "empty", 
  elements: {
    text: document.getElementById("text"),
    options: document.getElementById("options"),
    inventory: document.getElementById("inventory")
  }
});


