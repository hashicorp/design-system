## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Accessibility in design

Provide annotations alongside each design of the non-visual experience. This could look like:

![Accessibility annotation example](/assets/components/button/button-annotation_example.png)

## Accessibility in engineering

While years of misuse have muddled the purpose of a button element and a link element, so here is a good rule of thumb to follow:

If it _goes to URL_, use a link. If it does an _action_ (toggle a state, submit a form, etc.), then use a button.

Now, you may be thinking, “What about instances where I submit a form and redirect a user to a different URL?” This is still a button use case.

Buttons and links especially make a difference for keyboard-only users and users with assistive technology(AT). A button element can be activated with the ENTER/RETURN key OR the SPACEBAR; a link can only be activated with the ENTER/RETURN key.

If you are working on a UI that already uses buttons and links interchangeably, this is a great opportunity for a team discussion on which one is appropriate for use in your situation. It’s totally okay for it to be a goal that you work toward; there are always opportunities to care for, and improve, our code.

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.4.7" "4.1.1" "4.1.2" }} />

## Support

If any accessibility issues have been found within this component, please let us know by [submitting an issue](https://github.com/hashicorp/design-system/issues/new/choose).
