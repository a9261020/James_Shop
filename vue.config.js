// const path = require("path");
const port = process.env.PORT || 5000;

module.exports = {
  // 看你build出來的檔案要在哪個資料夾及叫什麼名字 ↓ 這裡build出來就叫public
  // outputDir: path.resolve(__dirname, "./public"),
  // 如果沒有輸入就會build在前端資料夾，build出一個dist
  devServer: {
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${port}`
      }
    }
  }
};
