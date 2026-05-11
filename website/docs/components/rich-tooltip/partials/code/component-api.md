## Component API

### RichTooltip

<!-- hds-api:arguments -->

### Contextual components

#### [RT].Toggle

The `RichTooltip::Toggle` component, yielded as contextual component.

The standard toggle element to use consists of a text string and an optional icon, to ensure that the toggle is perceivable, visually consistent, and can be used inline with other content or standalone as part of the layout flow.

It can also be used with generic content, in which case consumers will need to ensure the component is used in a [conformant accessible way](/components/rich-tooltip?tab=accessibility).

<!-- hds-api:contextual-args name=Toggle -->

#### [RT].Bubble

The `RichTooltip::Bubble` component, yielded as contextual component.

Most of the arguments are forwarded as `anchoredPositionOptions` to the underlying [`PopoverPrimitive`](/utilities/popover-primitive#popoverprimitive) utility.

<!-- hds-api:contextual-args name=Bubble -->
