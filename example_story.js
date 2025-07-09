let story = {
  start: {
    text: "you are in a room with a window and a chest",
    options: [
      { text: "open the chest", next: "chest"},
      { text: "look out the window", next: "window"}
    ]
  },
  chest: {
    textIfNotHas: {
      item: "_bread",
      text: "there is a piece of bread and a note in the box",
    },
    textIfHas: {
      item: "_bread",
      text: "there is a note in the box"
    },
    options: [
      { text: "eat bread", next: "bread", notHas: "_bread"},
      { text: "read the note", next: "note"}
    ]
  },
  window: {
    text: "There's a monster outside the window. You're dying",
    options: [
      { text: "reset", next: "start", clearInventory: true}
    ]
  },
  bread: {
    text: "the bread was delicious",
    options: [
      { text: "close chest", next: "start", add: "_bread"},
      { text: "read the note", next: "note", add: "_bread"}
    ]
  },
  note: {
    text: 'in the note he writes:<br>"sample text"',
    options: [
      { text: "close chest", next: "start" },
      { text: "eat bread", next: "bread", notHas: "_bread"}
    ]
  }
};