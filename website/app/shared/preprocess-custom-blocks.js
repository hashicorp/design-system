/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * Pre-processes a raw markdown string before it is passed to Showdown.
 *
 * Showdown is an HTML-aware markdown processor: when it encounters a custom
 * Ember component tag (e.g. <Doc::Layout>, <Hds::Alert>) it passes it through
 * verbatim, but it still wraps the surrounding context in <p> tags following
 * standard HTML block-level rules. This causes two problems:
 *
 *  1. A custom component whose children include block-level HTML elements
 *     (e.g. <pre>, <div>, <table>) causes Showdown to split the auto-<p> tag:
 *     the </p> is emitted inside the component's opening tag, and a new <p>
 *     is opened that swallows the component's closing tag.
 *
 *  2. The removeAutoPTags Showdown extension that strips those <p> wrappers
 *     relies on regex-based matching and cannot reliably handle the full range
 *     of Ember syntax (nested same-prefix components, named blocks, block
 *     params, Mustache expressions, etc.).
 *
 * The solution implemented here is to extract every top-level Doc:: and Hds::
 * block from the markdown string before Showdown runs, replace each block with
 * a unique opaque placeholder, run Showdown on the placeholder-substituted
 * string (which contains no custom Ember tags, so <p> wrapping is never
 * triggered), and then restore the original blocks verbatim.
 *
 * ─── Extraction rules ────────────────────────────────────────────────────────
 *
 * Only TOP-LEVEL Doc:: and Hds:: blocks are extracted. "Top-level" means
 * depth 0 — not already inside another Doc::/Hds:: block being extracted.
 *
 * Depth tracking increments only on opening Doc::/Hds:: tags (non-self-
 * closing) and decrements only on closing </Doc::…> and </Hds::…> tags.
 * Everything else — named blocks (<:head>), contextual/yielded components
 * (<A.Title>, <C.Property>), self-closing tags, Mustache expressions — is
 * treated as interior content and passes through unmodified.
 *
 * Self-closing top-level tags (<Doc::Placeholder … />) are extracted as
 * single-token blocks with no depth change.
 *
 * ─── Ember syntax handled correctly ─────────────────────────────────────────
 *
 *  • Block params:        <Hds::Alert as |A|>   — part of the opening tag,
 *                                                  matched by [^>]* before >
 *  • Yielded components:  <A.Title>, </A.Title>  — dot in tag name, ignored
 *                                                  by depth counter (no ::)
 *  • Named blocks:        <:head>, </:head>       — colon prefix, ignored
 *  • Mustache expressions: {{this.noop}}          — raw text, never parsed
 *  • Nested same-prefix:  <Doc::ComponentApi>
 *                           <Doc::ComponentApi>   — stack handles depth,
 *                           </Doc::ComponentApi>    inner close → depth 1,
 *                         </Doc::ComponentApi>      outer close → depth 0
 */

// Use a PHP processing instruction as the placeholder format.
// Showdown's hashHTMLBlocks function specifically skips <?php ... ?> tags,
// passing them through verbatim without any markdown transformation applied.
// See: https://github.com/showdownjs/showdown/blob/master/src/subParsers/makehtml/hashHTMLBlocks.js#L93-L95
// This is the same technique used by content-blocks.js in this codebase.
const PLACEHOLDER_PREFIX = '<?php hds-custom-block-start id="';
const PLACEHOLDER_SUFFIX = '" ?>';

// All three regexes below require the tag to start at the beginning of a line
// (optionally preceded by horizontal whitespace). This is how Ember component
// tags are always authored in markdown — never mid-sentence or inside an
// attribute value string. The line-start anchor prevents the scanner from
// matching, e.g., @name="<Hds::Alert>" or `<Doc::Layout>` as real tags.

// Matches an opening Doc:: or Hds:: tag (non-self-closing) at line start.
// Capture group 1: the full tag name (e.g. "Doc::Layout", "Hds::Alert").
const OPEN_TAG_RE = /^[ \t]*<((?:Doc::|Hds::)[^\s/>]+)[^>]*(?<!\/)[>]/m;

// Matches a self-closing Doc:: or Hds:: tag at line start.
const SELF_CLOSING_TAG_RE = /^[ \t]*<(?:Doc::|Hds::)[^\s/>][^>]*\/>/m;

// Matches a closing Doc:: or Hds:: tag at line start.
// Capture group 1: the full tag name.
const CLOSE_TAG_RE = /^[ \t]*<\/((?:Doc::|Hds::)[^\s>]+)>/m;

/**
 * Returns a copy of `markdown` where fenced code blocks (``` ... ```) and
 * inline code spans (` ... `) are replaced with space characters of the same
 * length. This preserves all character positions so that indices found by
 * scanning the masked string are valid offsets into the original string.
 *
 * We mask rather than delete so that the tag scanner never mistakes a
 * Doc::/Hds:: string inside a code region for a real component tag.
 */
function maskCodeRegions(markdown) {
  // Replace each matched region with spaces of equal length.
  const blank = (s) => ' '.repeat(s.length);

  return (
    markdown
      // Fenced code blocks: ``` (optionally with a language tag) ... ```
      // Also handles ~~~ fences.
      .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\1[ \t]*$/gm, blank)
      // Inline code spans: `...` (non-greedy, single-line)
      .replace(/`[^`\n]+`/g, blank)
  );
}

/**
 * Scans `markdown` for the next Doc::/Hds:: token starting at `pos`.
 * Returns { type, tagName, start, end } or null if none found.
 *
 * `masked` is the output of maskCodeRegions(markdown) — the scanner runs on
 * the masked copy so it never matches tags inside code regions, but `start`
 * and `end` are valid positions in the original `markdown` string.
 *
 * type is one of: 'open' | 'close' | 'selfClosing'
 */
function nextToken(masked, pos) {
  const slice = masked.slice(pos);

  const openMatch = OPEN_TAG_RE.exec(slice);
  const selfMatch = SELF_CLOSING_TAG_RE.exec(slice);
  const closeMatch = CLOSE_TAG_RE.exec(slice);

  const candidates = [
    openMatch && {
      type: 'open',
      tagName: openMatch[1],
      start: pos + openMatch.index,
      end: pos + openMatch.index + openMatch[0].length,
    },
    selfMatch && {
      type: 'selfClosing',
      tagName: null,
      start: pos + selfMatch.index,
      end: pos + selfMatch.index + selfMatch[0].length,
    },
    closeMatch && {
      type: 'close',
      tagName: closeMatch[1],
      start: pos + closeMatch.index,
      end: pos + closeMatch.index + closeMatch[0].length,
    },
  ].filter(Boolean);

  if (candidates.length === 0) return null;

  // Return the earliest token; ties broken by type order (open > self > close)
  return candidates.reduce((earliest, candidate) =>
    candidate.start < earliest.start ? candidate : earliest,
  );
}

/**
 * Extracts all top-level Doc::/Hds:: blocks from `markdown`, replacing each
 * with a placeholder string. Returns { processedMarkdown, blockMap } where
 * blockMap maps each placeholder to the original block text.
 */
export function extractCustomBlocks(markdown) {
  const blockMap = {};
  let result = '';
  let pos = 0;
  let counter = 0;

  // Mask code regions so the tag scanner ignores Doc::/Hds:: strings inside
  // fenced code blocks and inline code spans.
  const masked = maskCodeRegions(markdown);

  while (pos < markdown.length) {
    const token = nextToken(masked, pos);

    if (!token) {
      // No more custom tags — append the rest as-is
      result += markdown.slice(pos);
      break;
    }

    // Append everything before this token verbatim
    result += markdown.slice(pos, token.start);

    if (token.type === 'selfClosing') {
      // Self-closing top-level block — extract as-is
      const block = markdown.slice(token.start, token.end);
      const placeholder = `${PLACEHOLDER_PREFIX}${counter++}${PLACEHOLDER_SUFFIX}`;
      blockMap[placeholder] = block;
      result += placeholder;
      pos = token.end;
    } else if (token.type === 'open') {
      // Opening tag — track depth to find the matching close
      const stack = [token.tagName];
      let scanPos = token.end;

      while (stack.length > 0 && scanPos < markdown.length) {
        const inner = nextToken(masked, scanPos);
        if (!inner) break;

        if (inner.type === 'open') {
          stack.push(inner.tagName);
          scanPos = inner.end;
        } else if (inner.type === 'selfClosing') {
          scanPos = inner.end;
        } else if (inner.type === 'close') {
          // Only pop the stack if the closing tag matches the top of the stack.
          // This correctly handles mismatched tag names (shouldn't occur in
          // valid Ember templates, but be defensive).
          if (inner.tagName === stack[stack.length - 1]) {
            stack.pop();
          }
          scanPos = inner.end;
        }
      }

      const block = markdown.slice(token.start, scanPos);
      const placeholder = `${PLACEHOLDER_PREFIX}${counter++}${PLACEHOLDER_SUFFIX}`;
      blockMap[placeholder] = block;
      result += placeholder;
      pos = scanPos;
    } else {
      // close token at depth 0 — shouldn't happen in valid markdown, pass through
      result += markdown.slice(token.start, token.end);
      pos = token.end;
    }
  }

  return { processedMarkdown: result, blockMap };
}

/**
 * Restores the original custom blocks into the Showdown-processed HTML string,
 * replacing each placeholder with its original block text.
 */
export function restoreCustomBlocks(html, blockMap) {
  let result = html;
  for (const [placeholder, block] of Object.entries(blockMap)) {
    // PHP tags are passed through verbatim by Showdown (not wrapped in <p>),
    // so a simple string replacement is sufficient.
    result = result.replace(new RegExp(escapeRegex(placeholder), 'g'), block);
  }
  return result;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
