/**
 * USER SETTING
 */
//結果を出力するファイル
const output = "result.txt";

// 監視するファイル
const watchList = [
  "./dist/common/css/app.css",
  "./dist/common/js/vendor.js",
  "./dist/common/js/bundle.js"
];

/**
 * LOGIC
 */
const fs = require("fs");
const fsSync = fs.promises;
const PATH = require("path");

const overwrite = async filename => {
  try {
    let content = await fsSync.readFile(PATH.join(__dirname, output), "utf8");
    let res = "";

    if (filename && content !== "") {
      var date = String(Date.now());

      const oldFileName = filename + "\\?\\d{13}|" + filename;
      const newFileName = filename + "?" + date;
      res = content.replace(new RegExp(oldFileName, "g"), newFileName);
      await fsSync.writeFile(PATH.join(__dirname, output), res);
    }
    console.log("--- cache busting ---");
  } catch (err) {
    console.log(err);
  }
};

const watch = () => {
  watchList.forEach(item => {
    fs.watch(PATH.join(__dirname, item), function(event, filename) {
      // console.log(event + ' to ' + filename);
      overwrite(filename);
    });
  });
};

const build = async () => {
  for (let item of watchList) {
    const filename = item.split("/").pop();
    await overwrite(filename);
  }
};

switch (process.argv[2]) {
  case "watch":
    watch();
    break;
  case "build":
    build();
    break;
  default:
    break;
}
