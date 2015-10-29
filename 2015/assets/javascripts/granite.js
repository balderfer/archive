var granite = {
  data: {
    items: [
      {
        name: "Project 1",
        label: "Label for project 1",
      }, {
        name: "Project 2 hjkhkjh",
        label: "Label for project 2"
      }, {
        name: "Project 3",
        label: "Label for project 3"
      }, {
        name: "Project 4",
        label: "Label for project 4"
      }, {
        name: "Project 5",
        label: "Label for project 5"
      }, {
        name: "Project 6",
        label: "Label for project 6"
      }, {
        name: "Project 7",
        label: "Label for project 7"
      }, {
        name: "Project 8",
        label: "Label for project 8"
      }, {
        name: "Project 9",
        label: "Label for project 9"
      }, {
        name: "Project 4",
        label: "Label for project 4"
      }, {
        name: "Project 5",
        label: "Label for project 5"
      }, {
        name: "Project 6",
        label: "Label for project 6"
      }, {
        name: "Project 7",
        label: "Label for project 7"
      }, {
        name: "Project 8",
        label: "Label for project 8"
      }, {
        name: "Project 9",
        label: "Label for project 9"
      }, {
        name: "Project 4",
        label: "Label for project 4"
      }, {
        name: "Project 5",
        label: "Label for project 5"
      }, {
        name: "Project 6",
        label: "Label for project 6"
      }, {
        name: "Project 7",
        label: "Label for project 7"
      }, {
        name: "Project 8",
        label: "Label for project 8"
      }, {
        name: "Project 9",
        label: "Label for project 9"
      }
    ],
    tilePatterns: [
      ["tile-sm", "tile-sm tile-fill", "tile-sm tile-right"],
      ["tile-lg", "tile-sm tile-right", "tile-sm tile-right"],
      ["tile-lg tile-right", "tile-sm tile-right", "tile-sm tile-right"]
    ],
    currentPattern: 0,
    usedPatterns: [],
    tileIndex: 0,
    container: document.getElementById("granite-container")
  },

  updateCurrentPattern: function generateRandomSize() {
    this.data.currentPattern = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    while (this.data.usedPatterns.indexOf(this.data.currentPattern) > -1)
      this.data.currentPattern = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    this.data.usedPatterns.push(this.data.currentPattern);
    if (this.data.usedPatterns.length === 3) this.data.usedPatterns = [];
  },

  getTileSize: function getTileSize() {
    if (this.data.tileIndex % 3) {
      return this.data.tilePatterns[this.data.currentPattern][this.data.tileIndex % 3];
    } else {
      this.updateCurrentPattern();
      return this.data.tilePatterns[this.data.currentPattern][0];
    }
  },

  createTile: function createTile(item) {
    var tile = document.createElement("div");
    tile.className = "tile " + this.getTileSize() + " fadeInUp fast animated";
    tile.className += " color-" + (this.data.tileIndex % 4);
    var name = document.createElement("p");
    name.innerHTML = item.name;
    name.dataset.name = item.name;
    tile.appendChild(name);
    this.data.tileIndex++;
    return tile;
  },

  insertTileWithDelay: function insertTileWithDelay(tile, delay) {
    var container = document.getElementById("granite-tiles");
    window.setTimeout(function() {
      container.appendChild(tile);
    }, delay);
  },

  init: function init() {
    var i = 0;
    for (i in this.data.items) {
      var tile = this.createTile(this.data.items[i]);
      console.log(Math.log(i+1) * 300);
      this.insertTileWithDelay(tile, Math.log(i+1) * 90 + 90);
    }
    window.setTimeout(function() {
      document.getElementById("granite").className += " shadow";
    }, Math.log(i+2) * 90 + 90);
  }
}

$(document).ready(function() {
  granite.init();
});