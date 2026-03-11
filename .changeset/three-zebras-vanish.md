---
"@hashicorp/flight-icons": major
---

"Carbonized" all the assets, by adding two glyphs under the same icon (one for the "classic" HDS Flight icon, one for the IBM Carbon icon; in Figma they're controlled by `isHDS`/`isCDS` variables, while in code they are handled by the `HdsIcon` component). This change has updated the internal SVG code for every icon (hence the "major" version change), but visually everything should remain the same.
