console.time('tshook.ts-node');
require("ts-node").register({
  project: "tsconfig.tests.json"
});
console.timeEnd('tshook.ts-node');
console.time('tshook.tsconfig-paths');
require('tsconfig-paths').register({
  "baseUrl": ".",
  "paths": {
    "gizmos*": ["./src/gizmos*"],
    "gizmo-utils*": ["./src/gizmo-utils*"],
    "xml-converter*": ["./src/xml-converter*"],
    "test*": ["./test*"],
    "components*": ["./src/components*"],
    "testplayer*": ["./src/testplayer*"]
  }
});
console.timeEnd('tshook.tsconfig-paths');
