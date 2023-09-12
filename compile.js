const fs = require("fs");
const path = require("path");

qx.Class.define("myapp.compile.CompilerApi", {
  extend: qx.tool.cli.api.CompilerApi,

  members: {
    async load() {
      debugger;
      let compileJsonPath = path.join(this.getRootDir(), "compile.json");

      let config = {};
      if (fs.existsSync(compileJsonPath)) {
        config = await qx.tool.utils.Json.loadJsonAsync(compileJsonPath);
      }
      if (fs.existsSync(".compile.json")) {
        let extraData = await qx.tool.utils.Json.loadJsonAsync(".compile.json");
        qx.lang.Object.mergeWith(config, extraData, true);
      }
      this.setConfiguration(config);
      return config;
    }
  }
});

module.exports = {
  CompilerApi: myapp.compile.CompilerApi
};
