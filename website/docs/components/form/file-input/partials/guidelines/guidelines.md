The File Input component uses the native HTML input with `type="file"` under the hood but adds visual styling to match other HDS components.

## Disabled field

Disabled inputs can result in confusion and frustration, leading users to question why it’s not working. Instead of disabling, consider these alternatives:

- Include explanatory text or prompts: If you display a disabled file input, explain why it’s disabled and what users need to do to enable it. 
- Use progressive disclosure: Display or enable the file input only when users meet certain conditions (e.g., after completing the necessary information). This approach guides users step-by-step and presents relevant options based on their progress.

## Truncation

Truncation is built into the native component and uses the width of the container to determine when the text gets truncated. It is not based on a character limit. 

!!! Info

Due to limitations in Figma, truncation will occur at the end of the text, while in the browser, truncation occurs in the middle. 

![visual difference in truncation between figma and browser](/assets/components/form/file-input/file-input-truncation.png)
!!!

## Multiple files

Multiple files can be added at once when the `multiple` attribute is enabled in code. When more than one file is selected, the text will change to show the number of files you’ve selected, e.g., “2 files”. *The exact language used may differ between browsers.*

!!! Info

*A note about browser inconsistency*

Because the File Input is based on the native HTML input, the content and visual appearance may vary slightly across browsers.

![Examples of file input states rendered in different web browsers](/assets/components/form/file-input/file-input-browsers.png)
!!!