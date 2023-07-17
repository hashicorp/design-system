## Usage

### When to use

- Use the `CopySnippet` component when you want users to be able to copy code snippets or text, such as URLs, tokens, or IDs.

- Use when users need to extract and use specific information like API keys, configuration settings, or unique identifiers.

### When not to use

- Don’t use a `CopySnippet` in a code block. Instead, use a `CopyButton.`

- Avoid using the `CopySnippet` component for secure or sensitive information to maintain security. Instead, use, the component name, and paired with the `CopyButton`.

- Take precautions to prevent accidental overwriting of important clipboard content using the `CopySnippet` component.

- Consider alternative presentation approaches if the content within the `CopySnippet` component has complex formatting or requires additional context for proper understanding.

## Truncation

Truncating a `CopySnippet` without accessible alternatives can make it difficult for keyboard users to understand and interact with the content.

1. Incomplete Information: Keyboard users need the full text to understand the `CopySnippet`. Truncation removes essential details, making it hard for them to grasp the complete context or purpose of the copied content.

2. Navigation Challenges: Truncated text disrupts keyboard navigation, causing difficulty locating and interacting with the truncated parts. This can lead to clarity and satisfaction for users.

3. Limited Interaction: Truncation restricts keyboard users from copying the entire content of the `CopySnippet`. Access to the complete text is crucial for accurately copying the intended information.

4. Lack of Context: Truncated text in a `CopySnippet` makes it harder for keyboard users to understand the meaning or significance of the content. They may need help remembering essential details or grasping the copied text’s full context.

To ensure accessibility, we recommend to not truncate the `CopySnippet` without accessible alternatives.

- Consider showing the complete text on user interaction or providing tooltips with additional details that can be accessed using the keyboard.
