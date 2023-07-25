## Usage

### When to use

- To allow users to copy code snippets, such as URLs, tokens, IDs, etc.

### When not to use

- To copy content outside its container, use [Copy Button](/components/copy/button).
- In a code block, use [Copy Button](/components/copy/button).


!!! Dont

Take caution when using for longer code snippets, instead consider using a more prominent code block with a [Copy Button](/components/copy/button).

![Example of the copy snippet component not using proper usage] (/assets/components/copy/copy-snippet-dont.png)
!!!

## Color
The `Copy::Snippet` comes in two colors: `primary` and `secondary`

<Doc::Layout @spacing="16px">
<Hds::Copy::Snippet @textToCopy="Primary" /> 
<Hds::Copy::Snippet @textToCopy="Secondary" @color="secondary" />
</Doc::Layout>

!!! Do

When needing multiple `Copy::Snippets` in a single page, such as a Table, consider using the `secondary` color to reduce the prominence of each `Copy::Snippet`.

![Example of the copy snippet component in a table](/assets/components/copy/copy-snippet-table-do.png)

!!!

## Truncation

Truncation of the `Copy::Snippet` is optional and can be used when space is limited or showing the full snippet isn't necessary. When enabled, the visible content is truncated to fit within the parent container. 

!!! Dont

Avoid truncating content too soon. For shorter snippets and where space allows, show the full snippet. 

![Example of CopySnippet component truncating to soon](/assets/components/copy/copy-snippet-truncation-dont.png)

!!!

## Related

- [Copy Button](/components/copy/button)
- [Button](/components/button)