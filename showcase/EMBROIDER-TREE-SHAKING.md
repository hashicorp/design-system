# Embroider Tree-Shaking Investigation

> **Date:** April 2026  
> **Status:** Blocked  
> **Ember Version:** 6.5.0  
> **Embroider Versions:** @embroider/core@3.5.9, @embroider/compat@3.9.3, @embroider/webpack@4.1.2

## Summary

This document captures findings from investigating tree-shaking support for `@hashicorp/design-system-components` using Embroider's optimized build mode.

**Key Finding:** Tree-shaking via Embroider optimized mode is currently blocked due to incompatibilities between the HDS component templates and Embroider's static analysis requirements.

## Background

### Goal

Enable tree-shaking for consuming applications so they only bundle the HDS components they actually use, rather than the entire library (~180 components).

### How Tree-Shaking Works in Ember

Tree-shaking in Ember requires:

1. **v2 Addon format** — HDS components already use this format ✅
2. **`sideEffects: false`** in package.json — Tells bundlers the code is pure ✅
3. **Embroider optimized mode** — Consumer app must use `staticComponents: true` ❌
4. **Static template analysis** — All component/helper invocations must be statically analyzable ❌

## What we tried

### 1. Embroider Safe Mode ✅

```javascript
// ember-cli-build.js
const { maybeEmbroider } = require("@embroider/test-setup");
const { recommendedOptions } = require("@embroider/compat");
return maybeEmbroider(app, {
  ...recommendedOptions.safe,
  // ...
});
```

**Result:** Builds successfully with webpack code-splitting, but no tree-shaking.

### 2. Embroider Optimized Mode ❌

```javascript
return maybeEmbroider(app, {
  ...recommendedOptions.safe,
  staticHelpers: true,
  staticComponents: true,
  // ...
});
```

**Result:** Build fails with multiple errors.

## Blockers

### 1. Template Ambiguity Errors

When `staticHelpers` and `staticComponents` have different values, Embroider cannot determine whether `{{hds-t}}` is a helper or component:

```
unsupported ambiguity between helper and component: this use of "{{hds-t}}"
could be helper "{{ (hds-t) }}" or component "<HdsT />", and your settings
for staticHelpers and staticComponents do not agree.
```

**Affected Files:**

- `components/hds/table/th-button-sort.js`
- `components/hds/table/th-button-tooltip.js`
- `components/hds/advanced-table/th-button-expand.js`
- `components/hds/advanced-table/th-button-sort.js`
- `components/hds/advanced-table/th-button-tooltip.js`
- And others using `{{hds-t ...}}`

### 2. `#embroider_compat` import errors

When both `staticHelpers` and `staticComponents` are `true`, Embroider generates imports to `#embroider_compat` for dynamic resolution:

```
Module not found: Error: @hashicorp/design-system-components is trying to
import from #embroider_compat but that is not one of its explicit dependencies
```

**Root Cause:** V2 Ember addons have strict import validation. The `#embroider_compat` virtual module is not in the allowed list (`emberVirtualPackages`) for V2 addons.

The validation in `@embroider/core/src/module-resolver.js`:

```javascript
if (
  !pkg.meta["auto-upgraded"] &&
  !appImportInAppTree(pkg, logicalPackage, packageName) &&
  !reliablyResolvable(pkg, packageName)
) {
  throw new Error(`${pkg.name} is trying to import from ${packageName} 
    but that is not one of its explicit dependencies`);
}
```

### 3. Node.js v24 compatibility (separate issue)

When using `compatBuild` directly with the `Webpack` class:

```
Class constructor Webpack cannot be invoked without 'new'
```

This is a Node.js v24 issue where classes cannot be called as functions. The Embroider API calls `buildOnce(outputPath, env)` as a function, but `Webpack` is exported as a class.

## Recommended solutions

### Short-Term: use safe mode

Continue using Embroider safe mode for webpack code-splitting benefits without tree-shaking:

```javascript
const { maybeEmbroider } = require("@embroider/test-setup");
const { recommendedOptions } = require("@embroider/compat");
return maybeEmbroider(app, {
  ...recommendedOptions.safe,
  skipBabel: [{ package: "qunit" }, { package: "@hashicorp/flight-icons" }],
  packagerOptions: {
    webpackConfig: {
      devtool: false,
    },
  },
});
```

### Long-Term: template updates required

To enable tree-shaking, HDS templates need to use statically-analyzable patterns:

#### 1. Use Explicit Helper Syntax

```handlebars
{{! Before: Ambiguous }}
{{hds-t "some.translation.key"}}

{{! After: Explicit helper call }}
{{(hds-t "some.translation.key")}}
```

#### 2. Ensure All Component Invocations Use Angle Brackets

```handlebars
{{! Before: Curly syntax (harder to analyze) }}
{{hds-button text="Click"}}

{{! After: Angle bracket syntax }}
<Hds::Button @text="Click" />
```

#### 3. Audit Dynamic Invocations

Search for patterns like:

- `{{component ...}}`
- `{{helper ...}}`
- String-based component lookups

### Upstream: Wait for Embroider Updates

The Embroider team is actively working on better v2 addon support. Monitor:

- https://github.com/embroider-build/embroider/issues

## Build Size Comparison

| Mode           | Total JS (gzipped) | Notes                |
| -------------- | ------------------ | -------------------- |
| Embroider Safe | ~1.2 MB            | Code-split chunks    |
| Classic Build  | ~1.1 MB            | Single vendor bundle |

Note: The showcase app uses all components, so tree-shaking wouldn't reduce its size. Benefits would only appear in apps that use a subset of components.

## Files Modified During Investigation

### `packages/components/package.json`

Added `sideEffects` field and `@embroider/compat` dependency:

```json
{
  "sideEffects": false,
  "dependencies": {
    "@embroider/compat": "^3.9.3"
  }
}
```

### `showcase/package.json`

Added Embroider dependencies:

```json
{
  "devDependencies": {
    "@embroider/compat": "^3.9.3",
    "@embroider/core": "^3.5.9",
    "@embroider/webpack": "^4.1.2"
  }
}
```

## Related Resources

- [Embroider v2 Addon Format](https://github.com/embroider-build/embroider/blob/main/docs/v2-addon-format.md)
- [Embroider Static Analysis](https://github.com/embroider-build/embroider/blob/main/docs/staticness.md)
- [ember-rfc176-data](https://github.com/ember-cli/ember-rfc176-data) — Virtual packages allowlist
