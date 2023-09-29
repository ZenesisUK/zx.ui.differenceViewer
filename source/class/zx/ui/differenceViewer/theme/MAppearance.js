/* ************************************************************************

   Copyright: 2023 ZenesisUK

   License: MIT license

   Authors: Will Johnson (WillsterJohnson)

************************************************************************ */

qx.Theme.define("zx.ui.differenceViewer.theme.MAppearance", {
  appearances: {
    scrollbar: {
      style(states) {
        return {
          // decorator: "rounded-edges-left",
          backgroundColor: "white",
          width: states.horizontal ? undefined : 20,
          height: states.horizontal ? 20 : undefined,
          padding: 2
        };
      }
    },
    "scrollbar/slider": {
      style(states) {
        return {
          // decorator: "scroll-slider",
          backgroundColor: "#E4E4E4",
          width: states.horizontal ? undefined : 20,
          height: states.horizontal ? 20 : undefined,
          padding: 2
        };
      }
    },

    "scrollbar/slider/knob": {
      style(states) {
        // let decorator = "scroll-knob";
        if (!states.disabled) {
          if (states.hovered && !states.pressed && !states.checked) {
            // decorator = "scroll-knob-hovered";
          } else if (states.hovered && (states.pressed || states.checked)) {
            // decorator = "scroll-knob-pressed-hovered";
          } else if (states.pressed || states.checked) {
            // decorator = "scroll-knob-pressed";
          }
        } else null; //decorator = "scroll-knob-disabled";

        return {
          marginTop: states.horizontal ? 0 : 3,
          cursor: states.disabled ? undefined : "pointer",
          // decorator,
          backgroundColor: "widget",
          minHeight: states.horizontal ? undefined : 10,
          minWidth: states.horizontal ? 10 : undefined,
          maxWidth: states.horizontal ? undefined : 14,
          maxHeight: states.horizontal ? 14 : undefined
        };
      }
    },

    "scroll-button-none": {
      style(states) {
        return {
          height: 0,
          width: 0,
          maxHeight: 0,
          maxWidth: 0,
          backgroundColor: "transparent",
          textColor: "transparent",
          decorator: undefined
        };
      }
    },
    "scrollbar/button-begin": "scroll-button-none",
    "scrollbar/button-end": "scroll-button-none",

    /*
    ---------------------------------------------------------------------------
      DIFFERENCE VIEWER
    ---------------------------------------------------------------------------
    */

    "difference-viewer": {
      style(state, style) {
        console.log("difference-viewer", state, style);
        style = qx.lang.Object.clone(style ?? {});
        return style;
      }
    },
    "difference-viewer/header": {
      style(state, style) {
        console.log("difference-viewer/header", state, style);
        style = qx.lang.Object.clone(style ?? {});
        style.decorator = "differenceviewer-columntitles";
        return style;
      }
    },
    "difference-viewer/content": {
      style(state, style) {
        console.log("difference-viewer/content", state, style);
        style = qx.lang.Object.clone(style ?? {});
        return style;
      }
    },
    "difference-viewer/scrollbar-x": "scrollbar",
    "difference-viewer/scrollbar-y": "scrollbar",

    "difference-column": {
      style(state, style) {
        console.log("difference-column", state, style);
        style = qx.lang.Object.clone(style ?? {});
        style.margin = [0, 8];
        return style;
      }
    },
    "difference-column-rowtitles": {
      include: "difference-column",
      style(state, style) {
        console.log("difference-column-title", state, style);
        style = qx.lang.Object.clone(style ?? {});
        style.decorator = "differenceviewer-rowtitles";
        style.margin = 0;
        return style;
      }
    },

    "difference-header": {
      style(state, style) {
        console.log("difference-header", state, style);
        style = qx.lang.Object.clone(style ?? {});
        style.iconLeft = "@FontAwesome/arrow-left/14";
        style.iconRight = "@FontAwesome/arrow-right/14";
        style.iconClear = "@FontAwesome/times/14";
        style.margin = [0, 8];
        return style;
      }
    },

    "difference-header/group": {
      style(state, style) {
        console.log("difference-header/group", state, style);
        style = qx.lang.Object.clone(style ?? {});
        return style;
      }
    },

    "difference-header-button": {
      extend: "button",
      style(state, style) {
        console.log("difference-header-button", state, style);
        style = qx.lang.Object.clone(style ?? {});
        return style;
      }
    },
    "difference-header/btnLeft": "difference-header-button",
    "difference-header/btnRight": "difference-header-button",
    "difference-header/btnClear": "difference-header-button"
  }
});
