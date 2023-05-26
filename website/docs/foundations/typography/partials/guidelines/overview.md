
## Font stack

Helios intentionally uses default system fonts from each operating system, benefiting from their reliability, versatility, and a broad array of styles to cater to diverse needs, including internationalization, code rendering, tabular data, data visualization, and more, ensuring a consistent cross-platform experience, optimizing performance by minimizing additional resource loading, and facilitating smooth and efficient user interactions within HashiCorp's extensive applications.

While the text might display differently across each OS, contextually to a user of that OS, it won’t seem out of place.

### Sans-serif

![sans-serif on mac](/assets/foundations/typography/sans-serif-mac.png =660x*)

![sans-serif on windows](/assets/foundations/typography/sans-serif-windows.png =660x*)

![sans-serif on linux](/assets/foundations/typography/sans-serif-linux.png =660x*)

### Monospace

![monospace on mac](/assets/foundations/typography/monospace-mac.png =660x*)

![monospace on windows](/assets/foundations/typography/monospace-windows.png =660x*)

![monospace on linux](/assets/foundations/typography/monospace-linux.png =660x*)

## Scale

Proportional sizes and weights in type scales within Helios establish consistent hierarchies, creating a visually organized structure that facilitates effortless differentiation between content levels and ensures overall consistency, coherence, usability, and legibility in the user interface.

| Size | Leading | Tracking |
|------|---------|----------|
| <span style="font-size: 30px; line-height: 38px;">30px</span> | <span style="font-size: 30px; line-height: 32px;">38px</span>    |          |
| <span style="font-size: 24px; line-height: 32px;">24px</span> | <span style="font-size: 24px; line-height: 32px;">32px</span>    |          |
| <span style="font-size: 18px; line-height: 24px; Letter-spacing: -0.5px;">30px</span> | <span style="font-size: 18px; line-height: 24px; Letter-spacing: -0.5px;">24px</span>    | -0.5     |
| <span style="font-size: 16px; line-height: 20px; Letter-spacing: -0.5px;">16px</span> | <span style="font-size: 16px; line-height: 20px; Letter-spacing: -0.5px;">20px</span>    | -0.5     |
| <span style="font-size: 14px; line-height: 20px;">14px</span> | <span style="font-size: 14px; line-height: 20px;">24px</span>    |          |
| <span style="font-size: 13px; line-height: 18px;">13px</span> | <span style="font-size: 13px; line-height: 18px;">18px</span>    |          |

###Display

Display styles elevate visual impact and hierarchy with larger fonts, bolder weights, and unique typographic characteristics, making them ideal for content-heavy pages and headings.

| Range             | Example Text                                                                                  | Label | Font size / Line height | Weight | Tracking |
| ----------------- | --------------------------------------------------------------------------------------------- | --------------------------------|--------|
| 500<br>dashboard page title | <span style="font-size: 30px; line-height: 30px; font-weight: 800;">Welcome</span>  | Display | 30px / 38px           | Bold   | 
| 400<br>page title | <span style="font-size: 24px; line-height: 32px; font-weight: 800;">cluster-example 1</span>  | Display | 24px / 32px           | Bold   |
| 400<br>emphasized display | <span style="font-size: 24px; line-height: 32px; font-weight: 600;">cluster-example 1</span> | Display | 24px / 32px    | Semi-bold |
| 400<br>display | <span style="font-size: 24px; line-height: 32px; font-weight: 600;">cluster-example 1</span> | Display | 24px / 32px               | Medium   |
| 300<br>section title | <span style="font-size: 18px; line-height: 24px; font-weight: 800; Letter-spacing: -0.5px;">Consul configuration</span> | Text | 18px / 24px | Bold | -0.5 |
| 300<br>emphasized display | <span style="font-size: 18px; line-height: 24px; font-weight: 700; Letter-spacing: -0.5px;">Consul configuration</span> | Text | 18px / 24px | Semi-bold | -0.5 |
| 300<br>display | <span style="font-size: 18px; line-height: 24px; font-weight: 500; Letter-spacing: -0.5px;">Consul configuration</span> | Text | 18px / 24px | Medium | -0.5 |
| 200<br>secondary content title | <span style="font-size: 16px; line-height: 24px; font-weight: 800; Letter-spacing: -0.5px;">More from Consul</span> | Text | 16px / 24px | Bold | -0.5 |
| 100<br>subtitle, table header | <span style="font-size: 13px; line-height: 18px; font-weight: 800;">Cluster ID</span> | Text | 13px / 18px | Bold   |

###Body

Helios's body styles establish the foundational type size for our products, providing a starting point for the typographic hierarchy throughout the body content.

| Range           | Example Text                                                                                                        | Label | Font size / Line height | Weight |
|-----------------|---------------------------------------------------------------------------------------------------------------------|-------|-------------------------|--------|
| 300<br>docs, tutorials|<span style="font-size: 16px; line-height: 24px; font-weight: 800;">Installing a Linux package is the easiest.</span>| Text  | 16px/24px               | Semi-bold |
| 300<br>docs, tutorials|<span style="font-size: 16px; line-height: 24px; font-weight: 500;">Installing a Linux package is the easiest.</span>| Text  | 16px/24px               | Medium |
| 300<br>docs, tutorials link|<span style="font-size: 16px; line-height: 24px; font-weight: 500;">Installing a <Hds::Link::Inline @color="primary" @href="...">Linux package</Hds::Link::Inline> is the easiest.</span>| Text  | 16px/24px               | Medium |
| 300<br>docs, tutorials|<span style="font-size: 16px; line-height: 24px; font-weight: 400;">Installing a Linux package is the easiest.</span>| Text  | 16px/24px               | Regular |