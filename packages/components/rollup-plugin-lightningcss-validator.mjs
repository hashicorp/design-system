// rollup-plugin-lightningcss-validator.mjs
import { transform } from 'lightningcss';
import { SourceMapConsumer } from 'source-map-js';

/**
 * @typedef {Object} LightningCssValidatorOptions
 * @property {(fileName: string) => boolean} [include]
 *   Predicate to select which CSS files to validate. Defaults to all `.css` files.
 * @property {boolean} [errorRecovery=true]
 *   If true, collect all diagnostics instead of throwing on the first error.
 * @property {boolean} [failOnWarning=true]
 *   If true, fail the build on any diagnostics. If false, emit them as warnings.
 */

/** Safely parse JSON and warn on failure. */
function safeJSONParse(jsonLike, context, warn) {
  try {
    return typeof jsonLike === 'string' ? JSON.parse(jsonLike) : jsonLike;
  } catch (e) {
    warn?.(
      `(lightningcss-validator) invalid JSON in ${context}: ${e?.message || e}`
    );
    return null;
  }
}

/** Try to load a sourcemap for the given asset. */
function getSourceMap(bundle, fileName, asset, cssText, warn) {
  // 1) asset.map
  const fromAsset = safeJSONParse(asset.map, `${fileName} (asset.map)`, warn);
  if (fromAsset) return fromAsset;

  // 2) inline sourceMappingURL (data URL)
  const m =
    typeof cssText === 'string'
      ? cssText.match(
          /\/\*# sourceMappingURL=data:application\/json;base64,([A-Za-z0-9+/=]+)\s*\*\//
        )
      : null;
  if (m) {
    const inlineJson = Buffer.from(m[1], 'base64').toString('utf8');
    const fromInline = safeJSONParse(
      inlineJson,
      `${fileName} (inline sourcemap)`,
      warn
    );
    if (fromInline) return fromInline;
  }

  // 3) sibling .map asset
  const siblingKey = `${fileName}.map`;
  const altKey = fileName.replace(/\.css$/i, '.css.map');
  const sibling = bundle[siblingKey] || bundle[altKey];
  if (sibling?.type === 'asset' && sibling.source) {
    const mapText =
      typeof sibling.source === 'string'
        ? sibling.source
        : Buffer.from(sibling.source).toString('utf8');
    const fromSibling = safeJSONParse(
      mapText,
      `${fileName} (sibling .map)`,
      warn
    );
    if (fromSibling) return fromSibling;
  }

  warn?.(
    `(lightningcss-validator) no sourcemap found for ${fileName}. Enable sourceMap/sourceMapEmbed/sourceMapContents in your SCSS step for better traces.`
  );
  return null;
}

/** Map generated position back to original (with column nudges). */
function mapToOriginal(consumer, line, column) {
  for (const col of [column, column - 1, column + 1]) {
    const orig = consumer.originalPositionFor({
      line,
      column: Math.max(0, col ?? 0),
    });
    if (orig?.source && orig.line != null) return orig;
  }
  return null;
}

/**
 * Rollup plugin to validate emitted CSS assets with Lightning CSS.
 *
 * It parses CSS, collects diagnostics, and reports them with optional source map
 * tracebacks to the original SCSS. By default, the build fails if any issues are found.
 *
 * @param {LightningCssValidatorOptions} [opts]
 * @returns {import('rollup').Plugin}
 */
export default function lightningCssValidator(opts = {}) {
  const include = opts.include ?? ((f) => f.endsWith('.css'));
  const errorRecovery = opts.errorRecovery ?? true;
  const failOnWarning = opts.failOnWarning ?? true;

  return {
    name: 'rollup-plugin-lightningcss-validator',

    async generateBundle(_out, bundle) {
      const reports = [];

      for (const [fileName, asset] of Object.entries(bundle)) {
        if (asset.type !== 'asset' || !include(fileName)) continue;

        const cssText =
          typeof asset.source === 'string'
            ? asset.source
            : Buffer.from(asset.source || []).toString('utf8');

        const res = transform({
          code: Buffer.from(cssText, 'utf8'),
          filename: fileName,
          minify: false,
          errorRecovery,
        });

        const diagnostics = [
          ...(res.diagnostics ?? []),
          ...(res.warnings ?? []),
        ];
        if (!diagnostics.length) continue;

        const mapObj = getSourceMap(
          bundle,
          fileName,
          asset,
          cssText,
          this.warn
        );
        let consumer = null;
        if (mapObj) {
          try {
            consumer = await new SourceMapConsumer(mapObj);
          } catch (e) {
            this.warn(
              `(lightningcss-validator) bad sourcemap for ${fileName}: ${e?.message || e}`
            );
          }
        }

        for (const d of diagnostics) {
          const line = d.loc?.line ?? d.line;
          const col = d.loc?.column ?? d.column;

          let msg = `❌ CSS issue in ${fileName}`;
          if (line != null) msg += `:${line}${col != null ? `:${col}` : ''}`;
          msg += ` — ${d.message || 'invalid CSS'}`;

          if (consumer && line != null && col != null) {
            const orig = mapToOriginal(consumer, line, col);
            msg += orig
              ? `\n    ← ${orig.source}:${orig.line}:${orig.column ?? '?'}`
              : `\n    (no original mapping found — embed SCSS sourcemaps)`;
          }

          reports.push(msg);
        }
      }

      if (reports.length) {
        const header = `\nCSS validation ${failOnWarning ? 'failed' : 'warnings'} — ${reports.length} issue(s):\n`;
        const body = reports.join('\n') + '\n';
        failOnWarning ? this.error(header + body) : this.warn(header + body);
      }
    },
  };
}
