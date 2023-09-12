qx.Class.define("zx.test.differenceViewer.SizeCalculator", {
  extend: qx.dev.unit.TestCase,

  members: {
    async testCellSizes() {
      // setup

      const sizeCalculator = new zx.ui.differenceViewer.SizeCalculator();

      const mockWidget = (width, height) => ({ width, height });

      /**
       * @type {ReturnType<mockWidget>[][]}
       */
      const widgetMocks = [[], [], []];
      const cellSizeHintCallback = (row, col) => widgetMocks[col][row];
      sizeCalculator.setCellSizeHintCallback(cellSizeHintCallback);

      const setDimensions = (
        columnCount,
        rowCount,
        setCb = (columnIdx, rowIdx) => mockWidget(10, 10)
      ) => {
        for (let rowIdx = 0; rowIdx < rowCount; rowIdx++)
          for (let columnIdx = 0; columnIdx < columnCount; columnIdx++)
            widgetMocks[columnIdx][rowIdx] = setCb(columnIdx, rowIdx);
        sizeCalculator.invalidate();
        sizeCalculator.setAvailableSize(0, 0, 0, 0, columnCount, rowCount);
      };

      // test
      setDimensions(3, 10);
      let sizes = sizeCalculator.getSizes();

      this.assertTrue(sizes.rowHeights.length === 10);
      for (let rowIdx = 0; rowIdx < 10; rowIdx++) this.assertTrue(sizes.rowHeights[rowIdx] === 10);

      this.assertTrue(sizes.columnWidths.length === 3);
      for (let columnIdx = 0; columnIdx < 3; columnIdx++)
        this.assertTrue(sizes.columnWidths[columnIdx] === 10);

      //
      setDimensions(3, 10, (columnIdx, rowIdx) =>
        columnIdx + rowIdx ? mockWidget(10, 10) : mockWidget(200, 20)
      );
      sizes = sizeCalculator.getSizes();

      this.assertTrue(sizes.rowHeights.length === 10);
      this.assertTrue(sizes.rowHeights[0] === 20);
      for (let rowIdx = 1; rowIdx < 10; rowIdx++) this.assertTrue(sizes.rowHeights[rowIdx] === 10);

      this.assertTrue(sizes.columnWidths.length === 3);
      this.assertTrue(sizes.columnWidths[0] === 200);
      for (let columnIdx = 1; columnIdx < 3; columnIdx++)
        this.assertTrue(sizes.columnWidths[columnIdx] === 10);

      //
      setDimensions(1, 1);
      sizes = sizeCalculator.getSizes();

      this.assertTrue(sizes.rowHeights.length === 1);
      this.assertTrue(sizes.rowHeights[0] === 10);

      this.assertTrue(sizes.columnWidths.length === 1);
      this.assertTrue(sizes.columnWidths[0] === 10);
    }
  }
});
