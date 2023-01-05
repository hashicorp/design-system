Figma is an incredibly versatile tool, but this versatility can sometimes backfire leading to disorganization, inconsistency, and difficulty in handoffs and collaboration. These best practices are geared towards using Helios components and foundations effectively, for documentation around broader Figma best practices within HashiCorp design teams, reach out to the HashiCorp [Design Ops team](https://sites.google.com/hashicorp.com/designknowledgehub/design-system) or visit the [#design-ops slack channel](https://hashicorp.slack.com/archives/C029GL8GJDV).

## Component availability

!!! Info

**Structure** is the legacy set of components and foundations used to connect HashiCorp products. It is no longer supported and is in the process of deprecation and sunsetting.
!!!

[Structure](https://github.com/hashicorp/structure) consists of a package of Ember components and foundational styles paired with a limited set of Figma counterparts.

As we work to achieve parity between Structure and Helios, use this decision tree to understand how to move forward within your project:

![Decision tree flow chart](/assets/getting-started/designers/hds-decision-tree.png)

**Does the element (or a comparible alternative) exist in Helios?**

If so, great! Using this element ensures it will be supported in future versions of Helios and that it shares a common visual language with the rest of the elements.

**If no, does the element (or a comparible alternative) exist in Structure?**

If yes, use this component with the understanding that:

1. Structure will be deprecated/sunsetted in the future
2. Not all Figma components are built in code
3. There is no longer a support structure in place if errors/bugs arise

If no, or having future support is a must: design and build your own local element using Helios foundations (color, typography, elevation, etc) as a starting point.

### Local components

Compoents and patterns that are unique to your product should be designed and built locally, extending Helios components and foundations.

![Local component patterns](/assets/getting-started/designers/local-component-patterns.png)

<LinkTo class="doc-link-generic" @route="patterns">Patterns</LinkTo> and guidance around combining and extending Helios components are not currently supported, but are on our [roadmap](https://go.hashi.co/hds-rollout).

!!! Insight

When creating your own library of local components to use in your projects, it's helpful to separate the components from the main design file in their own Figma file. This simplifies publishing and creates a single consistent dependency for your design files. For more information on creating and publishing libraries, visit [Figma's official documentation.](https://www.figma.com/best-practices/components-styles-and-shared-libraries/organizing-and-creating-libraries/)
!!!

When design and building local components, consider [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methods whenever possible. Helios components generally correspond with the `atom` and `molecule` levels, with some more complex components being considered `organisms`.

## Component instances & detaching

A component inserted from a library into a project is referred to as an **instance**. Instances maintain a link to the main component in the library, which has significant benefits for deploying updates and iterating quickly on components.

Our Figma components are coupled closely with their code counterparts to maintain consistency in the API and design language. In most scenarios, we don’t recommend detaching a component or foundation from the library. If you find that a component doesn’t meet your needs, reach out to us for [support](/support) or [submit a request](https://docs.google.com/forms/d/e/1FAIpQLScpMXgrUTVT5fYriu4Pp48r4Nl_eCPluVnJLg0Yg3NXsRWvIA/viewform) for a new component, foundation, or feature.

### Why to avoid detaching components

When you detach a component, that component will no longer receive updates when new features or changes are published in the library. This can cause Figma projects and production applications to drift out of sync quickly. This can introduce tech debt and complex updates in the future. It can be avoided by working closely with the Design Systems Team and learning how to extend components as necessary.

### Overriding component styles

While styles in Helios Figma components can technically be overwritten without detaching the component, we recommend against doing this prior to consulting the Design System Team. It may seem simple to change the color or the font size within a Figma component, but this can have drastic trickle-down effects in code.

- It forces engineers to create custom classes and styles to override Helios styles. This can have unexpected long-term effects within the [CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade#:~:text=The%20cascade%20is%20an%20algorithm,a%20property%20on%20an%20element).
- While difficult to scale in the long-term, overrides nudge the visual language of your product out of sync with Helios and with the rest of the HashiCorp product line.

### Resizing components

Helios components are designed and build to be as layout-agnostic as possible, meaning the task of laying out components is left to the consumer.

Unless specifically mentioned in the documentation, the component in code will fill the parent container it is used in. For designers, it's useful to use [auto layout](https://help.figma.com/hc/en-us/articles/5731482952599-Using-auto-layout#:~:text=You%20can%20add%20auto%20layout%20to%20a%20selected%20frame%2C%20component,and%20select%20Add%20Auto%20layout) wherever possible, Helios Figma components are flexible and can be set to `fill container` within an auto layout container, which will closely replicate the experience in a development environment.

!!! Warning

**Fixed width components:** Setting a component to a fixed width in Figma is akin to setting an explicit `width` value on a component or element in code. This generally goes against fluid and responsive development best practices and should therefore be avoided in Figma. Instead, use auto layout wherever possible.
!!!

## Figma styles

Similar to components, using styles defined in the Helios [Product Foundations](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?t=4kdgl88SMIiEYhbA-1) reinforces consistency and can help to resolve problems with style usage and implementation. Detatching from Helios styles is not recommended in most circumstances.

To assist in usage and implementation of Helios styles we publish a set of **semantic** styles and tokens that are labeled with their intended usage. For example:

- `Surface / Primary` would be used as the main (or surface) background color of a component.
- `Foreground / Primary` would be used for primary text elements with a component or page.
- `Foreground / Action` would be used for an actionable or interactive element within a component or page (i.e. a [Link](/components/link/standalone), or primary [Button](/components/button))

!!! Info

At this time color styles are the only category in which semantic tokens are available. Semantic styles and tokens have yet to be defined for typography and border.
!!!

### Palette color styles

When choosing what color style to use in your design, we recommend starting with semantic styles as their usage is clearly defined. If you don't find a semantic style that meets your needs, we make available a set of base `Palette` styles that are labeled with a numerical scale. While these styles are more usage agnostic, this can introduce challenges in consistently scaling a complex design.

For more information and details on styles and their intended usage visit [foundations](/foundations).