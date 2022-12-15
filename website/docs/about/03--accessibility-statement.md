---
title: Accessibility Statement
description: This is an accessibility statement from the HashiCorp Design Systems team.
---

Accessibility is a core requirement, not an optional feature; this aligns with our [company principles](https://www.hashicorp.com/our-principles), especially our principle of integrity.

> Integrity requires a consistency of our thoughts, words, and actions and a dedication to the truth.

To this end, we have built the HashiCorp Design System with accessibility as a core requirement. In this way, we are giving HashiCorp product designers and developers a greater ability to deliver accessible product experiences for all HashiCorp users.

## Ensuring accessible outcomes

Because we are firm in our commitment to accessibility, we take practical steps to ensure that our outcomes are accessible. This means that we integrate accessibility at every step of our creation cycle, and include team education and training as part of that. In addition to formalizing our commitment to WCAG 2.1 AA conformance with an internal policy, here are the action steps we take:

- Provide education and training for our team.
- Design with accessibility as a core requirement.
- Conduct design reviews specifically focused on accessibility.
- Ensure our code renders to the browser in a conformant way.
- Use the available accessibility automation (through [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint) and [ember-a11y-testing](https://github.com/ember-a11y/ember-a11y-testing)).
- Manually test our code with assistive technologies.

## Compatibility expectations

We intend to be compatible with the following assistive technologies:

- Safari with VoiceOver on macOS
- Chrome with Jaws on Windows
- Firefox with JAWS and NVDA on Windows

## Conformance status

The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. The HashiCorp Design System intends to be fully conformant with WCAG 2.1 Level AA. Fully conformant means that the content fully conforms to the accessibility standard.

### Limitations and alternatives

Despite our best efforts to ensure accessibility of the HashiCorp Design System, there may be some limitations.

If we are unable to provide conformance through the component itself, we will provide documentation for the implementation of an equivalent experience. Other accessibility-related exceptions and considerations will be documented on each component's page, where we also provide the relevant WCAG Success Criteria for that specific component.

#### Known limitations

- [Breadcrumb component](/components/breadcrumb): keyboard-only users may not be able to access truncated data. It occurs due to a combination of factors, including user-provided content and browser-based technical limitations. We are encouraging teams to refactor design if it currently includes truncated data.
- [Card component](/components/card): this component has `overflow:hidden` applied to contain content by default; users must take care to self-edit their content to conform to the available space. Truncated content is not available to keyboard-only users.

## Assessment approach

The HashiCorp Design Systems Team self-assesses the accessibility of the HashiCorp Design System by the following approaches:

- Manual testing with assistive technologies
- Use of available automated checks

## Feedback

We welcome your feedback on the accessibility of the HashiCorp Design System. Please let us know if you encounter accessibility barriers on the HashiCorp Design System:

- GitHub: file an issue on the [design-systems repository](https://github.com/hashicorp/design-system/issues/new)
- E-mail: [design-systems@hashicorp.com](mailto:design-systems@hashicorp.com)

We are committed to responding to feedback in a timely manner.
