## Usage

### When to use

To represent an object or as part of a page title.

### When not to use

- Within a paragraph where an object is referred to.
- When an interactive or clickable element is needed. Use a [Button](https://helios.hashicorp.design/components/button) instead.

## Color

Use **Neutral** if the object or page is not a specific product feature but something universal. For example, for a “Dashboard” or “User” page.

![Icon Tile with neutral color and dashboard icon](/assets/components/icon-tile/icon-tile.png)


Use a **product-specific color** for objects or pages directly related to a product. For example:

- For a page showing a “Consul cluster”
- In a card or table row that represents a “Consul cluster”

![Product specific Icon Tiles](/assets/components/icon-tile/icon-tiles-colors.png)

<Doc::ImageCaption @text="Examples of product-specific Icon Tiles"/>

## Size

Medium is the default size, but we recommend using the size that best fits the supporting text or UI. For example, don’t use large Icon Tiles in tables.

![Icon Tile sizes](/assets/components/icon-tile/icon-tiles-sizes.png)

## Secondary icon

A secondary icon can be added to provide additional context. For example, for an “Add user” page the “plus” icon indicates the action.

![Icon Tiles with secondary icon](/assets/components/icon-tile/icon-tiles-scondary-icon.png)

## Using with content

Icon Tiles should not appear without accompanying content. Instead, they should be presented alongside a text label for the object or page they are being used to represent. We recommend thinking of them as an accessory.

## Using with interactive elements

Avoid placing Icon Tiles immediately next to secondary icon only button variants. Even though they visually look different, their proximity can confuse users because they share similar characteristics. [Distinguishability](https://www.w3.org/WAI/WCAG21/Understanding/distinguishable), an accessibility standard, discourages interfaces from using elements that look alike but behave differently when in close visual proximity. 

!!! Info

For more information on making interactive and non-interactive elements easily distinguishable, refer to the [WCAG 2.1 Guideline 1.4: Distinguishable.](https://www.w3.org/WAI/WCAG21/Understanding/distinguishable)

!!!