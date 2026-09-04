/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import showdown from 'showdown';

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

// Matches a closing Doc:: or Hds:: tag anywhere in the string (NOT anchored to
// line start). Used only for the inner depth scanner to detect same-line close
// tags (e.g. <Doc::Badge @type="success">text</Doc::Badge> on a single line).
// The line-start anchor is intentionally omitted here.
const INLINE_CLOSE_TAG_RE = /<\/((?:Doc::|Hds::)[^\s>]+)>/;

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
      // Self-closing top-level block — extract as-is.
      // A trailing newline is added after the placeholder so that Showdown
      // always sees a blank-line boundary between this placeholder and whatever
      // follows. Without it, a subsequent raw HTML tag (e.g. <br />) on the
      // very next line causes Showdown to wrap both in a <p>, which means the
      // restored block ends up inside a <p> — invalid in a Glimmer template.
      const block = markdown.slice(token.start, token.end);
      const placeholder = `${PLACEHOLDER_PREFIX}${counter++}${PLACEHOLDER_SUFFIX}`;
      blockMap[placeholder] = block;
      result += placeholder + '\n';
      pos = token.end;
    } else if (token.type === 'open') {
      // Opening tag — track depth to find the matching close.
      //
      // Special case: if the opening tag and its matching close are on the
      // same line (e.g. <Doc::Badge @type="x">text</Doc::Badge>), the
      // CLOSE_TAG_RE (which requires line-start) won't find the close tag
      // inside the inner scan loop. Detect this up front: look for a
      // </TagName> on the same line as the open tag, before the first newline.
      const lineEnd = markdown.indexOf('\n', token.end);
      const restOfLine =
        lineEnd === -1
          ? markdown.slice(token.end)
          : markdown.slice(token.end, lineEnd);
      const sameLine = INLINE_CLOSE_TAG_RE.exec(restOfLine);
      if (sameLine && sameLine[1] === token.tagName) {
        // The open and close are on the same line — treat the whole thing
        // (from the start of the open tag to the end of the close tag) as
        // a single block with no depth tracking needed.
        const closeEnd = token.end + sameLine.index + sameLine[0].length;
        const block = markdown.slice(token.start, closeEnd);
        const placeholder = `${PLACEHOLDER_PREFIX}${counter++}${PLACEHOLDER_SUFFIX}`;
        blockMap[placeholder] = block;
        result += placeholder + '\n';
        pos = closeEnd;
        continue;
      }

      const stack = [token.tagName];
      let scanPos = token.end;

      while (stack.length > 0 && scanPos < markdown.length) {
        const inner = nextToken(masked, scanPos);
        if (!inner) break;

        if (inner.type === 'open') {
          // Same-line detection: if the open tag and its matching close tag appear
          // on the same line (e.g. <Hds::Link::Inline @href="#">text</Hds::Link::Inline>),
          // CLOSE_TAG_RE (anchored to line start) will never find the close tag.
          // Detect this here and skip the stack push entirely — the tag pair is
          // self-contained on one line and does not affect block depth.
          const innerLineEnd = markdown.indexOf('\n', inner.end);
          const innerRestOfLine =
            innerLineEnd === -1
              ? markdown.slice(inner.end)
              : markdown.slice(inner.end, innerLineEnd);
          const innerSameLine = INLINE_CLOSE_TAG_RE.exec(innerRestOfLine);
          if (innerSameLine && innerSameLine[1] === inner.tagName) {
            // The open and close are on the same line — skip past the close tag
            // without touching the stack.
            scanPos = inner.end + innerSameLine.index + innerSameLine[0].length;
          } else {
            stack.push(inner.tagName);
            scanPos = inner.end;
          }
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
      // Same trailing-newline guarantee as for self-closing blocks above.
      result += placeholder + '\n';
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
 * Processes markdown text content inside a restored block before it is
 * inserted into the final HTML string.
 *
 * Blocks are extracted verbatim from the raw markdown and restored after
 * Showdown runs, so any markdown syntax inside them is never converted.
 * This function walks the block line by line, identifies runs of "text
 * content" lines (lines that do not start an Ember/HTML tag), passes each
 * run through Showdown for full markdown conversion, and splices the result
 * back in place of the original lines.
 *
 * A line is considered an "Ember/HTML tag line" — and left verbatim — if
 * its trimmed content starts with `<`. This covers:
 *   • Opening/closing Doc::/Hds:: tags
 *   • Contextual component tags  (<A.Title>, <C.Property …>, </C.Property>)
 *   • Raw HTML tags used for spacing  (<br />, <div>, etc.)
 *   • HTML comments  (<!-- ... -->)
 *
 * Consecutive non-tag lines are grouped into a single run and passed to
 * Showdown together, so that multi-line constructs (lists, fenced code
 * blocks, etc.) are handled correctly.
 *
 * After Showdown processes a run, the wrapping <p class="doc-markdown-p">
 * is stripped if and only if the entire output is a single such paragraph
 * (i.e. the run was a single inline sentence). Block-level output (lists,
 * pre, headings, etc.) is kept as-is.
 *
 * @param {string} block - The raw extracted block text.
 * @param {object} showdownConfig - The Showdown configuration object. A fresh
 *   Converter instance is created for each text run so that Showdown's internal
 *   state never leaks between calls and never contaminates the outer document's
 *   converter instance.
 */
function processInlineMarkdownInBlock(block, showdownConfig) {
  const lines = block.split('\n');
  const output = [];
  let textRun = [];

  // Flush a pending text run through Showdown and push the result.
  const flushTextRun = () => {
    if (textRun.length === 0) return;

    // Dedent: remove the common leading whitespace from all non-empty lines
    // before passing the run to Showdown. Without this, lines indented 4+
    // spaces (which is normal inside a <C.Property> body) would trigger
    // Showdown's indented code block rule and be wrapped in <pre><code>.
    const nonEmptyLines = textRun.filter((l) => l.trim().length > 0);
    const minIndent =
      nonEmptyLines.length > 0
        ? Math.min(...nonEmptyLines.map((l) => l.match(/^(\s*)/)[1].length))
        : 0;
    const dedented = textRun.map((l) => l.slice(minIndent));

    const markdown = dedented.join('\n');
    textRun = [];

    // Create a fresh converter for each text run so that Showdown's internal
    // hash tables (populated by makeHtml) never contaminate the outer
    // document's converter instance or each other.
    let html = new showdown.Converter(showdownConfig).makeHtml(markdown);

    // Strip a single wrapping <p class="doc-markdown-p">…</p> so that plain
    // inline sentences don't introduce a block-level element inside an Ember
    // component's attribute string or description slot. Block-level output
    // (lists, pre, headings) produces tags other than <p> and is kept as-is.
    html = html.replace(/^<p class="doc-markdown-p">([\s\S]*?)<\/p>\s*$/, '$1');

    // Escape {{ }} inside <code>/<pre> so Glimmer doesn't evaluate them.
    // (Pass 0 in remove-auto-p-tags.js does this for Showdown's main output,
    // but restored blocks are spliced in after that pipeline has already run.)
    html = html.replace(
      /(<(?:code|pre)[^>]*>)([\s\S]*?)(<\/(?:code|pre)>)/g,
      (_m, open, content, close) =>
        open +
        content
          .replace(/\{\{/g, '&#123;&#123;')
          .replace(/\}\}/g, '&#125;&#125;') +
        close,
    );

    output.push(html);
  };

  // Track whether we are inside a multi-line opening tag (i.e. the opening
  // tag has been seen on a previous line but has not yet been closed by a `>`
  // or `/>`). Lines that are attribute continuations of an open tag must be
  // kept verbatim — they must NOT be fed to Showdown as markdown.
  let insideOpenTag = false;

  for (const line of lines) {
    const trimmed = line.trimStart();

    if (insideOpenTag) {
      // We are inside a multi-line tag. Keep this line verbatim and check
      // if it closes the tag (contains `>` or `/>`).
      flushTextRun();
      output.push(line);
      // A line that closes the tag ends with `>` or `/>` (ignoring trailing
      // whitespace). The `{{...}}` Mustache expressions inside attribute
      // values can also contain `>`, so we need a heuristic: the tag is
      // closed when the line ends with `>` or `/>` after trimming, or
      // contains a bare `>` or `/>` with no other `<` on the line (which
      // would indicate a new tag opening rather than a closing `>`).
      // Simplest safe heuristic: the tag is closed when the trimmed line
      // ends with `>` or `/>`.
      if (line.trimEnd().endsWith('>')) {
        insideOpenTag = false;
      }
    } else if (trimmed.startsWith('<')) {
      // A line whose trimmed content starts with `<` is an Ember/HTML tag
      // line and must be left verbatim.
      flushTextRun();
      output.push(line);
      // If the line starts an Ember/HTML tag but does NOT contain a closing
      // `>` on the same line (i.e. the tag spans multiple lines), mark that
      // we are now inside a multi-line opening tag so subsequent attribute
      // lines are also kept verbatim.
      // We detect this by checking whether the line itself ends with `>`.
      // A tag that closes on its own line (e.g. `<Doc::Foo />` or
      // `<C.Property @name="x">`) will end with `>` and does not set the
      // insideOpenTag flag.
      if (!line.trimEnd().endsWith('>')) {
        insideOpenTag = true;
      }
    } else {
      textRun.push(line);
    }
  }
  flushTextRun();

  return output.join('\n');
}

/**
 * Restores the original custom blocks into the Showdown-processed HTML string,
 * replacing each placeholder with its original block text.
 *
 * @param {string} html - The Showdown-processed HTML string.
 * @param {object} blockMap - Map of placeholder → original block text.
 * @param {object} showdownConfig - The Showdown configuration object, passed
 *   through to processInlineMarkdownInBlock so it can create fresh converter
 *   instances without polluting any shared state.
 */
export function restoreCustomBlocks(html, blockMap, showdownConfig) {
  let result = html;
  for (const [placeholder, block] of Object.entries(blockMap)) {
    // PHP tags are passed through verbatim by Showdown (not wrapped in <p>),
    // so a simple string replacement is sufficient.
    // Process inline markdown within the block before restoring it so that
    // markdown links and backtick code spans are converted to safe HTML.
    const processedBlock = processInlineMarkdownInBlock(block, showdownConfig);
    result = result.replace(
      new RegExp(escapeRegex(placeholder), 'g'),
      processedBlock,
    );
  }
  return result;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
