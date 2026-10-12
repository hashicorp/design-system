---
applyTo: "website/docs/components/**/guidelines/**"
description: "Guidelines for writing design guidance for a component"
---

# Component design guidelines

Design guidelines for a component are contained within two markdown files
- `guidelines/overview.md` - A brief summary of the component
- `guidelines/guidelines.md` - Contains all design guidance on a component

All of the following instructions are for the `guidelines/guidelines.md` file.

## Content guidelines

- Include content sections on all available variants
- All images should include alt text unless decorative
- Call out differences between figma and code with informational banners
- Use the `!!! Do` and `!!! Don't` formatting blocks
  - Note: This is a custom short-hand syntax available in our markdown files

## Example template

```md
## Usage

### When to use

- List item 1
- List item 2

### When not to use

- List item 1
- List item 2

## Variant

### Type 1

Explanation of type 1 variant

<div>
	<Hds::ComponentName @type="type-1" />
</div>

### Type 2

Explanation of type 2 variant

<div>
	<Hds::ComponentName @type="type-2" />
</div>

## Variant with Dos and Donts

!!! Info

**Differences between Figma and code**

Description of differences
!!!

!!! Do
<!-- Example of how the component should be used -->
<Hds::ComponentName />
!!!

!!! Dont
<!-- Example of how the component shouldn't be used -->
<Hds::ComponentName />
!!!

### Variant with images

![Alt text](/assets/components/component-name/image-file-name.png)
```