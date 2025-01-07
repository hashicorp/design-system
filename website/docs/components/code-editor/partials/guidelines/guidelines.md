## Usage

### When to use

- When a user needs to create code from scratch
- When code requires modification from an existing source

### When not to use

- As a read-only reference for code, use the [Code Block](/components/code-block) instead.

## Standalone

The `isStandalone` property increases the portability of the Code Editor to ensure that it can be used in different contexts. For example, a common use case of the Code Editor is in a "standalone" context, which can be part of a form, multi-step process, and is generally a part of the normal layout flow.

![Code editor with rounded corners for enabled standalone property](/assets/components/code-editor/code-editor-rounded-standalone.png)

Sometimes it may be necessary to use the Code Editor in a more dense layout or nested within another component.

![Code editor embedded inside of a larger UI, where it is highlighted where the user is actively editing.](/assets/components/code-editor/code-editor-block-level.png)

## Header

The header is optionally available within the Code Editor. It consists of three sections that can be toggled as needed: the text content that includes the title and description, an actions container for secondary actions, and a custom yielded section of primary actions.

### When to use a title and description

A title and description provides additional contextual information for the Code Editor. An accessible name is mandatory and can either be provided by the title or by an external text element.

!!! DO

![A partial form with a radio group labeled with "Enforement behavior" and then the options "Advisory" with helper text "failed policies produce a warning", "Soft mandatory" with helper text "Failed policies can be overriden", "Hard mandatory" with helper text "Failed policies stop the run". Then the Code Editor with an external acessible name/title "Policy code (Sentinel)"](/assets/components/code-editor/code-editor-external-do-accessible-name.png)

This provides an accessible name for the Code Editor so that a user and assistive technology can understand its purpose.

!!!

!!! DONT

![A partial form with a radio group labeled with "Enforement behavior" and then the options "Advisory" with helper text "failed policies produce a warning", "Soft mandatory" with helper text "Failed policies can be overriden", "Hard mandatory" with helper text "Failed policies stop the run". The Code Editor has no accessible name.](/assets/components/code-editor/code-editor-dont-external-accessible-name.png)

Assuming a user would understand the intent of the Code Editor without providing an accessible name will cause confusion and fail on accessibility requirements.

!!!

## Secondary actions

The secondary actions section is for two individually optional buttons: CopyButton and a button to expand the editor. The CopyButton copies the content of the CodeEditor to clipboard (more details can be found in the [CopyButton guidelines](/components/copy/button)), while the other button maximizes and minimizes the Code Editor view from inline to full screen (and back again). These actions are considered supporting functions that are less vital to the user’s work but may be useful.

![The secondary actions container is shown twice, both with the CopyButton and Expand button. First showing the FullScreenButton with the maximize icon and the second showing the FullScreenButton with the minimize icon.](/assets/components/code-editor/code-editor-secondary-actions.png)

## Custom yielded actions

This space is reserved for primary custom yielded actions. Primary actions are defined as necessary for the user to complete their work.

![The Code Editor with the title "CodeEditor title," with the secondary actions showing both the CopyButton and FullScreenButton. The custom yielded element section showing a toggle with the label "Reveal secrets."](/assets/components/code-editor/code-editor-primary-yielded-actions.png)

The Code Editor has limited support for dark mode styles and requires consumer maintenance until a dark mode theme is released. Only Buttons have pre-defined dark mode styles in the Code Editor.

### External elements

Some elements or functions outside the Code Editor may affect the content within the Code Editor. In this case, we recommend turning off the header helps unify the editor with the nearby elements.

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
