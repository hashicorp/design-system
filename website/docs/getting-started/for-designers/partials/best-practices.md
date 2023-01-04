Figma is an incredibly versatile tool, but this versatility can sometimes backfire leading to disorganization, inconsistency, and difficulty in handoffs and collaboration. Use these best practices to better organize your designs and use the components and styles provided by the design system effectively.

!!! Info

These best practices have been curated by the Design Systems Team, Figma has its own set of [best practices](https://www.figma.com/best-practices/) for using the tool effectively.

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

We are in the process of sunsetting [Structure](https://github.com/hashicorp/structure). As we work to achieve parity between Structure and the Helios Design System, use this decision tree to understand how to move forward within your project:

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

Functions and experiences that are unique to your product should be designed and built locally, extending Helios components and foundations.

![Local component patterns](/assets/getting-started/designers/local-component-patterns.png)

<LinkTo class="doc-link-generic" @route="patterns">Patterns</LinkTo> and guidance around combining and extending Helios components are not currently supported, but are on our [roadmap](https://go.hashi.co/hds-rollout)

## Component instances & detaching

A component inserted from a library into a project is referred to as an **instance**. Instances maintain a link to the main component in the library, which has significant benefits for deploying components and iterating quickly.

Our Figma components are coupled closely with their code counterparts to maintain consistency in the API and design language. In most scenarios, we don’t recommend detaching a component or foundation from the library. If you find that a component doesn’t meet your needs, reach out to us for [support](/support) or [submit a request](https://docs.google.com/forms/d/e/1FAIpQLScpMXgrUTVT5fYriu4Pp48r4Nl_eCPluVnJLg0Yg3NXsRWvIA/viewform) for a new component, foundation, or feature.

### Why to avoid detaching components

When you detach a component, that component will no longer receive updates when new features or changes are published in the library. This can cause Figma projects and production applications to drift out of sync quickly. This can introduce tech debt and complex updates in the future. It can be avoided by working closely with the Design Systems Team and learning how to extend components as necessary.
