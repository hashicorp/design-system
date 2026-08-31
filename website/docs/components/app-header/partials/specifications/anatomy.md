## Anatomy

### Large viewports

![Anatomy of the large App Header](/assets/components/app-header/app-header-anatomy-large.png)

| Element          | Usage                                     |
|------------------|-------------------------------------------|
| **Global**       |                                           |
| Home link        | Required; supports multiple product logos |
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
| Menu button      | Required                                  |
| Context switcher | Optional                                  |
| **Menu**         |                                           |
| Help dropdown    | Optional, but highly recommend ([WCAG guidelines](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html))     |
| User dropdown    | Required                                  |
| Search           | Optional                                  |

### Theme selection

| Element | Usage |
|---------|-------|
| User settings | Application-specific, generally consists of user/account settings and authentication settings |
| Title | Labels the theme selection in the menu. Uses the `ListItem::Title` element. |
| Theme options | An array of options using the `ListItem::Checkmark` component. |
| Active theme | Indicates the current/selected theme using the checked `ListItem::Checkmark`. |

### Language selection

