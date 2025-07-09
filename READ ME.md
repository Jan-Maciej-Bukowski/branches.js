# Branches.js - Interactive Story Game Engine

Branches.js is a lightweight JavaScript engine for creating interactive story-based games (text adventures). This documentation will guide you through setting up your game, defining your story structure, managing state and inventory, and customizing behavior.

---

## 📁 Project Structure

Your game should include the following files:

```
index.html       # The HTML page structure
style.css        # Optional custom styles
engine.js        # The engine script (core logic)
story.js         # Your story scenes
main.js          # Game initialization
```

---

## 🔧 Required HTML Markup

Your HTML **must** include three divs:

```html
<div id="text"></div>
<div id="options"></div>
<div id="inventory"></div>
```

These will be used to render the scene text, choices, and the player's inventory.

You also need to include script tags for your JavaScript files:

```html
<script src="engine.js"></script>
<script src="story.js"></script>
<script src="main.js"></script>
```

### ✅ Example `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My RPG</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="text"></div>
  <div id="options"></div>
  <div id="inventory"></div>

  <script src="engine.js"></script>
  <script src="story.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

---

## 🎮 Defining a Story (`story.js`)

Your story is an object containing scenes. Each scene is an object with:

* `text` or `textIfHas` / `textIfNotHas`
* `options` – buttons the player can choose

### ✅ Example `story.js`

```js
let story = {
  start: {
    text: "You are in a room with a window and a chest.",
    options: [
      { text: "Open the chest", next: "chest" },
      { text: "Look out the window", next: "window" }
    ]
  },
  chest: {
    textIfNotHas: {
      item: "_bread",
      text: "There is a piece of bread and a note in the box."
    },
    textIfHas: {
      item: "_bread",
      text: "There is a note in the box."
    },
    options: [
      { text: "Eat bread", next: "bread", notHas: "_bread" },
      { text: "Read the note", next: "note" }
    ]
  },
  window: {
    text: "There's a monster outside the window. You're dying.",
    options: [
      { text: "Reset", next: "start", clearInventory: true }
    ]
  },
  bread: {
    text: "The bread was delicious.",
    options: [
      { text: "Close chest", next: "start", add: "_bread" },
      { text: "Read the note", next: "note", add: "_bread" }
    ]
  },
  note: {
    text: 'In the note it says:<br>"Sample text"',
    options: [
      { text: "Close chest", next: "start" },
      { text: "Eat bread", next: "bread", notHas: "_bread" }
    ]
  }
};
```

---

## 🧠 Engine Initialization (`main.js`)

### ✅ Example `main.js`

```js
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
```

---

## ⚙️ Scene Options & Conditions

### 🔹 Option Parameters:

* `text`: Button label
* `next`: ID of the next scene
* `add`: Add an item to inventory
* `remove`: Remove an item from inventory
* `has`: Only show if player has item
* `notHas`: Only show if player does *not* have item
* `hasAll`: Show if player has **all** listed items
* `notHasAny`: Show if player has **none** of listed items
* `clearInventory`: Clears inventory completely

### 🔹 Scene Text Conditions:

* `text`: Regular scene text
* `textIfHas`: Show only if the player has a certain item

```js
textIfHas: {
  item: "key",
  text: "You unlock the door."
}
```

* `textIfNotHas`: Show only if the player *does not* have an item

```js
textIfNotHas: {
  item: "key",
  text: "The door is locked."
}
```

---

## 🎒 Inventory System

* Inventory is an array inside the engine state: `engine.state.inventory`
* Add items using `add: "itemName"`
* Remove items using `remove: "itemName"`
* Hidden items: Start names with `_` (e.g., `_visitedCave`) – will not show in inventory

---

## 🎨 CSS Classes

The engine dynamically creates the following HTML and CSS classes:

| Element                 | CSS Class        | Description                         |
| ----------------------- | ---------------- | ----------------------------------- |
| Option button           | `option-button`  | Each `<button>` inside `#options`   |
| Inventory item (`<li>`) | `inventory-item` | Each item shown inside `#inventory` |

Use your CSS to style them:

```css
.option-button {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
}

.inventory-item {
  list-style: none;
  color: white;
}
```

---

## 🧩 Engine Methods & State

When you create the engine, the returned object has useful properties:

```js
let engine = new StoryEngine(...);
```

| Property/Method    | Description                                         |
| ------------------ | --------------------------------------------------- |
| `state`            | Object containing `inventory` and any custom values |
| `getCurrentNode()` | Returns the current scene node                      |
| `render()`         | Manually re-renders the scene                       |

Example:

```js
console.log(engine.getCurrentNode());
engine.state.trustLevel = 2;
```

---

## ✅ Final Notes

* Use `_` prefix for inventory flags (e.g., `_openedChest`) to avoid clutter
* Use `clearInventory: true` to reset progress
* Organize your game logic through small, modular scenes
* Add your own custom logic using the `state` object

**Have fun building your own interactive story!**
