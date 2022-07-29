---
order: 5
---

# Icon position

There are four available colors for a button: `primary`, `secondary`, `tertiary`, and `critical`. The default is `primary`. To use a different color, declare another value for `@color`:


```hbs template
<Hds::Button @icon="plus" @text="Primary action" />
<br />
<Hds::Button @icon="plus" @text="Secondary action" @color="secondary" />
<br />
<Hds::Button @icon="plus" @text="Tertiary action" @color="tertiary" />
<br />
<Hds::Button @icon="plus" @text="Critical action" @color="critical" />
```
