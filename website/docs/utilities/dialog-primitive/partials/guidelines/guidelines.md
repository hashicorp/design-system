## Content

### DialogPrimitive::Header
The header is comprised of the following: `Title icon`, `Tagline`, `Title`, and `Dismiss button`.

#### Title Icon
- Can be optionally displayed.
- Purely decorative. Is the visual flourish to the title and, if displayed, the tagline.

#### Tagline
- Can be optionally displayed.
- Is used to maintain context of the dialog's feature, function or flow in which it was triggered by.
- Should be limited to a couple of words.

#### Title
- Is required
- Must explain or provide context to the body's content

#### Dismiss Button
- Is required
- Allows the user to close the dialog on click (or pressing the `escape` key)

### DialogPrimitive::Description
- Can be optionally displayed.
- This text is used to provide additional information regarding the dialog

### DialogPrimitive::Body
- Is required
- A container of content, ranging from text to simple or complex forms

### DialogPrimitive::Footer
- Is required
- Can have up to three call to actions
- Reference [button content](/components/button#content) for text guidelines