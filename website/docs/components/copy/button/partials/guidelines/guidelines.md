## Usage

### When to use

- Use the `CopyButton` to provide users with a convenient way to copy large text blocks, such as code snippets or API keys.
- Use when users need to copy data like tokens or URLs from within the content.
- Use the `CopyButton` with clear visual cues or explanatory text indicating what will be copied. 

### When not to use

- Don't place the `CopyButton` in a disconnected location. It should be visually associated with specific content or context to prevent confusion.

### Sizes
 
The preferred size for the `CopyButton` is medium, but you can choose a different size that best fits the user interface. For example, avoid using a medium-sized `CopyButton` in a small code block where it might look out of place.

## Content

Keep the text short, around 25 characters. Provide enough context to be helpful, avoiding full sentences. Maintain consistent language within your product. For example, if you use "Copy" on one page, stick with it throughout the application instead of "Duplicate."

## Copying Important Information

When using the `CopyButton` or `CopySnippet` components, it's essential to consider when to use them. Keep the following guidelines in mind:

- Meaningful Content: Reserve the CopyButton or CopySnippet components for significant or essential content that requires copying. Avoid using them for trivial or easily accessible text.

- Value and Need: Prioritize using these components for content that holds value or requires sharing and referencing in other contexts.

- Assess the risk: Evaluate the potential for accidentally replacing valuable data in a user's clipboard. Take necessary precautions to avoid data loss or inconvenience.

- Safeguards and confirmation: Implement safeguards such as confirmation mechanisms or prompts to ensure intentional copying and prevent accidental data loss.

## Related

- [Copy Snippet](/components/copy/snippet)
- [Button](/components/button)
