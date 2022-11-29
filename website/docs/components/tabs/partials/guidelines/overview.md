Tabs allow users to **move between different views within the same context** and at the same level of hierarchy, ie. UI vs. CLI, macOS vs. Windows vs. Linux, etc.

Tabs are not intended for navigation. For this reason, we chose to use HTML `button` elements for activating individual tabs vs. links. If your use case includes a usage of a Tabs-like component for navigation, consider using other navigation patterns, such as sidebar, links, or breadcrumbs.

Use the `@onClickTab` handler if you need to store the active tab in the URL for persistence.