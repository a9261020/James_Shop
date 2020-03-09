const path = require("path");
const port = process.env.PORT || 5000;

module.exports = {
  //   outputDir: path.resolve(__dirname, "../public"),
  devServer: {
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${port}`
      }
    }
  }
};
