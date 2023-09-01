## Types

There are four types of icons: Outlined, Filled, Off, and Contained.

### Outlined

Outlined icons are icons with a standard outline.

Use Outlined icons by default.

![Example of outlined icons](/assets/foundations/flight-icons/icon-types-outlined.png =660x*)

### Filled

Filled icons are icons with a solid fill and are indicated by `-fill` in the icon name.

Use Filled icons to show a toggled state or for contrast with Outlined icons.

![Example of filled icons](/assets/foundations/flight-icons/icon-types-fill.png =660x*)

#### Indicating a toggled state

For objects that can be toggled on/off, show the Outlined icon for `off` and the Filled icon for `on`.

![Example of toggled state icons](/assets/foundations/flight-icons/icon-best-practices-filled-2.png =660x*)

#### Using for contrast

If contrast against other icons is important, use Filled for the more important icon(s).

For example, when showing one failure in a list of 20 otherwise successful builds, use `x-square-fill` while keeping the remaining icons in the Outlined style so the failure is more prominent.

![Example of contrasting icons](/assets/foundations/flight-icons/icon-best-practices-filled-1.png =660x*)

### Off

Off icons are icons including a strike-through and are indicated by `-off` in the icon name.

Use Off icons to indicate something is disabled, unavailable, or will return a toggled icon `off`.

![Example of off icons](/assets/foundations/flight-icons/icon-types-off.png =660x*)

#### Indicating a disabled or unavailable icon

When needing to indicate an action is disabled or unavailable, consider pairing an Off icon with the color style `Foreground/Disabled` and cursor property value `not-allowed`.

#### Return toggled state back `off`

If an object is toggled `on` and it can be toggled `off`, consider showing the Off icon **on hover** to indicate that clicking the icon again will toggle the object back `off`.

![Example of toggling icons off](/assets/foundations/flight-icons/icon-best-practices-off.png =660x*)

### Contained

Contained icons are icons with a containing shape and are indicated by their shape type in the icon name, e.g., `-circle`, `-square`, etc.

Use contained icons for emphasis in the hierarchy.

![Examples of contained icons](/assets/foundations/flight-icons/icon-types-contained.png =660x*)

If an object can have multiple states, use a Contained icon for the overall parent state and the Outlined icon(s) for the children’s state(s).

![Example of contained icons in context](/assets/foundations/flight-icons/icon-best-practices-contained.png =660x*)

### Animated

Animated icons are icons with an animated effect that show a transition between two states.

![Example of animated icons](/assets/foundations/flight-icons/icon-animated.png =660x*)

Use animated icons to communicate activity happening in the background. For example, when an object is updated, the loading icon could appear after the save action is triggered, indicating that the changes are in progress.

![Example of best practice for animated icons](/assets/foundations/flight-icons/icon-best-practices-animated.png =660x*)

## Sizes

Icons are optimized for two icon sizes: `16px` and `24px`.

Use `16px` icons by default in product interfaces and `24px` icons for empty states.

!!! Warning

**Resizing icons**

There may be cases where `16px` and `24px` sizes don’t fit a design. Icons can be resized but be aware that the design is not optimized for resizing. Therefore, only resize icons as necessary and sparingly.
!!!

![Example of available icon sizes](/assets/foundations/flight-icons/icon-sizes.png =660x*)

## States

Icons frequently represent different states within product interfaces, most commonly as states of an object or states of feedback.

### States of an object

Some objects can return a state, e.g., a Build, Run, Cluster, etc. Objects are typically displayed in lists or as cards and include their state when presented to the user.

![Examples of object states](/assets/foundations/flight-icons/states-object.png =660x*)

### States of feedback

Feedback is presented in response to user interaction, such as a displaying a success message after submitting a form or a warning when a user nears their usage limit.

![Examples of feedback states](/assets/foundations/flight-icons/states-feedback.png =660x*)

## Common icons

Some icons represent common actions within our products.

### Editing actions

![Examples of common edit icons](/assets/foundations/flight-icons/editing-actions.png =660x*)


### Navigation actions

![Examples of common navigation icons](/assets/foundations/flight-icons/navigation-actions.png =660x*)


### Help actions

- Use `learn-link` when linking to tutorials.

- Use `docs-link` when linking to documentation pages and installation guides.

- Use `support` when referencing HashiCorp support.

![Examples of common help icons](/assets/foundations/flight-icons/help-actions.png =660x*)

## Resources

- [Figma library](https://www.figma.com/file/TLnoT5AYQfy3tZ0H68BgOr/Flight-Icons?node-id=164%3A0&t=bWFdjHgfV6aLQjep-1) (Internal only)
- [SVG assets (ZIP file)](/assets/zip/flight-icons-svg.zip)
- [Request an icon or report an issue](https://go.hashi.co/hds-support)
