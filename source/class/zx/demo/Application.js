/* ************************************************************************

   Copyright: 2023 ZenesisUK

   License: MIT license

   Authors: Will Johnson (WillsterJohnson)

************************************************************************ */

/**
 * This is the main application class of "zx"
 */
qx.Class.define("zx.demo.Application", {
  extend: qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members: {
    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     */
    async main() {
      super.main();

      await zx.test.TestRunner.runAll(zx.test.differenceViewer.SizeCalculator);

      if (qx.core.Environment.get("qx.debug")) {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      const doc = this.getRoot();

      const viewer = new zx.ui.differenceViewer.DifferenceViewer(50).set({ maxHeight: 1300 });
      doc.add(viewer, { left: 10, right: 10, bottom: 10, top: 10 });

      for (let rowIdx = 0; rowIdx < 30; rowIdx++) {
        for (let colIdx = 0; colIdx < 7; colIdx++) {
          if (rowIdx === 0) {
            viewer.add(new qx.ui.basic.Label(`COLUMN ${colIdx}`), {
              row: rowIdx,
              column: colIdx
            });
          } else if (colIdx === 0) {
            viewer.add(new qx.ui.basic.Label(`ROW ${rowIdx}`), {
              row: rowIdx,
              column: colIdx
            });
          } else if (Math.random() > 0.4) {
            viewer.add(this.__loremBox(), {
              row: rowIdx,
              column: colIdx
            });
          }
        }
      }
      window.mv = (col, inc) => viewer.moveColumn(col, inc);
    },

    __loremBox() {
      const loremText =
        "Lorem ipsum dolor sit amet consectetur adipisicing <br> elit. Quaerat iure dolorum quae consequuntur facilis a beatae asperiores <br> in itaque est excepturi repudiandae ullam accusantium ab, laudantium <br> omnis eum hic quam <br> magnam. Voluptate sapiente adipisci in praesentium voluptas vero eveniet tempora <br> officiis, consectetur totam nesciunt quo necessitatibus eligendi temporibus. <br> Quis laudantium veniam quam quia, cumque <br> accusantium nulla autem. Nihil accusamus optio ab? Vitae, <br> facilis? Dolores soluta tempora, eum porro architecto illum asperiores at <br> velit eligendi! <br> Suscipit ducimus debitis molestias ad quo saepe, <br> eveniet magnam veritatis delectus. Nemo, <br> doloremque quia numquam sapiente <br> debitis consectetur, voluptas incidunt distinctio tempora eligendi impedit, <br> voluptatibus fugiat!".split(
          " "
        );
      return new qx.ui.basic.Label(
        loremText.slice(0, Math.floor(Math.random() * loremText.length) + 10).join(" ")
      ).set({ rich: true });
    }
  }
});
