## Usage

### When to use

- To represent an object or as part of a page title.

### When not to use

- When an interactive or clickable element is needed. Use a [Button](https://helios.hashicorp.design/components/button) instead.

## Color

Use **Neutral** if the object or page is not a specific product feature but something universal. For example, for a “Dashboard” or “User” page.

![](/assets/components/icon-tile/icon-tile.png)

Use a **product-specific color** for objects or pages directly related to a product. For example:

- For a page showing a “Consul cluster”
- In a card or table row that represents a “Consul cluster”

![](/assets/components/icon-tile/icon-tiles-colors.png)

<Doc::ImageCaption @text="Examples of product-specific Icon Tiles, where each tile's background color is the product's brand color"/>

## Size

Medium is the default size, but we recommend using the size that best fits the supporting text or UI. For example, don’t use large Icon Tiles in tables.

![Icon Tile sizes: small, medium, and large](/assets/components/icon-tile/icon-tiles-sizes.png)

## Secondary icon

A secondary icon can be added to provide additional context. For example, in features where an object or element is being added, an Icon Tile with a "plus" secondary icon reinforces the action.

![](/assets/components/icon-tile/icon-tiles-scondary-icon.png)

## Using with content

Use Icon Tiles as a decorative element or accessory next to a text label for the object or page they are being used to represent. Icon Tiles should not be used without accompanying content.

## Using with interactive elements

!!! Insight

**Accessibility tip**

For more information on making interactive and non-interactive elements easily distinguishable, refer to [WCAG Guideline 1.4: Distinguishable.](https://www.w3.org/WAI/WCAG22/Understanding/distinguishable)
!!!

Avoid placing Icon Tiles immediately next to secondary icon-only Button variants. Even though they visually look different, their proximity can confuse users because they share similar characteristics. [Distinguishability](https://www.w3.org/WAI/WCAG22/Understanding/distinguishable) discourages the use of elements that look alike but behave differently when in close visual proximity.
