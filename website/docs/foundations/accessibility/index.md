---
title: Accessibility
---

While our components are designed and developed with accessibility as a core requirement, they can still be implemented in a way that results in an application that is not conformant with WCAG Guidelines. To that end, we provide some considerations for application-level concerns.

## Accessible Routing

To ensure that route transitions are appropriately announced to users with assistive technology, applications should consider adding support for accessible routing. We currently recommend [ember-a11y-refocus](https://github.com/ember-a11y/ember-a11y-refocus), an addon that provides three things:

1. It adds a message to the page to let the screen reader user know that the route has changed and regular page navigation can resume (it is similar to [https://github.com/ember-a11y/a11y-announcer](https://github.com/ember-a11y/a11y-announcer) but does not use `aria-live`).
2. It moves the focus to that message for the screen reader user, effectively resetting focus in Ember apps (similar to how a native web page/site works).
3. It provides a bypass mechanism so the user can skip to the page's primary content (see [https://www.w3.org/TR/WCAG20-TECHS/G1.html](https://www.w3.org/TR/WCAG20-TECHS/G1.html)). You can opt out of this if you want (see the `Options` section in the documentation for available options).

## Page Organization

All content should be contained in elements with [landmark roles](https://www.w3.org/TR/wai-aria/#landmark_roles). Typically this will be the `header`, `main`, and `footer` elements, but depending on your page layout, you might also be using `aside` and `nav` as direct descendants of the `body` element as well.

## Titles and Labels

### Page titles

Additionally, teams should ensure that each page has a relevant page title. This is included in Ember applications by default, but older applications that have been updated over the years may need to manually add this in with [ember-page-title](https://github.com/ember-cli/ember-page-title).

### Headings

Headings (h1-h6) should follow a logical order and not skip any levels. This can be tricky in dynamic applications so watch out for this one.

### Input labels

All inputs should have associated labels. These are provided for in the design system form components, but if you build your own make sure to check for these, remembering that a `placeholder` attribute is not an acceptable substitute.

### Accessible name

Remember, not every element is allowed to use `aria-label`. Check the [element's role documentation](https://www.w3.org/TR/wai-aria/#role_definitions) to see what aria-attributes are permissible. Just remember, when in doubt, ask! As the saying goes, "no ARIA is better than bad ARIA!"

## Focus Management

There are some key points to remember about focus management:

1. Focus should return from whence it came. If a button toggled a modal window, closing that modal window should return focus to the button.
2. Trap the focus! Focus should remain in a modal or other popup when it is open. Try [ember-focus-trap](https://github.com/josemarluedke/ember-focus-trap).
3. Focus order should match DOM order.

## Automated Testing

Product applications should endeavor to use the automated tooling for static and dynamic analysis that are available to them. Ember apps can use [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint) for static analysis and [ember-a11y-testing](https://github.com/ember-a11y/ember-a11y-testing) for dynamic analysis. Additionally, consider adding HTML validation to your CI.

## Manual Testing

- *Keyboard support:* ensure that your application is keyboard navigable. Everything that you can do with a mouse should have an equivalent experience with a keyboard!
- *Browser extensions:* there are a few browser extensions that can help you with accessibility. Check out Microsoft's [Accessibility Insights](https://accessibilityinsights.io/) and Deque's [aXe](https://www.deque.com/axe/browser-extensions/) are two popular extensions that can help you check for accessibility issues right in your browser!
- *Safari and VoiceOver:* your development environment has a screen reader built in! Become familiar with VoiceOver use it to test your application with Safari, especially if you are creating a non-standard UI and want to make sure that it will be inclusive for our users.

## Accessibility Support

Don't forget that there are other ways to learn more about implementing accessible applications. Training is available for HashiCorp employees through our internal learning library; look for the Accessibility section!

There is also the Accessibility Guild where HashiCorp employees of all roles can join and learn more about accessibility topics. With multiple meeting days/times that accommodate a globally-distributed workforce, there is sure to be something for everyone. We also record meetings and make those available for those who are unable to attend.

Have a question? Ask in our friendly Slack chat...we are here to help!
