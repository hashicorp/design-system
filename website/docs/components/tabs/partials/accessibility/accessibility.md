## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

## Animation

No indicator animation will be present for users that have enabled `prefers-reduced-motion`.

## Keyboard navigation

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Focus on a tab

![Keyboard tab navigation example](/assets/components/tabs/tab-focus.png =402x*)

<Doc::Badge @type="neutral">Spacebar</Doc::Badge>
<Doc::Badge @type="neutral">Enter</Doc::Badge>

Activate tab to display matching content area

![Keyboard tab navigation example](/assets/components/tabs/tab-spacebar-enter.png =402x*)

<Doc::Badge @type="neutral"><FlightIcon @name="arrow-left" /></Doc::Badge>
<Doc::Badge @type="neutral"><FlightIcon @name="arrow-right" /></Doc::Badge>

Move between tabs

!!! Info

If focus is on the first tab, `left arrow` moves focus to the last tab. If focus is on the last tab, `right arrow` moves focus to the first tab.
!!!

![Keyboard tab navigation example](/assets/components/tabs/tab-arrows.png =402x*)

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Move to interactive element within the content area

![Keyboard tab navigation example](/assets/components/tabs/tab-focus-to-panel.png =402x*)

## Applicable WCAG Success Criteria

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.4.6" "2.4.7" "3.2.1" "4.1.2" }} />

---

<Doc::A11ySupport />
