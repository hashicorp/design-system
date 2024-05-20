---
title: Accessibility statement
navigation:
  order: 105
---

We believe accessibility is a core requirement and not an optional feature. Our approach to accessibility closely aligns with our [HashiCorp principles](https://www.hashicorp.com/our-principles), such as our core principle of integrity.

> Integrity requires a consistency of our thoughts, words, and actions and a dedication to the truth.

Because we build the Helios Design System with accessibility as a core requirement, we’re giving HashiCorp product designers and engineers a greater ability to deliver accessible product experiences for all HashiCorp users.

## Ensuring accessible outcomes

Because we’re firm in our commitment to accessibility, we take practical steps to ensure our outcomes are accessible. This means that we integrate accessibility at every step of our creation cycle. In addition to formalizing our commitment to WCAG 2.2 AA conformance with an internal policy, we take the following actionable steps:

- Provide education and training for our team.
- Design with accessibility as a core requirement.
- Conduct design reviews specifically focused on accessibility.
- Ensure our code renders to the browser in a conformant way.
- Use available accessibility automation (through [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint) and [ember-a11y-testing](https://github.com/ember-a11y/ember-a11y-testing)).
- Manually test our code with assistive technologies.

## Compatibility expectations

We intend to be compatible with the following assistive technologies:

- Safari with VoiceOver on macOS
- Chrome with JAWS on Windows
- Firefox with JAWS and NVDA on Windows

## Conformance status

The Web Content Accessibility Guidelines (WCAG) define requirements for designers and engineers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Helios intends to be fully conformant with WCAG 2.2 Level AA requirements.

For clarity, fully conformant means that the content fully conforms to the accessibility standard.

### Limitations and alternatives

Despite our best efforts to ensure accessibility of Helios, there may be some limitations.

If we can’t provide conformance through the component, we’ll provide documentation for implementing an equivalent experience. We outline other accessibility-related exceptions and considerations and provide the relevant WCAG Success Criteria within each component’s documentation.

#### Known limitations

The known WCAG conformance issues are listed on the component’s page under the accessibility tab.

## Assessment approach

The Design Systems Team self-assesses the accessibility of Helios by the following approaches:

- Manual testing with assistive technologies
- Use of available automated checks

## Feedback

We welcome your feedback on the accessibility of Helios. Please let us know if you encounter accessibility barriers in the design system:

- GitHub: file an issue on the [design-systems repository](https://github.com/hashicorp/design-system/issues/new)
- E-mail: [helios@hashicorp.com](mailto:helios@hashicorp.com)

We are committed to responding to feedback in a timely manner.
