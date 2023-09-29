qx.Class.define("zx.ui.differenceViewer.DifferenceLayout", {
  extend: qx.ui.layout.Abstract,

  construct(sizeCalculator, column, rowgap = 0) {
    this.__sizeCalculator = sizeCalculator;
    this.__rowgap = rowgap;
    this.setColumn(column);
    this.__sizeCalculator.addListener(
      "invalidate",
      () => {
        if (this._getWidget()) {
          this._computeSizeHint();
          this.renderLayout();
        }
      },
      this
    );
  },

  properties: {
    column: {
      check: "Number",
      nullable: false,
      event: "changeColumn"
    }
  },

  members: {
    __sizeCalculator: null,
    __rowgap: null,

    /**
     * @override
     */
    renderLayout(availWidth, availHeight, padding) {
      const sizes = this.__sizeCalculator.getSizes();
      let top = 0;
      const rowTops = sizes.rowHeights.map((rowHeight, idx) => {
        const currentTop = top;
        const newTop =
          top +
          (rowHeight ?? 0) +
          /* `sign(x) * y` equates to `0` if `x = 0`, else equates to `y` (negatives ignored as `x` is array index) */
          Math.sign(idx) * this.__rowgap;
        top = newTop;
        return currentTop;
      });

      const children = this._getLayoutChildren();
      const column = this.getColumn();
      for (const child of children) {
        const { row } = child.getLayoutProperties();
        if (row === 0) continue;
        child.renderLayout(
          0,
          rowTops[row] ?? 0,
          Math.max(sizes.columnWidths[column] ?? 0, this._getWidget().getBounds()?.width ?? 0) +
            (padding?.left ?? 0) +
            (padding?.right ?? 0),
          (sizes.rowHeights[row] ?? 0) + (padding?.top ?? 0) + (padding?.bottom ?? 0)
        );
      }
    },

    /**
     * @override
     */
    _computeSizeHint() {
      const sizes = this.__sizeCalculator.getSizes();
      const rowgap = this.__rowgap;
      return {
        width: Math.max(
          sizes.columnWidths[this.getColumn()] ?? 0,
          this._getWidget()?.getBounds()?.width ?? 0
        ),
        height: sizes.rowHeights.reduce((acc, cur) => acc + (cur ?? 0) + rowgap, 0)
      };
    }
  }
});
