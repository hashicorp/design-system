## Usage

### When to use

- Use a file input to let users quickly select files from their computer.

### Types of File Inputs 

The appearance of file input can vary across different web browsers.

File Input accepts [all native HTML types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file), but we offer built in styling for the following:

![Types of File Inputs in web browsers](/assets/components/form/file-input/file-input-browsers.png)

### Disabled State 

The File Input lets users add documents and images. If disabled, users may feel confused, frustrated, and unsure about why it's not working.

Instead of disabling the file input component, consider these options:

- Include explanatory text or prompts: If you display the disabled file input, explain why it's disabled and what users need to do to enable it. You can use a tooltip, a pop-up message, or an instructional sentence.

- Use progressive disclosure: Display or enable the file input only when users meet certain conditions (e.g., after completing the necessary information). This approach guides users step-by-step and presents relevant options based on their progress.

### Truncation

Truncation works differently in Figma and the browser. In Figma, truncation occurs at the end of the text, while in the browser, it will truncate text in the middle.

### Multiple Files 

In the native HTML file input, you can input multiple files using the "multiple" attribute. When you input more than one file, the status message will change to show the number of files you've selected, such as "2 files" in Chrome (Other browsers may have slight differences in how they display this).