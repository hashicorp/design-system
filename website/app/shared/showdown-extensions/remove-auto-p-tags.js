export const removeAutoPTags = () => {
  const outputExtension = {
    type: 'output',
    filter: (text) => {
      // Define a regex pattern to match custom elements, capturing the entire element for further checking
      // This pattern matches both self-closing and non-self-closing tags, including those with attributes
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
