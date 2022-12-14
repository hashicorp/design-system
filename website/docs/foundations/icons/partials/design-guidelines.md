## Design guidelines

### Icon types

There are 4 types of icons in Flight: Generic, Filled, Off, Contained.

#### Available types

##### Generic

Glyph with standard outline

- Preferred default style

![](/assets/foundations/flight-icons/icon-types-generic.png)

##### Filled

Glyph with a solid fill

- Toggled state or for contrast

![](/assets/foundations/flight-icons/icon-types-filled.png)

##### Off

Glyph with a strike-through

- Disabled state

![](/assets/foundations/flight-icons/icon-types-st.png)

##### Contained

Glyph with containing shape, e.g. square, circle, diamond, etc

- For emphasis

![](/assets/foundations/flight-icons/icon-types-contained.png)

#### Best practices

- Use the Generic style icons by default
- Use the Filled style where contrast against other icons is important

  For example, when showing 1 failure in a list of 20 otherwise successful builds, use a filled "failure" icon but keep the remaining checkmarks outline "success" icons, so the failure stands out more.

  ![](/assets/foundations/flight-icons/icon-types-bp-filled-1.png)

- Use the Filled style if indicating the toggled state of an icon

  For example, if an object can receive a "favorite" action, it would show the "generic" outline variant, and then switch to the "filled" variant once favorited.

  ![](/assets/foundations/flight-icons/icon-types-bp-filled-2.png)

- Use the Off style icons to indicate a disabled state

  For example, in the favoriting example above, if you wanted to "unfavorite" an object you could swap the "filled" variant for "off" on hover to show what the state will become on click.

  ![](/assets/foundations/flight-icons/icon-types-bp-off.png)

- Use the Contained style icons for emphasis in hierarchy

  For example, in a list of objects, an object might have multiple states. A "contained" icon could be used for the overall state, and additional metadata that has state could use the "generic" variants.

  ![](/assets/foundations/flight-icons/icon-types-bp-contained.png)

---

### Icon sizes

Flight icons are optimized for two icon sizes: 16px and 24px.

#### Optimized sizes

##### 16

Standard size

- Use in product interfaces

![](/assets/foundations/flight-icons/icon-sizes-16.png)

##### 24

Larger size

- Use in marketing pages

![](/assets/foundations/flight-icons/icon-sizes-24.png)

#### Best practices

- Display icons at either 16px or 24px
- Use 16px icons by default in product interfaces
- Consider using 24px icons in product interfaces for empty states
- Take care if choosing to display icons at sizes other than 16px and 24px

  There may be cases where 16px and 24px values don't fit a design - Flight icons can be resized in these cases but be aware that the design is not optimized for values other than these.

#### Updating existing interfaces

- Where the current icon size is less than or equal to 20px, replace icons with 16px versions
- If the size of icon to be replaced is at least 21px, first try to replace it with a 24px version

  If 24px seems too large, consider dropping down to 16px and reworking the interface for a better fit.

---

### States

Icons frequently get used to represent different states within product interfaces. Most commonly as states of an object or states of feedback.

#### States of an object

An object in our interfaces is any object in our API that can return with a state, such as a Build, a Deployment, a Run, a Job, a Cluster or a Network. Objects are typically displayed in lists or as cards and include their state when presented to the user.

##### In progress

"Building"

![](/assets/foundations/flight-icons/icon-states-progress.png)

##### Succeeded

"Build passed"

![](/assets/foundations/flight-icons/icon-states-succeeded.png)

##### Failed

"Build failed"

![](/assets/foundations/flight-icons/icon-states-failed.png)


##### Skipped

"Build skipped"

![](/assets/foundations/flight-icons/icon-states-skipped.png)

#### States of feedback

Feedback is presented in our interfaces when actions occur in response to user interaction, such as pressing a button to submit a form, or prior to an action taking place, such as displaying a warning, or when presenting more information.

##### Success

"Created user"

![](/assets/foundations/flight-icons/icon-states-success.png)

##### Error

"Couldn't create user"

![](/assets/foundations/flight-icons/icon-states-error.png)

##### Warning

"User is near limits"

![](/assets/foundations/flight-icons/icon-states-warning.png)

##### Informational

"User has 5 invites"


![](/assets/foundations/flight-icons/icon-states-informational.png)

---

### Common icons

Some Flight Icons represent common actions within the product interfaces.

#### Editing actions

##### Create

"Create new team"

![](/assets/foundations/flight-icons/icon-actions-create.png)


##### Edit

"Edit this team"

![](/assets/foundations/flight-icons/icon-actions-edit.png)


##### Delete

"Delete this item"

![](/assets/foundations/flight-icons/icon-actions-delete.png)


##### Copy

"Copy to clipboard"

![](/assets/foundations/flight-icons/icon-actions-copy.png)


#### Navigation actions

##### Back

"Go back"

![](/assets/foundations/flight-icons/icon-actions-back.png)


##### Link

"Visit AWS"

![](/assets/foundations/flight-icons/icon-actions-link.png)


##### Close

"Dismiss"

![](/assets/foundations/flight-icons/icon-actions-close.png)


#### Help actions

##### Tutorial link

When linking to learn.hashicorp.com

![](/assets/foundations/flight-icons/icon-help-tutorial-link.png)

##### Doc link

When linking to documentation

![](/assets/foundations/flight-icons/icon-help-doc-link.png)

##### Support

When referencing HashiCorp support

![](/assets/foundations/flight-icons/icon-help-support.png)

---

### Usage

Whether you're bringing in new icons or replacing existing icons, using Flight in your projects is simple.

#### Bring in new icons

1.  Open your project file within Figma.
2.  Navigate to the Assets panel in the left sidebar.
3.  Click the Team library icon (looks like an open book), and search for "Flight Icons" in the popup that appears.
4.  Enable the [Flight Icons Library](https://www.figma.com/file/TLnoT5AYQfy3tZ0H68BgOr/Flight-Icons?node-id=164%3A0) by clicking on the toggle next to the name.
5.  Search or scroll to find the icon you want to use and drag it into your file.

#### Replacing existing icons

We maintain [a mapping of icon names between Structure and Flight](https://github.com/hashicorp/design-system/blob/main/packages/flight-icons/structure-mappings.json) that can be referenced to migrate an icon from Structure to Flight

💡 Tip: Swapping instances, sizes, and colors is easy to do from the right sidebar in Figma.

#### Assets in ZIP format

You can [download the SVG assets](/assets/zip/flight-icons-svg.zip) (in ZIP format).
