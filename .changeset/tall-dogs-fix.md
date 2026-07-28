---
"@hashicorp/design-system-components": patch
---

<!-- START components/segmented-group -->
`SegmentedGroup` - Fixed an issue where using `SG.SuperSelectMultiple` inside a `SegmentedGroup` caused the component to be taller than its sibling `SG.Dropdown` segments. The `SuperSelectMultiple` trigger now sizes to its intrinsic width, and the in-place dropdown panel is given `width: max-content` so its options render at their natural width.
<!-- END -->
