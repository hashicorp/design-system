## Usage

### When to use

- When a user creates code from scratch, or requires modification from an existing source.

### When not to use

- As a read-only reference for page content, use the [Code Block](/components/code-block) instead.

## Standalone

The `isStandalone` property increases the portability of the Code Editor to ensure that it can be used in different contexts. For example, a common use case of the Code Editor is in a "standalone" context, which can be part of a form, multi-step process, and is generally a part of the normal layout flow.

![Code editor with rounded corners for enabled standalone property](/assets/components/code-editor/code-editor-rounded-standalone.png)

Sometimes it may be necessary to use the Code Editor in a more dense layout or nested within another component. In this circumstance, setting isStandalone to false ensures that the Code Editor fits alongside other elements, in a split view, or as part of a larger layout mechanism.

### Header

The header is optionally available within the Code Editor. It consists of three sections that each can be toggled as needed: The text content that’s inclusive of the title and description, an actions container for secondary actions, and a custom yielded section of primary actions.

## When to use a title and description

A title and description help provide additional contextual information for the Code Editor. Keep in mind that an accessible name is mandatory and can either be provided by the title or by an external text element.

![A partial form with a radio group labeled with "Enforement behavior" and then the options "Advisory" with helper text "failed policies produce a warning", "Soft mandatory" with helper text "Failed policies can be overriden", "Hard mandatory" with helper text "Failed policies stop the run". Then the Code Editor with an external acessible name/title "Policy code (Sentinel)"](/assets/components/code-editor/code-editor-external-accessible-name.png)

## Secondary actions

The secondary actions section is for two individually optional buttons: CopyButton and ExpandButton. The CopyButton copies the content of the CodeEditor to clipboard (more details can be found in the [CopyButton guidelines](/components/copy/button)), while the ExpandButton maximizes and minimizes the Code Editor view from inline to full screen (and back again). These actions are considered supporting functions that are less vital to the user’s work but are useful from time to time.

![The secondary actions container is shown twice, both with the CopyButton and Expand button. First showing the ExpandButton with the maximize icon and the second showing the ExpandButton with the minimize icon.](/assets/components/code-editor/code-editor-secondary-actions.png)

## Custom yielded elements

This space is reserved for primary custom yielded elements. Primary elements are defined as useful or even necessary for the user to do their work.

![The Code Editor with the title "CodeEditor title," with the secondary actions showing both the CopyButton and ExpandButton. The custom yielded element section showing a toggle with the label "Reveal secrets."](/assets/components/code-editor/code-editor-primary-yielded-elements.png)

Currently, the Code Editor has very limited support for dark mode styles (only exposed styles are for buttons) and requires independent maintenance until a dark mode theme is released.

### External elements

There may be elements or functions outside the Code Editor component that affect the content within the Code Editor. In circumstances like this, turning off the header and only keeping the code content visible helps unify the editor with other elements on the page.

![An external accessible name/title with a coupled search field, dropdown labeled with "Copy", another dropdown labeled with "Version" and a button labeled with "Create new version"](/assets/components/code-editor/code-editor-external-functions.png)


## Active line highlighting

When a user is editing code on a single line, a highlight will be present to emphasize their location in the Code Editor.

![The Code Editor's line 1 with the active line highlight.](/assets/components/code-editor/code-editor-code-active-line.png)

When a user selects code (even if it’s within a single line), the active line highlight will no longer be present, however, the line number on the left will remain highlighted. The highlighted number will be present wherever the cursor is located.

![The Code Editor's line 1 to 3 selected and showing the green selection highlighted color](/assets/components/code-editor/code-editor-code-active-line.png)

## Bracket highlighting

The Code Editor will automatically close quotes and brackets as the user writes their code. When the user’s cursor is next to a bracket, that bracket will highlight to show the start and end of the pair.

![The Code Editor's line 1 is highlighted and the user's cursor is next to a bracket. That bracket and its pair are both highlighted with a white border.](/assets/components/code-editor/code-editor-bracket-highlighting.png)

## Language

Language determines how syntax highlighting is applied and formatted within the editor but is handled a bit differently between the Ember and Figma components.

The **Ember** component uses [CodeMirror](https://codemirror.net/) to handle syntax highlighting and comes with a pre-defined set of languages.

In **Figma** we provide a handful of example languages that are intended to be representative of the end result in production. Syntax highlighting in Figma is a non-trivial process and requires the manual application of color styles to each "type" of code. Despite this, creating a custom code snippet with the Code Editor is supported by typing/pasting into the text layer, but syntax highlighting will not be automatically applied.

### Applying syntax highlighting

If you wish to create custom examples using the Code Editor, we publish all of the relevant syntax highlighting variables in the [HDS Components v2.0](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?node-id=67166-37020&t=gWdKy44MzTP4cTRo-1) library. However, due to the number of languages supported by the component, the color variables use a generic naming schema (e.g., cyan, red, purple) to remain as agnostic as possible when being applied to different languages.
For more details around syntax visit the [specifications](https://helios.hashicorp.design/components/code-editor?tab=specifications).
