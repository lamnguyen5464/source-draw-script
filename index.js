const fs = require("fs");

const getAllFromDir = (dir = "") => {
  const dirent = {};
  fs.readdirSync(dir, { withFileTypes: true }).forEach((item) => {
    if (item?.isDirectory()) {
      dirent[item?.name] = getAllFromDir(dir + "/" + item?.name);
    } else {
      dirent[item?.name] = null;
    }
  });
  return dirent;
};

const END_LINE = "\n";
const TAB_SPACE = 5;
const printSourceMap = (rootDir = {}, currentTab = 0) => {
  let result = "";
  let tab = new Array(currentTab).join(" ");

  Object.entries(rootDir).forEach(([key, value]) => {
    result = result + tab + (value ? "+" : "-") + " " + key + END_LINE;
    if (!!value) {
      result = result + printSourceMap(value, currentTab + TAB_SPACE);
    }
  });
  return result;
};

const dir = process.argv[2] || ".";

try {
  console.log(printSourceMap(getAllFromDir(dir)));
} catch (e) {
  console.error(e);
}
