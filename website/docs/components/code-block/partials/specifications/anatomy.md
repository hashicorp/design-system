## Anatomy

![Anatomy of codeBlock](/assets/components/code-block/code-block-anatomy.png)

| Element          | Usage    |
|------------------|----------|
| Title            | Optional |
| Description      | Optional |
| Line numbers     | Optional |
| Copy button      | Optional |
| Code snippet     | Required |
| Highlighted line | Optional |

## Syntax highlighting

To aid in understanding how the highlighting theme is applied via Prism's tokens, we've provided a high-level, non-exhaustive list of token names and how they might be applied depending on the syntax.

| Color | Usage |
|-------|-------|
| Cyan | Property, url, or operator |
| Blue | Function, builtins |
| Orange | Strings, characters |
| Purple | Booleans, numbers |
| Green | Keywords, class names, saving the world |
| Red | Important items |
| White | Default color within the code block, also used for punctuation (`<`, `{ }`, `=`, etc) |
| Gray | Used for comments across languages |

Working directly with an engineering partner can reveal exactly how a snippet will render in the component and should be the first course of action when creating custom snippets. Understanding Prism's [token hierarchy](https://prismjs.com/tokens.html) can also be helpful when creating examples.

If you have questions or need assistance creating custom examples, don’t hesitate to reach out the the HDS team for [support](/about/support).