## Usage

### When to use

- Use a file input to let users quickly select files from their computer.

### Disabled State

The File Input component allows users to upload documents and images. Disabling it can make users feel confused, frustrated, and unsure about why it’s not working.

Instead of disabling, consider these alternatives:

- Include explanatory text or prompts: If you display a disabled file input, explain why it’s disabled and what users need to do to enable it. You can use a tooltip, or an instructional sentence.

- Use progressive disclosure: Display or enable the file input only when users meet certain conditions (e.g., after completing the necessary information). This approach guides users step-by-step and presents relevant options based on their progress.

### Truncation

Truncation works differently in Figma and the browser. In Figma, truncation occurs at the end of the text, while in the browser, it will truncate text in the middle.

![visual difference in truncation between figma and browser](/assets/components/form/file-input/file-input-truncation.png)

### Multiple Files

You can enable users to upload multiple files at once by adding the `multiple` attribute which is passed to the native HTML file input the HDS component is based on. When you input more than one file, the status message will change to show the number of files you’ve selected, such as “2 files” in Chrome (Other browsers may have slight differences in how they display this information).

### Browser differences

The File Input component is based off of the native HTML file input element so the visual appearance can vary across different web browsers.

![Examples of file input states rendered in different web browsers](/assets/components/form/file-input/file-input-browsers.png)