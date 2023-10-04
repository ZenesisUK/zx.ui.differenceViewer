qx.Class.define("zx.ui.differenceViewer.HorizontalOneAndFlex", {
  extend: qx.ui.layout.Abstract,

  /**
   * @param {zx.ui.differenceViewer.HorizontalOneAndFlex} [copy] If provided, will copy from the given HorizontalOneAndFlex
   */
  construct(copy) {
    if (copy) this.__copy = copy;

    this.__lastKnownWidth = 0;
    this.__lastKnownHeight = 0;
  },

  members: {
    __lastKnownWidth: null,
    __lastKnownHeight: null,
    __copy: null,
    /**
     * @type {{
     *   title: number;
     *   columns: number;
     * }}
     */
    __widths: null,

    shareWidth(availWidth) {
      if (this.__copy) {
        this.__widths = this.__copy.shareWidth(availWidth);
      } else {
        this.__widths ??= { title: 0, columns: 0 };

        const children = this._getLayoutChildren();
        const rowTitle = children[0];
        const columns = children.slice(1);

        const rowTitleWidth = Math.round(rowTitle.getSizeHint().width);
        const columnWidth = Math.round((availWidth - rowTitleWidth) / columns.length);

        this.__widths.title = rowTitleWidth;
        this.__widths.columns = columnWidth;
      }
      return this.__widths;
    },

    /**
     * @override
     */
    renderLayout(availWidth, availHeight) {
      this.shareWidth(availWidth);

      const rowTitleWidth = this.__widths.title;
      const columnWidth = this.__widths.columns;

      const children = this._getLayoutChildren();
      const rowTitle = children[0];
      const columns = children.slice(1);

      let left = 0;

      rowTitle.renderLayout(0, 0, rowTitleWidth, availHeight);
      left += rowTitleWidth;

      for (const column of columns) {
        column.renderLayout(left, 0, columnWidth, availHeight);
        left += columnWidth;
      }

      this.__lastKnownWidth = left; // at the end, left is the width of the whole thing
      this.__lastKnownHeight = children.reduce(
        (maxHeight, child) => Math.max(maxHeight, child.getSizeHint().height),
        0
      );
    },

    _computeSizeHint() {
      return {
        width: Math.ceil(this.__lastKnownWidth),
        height: Math.ceil(this.__lastKnownHeight)
      };
    }
  }
});
