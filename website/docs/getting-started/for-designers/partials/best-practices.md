Effectively use Helios components and foundations by following these best practices.

For documentation around broader Figma best practices within HashiCorp design teams, reach out to the HashiCorp [Design Ops team](https://sites.google.com/hashicorp.com/designknowledgehub/design-system) or visit the [#design-ops slack channel](https://hashicorp.slack.com/archives/C029GL8GJDV).

## When to use Helios

!!! Info

**What is structure?**

Structure is the legacy design system used primarily by Cloud UI. It is no longer supported and is being sunset.
!!!

Use this decision tree to understand when to use a component from Helios, from Structure, or when to create your own local component or pattern.

![Decision tree flow chart](/assets/getting-started/designers/hds-decision-tree.png)

### Element exists in Helios

If the component or pattern exists in Helios, use it. This ensures it will be supported in future versions of Helios and that it shares a common visual language with the rest of the elements.

### Element exists in Structure

If the component or pattern doesn’t exist in Helios, but does exist in Structure, use the Structure version, but do so sparingly and with caution because:

- Structure is no longer supported and is being sunset
- Some Figma components are not built in code

### Element doesn’t exist in Helios or Structure

If the component or pattern doesn’t exist in Helios or in Structure, design and build your own local element using Helios foundations (color, typography, elevation, etc) as a starting point.

## Working with Components

A component inserted from a library into a project is referred to as an [instance](https://help.figma.com/hc/en-us/articles/360039150173-Create-and-insert-component-instances). Instances maintain a link to the main component in the library, which has significant benefits for deploying updates and iterating quickly on components.

### Detaching components

Our Figma components are coupled tightly with their code counterparts to maintain consistency in the API and design language, so in most scenarios, we don’t recommend detaching a component or foundation from the library.

!!! Info

**Why to avoid detaching components**

When you detach a component, it no longer receives updates from the library. This can cause designs and production applications to drift out of sync quickly.
!!!

If you find that a component doesn’t meet your needs, reach out to us for [support](/support) or [submit a request](https://docs.google.com/forms/d/e/1FAIpQLScpMXgrUTVT5fYriu4Pp48r4Nl_eCPluVnJLg0Yg3NXsRWvIA/viewform) for a new component, foundation, or feature.

### Overriding component styles

While styles in Helios Figma components can technically be overwritten without detaching the component, we recommend against doing this prior to consulting the Design Systems Team. It may seem simple to change the color or the font size within a Figma component, but this can have trickle-down effects in code.

- It forces engineers to create custom classes and styles to override Helios styles. This can have unexpected long-term effects within the [CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#:~:text=The%20cascade%20is%20an%20algorithm,a%20property%20on%20an%20element).
- In addition to being difficult to scale, overrides nudge the visual language of your product out of sync with Helios and with the rest of the HashiCorp product line.

### Resizing components

Helios components are designed and built to be layout-agnostic, meaning the task of laying out components in a design is left to the consumer.

Unless specifically mentioned in the documentation, the component in code will fill the parent container it is used in. For designers, it's helpful to use [auto layout](https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout#:~:text=You%20can%20add%20auto%20layout%20to%20a%20selected%20frame%2C%20component,and%20select%20Add%20Auto%20layout) wherever possible which closely mimics [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and other layout mechanisms in the browser. Helios Figma components are flexible and can be set to `fill container` within an auto layout container, which replicates the experience of a development environment.

!!! Warning

**Fixed width components**

Setting a component to a fixed width in Figma is akin to setting an explicit `width` value on a component or element in code. This generally goes against fluid and responsive best practices and should be avoided in Figma. Instead, use auto layout wherever possible.
!!!

## Working with foundations

Similar to components, using the foundational styles defined in the Helios [Product Foundations](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?t=4kdgl88SMIiEYhbA-1) library reinforces consistency and can help to resolve problems with style usage and implementation. We don't recommend detaching from Helios styles in most circumstances.

Helios publishes a set of **semantic** styles and tokens that are labeled with their intended usage. For example:

- `Surface / Primary` would be used as the main (or surface) background color of a component.
- `Foreground / Primary` would be used for primary text elements or elements that sit on top of a surface background.
- `Foreground / Action` would be used for an actionable or interactive element within a component or page (i.e. a [Link](/components/link/standalone))

At this time, color styles are the only category for which semantic tokens are available. Semantic styles and tokens have yet to be defined for typography and borders.

### Palette color styles

When choosing what color style to use in your design, we recommend starting with semantic styles as their usage is clearly defined and common color pairings are accessible out of the box. If you don’t find a semantic style that meets your needs, a set of base `Palette` styles that are labeled with a numerical scale are also available. These styles are usage agnostic which can introduce challenges in consistently scaling a complex design, but allow more freedom and flexibility in color pairing.

For more information and details on styles and their intended usage, visit [foundations](/foundations).

## Designing local components

Components and patterns that are unique to your product should be designed and built locally, extending Helios components and foundations.

![Local component patterns](/assets/getting-started/designers/local-component-patterns.png)

When creating your own library of local components to use in your projects, it’s helpful to separate components from your main design work in their own Figma file. This simplifies library publishing and creates a single consistent dependency for your design files. For more information on creating and publishing libraries, visit [Figma’s official documentation.](https://www.figma.com/best-practices/components-styles-and-shared-libraries/organizing-and-creating-libraries/)

!!! Info

When designing and building local components, consider [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methods whenever possible. Helios components generally correspond with the `atom` and `molecule` levels, with some more complex components being considered `organisms`.
!!!

We’ve spent much of the past year building lower level components, and therefore, don't yet offer <LinkTo class="doc-link-generic" @route="patterns">patterns</LinkTo>. See which patterns we plan to work on in the [Helios roadmap](https://go.hashi.co/hds-rollout).