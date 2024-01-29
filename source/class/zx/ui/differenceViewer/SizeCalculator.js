/**
 * @typedef {`C${number}R${number}`} CellPositionSerialized
 */
qx.Class.define("zx.ui.differenceViewer.SizeCalculator", {
  extend: qx.core.Object,

  construct() {
    super();
  },

  properties: {
    cellSizeHintCallback: {
      check: "Function",
      nullable: false
    }
  },

  events: {
    invalidate: "qx.event.type.Event"
  },

  members: {
    __left: null,
    __top: null,
    __width: null,
    __height: null,
    __columnCount: null,
    __rowCount: null,

    /** @type {number[]} */
    __rowHeights: null,

    /** @type {number[]} */
    __columnWidths: null,

    /** @type {number} */
    __columnWidth: null,

    invalidate() {
      this.__rowHeights = null;
      this.__columnWidths = null;
      this.fireEvent("invalidate");
    },

    _calculate() {
      if (this.__rowHeights && this.__columnWidths) return;
      const cellSizeHintCallback = this.getCellSizeHintCallback();
      this.__rowHeights = [];
      this.__columnWidths = [];
      for (let row = 0; row < this.__rowCount; row++) {
        for (let col = 0; col < this.__columnCount; col++) {
          const cellSize = cellSizeHintCallback(row, col);
          this.__rowHeights[row] = Math.max(this.__rowHeights[row] ?? 0, cellSize?.height ?? 0);
          this.__columnWidths[col] = Math.max(this.__columnWidths[col] ?? 0, cellSize?.width ?? 0);
        }
      }
    },

    /**
     * @param {number} left
     * @param {number} top
     * @param {number} width
     * @param {number} height
     * @param {number} columnCount
     * @param {number} rowCount
     */
    setAvailableSize(left, top, width, height, columnCount, rowCount) {
      if (
        this.__rowHeights &&
        this.__columnWidths &&
        this.__left === left &&
        this.__top === top &&
        this.__width === width &&
        this.__height === height &&
        this.__columnCount === columnCount &&
        this.__rowCount === rowCount
      )
        return false;

      this.__left = left;
      this.__top = top;
      this.__width = width;
      this.__height = height;
      this.__columnCount = columnCount;
      this.__rowCount = rowCount;
      this.invalidate();
      return true;
    },

    getSizes() {
      this._calculate();
      return {
        rowHeights: [...this.__rowHeights],
        columnWidths: [...this.__columnWidths]
      };
    }
  }
});
