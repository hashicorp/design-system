/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const removeAutoPTags = () => {
  const outputExtension = {
    type: 'output',
    filter: (text) => {
      /* 
        This regular expression is designed to match specific patterns in HTML text, particularly focusing on 
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
      text = text.replace(blockCustomElementRegex, (match, p1) => {
        // Return only the custom element, removing the wrapping <p> tag
        return p1;
      });

      return text;
    },
  };
  return [outputExtension];
};
