qx.Class.define("zx.ui.differenceViewer.DifferenceLayout", {
  extend: qx.ui.layout.Abstract,

  construct(sizeCalculator, column) {
    this.__sizeCalculator = sizeCalculator;
    this.setColumn(column);
    this.__invalidateListenerId = this.__sizeCalculator.addListener(
      "invalidate",
      () => (this._getWidget() ? this.renderLayout() : null),
      this
    );
  },

  destruct() {
    this.__sizeCalculator.removeListenerById(this.__invalidateListenerId);
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

    /**
     * @override
     */
    renderLayout(availWidth, availHeight, padding) {
      const sizes = this.__sizeCalculator.getSizes();
      let top = 0;
      const rowTops = sizes.rowHeights.map((rowHeight, idx) => {
        const currentTop = top;
        const newTop = top + (rowHeight ?? 0);
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
      return {
        width: Math.max(
          sizes.columnWidths[this.getColumn()] ?? 0,
          this._getWidget()?.getBounds()?.width ?? 0
        ),
        height: sizes.rowHeights.reduce((acc, cur) => acc + (cur ?? 0), 0)
      };
    }
  }
});
