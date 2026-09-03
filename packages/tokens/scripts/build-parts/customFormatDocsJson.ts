/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import StyleDictionary from 'style-dictionary';
import type { Dictionary, DesignToken, TransformedToken, PlatformConfig, Config, LocalOptions }  from 'style-dictionary/types';

import { cloneDeep } from 'lodash-es';

export async function customFormatDocsJsonFunction({ dictionary, platform, options }: { dictionary: Dictionary; platform: PlatformConfig; options: Config & LocalOptions }): Promise<string> {
  // Notice: this object shape is used also in the documentation so any updates
  // to this format should be reflected in the corresponding type definition.
  // See: https://github.com/search?q=repo%3Ahashicorp%2Fdesign-system%20%22dist%2Fdocs%2Fproducts%2Ftokens.json%22&type=code
  const output: Record<string, unknown>[] = [];
  for (const token of dictionary.allTokens) {
    const outputToken = cloneDeep(token) as Record<string, unknown>;
    // we remove the "filePath" prop from the token because the orginal file path is irrelevant for us
    // (plus its value is an absolute path, so it causes useless diffs in git)
    delete outputToken.filePath;
    delete outputToken.isSource;
    // we remove the top-level "comments" prop (resolved into "comment" by the `resolve-comments-for-mode-*` preprocessor)
    // note: it is still preserved under the "original" key though
    delete outputToken.comments;

    // resolve any non-primitive `$modes` entry (eg. a "property-override" object, or a "standard" array value like a
    // `cubicBezier` timing function) into its final combined/transformed value (see below); the raw/un-combined shape
    // is still preserved under `original.$modes` (used eg. to detect aliases)
    if (outputToken.$modes && typeof outputToken.$modes === 'object') {
      const modes = outputToken.$modes as Record<string, unknown>;
      for (const modeName of Object.keys(modes)) {
        const modeValue = modes[modeName];
        // primitive values (string/number) are already final - Style Dictionary resolves references before this
        // format function runs, and (unlike a token's own `$value`) there's no transform pipeline result to combine
        if (typeof modeValue === 'object' && modeValue !== null) {
          modes[modeName] = await resolveModeValueOverride({ token: outputToken, modeValue, platform, options });
        }
      }
    }

    output.push(outputToken);
  }

  return JSON.stringify(output, null, 2);
}

// Resolves a non-primitive `$modes` entry into its single, final value, by reusing Style Dictionary's own transform
// registry: `StyleDictionary.hooks.transformGroups[platform.transformGroup]` gives us the exact, live, ordered list of
// transform names configured for this platform, and `StyleDictionary.hooks.transforms[name]` gives us each transform's
// actual `filter`/`transform` functions (including Style Dictionary's own built-ins, eg. `color/css`, `cubicBezier/css`).
// This mirrors what Style Dictionary itself does when transforming a token's own `$value` (see `transformToken()` in
// Style Dictionary's source) - just applied to a `$modes` entry instead, so there is a single source of truth for how
// values get combined/transformed.
// The reason for this extra logic is that Style Dictionary's transforms only ever operate on a token's own `$value`,
// they don't recurse into custom nested props like `$modes`, so without this step a non-primitive `$modes` entry would
// be left "raw"/un-transformed in the generated docs JSON - eg. `{ "$value": "14", "unit": "px" }` instead of `"14px"`,
// or `[0.2, 0, 0.38, 0.9]` instead of `"cubic-bezier(0.2, 0, 0.38, 0.9)"`.
async function resolveModeValueOverride({ token, modeValue, platform, options }: { token: Record<string, unknown>; modeValue: object; platform: PlatformConfig; options: Config & LocalOptions }): Promise<unknown> {
  // a `$modes` entry resolves to one of two shapes (mirroring `preprocessorReplaceValueForMode.ts`'s own categorization):
  // 1) a "property-override" object: by convention always a (non-array) object that carries its own `$value`, optionally
  //    with sibling props (eg. `unit`/`alpha`) - its keys override the token's own props (a `null` value removes that
  //    prop), same `Object.keys(modeValue)`-driven approach as the `replace-value-for-mode-*` preprocessor.
  // 2) a "standard" non-primitive value (eg. an array, like the `cubicBezier` timing function) - it replaces the
  //    token's `$value` directly, same as a primitive mode value would.
  // `merged` is a synthetic, partial token-like object (not a full `TransformedToken` with `path`/`original`/etc.) -
  // built solely to resolve this `$modes` entry, then cast further down (`syntheticToken`) to satisfy the type
  // Style Dictionary's filter/transform functions expect.
  const merged: DesignToken = { ...token };
  const isPropertyOverrideObject = !Array.isArray(modeValue) && '$value' in modeValue;
  if (isPropertyOverrideObject) {
    Object.entries(modeValue).forEach(([key, value]) => {
      if (value === null) {
        delete merged[key];
      } else {
        merged[key] = value;
      }
    });
  } else {
    merged.$value = modeValue;
  }

  const transformGroupName = platform?.transformGroup;
  const transformNames = (transformGroupName && StyleDictionary.hooks.transformGroups[transformGroupName]) || [];
  const syntheticToken = merged as unknown as TransformedToken;

  for (const transformName of transformNames) {
    const transformDefinition = StyleDictionary.hooks.transforms[transformName];
    // only "value" transforms are relevant here (eg. we skip `attributes/category`/`name/kebab`)
    if (transformDefinition?.type === 'value' && (!transformDefinition.filter || await transformDefinition.filter(syntheticToken, options))) {
      merged.$value = await transformDefinition.transform(syntheticToken, platform, options);
    }
  }

  return merged.$value;
}
