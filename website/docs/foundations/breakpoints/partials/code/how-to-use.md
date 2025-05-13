## How to use the breakpoints

In [responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) it's common practice to define specific media queries in CSS that can be used to control not only the layout of the entire page and its parts, but also other aspects of a UI like typography, spacing, the rendering of decorative elements, the resolution of media assets, and much more. These media queries are built using CSS `@media` declarations in combination with a set of standard breakpoints.

Our design system defines [breakpoint values](/foundations/breakpoints#the-ranges) based on browser viewport widths. The intervals between these breakpoints create distinct ranges, which can be used with the [Sass](/foundations/breakpoints?tab=code#sass) and [JavaScript](/foundations/breakpoints?tab=code#javascript) helpers to implement responsive designs for our applications.

### Sass

To use the Sass helpers provided by the design system, you must import the corresponding Sass file (via `@use`, [as recommended](https://sass-lang.com/documentation/at-rules/use/#differences-from-import)) from the `@hashicorp/design-system-components` package:


```scss
// from @hashicorp/design-system-components package
@use "mixins/breakpoints" as *;
```

!!! info

If you are not able to import the file using the declaration above, [contact the Design Systems Team](/about/support) for support.

!!!

Once the file is imported, you will have access to the Sass helpers described below.

#### Mixins

Sass mixins offer the simplest, most efficient way to implement responsive layouts using the standard breakpoints defined in our system. We provide three different mixins:

- `hds-breakpoint-above($name)` - for media queries that apply to a viewport range **above** a certain breakpoint (useful for a mobile-first approach)
- `hds-breakpoint-below($name)` - for media queries that apply to a viewport range **below** a certain breakpoint (useful for a desktop-first approach)
- `hds-breakpoint-between($lower, $upper)` - for media queries that apply to a viewport range **between** two breakpoints

Here is an example of how the mixins could be used in a mobile-first responsive layout:

```scss
// from @hashicorp/design-system-components package
@use "mixins/breakpoints" as *;

.my-responsive-layout {
  // this is the default behavior, that covers the range 0px–767px
  display: flex;
  direction: column;
  gap: 1rem;

  // at 768px the layout changes, from a vertical stack to an horizontal one
  @include hds-breakpoint-above('md') {
    direction: row;
  }

  // at larger viewports we increase the spacing between the items
  @include hds-breakpoint-above('xl') {
    gap: 2rem;
  }
}
```

The same layout could be achieved using a desktop-first approach in a similar way:

```scss
// from @hashicorp/design-system-components package
@use "mixins/breakpoints" as *;

.my-responsive-layout {
  // this is the default behavior
  display: flex;
  direction: row;
  gap: 2rem;

  // at smaller viewports we decrease the spacing between the items
  @include hds-breakpoint-below('xl') {
    gap: 1rem;
  }

  // at 768px the layout changes, from an horizontal stack to a vertical one
  @include hds-breakpoint-below('md') {
    direction: column;
  }
}
```

Of course, these are oversimplified examples. In your implementation, you will have to choose which of the provided mixins are better suited to achieve the desired responsive layout, which depends on the design specifications, the context of where the layout lives in the page, and how it relates with the other UI elements.

#### Key/Value Map

For special use cases, we also provide a Sass map–`$hds-breakpoints`–which is a lower level helper than the mixins. Here's an example of how this map could be used:

```scss
// explicit import of `map` module (required by Sass)
@use "sass:map";
// from @hashicorp/design-system-components package
@use "mixins/breakpoints" as *;

@each $name, $size in $hds-breakpoints {
  .my-custom-breakpoint-class--#{$name} {
    // here you have access to the breakpoint name and its value (width in px)
  }
}
```

### JavaScript

We also provide helpers in case you need to access the breakpoints names/values in JavaScript code.

You have access to the list of breakpoint names using the `hdsBreakpointsNames` array:

```javascript{data-execute=false}
import { hdsBreakpointsNames } from '@hashicorp/design-system-components/utils/hds-breakpoints';

hdsBreakpointsNames.forEach(name => {
  // do something with the breakpoint names
});
```

You also have access to the list of breakpoint names and values using the `hdsBreakpointsValues` map:

```javascript{data-execute=false}
import { hdsBreakpointsValues } from '@hashicorp/design-system-components/utils/hds-breakpoints';

// do something with a specific breakpoint value
const myBreakpoint = hdsBreakpointsValues['xl'].value; // numeric (eg. 1440)
const myBreakpoint = hdsBreakpointsValues['lg'].px;    // size in px (eg. 1088px)
const myBreakpoint = hdsBreakpointsValues['sm'].rem;   // size in rem (eg. 30rem)

// loop over all the breakpoints
Object.entries(hdsBreakpointsValues).forEach(([name, sizes]) => {
  // do something with a specific breakpoint value in px
  const breakpointSizePx = sizes.px;
});
```
