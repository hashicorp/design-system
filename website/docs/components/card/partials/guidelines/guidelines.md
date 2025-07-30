## Usage

### When to use

Use a card container to help build more consistently styled cards.

## Types

### Static cards

Static cards may have interactive elements within them but are not actionable or interactive on their own. Card should not have any elevations applied to it to appear visually flat.

![A static card titled "Billing summary" with an info notification and a link.](/assets/components/card/card-static-flat-looking.png)

### Interactive cards

Interactive cards are actionable, e.g., they can be hovered over, clicked, or focused on. If a card is interactive, it should not include additional interactive elements within it.

!!! Dont

Don't nest interactive elements within an interactive card. This is because screen reader users cannot access nested interactions properly. 

![An interactive card with a table with links and buttons within causing a nested interactive.](/assets/components/card/card-dont-nest-interactive.png)

!!!

!!! Do

When the card is interactive, ensure elements within are static elements only.

![An interactive card with a table with links and buttons within.](/assets/components/card/card-do-flat-internal.png)

!!!

## Levels

![example of card styles for various levels, including: base, mid, and high](/assets/components/card/card-levels.png)

### Base

Use for **static cards**.

### Mid

Use for **interactive cards** as the rested (default) and active (pressed) states.

### High

Use for **interactive cards** as the raised (hover) state.

## Border

Card containers come with or without borders.

![example of card styles with and without borders](/assets/components/card/card-borders.png)

## Background

There are two backgrounds available: `neutral-primary` and `neutral-secondary`.

![example of card styles in two background colors: neutral-primary and neutral-secondary](/assets/components/card/card-backgrounds.png)

## Recommended spacing

We recommend the following spacing options for cards:

![example of card styles for recommended spacing options: 16px, 24px, 16px 24px, 24px 16px](/assets/components/card/card-spacing.png)

- 16px all around
- 24px all around
- 16px top/bottom; 24px left/right
- 24px top/bottom; 16px left/right