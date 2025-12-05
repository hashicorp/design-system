## Usage

### When to use

- When a user needs to create code from scratch.
- When code requires modification from an existing source.

### When not to use

- As a read-only reference for code, use the [Code Block](/components/code-block) instead.

## Standalone

The `isStandalone` property increases the portability of the Code Editor to ensure that it can be used in different contexts. A common use case of the Code Editor is in a “standalone” context, which can be part of a form or multi-step process and is generally a part of the normal layout flow.

![Code Editor with rounded corners for enabled standalone property](/assets/components/code-editor/code-editor-rounded-standalone.png)

Sometimes it may be necessary to use the Code Editor in a more dense layout or nested within another component.

![Code Editor embedded inside of a logs UI, where the corners are squared to fit within container.](/assets/components/code-editor/code-editor-block-level.png)

## Header

An optional header is available within the Code Editor. It consists of three sections that can be toggled as needed:

- the text content that includes the title and description
- an actions container for secondary actions
- a custom content section for adding primary actions

### When to use a title and description

A title and description provides additional contextual information for the Code Editor. An accessible name is mandatory and can either be provided by the title or by an external text element.

!!! Do

Provide an accessible name for the Code Editor so that users of assistive technology can understand its purpose.

![A Code Editor embedded in a form following a set of radio buttons. It has the heading “Policy code (Sentinel)” immediately before.](/assets/components/code-editor/code-editor-do-external-accessible-name.png)

!!!

!!! Dont

Don't assume all users will understand the purpose of the Code Editor without providing an accessible name. Not providing one may cause confusion and is an accessibility failure.
![A Code Editor embedded in a form following a set of radio buttons. The Code Editor has no title labelling it.](/assets/components/code-editor/code-editor-dont-external-accessible-name.png)

!!!

## Secondary actions

The secondary actions section supports two optional buttons: the [Copy Button](/components/copy/button), and a “full screen” button. The Copy Button copies the content of the Code Editor to the clipboard, while the full screen button toggles the size of the Code Editor from inline view to full screen.

![The secondary actions container is shown twice, both with the Copy Button and full screen button; the first showing the full screen button with the maximize icon, and the second showing it with the minimize icon.](/assets/components/code-editor/code-editor-secondary-actions.png)

## Custom actions

!!! Callout

The Code Editor has limited support for dark mode styles. Buttons have pre-defined dark mode styles, but all other components require manual color adjustments until a dark mode theme is released. Please [contact the Design Systems Team](/about/support) for help translating components into dark mode.
!!!

Custom primary actions can be added to the header. Primary actions include those necessary for the user to complete their work.

Here is an example of a custom action to reveal secrets.

![The Code Editor with the title “CodeEditor title”. The custom yielded section has a “Reveal secrets” toggle.](/assets/components/code-editor/code-editor-primary-yielded-elements.png)

## External elements

Some elements or functions outside the Code Editor may affect the content within the Code Editor. In this case, we recommend turning off the header to visually couple the editor with the nearby controlling elements.

![A Code Editor with the external title “Automations and expressions” coupled with a filter input, “Copy” dropdown, “Version” dropdown, and a “Create new version” button.](/assets/components/code-editor/code-editor-external-functions.png)

## Active line highlighting

When a user edits a line of code, a highlight will display to show their location within the Code Editor.

![The Code Editor's line 1 with the active line highlight, shown with a blinking cursor and border around the entire line.](/assets/components/code-editor/code-editor-code-active-line.png)

When a user selects a piece of code, the active line highlight no longer displays although the line number of the last line of the selection will be highlighted.

![The Code Editor's line 1 to 3 selected and showing the green selection highlighted color](/assets/components/code-editor/code-editor-line-selection.png)

## Bracket highlighting

The Code Editor automatically closes open quotes and brackets as the user types. When the user’s cursor is next to a bracket, the bracket will highlight to show the start and end of the pair.

![The Code Editor's line 1 is highlighted and the user's cursor is next to a bracket. That bracket and its pair are both highlighted with a white border.](/assets/components/code-editor/code-editor-bracket-highlighting.png)

## Language

Language determines how syntax highlighting is applied and formatted within the editor but is handled a bit differently between the Ember and Figma components.

The **Ember** component uses [CodeMirror](https://codemirror.net/) to handle syntax highlighting and comes with a pre-defined set of [languages](/components/code-editor?tab=code#language-1).

In **Figma** we provide a handful of example languages intended as visual examples. Syntax highlighting in Figma is a non-trivial process and requires the manual application of color styles to each “type” of code. You are still able to add a custom code snippet to the Figma component by typing/pasting into the text layer, but syntax highlighting will not be automatically applied.

### Applying syntax highlighting

If you wish to create custom examples using the Code Editor, we publish all of the relevant syntax highlighting variables in the [HDS Components v2.0](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?node-id=67166-37020&t=gWdKy44MzTP4cTRo-1) library. However, due to the number of languages supported by the component, the color variables use a generic naming schema (e.g., cyan, red, purple) to remain as agnostic as possible when being applied to different languages.
For more details around syntax, visit the [specifications](/components/code-editor?tab=specifications).

## Linting

!!! Info

Linting is only available in the Ember component and is not supported in Figma.
!!!

The Code Editor supports linting for JSON using [CodeMirror6](https://codemirror.net/examples/lint/). This feature highlights all errors with an underline and an icon next to the line number. Each icon has a tooltip explaining the error on the associated line.

![Code editor with linting errors. On hover of an icon indicating an error on a line, a tooltip displays details on the linting error.](/assets/components/code-editor/codeeditor-linting-preview-tooltip.png)

When linting is enabled, the Code Editor will have a minimum height set by default to avoid the alert dialog covering all the content within the editor when opened. The minimum height for the Code Editor with linting is 160px. The linting alert dialog is always 80px in height.

![Code editor with linting errors. A red x icon is added to each line with errors, and the text of the line has a red underline.](/assets/components/code-editor/codeeditor-linting-preview.png)

To view all alerts in the editor, open the alert dialog using Ctrl-Shift-m (Cmd-Shift-m on macOS).

![Code Editor with linting errors. There is a dialog on top of the bottom half of the Code Editor with several alerts that can be dismissed. The dialog does not block the user from interacting with the Code Editor content.](/assets/components/code-editor/codeeditor-linting-preview-dialog.png)

If you require linting for additional languages, [contact the Design Systems Team](/about/support).
