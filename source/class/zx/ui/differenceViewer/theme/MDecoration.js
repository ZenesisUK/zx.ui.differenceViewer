/* ************************************************************************

   Copyright: 2023 ZenesisUK

   License: MIT license

   Authors: Will Johnson (WillsterJohnson)

************************************************************************ */

qx.Theme.define("zx.ui.differenceViewer.theme.MDecoration", {
  decorations: {
    /*
      ---------------------------------------------------------------------------
        DIFFERENCE VIEWER
      ---------------------------------------------------------------------------
    */

    "differenceviewer-cell": {
      style: {
        bottom: [1, "dotted", "#999"]
      }
    },
    "differenceviewer-rowtitles": {
      style: {
        width: [0, 1, 0, 0],
        color: "black"
      }
    },
    "differenceviewer-column": {
      style: {
        width: [0, 1, 1, 0],
        color: "black"
      }
    },
    "differenceviewer-columntitles": {
      style: {
        width: [0, 0, 1, 0],
        color: "black"
      }
    }
  }
});
