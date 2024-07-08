export const removeAutoPTags = () => {
    const outputExtension = {
      type: 'output',
      filter: (text) => {
        // Define a regex pattern for matching a block of Doc::Anything or HDS:: elements wrapped in <p class="doc-markdown-p">
        // This pattern attempts to match more complex nested structures by looking for the opening and closing tags of custom elements.
        const blockCustomElementRegex = /<p class="doc-markdown-p">\s*((<(Doc::|Hds::)[^>]+>[\s\S]*?<\/(Doc::|Hds::)[^>]+>\s*)+)<\/p>/g;
  
        // Replace the <p class="doc-markdown-p"> tag around the block of Doc:: or HDS:: elements, preserving the block structure
        text = text.replace(blockCustomElementRegex, '$1');
  
        return text;
      },
    };
    return [outputExtension];
};