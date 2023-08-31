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
    main() {
      super.main();
      if (qx.core.Environment.get("qx.debug")) {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }
    }
  }
});
