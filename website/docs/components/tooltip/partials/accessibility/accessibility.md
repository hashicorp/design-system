## Conformance rating

<Doc::Badge @type="warning">Conditionally Conformant</Doc::Badge>

When used on an interactive element, there should be no conformance issues with this component.

The issue with tooltips, in general, is that of persistence and perceivability. When used on inline text, how does the user know that the text has some sort of tooltip attached to it? If the user cannot perceive that the text has any kind of interactivity, then the tooltip would, in this case, not be conformant.

Consumers should proceed with caution in this case, and consider designs that make it clear to the user what options are available to them.


## Focus

- When the trigger receives focus via keyboard, the tooltip shows.
- When the user presses the ESC key, the tooltip dismisses and gets removed from the screen.

![Focus order within a simple Flyout](/assets/components/tooltip/tooltip-focus.png =600x*)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.1.1" "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.4.7" "4.1.2" }} />

---

<Doc::A11ySupport />
