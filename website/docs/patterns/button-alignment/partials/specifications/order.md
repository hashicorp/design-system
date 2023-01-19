## Order

When performing an action or function, users generally think from highest to lowest priority and from positive to negative. How buttons and actions are ordered should respect this by ordering the primary (most important) action first, secondary action second, and if applicable, tertiary action last.

!!! Do

Order buttons based on priority starting with the **highest** priority  action(usually by using a primary button) to **lowest** priority (either secondary or tertiary actions).
!!!

![Ordering from high priority](/assets/patterns/button-alignment/order-high-low-priority.png)

### Destructive actions

In the case of a destructive action, the primary button should be replaced with a destructive or critical action button in the same position. While a destructive action may have a **negative** connotation, the priority of the action takes precedence over whether the action is positive or negative in this scenario.

!!! Do

![Destructive action order](/assets/patterns/button-alignment/order-destructive-action.png)
!!!

### Conversational messaging

Users often expect to communicate with machines and applications as if they were humans. Adhering to these guidelines can help to reinforce this paradigm by encouraging users through a human-like conversational style.

![Button order through conversational style](/assets/patterns/button-alignment/order-conversational-example.png)

Consider the following scenario:

A user has taken an action to edit the settings of a cluster. Approached through a conversational method, the highest priority positive action (Save changes) comes first, with less-important and negative actions following.

An often depicted alternative to this scenario is to **end** with the most important action as seen in the following comparative example. When analyzed using a reading pattern, the example is awkward when read out loud and forces the user to read through items of lower importance first.

!!! Dont

#### Non-natural conversation based on priority

![Suboptimal grouping](/assets/patterns/button-alignment/suboptimal-grouping.png)

- User edits the settings of a cluster
    - "Would you like to learn more about this action?" "No"
    - "Would you like to cancel?" "No"
    - "Would you like to save the changes to this cluster?" "Yes, finally that's what I was trying to do all along."
!!!

!!! Do

#### Natural conversation based on priority
![Optimal order](/assets/patterns/button-alignment/optimal-ordering.png)

- User edits the settings of a cluster
    - "Would you like to save the changes to this cluster?" "Yes, thank you."
!!!

#### Exceptions

An possible exception to this ordering method is in multi-step and progressive flows in which buttons fulfill both a functional purpose (create or edit something) as well as a navigational purpose (proceed, go back).

- The **directionality** and positive outcome of the overall flow is reinforced by the button order and grouping
- In a multi-step flow this type of pattern would persist on the page; the repetitiveness acts a form of consistency scoped to the feature the pattern is used in.

![Multi-step progressive flow](/assets/patterns/button-alignment/multi-step-progressive-flow.png)

### Stacking order

As the viewport size contracts, buttons should stack vertically in accordance with their order in the [DOM (Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). 

- Naturally adheres to our ordering guidelines; button order remains the same except the container is vertical rather than horiztonal.
- Reduces complexity in engineering.
- Ensures that a core accessibility requirement is met: [Making the DOM order match the visual order](https://www.w3.org/TR/WCAG20-TECHS/C27.html)

!!! Do

![Stacked order](/assets/patterns/button-alignment/stacked-ordering.png)
!!!



