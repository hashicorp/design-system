<!-- <h1>Alert component - Design Guidelines</h1>

<section data-section="design-guidelines">

  <div class="dummy-design-guidelines">
    <p class="dummy-paragraph"><a
        href="https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/?node-id=1377%3A11987"
        target="_blank"
        rel="noopener noreferrer"
      >Figma UI Kit</a></p>
    <br />
    <img class="dummy-figma-docs" src="/assets/images/alert-design-usage-part1.png" alt="" role="none" />
    <img class="dummy-figma-docs" src="/assets/images/alert-design-usage-part2.png" alt="" role="none" />
  </div>
</section> -->

# Alert

## When to use

- To display a concise, important message that requires the user's attention.

## When not to use

- To communicate feedback on a user's action. Use [Toast](/components/toast/overview) in this case.
- As a dialog to confirm an action. Consider using a dialog or [Modal](/components/modal/overview).
- As feature flags, such as "In Preview", "Beta", "New", etc. Consider [Badge](/components/badge/overview).

---

_Page, Inline_

## Anatomy

All alert types share the same anatomy except for AlertCompact.

![Anatomy of the page Alert](/assets/components/alert/alert-anatomy-page.png)

![Anatomy of the inline Alert](/assets/components/alert/alert-anatomy-inline.png)

#### Icon

Optional (recommended)

#### Title

Required only when description is false, optional otherwise

#### Description

Required only when Title is false, optional otherwise

#### Actions

Optional

#### Dismiss Button

Optional

#### Container

Optional

#### Content

Required

---

_Compact_

## Anatomy

![Anatomy of the compact Alert](/assets/components/alert/alert-anatomy-compact.png)

---

## Color

![Examples of color variants for Alerts](/assets/components/alert/alert-color-variants.png)

Use color logically.

- **Neutral** to provide general information to the user regarding the current context or relevant actions.
- **Highlight** to provide general or promotional information to the user prominently.
- **Success** to indivate a successful action. Use the success variant sparingly; to communicate success after an action is performed, use [Toast](/components/toast/overview).
- **Warning** to help users avoid an issue. Provide guidance and actions if possible.
- **Critical** to indicate critical issues that need immediate action or help users understand a critical error.

_Insert banner (informational):_ Use **Neutral** or **Highlight** as equivalents to **Information** in **Structure Banners** depending on the level of prominence desired.

---

_Page, Inline_

## Dismissal

All alerts except for compact can be set to dismiss. They are, however, set to be persistent by default.

- We recommend neutral and highlight alerts to be dismissible as they are not critical for users to complete their journey.

#### Persistent

![Persistent Alert](/assets/components/alert/alert-inline-persistent.png)

## Dismissible

![Dismissible Alert](/assets/components/alert/alert-inline-dismissible.png)

## Critical alerts

- We recommend keeping critical alerts non-dissmissible as they are essential to the user's journey and can get dismissed by mistake.

![Do this with a critical Alert](/assets/components/alert/alert-inline-critical-do.png)

Do

![Don't do this with a critical alert](/assets/components/alert/alert-inline-critical-dont.png)

Don't

---

## Icons

All alerts have icons by default. They are intentionally tied to the alert type. Icons in Neutral and Highlight alerts can be swapped out with any other icon from Flight, including animated ones. Change them only when the new icon provides the user with extra value; otherwise, leaving the default icon is recommended.

![Example of changing the icon within an Alert](/assets/components/alert/alert-inline-with_icon.png)

---

## Actions

- We recommend using the secondary button variant for primary actions and the tertiary button variant for secondary actions.
- Use [LinkStandalone](/components/link/standalone/overview) when an action expects to take the user to a new destination (URL) instead of triggering an action within the same page. Follow `LinkStandalone` [usage guidelines](https://www.figma.com/file/8I4u10OyhYZIea4MpXwJwm/Design-guidelines-migration?node-id=2522%3A8014) to determine what variant "type" to use.
- To keep hierarchy and avoid competing with other actions on the page, using "small" size variants is recommended.
- Avoid using critical buttons in alerts. If used, consider adding a confirmation modal as an extra step, after the action is triggered.
- Up to two actions should be used.

Some common examples are:

#### Button secondary only

![Alert with only a secondary action](/assets/components/alert/alert-actions-button_secondary_only.png)

#### Link only

![Alert with only a Link action](/assets/components/alert/alert-actions-link_only.png)

#### Button secondary + tertiary

![Alert with secondary and tertiary actions](/assets/components/alert/alert-actions-button_secondary_tertiary.png)

---

_Page, Inline_

## Composition

Alerts are very flexible and highly configurable except for `AlertCompact`, in which all properties are required. Some common use-cases are:

#### With icon and title

![Example of an Alert with an icon and title](/assets/components/alert/alert-with_icon_title.png)

#### With icon, title, and description

![Example of an Alert with an icon, title, and description](/assets/components/alert/alert-with_icon_title_description.png)

#### Title and description only

![Example of an Alert with only a title and description](/assets/components/alert/alert-with_title_description_only.png)

_Insert banner (warning):_ When icon=false, the title or description should contain the alert type, ie. "Warning".

#### With actions

![Example of actions within an Alert](/assets/components/alert/alert-with_actions.png)

#### With custom content

![Example of an Alert with custom content](/assets/components/alert/alert-with_custom_content.png)

_Insert banner (warning):_ Use this method with caution. It can be very helpful, but may require additional time to get it set up correctly. We recommend reacing out to the design system team before proceeding.

#### With custom actions

![Example of an Alert with custom actions](/assets/components/alert/alert-with_custom_actions.png)

_Insert banner (warning):_ Use this method with caution. It can be very helpful, but may require additional time to get it set up correctly. We recommend reacing out to the design system team before proceeding.

---

## Placement

#### Page

Page alerts are placed between the global header navigation and the breadcrumb, next to the left navigation.

![Example placement of an Alert at the page level](/assets/components/alert/alert-placement_page.png)

#### Inline

Inline alerts can be wrapped within the section or component of the page or inline with content.

![Example placement of an Alert inline](/assets/components/alert/alert-placement_inline.png)

#### Compact

Compact alerts can be wrapped within a section or component of the page or inline with content.

![Example placement of compact alert](/assets/components/alert/alert-placement_compact.png)

---

## Content

- Keep the title short, as this will be the most prominent element when users scan the alert.
- Do not end the title with a period.
- Alert messages should be short but clear and descriptive enough to explain what's happening and guide users on how to prevent or fix the issue. We recommend keeping messages under 90 characters.
- Text formatting capabilities such as inline links, bold, italic, code, and bulleted lists are supported.
- For actions, refer to [Button](/components/button/overview) and [Link](/components/link/standalone/overview) content guidelines.

### Examples

![Example of content with an Alert](/assets/components/alert/alert-content_example-01.png)

![Example of content with an Alert](/assets/components/alert/alert-content_example-02.png)

![Example of content with an Alert](/assets/components/alert/alert-content_example-03.png)
