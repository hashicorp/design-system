This component has been designed and implemented with accessibility in mind. When used as recommended, there should not be any WCAG conformance issues with this component. Developers should ensure that any table customizations they implement also meet the applicable WCAG Success Criteria.

There are a few critical items for developers to note:

*   The table row element (`tr`) is not eligible to receive interactions. If an interactive element is desired, place it within a table cell element (`td`).
*   When providing additional or alternative styles to the table element, do not change the `display` property in the CSS. This alters how the table is presented to the user with assistive technology, and they will no longer be presented with a table.

#### Applicable WCAG Success Criteria (Reference)

This section is for reference only. This component intends to conform to the following WCAG success criteria:

<dummy-wcag-success-criteria-list data-list="1.3.1|1.3.2|1.4.1|1.4.3|1.4.4|1.4.10|1.4.11|1.4.12|1.4.13|2.1.1|2.1.2|2.1.4|2.4.3|2.4.7|4.1.1|4.1.2">Placeholder for the WCAG Success Criteria List component - Don't delete!</dummy-wcag-success-criteria-list>

*   1.3.1: [Info and Relationships (A)](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html): Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.
*   1.3.2 [Meaningful Sequence (A)](https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence.html): When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.
*   1.4.1 [Use of Color (A)](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html): Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.
*   1.4.3 [Contrast (Minimum) (AA)](https://www.w3.org/WAI/WCAG21/Understanding/xxx.html): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1
*   1.4.4 [Resize text (AA)](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html): Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.
*   1.4.10 [Reflow (AA)](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html): Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions (some exceptions apply)
*   1.4.11 [Non-text Contrast (AA)](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html): The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s): user interface components; graphical objects.
*   1.4.12 [Text Spacing (AA)](https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html): no loss of content or functionality occurs by setting all of the following and by changing no other style property: line height set to 1.5; spacing following paragraphs set to at least 2x the font size; letter-spacing set at least 0.12x of the font size, word spacing set to at least 0.16 times the font size.
*   1.4.13 [Content on Hover or Focus (AA)](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html): Where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true: dismissible, hoverable, persistent (see link)
*   2.1.1 [Keyboard (A)](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html): All functionality of the content is operable through a keyboard interface.
*   2.1.2 [No Keyboard Trap (A)](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html): If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface.
*   2.1.4 [Character Key Shortcuts (A)](https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts.html): If a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then it should be able to be turned off, remapped, or active only on focus.
*   2.4.3 [Focus Order (A)](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html): If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.
*   2.4.7 [Focus Visible (AA)](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html): Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.
*   4.1.1 [Parsing (A)](https://www.w3.org/WAI/WCAG21/Understanding/parsing.html): In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique.
*   4.1.2 [Name, Role, Value (A)](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html): For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies