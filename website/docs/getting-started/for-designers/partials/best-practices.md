Figma is an incredibly versatile tool, but this versatility can sometimes backfire leading to disorganization, inconsistency, and difficulty in handoffs and collaboration. Use these best practices to better organize your designs and use the components and styles provided by the HashiCorp Design System effectively.

!!! Info

These best practices have been curated by the HashiCorp design system team, Figma has it's own set of [best practices](https://www.figma.com/best-practices/) for using the tool effectively.

!!!

**Note:** Much of this already exists from Design Ops, waiting to collaborate with them on the content.

## File hygiene

- Use a cover photo
- Differentiate between delivered work, and work in progress

### Naming conventions

Naming things is hard, and while naming components and elements within a design system is often different from naming elements further down the UX funnel, the same best practices can be applied.

!!! Insight

Whatever method you choose to use, the most important thing is maintaining a consistent naming strategy across projects, files, and components.

!!!

#### Teams, projects, files, and pages

- Figma **teams** should match the product name or where the team sits in the larger corporate organizational structure (i.e. Waypoint, or HCP Waypoint).
- **Projects**, since they act as a sort of folder structure within Figma, should be named in an organizational/directory manner. For example: "Work in progress", "Delivered", "Library" (for local components and patterns).
- **File** names should match the epic or project name used in Jira, or as specific sub-categories within a local library or template.
- **Pages** should be named after specific flows or features, as core deliverables, or as specific components or patterns.

#### Components, variants, and styles

## Component availability

The HashiCorp Design System succeeds [Structure](https://github.com/hashicorp/structure) which is in the process of being sunsetted and deprecated. Work is underway to achieve parity between Structure and the HashiCorp Design System but is not 100% complete yet, and some components will most likely not exist in future versions of the Design System.

Use this decision tree when assessing current and future support for a component, pattern, or foundation you need:

**Does the element (or a comparible alternative) exist in the HashiCorp Design System?**

If so, great! Using this element ensures it will be supported in future versions of the HashiCorp Design System and that it shares a common visual language with the rest of the elements.

**If no, does the element (or a comparible alternative) exist in Structure?**

If yes, use this component with the understanding that:

1. Structure will be deprecated/sunsetted in the future
2. Not all Figma components are built in code
3. There is no longer a support structure in place if errors/bugs arise

If no, or having future support is a must: design and build your own local element using HashiCorp Design System Foundations (color, typography, elevation, etc) as a starting point.

### Local components

While the core component and foundation set published in the HashiCorp Design System covers most use cases for low-level atoms and molecules, combinations of components and [patterns](/patterns) are not currently supported. As a best practice use HashiCorp Design System **components** and **foundations** when extending the system and creating local components and patterns.

## Component instances & detaching

A component inserted from a library into a project is referred to as an **instance** and maintains a link to the master component in the library. This has significatn benefits for deploying components quickly and iterating, but can introduce some challenges if the component doesn't meet all of your needs and is detached.

!!! Critical

Detached components **will not** receive updates when new features or changes are made in the library. This can cause Figma projects and production applications to drift out of sync very quickly. This can introduce tech debt and complex updates in the future, and can be avoided by working closely with the design system team to meet your needs and extend components as necessary.

!!!

Figma components in the HashiCorp Design System are coupled closely with their code counterparts to maintain consistency in the API and design language. Detaching a component or foundation frome the HashiCorp Design System libraries is not recommended in almost **every** scenario, if you find that a component doesn't meet your needs, don't hesitate to reach out for [support](/support) or [submit a request](https://docs.google.com/forms/d/e/1FAIpQLScpMXgrUTVT5fYriu4Pp48r4Nl_eCPluVnJLg0Yg3NXsRWvIA/viewform) for a new component, foundation, or feature.
