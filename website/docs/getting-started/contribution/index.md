---
title: Contribution
order: 104
---

## Types of contribution

While we don't accept direct contributions of new components or patterns, we do welcome contributions in the following forms:

* [Reporting](https://github.com/hashicorp/design-system/issues/new/choose) or [fixing](#code-contributions) bugs and [giving feedback](https://docs.google.com/forms/d/e/1FAIpQLSdPShbSiUYgimppZeqWT99bVi6zLbKDThQUQTirH3RCj2okdg/viewform)
* [Proposing new components or patterns](https://docs.google.com/forms/d/e/1FAIpQLScpMXgrUTVT5fYriu4Pp48r4Nl_eCPluVnJLg0Yg3NXsRWvIA/viewform)
* [Add an icon](#icon-contributions)
* Improving our documentation
* Participating in discussions or coming to Office Hours

We continue to listen to feedback as we consider the best way to open contributions further.

## Code contributions

For contributions to the individual code packages, consult the `CONTRIBUTING.md` files.
* [Tokens](https://github.com/hashicorp/design-system/blob/main/packages/tokens/CONTRIBUTING.md)
* [Ember Flight Icons](https://github.com/hashicorp/design-system/blob/main/packages/ember-flight-icons/CONTRIBUTING.md)
* [Components](https://github.com/hashicorp/design-system/blob/main/packages/components/CONTRIBUTING.md)

## Icon contributions

Contributing is not required to get new icons added to the library, but HashiCorp designers are welcome and encouraged to contribute to Flight.

### Contribution workflow

1.  [File an icon request](https://docs.google.com/forms/d/e/1FAIpQLSc2wsaOaKHiVKPzk-FWlqwVdOjSmSuOU03XC5ZdJkHOcLDOEA/viewform) to kick-off work on adding a new icon.
    - Outline the use case for a new icon, why an existing icon isn't a good fit if there is one, and include any screenshots or WIP if you've done some initial work on a proposal for the icon.
    - If you don't feel comfortable contributing to Flight, filing the request will be enough for the design system team to take on your request.
2.  If you want to contribute and are ready to develop the new icon, create a new branch in [✏️ Flight Development](https://www.figma.com/file/MYiw4kiVpunIMMw0sBkE1t/%E2%9C%8F%EF%B8%8F-Flight-Development?node-id=1300%3A1385).
    - You can do this from the Main menu (File > Create branch...)
    - Take care to avoid working directly in the default branch!
3.  Use the template component in the [Flight Icons - Dev](https://www.figma.com/file/MYiw4kiVpunIMMw0sBkE1t/%E2%9C%8F%EF%B8%8F-Flight-Development?node-id=1300%3A1385) frame.
    - Keep your work in this frame, but feel free to create as many versions with that template component as you need.
4.  Draw your icon glyph using vectors.
    - Be sure to follow the [Drawing icons guide](https://www.figma.com/file/MYiw4kiVpunIMMw0sBkE1t/%E2%9C%8F%EF%B8%8F-Flight-Development?node-id=314%3A844) in Figma, taking care to follow the conventions around strokes, corner radius and aligning to the grid. Try to preserve the ability to edit the glyph where possible (avoid flattening).
5.  When your icon is ready, post the link on #team-design-system or tag the design system designers on a Figma comment to close the loop.
    - The Design Systems team can then add the icon to the grid, productionize it, and publish from the production file.

### Drawing icons

#### Dimensions

#### 24px

![](/assets/getting-started/contribution/icon-dimensions-sq-24.png =112x112)

- ![](/assets/getting-started/contribution/icon-dimensions-helper-1.png) 18.5px
- ![](/assets/getting-started/contribution/icon-dimensions-helper-2.png) 2.75px
- ![](/assets/getting-started/contribution/icon-dimensions-helper-3.png) 2px
- ![](/assets/getting-started/contribution/icon-dimensions-helper-4.png) 1.5px

#### 16px

![](/assets/getting-started/contribution/icon-dimensions-sq-16.png =80x80)

- ![](/assets/getting-started/contribution/icon-dimensions-helper-1.png) 12.5px
- ![](/assets/getting-started/contribution/icon-dimensions-helper-2.png) 1.75px
- ![](/assets/getting-started/contribution/icon-dimensions-helper-3.png) 1.5px
- ![](/assets/getting-started/contribution/icon-dimensions-helper-4.png) 1.5px

#### 24px

![](/assets/getting-started/contribution/icon-dimensions-cr-24.png =112x112)

- ![](/assets/getting-started/contribution/icon-dimensions-helper-1.png) 20.5px
- ![](/assets/getting-started/contribution/icon-dimensions-helper-2.png) 1.75px
- ![](/assets/getting-started/contribution/icon-dimensions-helper-4.png) 1.5px

#### 16px

![](/assets/getting-started/contribution/icon-dimensions-cr-16.png =80x80)

- ![](/assets/getting-started/contribution/icon-dimensions-helper-1.png) 14.5px
- ![](/assets/getting-started/contribution/icon-dimensions-helper-2.png) 0.75px
- ![](/assets/getting-started/contribution/icon-dimensions-helper-4.png) 1.5px

#### Geometry

- Stroke weight is always 1.5px, center with round joins and round end points

  Avoid dropping the stroke weight for detail in smaller sizes, and instead look to reduce the glyph complexity.

- Corner radius is generally 2px @ 24px and 1.5px @ 16px

  Reduce the corner radius where preserving detail of a shape is important or it can make the glyph clearer.

- Line length should round to a 0.5px value and x and y co-ords should land on 0.25px and 0.75px values

  By using these values alongside the 1.5px stroke, we can align glyph edges to the pixel grid, ensuring crisp icon linework and reducing scenarios where the stroke weight doesn't sit on the whole pixel bounds.

