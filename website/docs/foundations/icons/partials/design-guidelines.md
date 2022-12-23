## Icon types

There are 4 types of icons: Outlined, Filled, Off, and Contained.

### Outlined

Glyph with standard outline.

- Preferred default style.

![](/assets/foundations/flight-icons/icon-types-outlined.png)

- Use the Outlined style icons by default.
- Use the Filled style where contrast against other icons is important.

  For example, when showing 1 failure in a list of 20 otherwise successful builds, use a filled "failure" icon but keep the remaining checkmarks outlined "success" icons, so the failure stands out more.

  ![](/assets/foundations/flight-icons/icon-best-practices-filled-1.png)

### Filled

Glyph with a solid fill.

- Toggled state or for contrast.

![](/assets/foundations/flight-icons/icon-types-filled.png)

- Use the Filled style if indicating the toggled state of an icon.

  For example, if an object can receive a "favorite" action, it would show the "generic" outlined variant, and then switch to the "filled" variant once favorited.

  ![](/assets/foundations/flight-icons/icon-best-practices-filled-2.png)

### Off

Glyph with a strike-through.

- Disabled state.

![](/assets/foundations/flight-icons/icon-types-off.png)

- Use the Off style icons to indicate a disabled state.

  For example, in the favoriting example above, if you wanted to "unfavorite" an object you could swap the "filled" variant for "off" on hover to show what the state will become on click.

  ![](/assets/foundations/flight-icons/icon-best-practices-off.png)

### Contained

Glyph with containing shape, e.g. square, circle, diamond, etc.

- For emphasis.

![](/assets/foundations/flight-icons/icon-types-contained.png)

- Use the Contained style icons for emphasis in hierarchy.

  For example, in a list of objects, an object might have multiple states. A "contained" icon could be used for the overall state, and additional metadata that has state could use the "outlined" variants.

  ![](/assets/foundations/flight-icons/icon-best-practices-contained.png)

## Icon sizes

Flight icons are optimized for two icon sizes: 16px and 24px.

### Optimized sizes

![](/assets/foundations/flight-icons/icon-sizes.png)

### Best practices

- Display icons at either 16px or 24px.
- Use 16px icons by default in product interfaces.
- Consider using 24px icons in product interfaces for empty states.
- Take care if choosing to display icons at sizes other than 16px and 24px.

  There may be cases where 16px and 24px values don't fit a design - Icons can be resized in these cases but be aware that the design is not optimized for values other than these.

### Updating existing interfaces

- Where the current icon size is less than or equal to 20px, replace icons with 16px versions.
- If the size of the icon to be replaced is at least 21px, first try to replace it with a 24px version.

  If 24px seems too large, consider dropping down to 16px and reworking the interface for a better fit.

---

## States

Icons frequently get used to represent different states within product interfaces. Most commonly as states of an object or states of feedback.

### States of an object

An object in our interfaces is any object in our API that can return with a state, such as a Build, a Deployment, a Run, a Job, a Cluster or a Network. Objects are typically displayed in lists or as cards and include their state when presented to the user.

![](/assets/foundations/flight-icons/states-object.png)

### States of feedback

Feedback is presented in our interfaces when actions occur in response to user interaction, such as pressing a button to submit a form, or prior to an action taking place, such as displaying a warning, or when presenting more information.

![](/assets/foundations/flight-icons/states-feedback.png)

---

## Common icons

Some icons represent common actions within the product interfaces.

### Editing actions

![](/assets/foundations/flight-icons/editing-actions.png)


### Navigation actions

![](/assets/foundations/flight-icons/navigation-actions.png)


### Help actions

![](/assets/foundations/flight-icons/help-actions.png)

---

## Usage

Whether you're bringing in new icons or replacing existing icons, using icons in your projects is simple.

### Bring in new icons

1.  Open your project file within Figma.
2.  Navigate to the Assets panel in the left sidebar.
3.  Click the Team library icon (looks like an open book), and search for "Flight Icons" in the popup that appears.
4.  Enable the [Flight Icons Library](https://www.figma.com/file/TLnoT5AYQfy3tZ0H68BgOr/Flight-Icons?node-id=164%3A0) by clicking on the toggle next to the name.
5.  Search or scroll to find the icon you want to use and drag it into your file.

### Replacing existing icons

We maintain [a mapping of icon names between Structure and Flight](https://github.com/hashicorp/design-system/blob/main/packages/flight-icons/structure-mappings.json) that can be referenced to migrate an icon from Structure to Flight

💡 Tip: Swapping instances, sizes, and colors is easy to do from the right sidebar in Figma.

### Resources

- [Request an icon](https://docs.google.com/forms/d/e/1FAIpQLSc2wsaOaKHiVKPzk-FWlqwVdOjSmSuOU03XC5ZdJkHOcLDOEA/viewform?) (Internal only).
- [Figma library](https://www.figma.com/file/TLnoT5AYQfy3tZ0H68BgOr/Flight-Icons?node-id=164%3A0&t=bWFdjHgfV6aLQjep-1) (Internal only).
- [SVG assets (ZIP file)](/assets/zip/flight-icons-svg.zip).
- [Report an issue](https://github.com/hashicorp/design-system/issues/new/choose).