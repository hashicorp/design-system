---
title: Form::Toggle
category: components
group: form
component: toggle
section: accessibility
---

#### Known Issues

**Links within labels, help text, or error text:** If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, it is generally preferable to avoid links within help/error text or labels; however, we understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative approach is determined.

#### Applicable WCAG Success Criteria (Reference)

This section is for reference only, some descriptions have been truncated for brevity. The `Form::Toggle::Base` variation of this component is conditionally conformant; that is, it is not conformant until it has an accessible name. Otherwise, this component intends to conform to the following WCAG success criteria:

<dummy-wcag-success-criteria-list data-list="1.3.1|1.3.2|1.3.4|1.3.5|1.4.1|1.4.3|1.4.4|1.4.10|1.4.11|1.4.12|2.4.6|2.4.7|3.2.1|3.2.2|3.2.4|3.3.2|4.1.1|4.1.2">Placeholder for the WCAG Success Criteria List component - Don't delete!</dummy-wcag-success-criteria-list>

*   [1.3.1 Info and Relationships (A):](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships) Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.
*   [1.3.2 Meaningful Sequence (A):](https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence) When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.
*   [1.3.4 Orientation (AA):](https://www.w3.org/WAI/WCAG21/Understanding/orientation) Content does not restrict its view and operation to a single display orientation, such as portrait or landscape.
*   [1.3.5 Identify Input Purpose(AA):](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose) The purpose of each input field collecting information about the user can be programmatically determined when the input field serves a purpose identified in the Input Purposes for User Interface Components section; and the content is implemented using technologies with support for identifying the expected meaning for form input data.
*   [1.4.1 Use of Color (A):](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color) Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.
*   [1.4.3 Contrast Minimum (AA):](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum) The visual presentation of text and images of text has a contrast ratio of at least 4.5:1
*   [1.4.4 Resize Text (AA):](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships) Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.
*   [1.4.10 Reflow (AA):](https://www.w3.org/WAI/WCAG21/Understanding/reflow) Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions
*   [1.4.11 Non-text Contrast (AA):](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast) The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s): user interface components; graphical objects.
*   [1.4.12 Text Spacing (AA):](https://www.w3.org/WAI/WCAG21/Understanding/text-spacing) no loss of content or functionality occurs by setting all of the following and by changing no other style property: line height set to 1.5; spacing following paragraphs set to at least 2x the font size; letter-spacing set at least 0.12x of the font size, word spacing set to at least 0.16 times the font size.
*   [2.4.6 Headings and Labels (AA):](https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels) Headings and labels describe topic or purpose.
*   [2.4.7 Focus Visible (AA):](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible) Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.
*   [3.2.1 On Focus (A):](https://www.w3.org/WAI/WCAG21/Understanding/on-focus) When any user interface component receives focus, it does not initiate a change of context.
*   [3.2.2 On Input (A):](https://www.w3.org/WAI/WCAG21/Understanding/on-input) Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.
*   [3.2.4 Consistent Identification (AA):](https://www.w3.org/WAI/WCAG21/Understanding/consistent-identification) Components that have the same functionality within a set of Web pages are identified consistently.
*   [3.3.2 Labels or Instructions (A):](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions) Labels or instructions are provided when content requires user input.
*   [4.1.1 Parsing (A):](https://www.w3.org/WAI/WCAG21/Understanding/parsing) In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique.
*   [4.1.2 Name, Role, Value (A):](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value) For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.