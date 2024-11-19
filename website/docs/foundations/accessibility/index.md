---
title: Accessibility
caption: Applications should be usable and accessible for all users of differing abilities.
description: Applications should be usable and accessible for all users of differing abilities.
previewImage: assets/illustrations/foundations/accessibility.jpg
---

While our components are designed and developed with accessibility as a core requirement, they can still be implemented in a way that results in an application that doesn’t conform to WCAG Guidelines. 

To that end, HashiCorp product teams should consider the following best practices to ensure they’re implementing accessible products.

## Page organization

All content should be contained in elements with [landmark roles](https://www.w3.org/TR/wai-aria/#landmark_roles). Typically this includes the `header`, `main`, and `footer` elements, but depending on your page layout, you might also be using `aside` and `nav` as direct descendants of the `body` element.

## Titles and labels

### Page titles

Ensure that each page has a relevant page title. This is included in Ember applications by default, but older applications that have been updated over the years may need to manually add this in with [ember-page-title](https://github.com/ember-cli/ember-page-title).

### Headings

Headings (`h1`–`h6`) should follow a logical order and shouldn’t skip any levels. Dynamic applications can make this challenging, so this may require extra attention in checking what renders to the browser.

### Input labels

All inputs should have associated labels. These are built-in to the form components by default. If you need to compose custom fields using the base elements, remember that a `placeholder` attribute is not an acceptable substitute for a label.

## Accessible name

Not every element is allowed to use `aria-label`. Check the [element’s role documentation](https://www.w3.org/TR/wai-aria/#role_definitions) to see what aria-attributes are permissible. As the saying goes, "no ARIA is better than bad ARIA," so when in doubt, ask in [#team-design-system](https://hashicorp.slack.com/archives/C7KTUHNUS).

## Focus management

There are some key points to remember about focus management:

1. Focus should return from whence it came. For example, if a button opens a modal window, closing that modal window should return focus to the button.
2. Trap the focus! Focus should remain in a modal or other popup when it is open. Try [ember-focus-trap](https://github.com/josemarluedke/ember-focus-trap).
3. Focus order should match DOM order.

## Accessible routing

Adding support for accessible routing ensures that route transitions are appropriately announced to users with assistive technology. We recommend [ember-a11y-refocus](https://github.com/ember-a11y/ember-a11y-refocus), an addon that provides three things:

1. It adds a message to the page to let the screen reader user know that the route has changed and regular page navigation can resume (it’s similar to [a11y-announcer](https://github.com/ember-a11y/a11y-announcer) but doesn’t use `aria-live`).
2. It moves the focus to that message for the screen reader user, effectively resetting focus in Ember apps (similar to how a native web page works).
3. It provides an optional bypass mechanism so the user can skip to the page’s primary content (see [Technique G1](https://www.w3.org/WAI/WCAG22/Techniques/general/G1)). See the `Options` section in the documentation for available options.

## Automated testing

Use available automated tooling for static and dynamic analysis. Ember apps can use [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint) for static analysis and [ember-a11y-testing](https://github.com/ember-a11y/ember-a11y-testing) for dynamic analysis. Additionally, consider adding HTML validation to your CI.

## Manual testing

### Keyboard support

Ensure your application is keyboard navigable. Everything you can do with a mouse should have an equivalent experience with a keyboard.

### Browser extensions

We recommend using Microsoft’s [Accessibility Insights](https://accessibilityinsights.io/) and Deque’s [aXe](https://www.deque.com/axe/browser-extensions/) browser extensions to check for accessibility issues directly in the browser.

### Safari and VoiceOver

Your development environment has a screen reader built in. Become familiar with [VoiceOver](https://dequeuniversity.com/tips/learn-voiceover) and use it to test your application within Safari, especially if you’re implementing an uncommon UI and want to make sure it’s inclusive for our users.

## Accessibility support

There are many ways to learn about implementing accessible applications within HashiCorp.

### Internal training

Training is available for HashiCorp employees within the Accessibility library in Workramp.

### Accessibility Guild

The Accessibility Guild is a space where HashiCorp employees of all roles can join and learn more about accessibility. We offer multiple meeting days/times to accommodate our globally-distributed workforce and record meetings for those who can’t attend.

Have a question? We’re here to help! Ask in our internal Slack channel [#talk-a11y](https://hashicorp.slack.com/archives/CLYADQNHZ).
