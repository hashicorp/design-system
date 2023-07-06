## Single-column

We recommend _most_ forms use a single-column layout as it makes the information easier to parse and reinforces the sequential nature of filling out a form.

If a form uses a single-column layout, consider setting a maximum width on the form; this can be achieved by using a size or unit **relative** to the page, viewport, or container size, e.g., viewport width unit (`vw`), percentage width (`50%`), or a character unit (`ch`).


!!! Info

The web is a fluid medium. A relative width will adjust based on the viewport and container width. Designing and building a form with a maximum and minimum width will ensure a graceful expansion and contraction within the viewport.
!!!

## Multi-column

Horizontal sets of form elements creates a multi-column layout within the form.

!!! Do

Use a consistent number of columns through the form.

![Consistent number of columns](/assets/patterns/form-patterns/multi-column-consistent-columns.png =500x*)
!!!

!!! Dont

Don't organize a set of fields in two columns and another set in three columns.

![Inconsistent number of columns](/assets/patterns/form-patterns/multi-column-inconsistent-columns.png =500x*)
!!!

!!! Dont

Don't exceed more than three fields in a horizontal set. In most scenarios it's best to limit the number of columns in a form or section to two.

![Three field maximum in a set](/assets/patterns/form-patterns/multi-column-three-fields-max.png =500x*)
!!!

!!! Do

Stack fields vertically when the width of the viewport and form container shrinks.

![Stack fields](/assets/patterns/form-patterns/multi-column-stacking.png =350x*)
!!!

The width of the overall form can impact multi-column layouts. Use set organization logically based on the layout, width of the page, and overall UX strategy in the application.

Refer to the [button organization stacking guidelines](/patterns/button-organization#stacking-order) when determining how buttons should stack as the viewport condenses.