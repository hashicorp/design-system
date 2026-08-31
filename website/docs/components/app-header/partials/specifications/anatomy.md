## Anatomy

### Large viewports

![Anatomy of the large App Header](/assets/components/app-header/app-header-anatomy-large.png)

| Element          | Usage                                     |
|------------------|-------------------------------------------|
| **Global**       |                                           |
| Home link        | Required; supports multiple product logos |
| Text             | Optional; displays the name of the application |
| Context switcher | Optional                                  |
| **Utilities**    |                                           |
| Help dropdown    | Optional, but highly recommend ([WCAG guidelines](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html))     |
| User dropdown    | Required                                  |
| Search           | Optional                                  |

### Small viewports

![Anatomy of the small App Header](/assets/components/app-header/app-header-anatomy-small.png)

| Element          | Usage                                     |
|------------------|-------------------------------------------|
| Home link        | Required; supports multiple product logos |
| Text             | Optional; displays the name of the application |
| Menu button      | Required                                  |
| Context switcher | Optional                                  |
| **Menu**         |                                           |
| Help dropdown    | Optional, but highly recommend ([WCAG guidelines](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html))     |
| User dropdown    | Required                                  |
| Search           | Optional                                  |

### Theme selection

![Anatomy of the Theme Selection pattern in the App Header](/assets/components/app-header/app-header-anatomy-theme-selection.png)

| Element | Usage |
|---------|-------|
| User settings | Application-specific, generally consists of user/account settings and authentication settings |
| Title | Labels the theme selection in the menu. Uses the `ListItem::Title` element. |
| Theme options | An array of theme options using the `ListItem::Checkmark` component. |
| Active theme | Indicates the current/selected theme using the checked `ListItem::Checkmark`. |

### Language selection

![Anatomy of the Language Selection pattern in the App Header](/assets/components/app-header/app-header-anatomy-language-selection.png)

| Element | Usage |
|---------|-------|
| Language selection Dropdown | Dedicated entry point in the App Header |
| Title | Labels the language selection in the menu. Uses the `ListItem::Title` element. |
| Language options | An array of language options using the `ListItem::Checkmark` component. |
| Active language | Indicates the current/selected theme using the checked `ListItem::Checkmark` |