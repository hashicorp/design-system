## Usage

### When to use

Use a card container to help build more consistently styled cards.

## Types

### Static cards

Static cards may have interactive elements within them but are not actionable or interactive on their own.

### Interactive cards

Interactive cards are actionable (e.g., it can be hovered, clicked, focused, etc.)

## Levels

### Base

Use the `base` level for static cards.

![example of base card style with borders](/assets/components/card/card-base.png =184x*)

### Mid

- For **static cards** use `mid` as the default level.
- For **interactive cards** use `mid` as the rested state.

![example of base card style with borders](/assets/components/card/card-mid.png =184x*)

### High

- For **static cards** use `high` for emphasis, but use sparingly.
- For **interactive cards** use `high` for the raised state.

![example of base card style with borders](/assets/components/card/card-high.png =184x*)

## Border

Card containers come with or without borders. 

### Background

There are two backgrounds available: `neutral-0` and `neutral-50`.

<Doc::Layout @spacing="16px">
    ![example of base card style with borders](/assets/components/card/card-base-neutral0.png =184x*)
    ![example of base card style with borders](/assets/components/card/card-base-neutral50.png =184x*)
</Doc::Layout>

### Recommended spacing

We recommend the following spacing options for cards:

![example of base card style with borders](/assets/components/card/card-spacing.png =800x*)

- 16px all around
- 24px all around
- 16px top/bottom; 24px left/right
- 24px top/bottom; 16px left/right
