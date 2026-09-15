import NoDeprecatedHdsApi from "./lib/rules/no-deprecated-hds-api.js";
import NoUnknownArguments from "./lib/rules/no-unknown-arguments.js";
import RequireAccessibleName from "./lib/rules/require-accessible-name.js";
import RequireHdsArguments from "./lib/rules/require-hds-arguments.js";
import RequireTextTag from "./lib/rules/require-text-tag.js";
import ValidArgumentCombinations from "./lib/rules/valid-argument-combinations.js";
import ValidNavigationMode from "./lib/rules/valid-navigation-mode.js";
import ValidStaticArgumentValues from "./lib/rules/valid-static-argument-values.js";

export default {
  name: "hds",

  configurations: {
    recommended: {
      rules: {
        "no-deprecated-hds-api": true,
        "no-unknown-arguments": true,
        "require-accessible-name": true,
        "require-hds-arguments": true,
        "require-text-tag": true,
        "valid-argument-combinations": true,
        "valid-navigation-mode": true,
        "valid-static-argument-values": true,
      },
    },
  },

  rules: {
    "no-deprecated-hds-api": NoDeprecatedHdsApi,
    "no-unknown-arguments": NoUnknownArguments,
    "require-accessible-name": RequireAccessibleName,
    "require-hds-arguments": RequireHdsArguments,
    "require-text-tag": RequireTextTag,
    "valid-argument-combinations": ValidArgumentCombinations,
    "valid-navigation-mode": ValidNavigationMode,
    "valid-static-argument-values": ValidStaticArgumentValues,
  },
};
