## Adopting carbonized HDS in Figma

All component updates live directly inside the [Components v2.0 library](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto), so you do not need to swap libraries. Simply accept library updates in your design file as you would for any standard release.

Because the default mode remains `hds`, you can safely update your files as soon as the library is published without waiting for engineering alignment. Your designs will not change visually until you are ready.

Once your product and engineering teams are ready to support `cds` modes in code, use Figma's variable modes feature to switch your frames to `cds-0`.

### Prep your design file

Because we use the existing library, this update has minimal impact on your day-to-day workflow. However, files with detached components, custom elements, or unmapped styles (e.g., hardcoded hex values) require initial cleanup.

To minimize manual updates, ensure that:

- All HDS components and icons are attached to their respective HDS library.
- All layers connect to an HDS style or variable.
- Auto layout is used properly across the file to prevent unexpected shifting during mode changes.

### Switch modes in Figma

[TODO: add instructions for how to switch modes]

### Design with themes

Designing with themes introduces a few adjustments to your workflow:

- **Default state**: Your files remain in HDS mode by default.
- **After migration**: Once your team adopts Carbon, work exclusively in `cds-0` (light) or `cds-100` (dark).
- **Testing themes**: Test all new designs in both light and dark modes, checking color contrast and hierarchy.
- **Custom work**: Build custom components or patterns should in both light and dark modes.

See [Carbon's color guidelines](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview#themes) for more on Carbon themes.

### Update existing components

Most changes apply automatically when you accept the library updates. Detached or custom elements require manual migration:

| Component Type | Action Required |
| -------------- | --------------- |
| Standard HDS Components | Accept Figma UI Kit updates to automatically pull in changes. |
| Detached components | Re-link to the HDS component or map to the appropriate HDS variable. |
| Custom components | Manually map tokens and styles to HDS variables. If a variable is missing, create a local variable and map it to the appropriate Carbon tokens. |

[TODO: Expand on this...what does it look like to make their own variables]

## Adoption checklist

1. Duplicate your design file to create a backup copy as a safeguard.
2. Confirm your engineering and product teams are ready to support the Carbon modes in code.
3. Audit your design file for detached components and re-link them to the main library component.
4. Accept all pending Helios Design System UI Kit updates in Figma.
5. Replace hardcoded local colors and styles with HDS variables or styles from the Components v2.0 library.
6. Switch the top-level frame mode from `hds` to `cds-0` (light mode). For high-contrast touchpoints, switch the containing frame to `cds-100`.
7. Duplicate the top-level frame and switch the mode to `cds-100` to test dark mode.
8. Verify nested surfaces and sidebars inherit or apply the correct mode, e.g., high-contrast touchpoints.
9. Review color contrast ratios, accessibility, and hierarchy across both `cds-0` and `cds-100`.
10. Collaborate with engineering to ensure consistency during implementation.
11. Archive or delete the backup design file.
