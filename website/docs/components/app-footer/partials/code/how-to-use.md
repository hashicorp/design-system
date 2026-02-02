## How to use this component

The `AppFooter` is used to display a brief list of useful links and information relevant to an entire application. 

### Basic invocation with recommended content

The `AppFooter` contains only a copyright by default. The provided `LegalLinks` child component is recommended for inclusion in application footers for our cloud products such as HCP and TFC.

[[code-snippets/app-footer-basic]]

### StatusLink

Add the `StatusLink` to display information on the health of your application. Pass a predefined `status` name or use individual arguments to set `text`, `statusIcon`, `iconColor` to create a custom status type. Pass a custom `href` value to point to a custom URL.

[[code-snippets/app-footer-status-link]]

### Link

You can add custom links in addition to or instead of including `LegalLinks`.

[[code-snippets/app-footer-link]]

### Item

`Item` components can be used to include meta text or other non-link content.

[[code-snippets/app-footer-item]]

### ExtraBefore & ExtraAfter

Custom content can be added either before or after the `AppFooter` main content. The layout of this content is inline with other content by default.

[[code-snippets/app-footer-extra-content]]

#### Custom layout

Add your own styles to customize the layout of the extra content areas.

[[code-snippets/app-footer-layout]]

### Theme

Both a `light` and  a `dark` theme are included.

[[code-snippets/app-footer-theme]]
