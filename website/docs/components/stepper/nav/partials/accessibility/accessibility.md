## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Keyboard navigation

!!! Info

Keyboard navigation with the following keys is only available when `@isInteractive` is set to `true`.
!!!

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Focus on the active step.

![Stepper Nav with 3 steps. The second step, which is active, is focused.](/assets/components/stepper/nav/stepper-nav-focus.png)

<Doc::Badge @type="neutral"><Hds::Icon @name="arrow-left" @title="Left arrow" /></Doc::Badge>
<Doc::Badge @type="neutral"><Hds::Icon @name="arrow-right" @title="Right arrow" /></Doc::Badge>

Move between completed and active steps.

If focus is on the first step, `left arrow` moves focus to the last completed or active step. If focus is on the last completed or active step, `right arrow` moves focus to the first completed or active step.

![Stepper Nav with 3 steps. The left arrow has been pressed moving focus from step 1 to step 2.](/assets/components/stepper/nav/stepper-nav-arrow-key.png)

<Doc::Badge @type="neutral">Spacebar</Doc::Badge>
<Doc::Badge @type="neutral">Enter</Doc::Badge>

Activate step to display step content.

![Stepper Nav showing on spacebar or enter on a completed step, that step is made active](/assets/components/stepper/nav/stepper-nav-enter.png)

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Move to interactive element within the content area.

![Stepper Nav showing on tab press while focus is on a step, focus moves to next interactive element](/assets/components/stepper/nav/stepper-nav-focus-to-content.png)

## Applicable WCAG Success Criteria

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.1.2" "2.2.2" "2.4.6" "2.4.7" "3.2.1" "3.3.2" "4.1.2" }} />

---

<Doc::A11ySupport />
