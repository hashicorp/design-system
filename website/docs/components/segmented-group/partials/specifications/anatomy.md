## Anatomy

### Base component

!!! Info

The Segmented Group `Base` component is only available in Figma and is suited for less complex scenarios which don’t perform complex filtering or functions.
!!!

![Segmented Group Base Anatomy](/assets/components/form/segmented-group/segmented-group-anatomy-base.png =600x*)

| Element | Usage |
|---------|-------|
| Segmented Input | Required; can be one of many types which extend the [Text Input](/components/form/text-input) component. |
| Segmented Button | Required; can be either `Button` or `Dropdown` which are extensions of the Helios [Button](/components/button) and [Toggle Button](/components/dropdown) components. |
| Container | Wraps the primitives in an auto layout container. |

### Segment anatomy

The Segments contained within a Segmented Group are extensions of Helios form components and have the same anatomy as the main components they extend. For more information on the specifications of each Segment, refer to their respective documentation:

- [Button](/components/button)
- [Dropdown](/components/dropdown)
- [Text Input](/components/form/text-input)
    - [Text](/components/form/text-input#text)
    - [Password](/components/form/text-input#password)
    - [Search](/components/form/text-input#search)
    - [Date and time](/components/form/text-input#date-and-time)
- [Select](/components/form/select)

## States

The Segmented Group doesn’t have its own state intrinsically; instead, the nested Segments should maintain their own interactive state corresponding with the main component specs.

![Primitive component states](/assets/components/form/segmented-group/segmented-group-states.png)