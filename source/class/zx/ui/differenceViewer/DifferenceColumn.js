qx.Class.define("zx.ui.differenceViewer.DifferenceColumn", {
  extend: qx.ui.core.scroll.ScrollPane,

  construct(sizeCalculator, column) {
    super();
    const layout = new zx.ui.differenceViewer.DifferenceLayout(sizeCalculator, column);
    this._setLayout(layout);
    this.setColumn(column);
    this.bind("column", layout, "column");
    this.__sizeCalculator = sizeCalculator;
    this.__filledRows = new Map();
  },

  properties: {
    appearance: {
      init: "difference-column",
      refine: true
    },

    column: {
      check: "Number",
      nullable: false,
      event: "changeColumn"
    }
  },

  members: {
    __sizeCalculator: null,
    /**
     * @type {Map<number, qx.ui.core.Widget>}
     */
    __filledRows: null,
    /**
     * !IMPORTANT!
     * This method uses magic (it wraps your widget in another) to support styling all cells
     * uniformly.
     */
    add(widget, layoutProps) {
      if (widget) {
        this.remove(this.__filledRows.get(layoutProps.row));

        const differenceCell = new qx.ui.container.Composite(new qx.ui.layout.Basic()).set({
          minWidth: 0
        });
        differenceCell.setAppearance(
          this.getColumn() ? "difference-cell" : "difference-cell-rowtitles"
        );
        differenceCell.add(widget, { left: 0, top: 0 });
        this._add(differenceCell, layoutProps);
        differenceCell.addListener("resize", this._onUpdate, this);

        this.bind("width", differenceCell, "width");
        this.bind("width", differenceCell, "maxWidth");

        this.__filledRows.set(layoutProps.row, differenceCell);

        for (let i = 1; i < layoutProps.row; i++)
          if (!this.__filledRows.has(i)) this.add(new qx.ui.core.Widget(), { row: i });

        return differenceCell;
      }
    },

    hasCellForRow(row) {
      return this.__filledRows.has(row);
    },

    removeAll() {
      this._removeAll();
      this.__filledRows = new Map();
    },

    /**
     * @returns {{ width: number; height: number; }} Size of the content
     */
    getScrollSize() {
      const sizes = this.__sizeCalculator.getSizes();
      return {
        width: sizes.columnWidths[this.getColumn()] ?? 0,
        height: sizes.rowHeights.reduce((acc, cur) => acc + (cur ?? 0), 0)
      };
    }
  }
});
