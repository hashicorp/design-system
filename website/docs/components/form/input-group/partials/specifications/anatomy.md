## Anatomy

### Base component

![Input Group Base Anatomy](/assets/components/form/input-group/input-group-anatomy-base.png =600x*)

| Element | Usage |
|---------|-------|
| Input | Required; can be one of many types extended via the [Text Input](/components/form/text-input) component. |
| Button | Required; can be either default or toggle which are extensions of the Helios [Button](/components/button) and [Toggle Button](/components/dropdown#toggle) components. |
| Container | Wraps the subcomponents in an auto layout container. |

!!! Info

The Input Group `Base` component is only available in Figma.
!!!

### Subcomponent anatomy

The subcomponents contained within an Input Group are extensions of Helios form components and have the same anatomy as the main components they map to.

## States

The Input Group doesn't have its own state intrinsically; instead, the nested component primitives should maintain their own interactive state corresponding with the main component specs.

![Primitive component states](/assets/components/form/input-group/input-group-states.png)