## Usage

### When to use

- Use a file input when it enables users to quickly select the files they want to input to from their computer.

### Disabled State 

The File Input component lets users add documents and images. When disabled, users might feel confused, frustrated, and unsure why it's not working.

Instead of disabling the file input component, consider these options:

Include explanatory text or prompts: If you display the disabled file input, explain why it's disabled and what users need to do to enable it. You can use a tooltip, a pop-up message, or an instructional sentence.

Use progressive disclosure: Display or enable the file input only when users meet certain conditions (e.g., after completing the necessary information). This approach guides users step-by-step and presents relevant options based on their progress.

Offer interactive feedback: Provide real-time feedback when users attempt to use a disabled file input. This can be in the form of a notification or pop-up message that explains why the feature is unavailable.

### Truncation

Truncation works differently in Figma and the browser. In Figma, truncation occurs at the end of the text, while in the browser, it will truncate text in the middle.

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file

Image Example: 

### Appearance in other browsers

### Multiple Files 

In the native HTML file input, you can input multiple files using the "multiple" option. When you input more than one file, the status message will change to show the number of files you've selected, such as "2 files" in Chrome (Other browsers may have slight differences in how they display this).