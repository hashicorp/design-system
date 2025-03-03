## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Keyboard navigation

!!! Info

Keyboard navigation with the following keys is only available when `@isInteractive` is set to `true`.
!!!

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Focus on the active step.

![Example Stepper Nav with 3 steps showing on tab press the second step, which is active, is focused](/assets/components/stepper/navigation/stepper-navigation-focus.png =1400x*)

<Doc::Badge @type="neutral"><Hds::Icon @name="arrow-left" /></Doc::Badge>
<Doc::Badge @type="neutral"><Hds::Icon @name="arrow-right" /></Doc::Badge>

Move between completed and active steps.

!!! Info

If focus is on the first step, `left arrow` moves focus to the last completed or active step. If focus is on the last completed or active step, `right arrow` moves focus to the first completed or active step.
!!!

![Example Stepper Nav with 3 steps showing on left arrow press the focus moves to step 1 from step 2](/assets/components/stepper/navigation/stepper-navigation-arrow-key.png =1400x*)

<Doc::Badge @type="neutral">Spacebar</Doc::Badge>
<Doc::Badge @type="neutral">Enter</Doc::Badge>

Activate step to display step content.

![Example Stepper Nav showing on spacebar or enter on a completed step, that step is made active](/assets/components/stepper/navigation/stepper-navigation-enter.png =1400x*)

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Move to interactive element within the content area.

![Example Stepper Nav showing on tab press while focus is on a step, focus moves to next interactive element](/assets/components/stepper/navigation/stepper-navigation-focus-to-content.png =1400x*)

## Applicable WCAG Success Criteria

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.1.2" "2.2.2" "2.4.6" "2.4.7" "3.2.1" "3.3.2" "4.1.2" }} />

---

<Doc::A11ySupport />
