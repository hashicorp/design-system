/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export const removeAutoPTags = () => {
  const outputExtension = {
    type: 'output',
    filter: (text) => {
      /*
        Pass 0 — escape Handlebars/Mustache delimiters ({{ and }}) inside <code> and <pre>
        elements so that Glimmer's template compiler does not attempt to evaluate them as
        live Handlebars expressions. Showdown passes {{ }} through verbatim, which causes
        Glimmer to try to resolve e.g. {{component "SomeName"}} as a real component call.

        We replace {{ with &#123;&#123; and }} with &#125;&#125; only inside the content of
        <code>...</code> and <pre>...</pre> elements (including <pre><code>...</code></pre>).
        Attribute values are not affected because attributes use double-quoted strings and
        the regex only targets the element's text content between the tags.
      */
      text = text.replace(
        /(<(?:code|pre)[^>]*>)([\s\S]*?)(<\/(?:code|pre)>)/g,
        (_match, openTag, content, closeTag) => {
          const escaped = content
            .replace(/\{\{/g, '&#123;&#123;')
            .replace(/\}\}/g, '&#125;&#125;');
          return openTag + escaped + closeTag;
        },
      );

      /*
        Pass 1 — remove orphaned </p> tags that Showdown inserts immediately after a custom
        component opening tag when a block-level HTML element (e.g. <pre>, <div>, <table>) is
        the first child of the component. The HTML spec auto-closes an open <p> before any block
        element, so Showdown emits:

            <Doc::Layout @spacing="12px">
              </p>          ← orphaned, must be removed
            <pre>...</pre>
            <p class="doc-markdown-p"></Doc::Layout>   ← see Pass 2

        Pattern: an open custom tag (Doc:: or Hds::) whose body begins with optional whitespace
        followed immediately by a bare </p>.
      */
      const orphanedClosePRegex =
        /(<(?:Doc::|Hds::)[^>]*>)([\s]*)<\/p>/g;

      text = text.replace(orphanedClosePRegex, (_match, openTag, whitespace) => {
        return openTag + whitespace;
      });

      /*
        Pass 2 — remove orphaned <p class="doc-markdown-p"> tags in two sub-cases:

        2a) The <p> appears immediately before a custom component closing tag. Showdown opens a new
        <p> to resume "paragraph" context and the custom closing tag ends up inside it:

            <p class="doc-markdown-p"></Doc::Layout>   ← orphaned <p>, must be removed

        2b) The <p> immediately wraps a self-closing custom tag and Showdown omits the </p>
        entirely (it is suppressed before a following block element such as a heading):

            <p class="doc-markdown-p"><Doc::Placeholder ... />   ← orphaned <p>, no </p> follows

        Pattern: a <p class="doc-markdown-p"> tag followed immediately (with optional whitespace)
        by either a closing Doc::/Hds:: tag OR a self-closing Doc::/Hds:: tag.
      */
      const orphanedOpenPRegex =
        /<p class="doc-markdown-p">([\s]*(?:<\/(?:Doc::|Hds::)[^>]*>|<(?:Doc::|Hds::)[^>]*\/>))/g;

      text = text.replace(orphanedOpenPRegex, (_match, customTag) => {
        return customTag;
      });

      /*
        Pass 3 (existing) — remove <p class="doc-markdown-p"> wrappers around custom elements
        that were correctly kept together by Showdown (i.e. no block-level children split the <p>).

        This regex is designed to match specific patterns in HTML text, particularly focusing on
        custom elements wrapped inside <p class="doc-markdown-p"> tags. Let's break it down:
        -   /<p class="doc-markdown-p">: This part matches the opening <p> tag with a class attribute doc-markdown-p.
            It looks for the exact sequence <p class="doc-markdown-p">.
        -   \s*: Matches any whitespace character (spaces, tabs, newlines) zero or more times. This allows for flexibility
            in formatting, so the pattern can match even if there are spaces or other whitespace characters between
            the <p> tag and the custom element inside it.
        -   (<: This marks the beginning of the capture group for the custom element.
            It matches the < character, indicating the start of an HTML tag.
        -   ((Doc::|Hds::): This is a nested capture group within the first one. It matches either Doc:: or Hds::,
            which are prefixes for custom elements. The | character acts as an "or" operator.
        -   [^>\s]+): This part matches one or more characters that are not > (closing tag character) or whitespace.
            This effectively captures the tag name of the custom element.
        -   [^>]*?: Matches zero or more characters that are not >, as few times as possible, extending up to the next part
            of the pattern. This allows for attributes within the tag to be matched without capturing the closing > of the tag.
        -   (?:\/>|>[\s\S]*?<\/\2>): This is a non-capturing group (due to ?:) that matches either a self-closing tag (/>) or a
            pair of opening and closing tags (>...<\/\2>). The \2 refers back to the second capture group, ensuring that the
            closing tag matches the opening custom element tag name. [\s\S]*? matches any character, including newlines, as few
            times as possible to reach the closing tag.
        -   )\s*<\/p>: This part matches any trailing whitespace characters after the custom element and then matches the
            closing </p> tag.
        -   /g: This is a flag for the regular expression that indicates it should match all occurrences within the string,
            not just the first one.
      */
      const blockCustomElementRegex =
        /<p class="doc-markdown-p">\s*(<((Doc::|Hds::)[^>\s]+)[^>]*?(?:\/>|>[\s\S]*?<\/\2>))\s*<\/p>/g;

      // Replace the <p class="doc-markdown-p"> tag around the custom elements
      text = text.replace(blockCustomElementRegex, (_match, p1) => {
        // Return only the custom element, removing the wrapping <p> tag
        return p1;
      });

      return text;
    },
  };
  return [outputExtension];
};
