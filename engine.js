class StoryEngine {
  constructor({ story, first, elements, state = {}, tagsAllowed, wordBeforeInventory, emptyInventoryWord }) {
    this.story = story;
    this.currentKey = first;
    this.textElement = elements.text;
    this.optionsContainer = elements.options;
    this.inventoryElement = elements.inventory;
    this.state = {
      inventory: [],
      ...state
    };
    this.tagsAllowed = tagsAllowed || false;
    this.wordBeforeInventory = (wordBeforeInventory !== "")?wordBeforeInventory : " ";
    this.emptyInventoryWord = (emptyInventoryWord !== "")?emptyInventoryWord : " ";
    this.render();
  }

  getCurrentNode() {
    return this.story[this.currentKey];
  }

  render() {
    const node = this.getCurrentNode();

    let text = node.text;
    if (typeof text === "function") {
      text = text(this.state);
    } else if (node.textIfHas && this.state.inventory.includes(node.textIfHas.item)) {
      text = node.textIfHas.text;
    } else if (node.textIfNotHas && !this.state.inventory.includes(node.textIfNotHas.item)) {
      text = node.textIfNotHas.text;
    }
    
    if (this.tagsAllowed) {
      this.textElement.innerHTML = text || "";
    } else {
      this.textElement.innerText = text || "";
    }
    
    this.optionsContainer.innerText = "";
    
    node.options
      .filter(option => this.isOptionVisible(option))
      .forEach(option => {
        const button = document.createElement("button");
        if (this.tagsAllowed) {
          button.innerHTML = option.text;
        } else {
          button.innerText = option.text;
        }
        button.className = "option-button";
        button.addEventListener("click", () => {
          this.applyEffects(option);

          if (typeof option.onChoose === "function") {
            option.onChoose(this.state);
          }

          this.currentKey = option.next;
          this.render();
        });
        this.optionsContainer.appendChild(button);
      });

    this.inventoryElement.innerHTML =
      (this.wordBeforeInventory || "inventory: ") +
      (this.state.inventory
      .filter(item => !item.startsWith("_"))
      .join(", ") || this.emptyInventoryWord || "empty");
  }

  isOptionVisible(option) {
  const inv = this.state.inventory;

  if (option.condition && !option.condition(this.state)) return false;

  if (option.has && !inv.includes(option.has)) return false;

  if (option.notHas && inv.includes(option.notHas)) return false;

  if (option.hasAll && !option.hasAll.every(item => inv.includes(item))) return false;

  if (option.notHasAny && option.notHasAny.some(item => inv.includes(item))) return false;

  return true;
}

  applyEffects(option) {
    if (option.set) {
      for (const [key, value] of Object.entries(option.set)) {
        this.state[key] = value;
      }
    }
    if (option.add && !this.state.inventory.includes(option.add)) {
      this.state.inventory.push(option.add);
    }
    if (option.remove) {
      this.state.inventory = this.state.inventory.filter(item => item !== option.remove);
    }
    if (option.clearInventory) {
      this.state.inventory = [];
    }
  }
}