## Anatomy

### Base component

![Segmented Group Base Anatomy](/assets/components/form/segmented-group/segmented-group-anatomy-base.png =600x*)

| Element | Usage |
|---------|-------|
| Segmented Input | Required; can be one of many types extended via the [Text Input](/components/form/text-input) component. |
| Segmented Button | Required; can be either `button` or `toggle` which are extensions of the Helios [Button](/components/button) and [Toggle Button](/components/dropdown#toggle) components. |
| Container | Wraps the subcomponents in an auto layout container. |

!!! Info

The Segmented Group `Base` component is only available in Figma and is best used in less complex scenarios which don't perform complex filtering or functions.
!!!

### Subcomponent anatomy

The subcomponents contained within a Segmented Group are extensions of Helios form components and have the same anatomy as the main components they map to.

## States

The Segmented Group doesn't have its own state intrinsically; instead, the nested component primitives should maintain their own interactive state corresponding with the main component specs.

![Primitive component states](/assets/components/form/segmented-group/segmented-group-states.png)