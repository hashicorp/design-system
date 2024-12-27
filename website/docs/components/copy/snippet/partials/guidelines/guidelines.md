## Usage

### When to use

- To enable users to copy code snippets, such as URLs, tokens, IDs, etc.

### When not to use

- To copy content outside its container, use [Copy Button](/components/copy/button).
- In a code block, use [Copy Button](/components/copy/button).


!!! Dont

Take caution when using for longer code snippets, instead consider using a more prominent code block with a [Copy Button](/components/copy/button).

![Example of the Copy Snippet with complex code](/assets/components/copy/copy-snippet-dont.png)
!!!

## Color

The Copy Snippet comes in two colors: `primary` and `secondary`

<Doc::Layout @spacing="16px">
    <Hds::Copy::Snippet @textToCopy="Primary" /> 
    <Hds::Copy::Snippet @textToCopy="Secondary" @color="secondary" />
</Doc::Layout>

!!! Do

When multiple Copy Snippets are needed in a single page, such as in a [Table](/components/table/table), consider using the `secondary` color to reduce the prominence of each Copy Snippet.

![Example of the Copy Snippet component in a table](/assets/components/copy/copy-snippet-table-do.png)

!!!

!!! Do 

When there are many secondary links on a page, like in a stepper form, it’s important to use the `primary` color to highlight each Copy Snippet’s importance for completing a task.

![Example of the Copy Snippet component in a stepper form](/assets/components/copy/copy-snippet-stepper-do.png)

!!!

## Truncation

Truncation should be avoided as there is no current known way to make truncated content available to keyboard-only users. This is a current, known limitation of web technology.

Truncation of the Copy Snippet is optional and can be used when space is limited or when showing the full snippet isn’t necessary. When enabled, the visible content is truncated to fit within the parent container. 

!!! Dont

Avoid truncating content too soon. For shorter snippets and where space allows, show the full snippet. 

![Example of Copy Snippet component truncating too soon](/assets/components/copy/copy-snippet-truncation-dont.png)

!!!
