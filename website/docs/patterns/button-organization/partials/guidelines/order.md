## Order

Users generally think from highest to lowest priority and positive to negative when performing an action or function. Therefore, we recommend ordering buttons from the primary (most important) action to the secondary action and, if applicable, the tertiary action (least important).

!!! Do

Order buttons based on priority, from the **highest** priority action (usually a primary button) to the **lowest** priority (secondary or tertiary buttons).

![Ordering from high priority](/assets/patterns/button-organization/order-high-low-priority.png)
!!!


### Destructive actions

In the case of a destructive action, replace the primary button with a critical button in the same position. While a destructive action may have a **negative** connotation, the priority of the action takes precedence over whether the action is positive or negative in this scenario.

!!! Do

![Destructive action order](/assets/patterns/button-organization/order-destructive-action.png)
!!!

### Conversational messaging

Users often expect to communicate with machines and applications as if they were humans. These guidelines can reinforce this paradigm by encouraging users through a human-like conversational style.

![Button order through conversational style](/assets/patterns/button-organization/order-conversational-example.png)

Consider the following scenario:

A user has taken action to edit the settings of a cluster. Approached through a conversational method, the highest priority positive action (Save changes) comes first, with less important and negative actions following.

An often-depicted alternative to this scenario is to **end** with the most important action. However, when analyzed using a reading pattern, the example is conversationally clunky and forces the user to read through items of lower importance first.

!!! Dont

#### Non-natural conversation based on priority

![Suboptimal grouping](/assets/patterns/button-organization/suboptimal-grouping.png)

User edits the settings of a cluster:

- "Would you like to learn more about this action?" "No"
- "Would you like to cancel?" "No"
- "Would you like to save the changes to this cluster?" "Yes, finally, that’s what I was trying to do all along."
!!!

!!! Do

#### Natural conversation based on priority
![Optimal order](/assets/patterns/button-organization/optimal-ordering.png)

User edits the settings of a cluster:

- "Would you like to save the changes to this cluster?" "Yes, thank you."
!!!

#### Exceptions

A possible exception to this ordering method is in multi-step and progressive flows in which buttons fulfill both a functional purpose (create or edit something) and a navigational purpose (proceed, go back).

- The **directionality** and positive outcome of the overall flow are reinforced by the button order and grouping.
- In a multi-step flow, this type of pattern would persist on the page; the repetitiveness acts as a form of consistency scoped to the feature the pattern is used in.

![Multi-step progressive flow](/assets/patterns/button-organization/multi-step-progressive-flow.png)

### Stacking order

As the viewport size shrinks, buttons should stack vertically in accordance with their order in the [DOM (Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). 

- This naturally adheres to our ordering guidelines; button order remains the same, except the container is vertical rather than horizontal.
- This reduces complexity in engineering.
- This ensures our applications meet accessibility conformance in [making the DOM order match the visual order](https://www.w3.org/TR/WCAG20-TECHS/C27.html).

!!! Do

![Stacked order](/assets/patterns/button-organization/stacked-ordering.png)
!!!



