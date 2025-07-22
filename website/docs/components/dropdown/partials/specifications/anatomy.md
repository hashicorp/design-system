## Anatomy

### Dropdown

![Dropdown anatomy](/assets/components/dropdown/dropdown-anatomy.png)

| Element          | Usage                  |
|------------------|------------------------|
| Toggle           | Required               |
| Header           | Optional               |
| List             | Required               |
| Footer           | Optional               |

### Toggle

<Doc::Layout @spacing="48px">
    ![Toggle button anatomy](/assets/components/dropdown/dropdown-button-anatomy.png)
    ![Toggle icon anatomy](/assets/components/dropdown/dropdown-icon-anatomy.png)
</Doc::Layout>

| Element                   | Usage                                           |
|---------------------------|-------------------------------------------------|
| Text, Icon, or Avatar     | One is required                                 |
| Chevron                   | Required, except on the Overflow toggle         |
| Container                 | Required                                        |

### ListItem

![Dropdown ListItem anatomy](/assets/components/dropdown/dropdown-listitem-anatomy.png)

| Element          | Usage                                                    |
|------------------|----------------------------------------------------------|
| Text             | Required                                                 |
| Icon             | Required for Critical ListItems; Optional otherwise      |
| Indicator        | Visible in hover and active state                        |
| Focus ring       | Visible in focus state                                   |
