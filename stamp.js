// Point index.html at the current app.js/app.css so phones fetch a new build right away.
const fs = require("fs"), crypto = require("crypto");
const v = crypto.createHash("sha1").update(fs.readFileSync("app.js")).update(fs.readFileSync("app.css")).digest("hex").slice(0, 10);
const html = fs.readFileSync("index.html", "utf8")
  .replace(/app\.css(\?v=[0-9a-f]+)?"/, 'app.css?v=' + v + '"')
  .replace(/app\.js(\?v=[0-9a-f]+)?"/, 'app.js?v=' + v + '"');
fs.writeFileSync("index.html", html);
console.log("stamped", v);
