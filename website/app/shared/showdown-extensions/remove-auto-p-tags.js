export const removeAutoPTags = () => {
  const outputExtension = {
    type: 'output',
    filter: (text) => {
      // Define an array of excluded inline elements
      const excludedInlineElements = ['Doc::CopyButton', 'Doc::LinkWithIcon'];

      // Define a regex pattern to match custom elements, capturing the entire element for further checking
      // This pattern matches both self-closing and non-self-closing tags, including those with attributes
      const blockCustomElementRegex =
        /<p class="doc-markdown-p">\s*(<((Doc::|Hds::)[^>\s]+)[^>]*?(?:\/>|>[\s\S]*?<\/\2>))\s*<\/p>/g;

      // Replace the <p class="doc-markdown-p"> tag around the custom elements, unless the element is in the excluded list
      text = text.replace(
        blockCustomElementRegex,
        (match, p1, tagNameWithNamespace) => {
          // Extract the tag name without attributes for checking against the excluded list
          const tagName = tagNameWithNamespace.split(' ')[0];

          // Check if the extracted tagName is in the excludedInlineElements array
          if (excludedInlineElements.includes(tagName)) {
            // If the element is excluded, return the original match, preserving the wrapping <p> tag
            return match;
          } else {
            // If the element is not excluded, return only the custom element, removing the wrapping <p> tag
            return p1;
          }
        }
      );

      return text;
    },
  };
  return [outputExtension];
};
