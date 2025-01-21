## Anatomy

![](/assets/components/code-editor/code-editor-anatomy.png)

| Element           | Usage    |
|-------------------|----------|
| Title             | Optional |
| Description       | Optional |
| Custom yielded elements       | Optional |
| Copy button       | Optional |
| FullScreen button | Optional |
| Code snippet      | Required |

## Syntax highlighting

To aid in understanding how the highlighting theme is applied via CodeMirror's tokens, we've provided a high-level, non-exhaustive list of token names and how they might be applied depending on the syntax.

<!-- algolia-ignore-start -->
| Color | Usage |
|-------|-------|
| <div class="doc-code-editor-syntax-color-preview" {{style background-color="#32FFF7"}} /> Cyan | Property, url, or operator |
| <div class="doc-code-editor-syntax-color-preview" {{style background-color="#2D8EFF"}} /> Blue | Function, builtins |
| <div class="doc-code-editor-syntax-color-preview" {{style background-color="#FFA800"}} /> Orange | Strings, characters |
| <div class="doc-code-editor-syntax-color-preview" {{style background-color="#C76CFF"}} /> Purple | Booleans, numbers |
| <div class="doc-code-editor-syntax-color-preview" {{style background-color="#86FF13"}} /> Green | Keywords, class names, saving the world |
| <div class="doc-code-editor-syntax-color-preview" {{style background-color="#FF3B20"}} /> Red | Important items |
| <div class="doc-code-editor-syntax-color-preview" {{style background-color="#EFEFF1"}} /> White | Default color within the code block, also used for punctuation (`<`, `{ }`, `=`, etc) |
| <div class="doc-code-editor-syntax-color-preview" {{style background-color="#B2B6BD"}} /> Gray | Used for comments across languages |
<!-- algolia-ignore-end -->