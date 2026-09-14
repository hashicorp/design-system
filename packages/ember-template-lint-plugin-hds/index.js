import NoUnknownArguments from "./lib/rules/no-unknown-arguments.js";
import ValidArgumentCombinations from "./lib/rules/valid-argument-combinations.js";
import ValidStaticArgumentValues from "./lib/rules/valid-static-argument-values.js";

export default {
  name: "hds",

  configurations: {
    recommended: {
      rules: {
        "no-unknown-arguments": true,
        "valid-argument-combinations": true,
        "valid-static-argument-values": true,
      },
    },
  },

  rules: {
    "no-unknown-arguments": NoUnknownArguments,
    "valid-argument-combinations": ValidArgumentCombinations,
    "valid-static-argument-values": ValidStaticArgumentValues,
  },
};
