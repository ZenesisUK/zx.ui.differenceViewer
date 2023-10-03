qx.Class.define("zx.ui.differenceViewer.HorizontalOneAndFlex", {
  extend: qx.ui.layout.Abstract,

  construct() {
    this.__lastKnownWidth = 0;
    this.__lastKnownHeight = 0;
  },

  members: {
    __lastKnownWidth: null,
    __lastKnownHeight: null,
    /**
     * @override
     */
    renderLayout(availWidth, availHeight, padding) {
      const children = this._getLayoutChildren();
      const rowTitle = children[0];
      const columns = children.slice(1);

      const rowTitleWidth = Math.round(rowTitle.getSizeHint().width);
      const columnWidth = Math.round((availWidth - rowTitleWidth) / columns.length);

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
