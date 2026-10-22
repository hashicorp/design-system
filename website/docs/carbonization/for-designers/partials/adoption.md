## Adopting carbonized HDS in Figma

All component updates live directly inside the [Components v2.0 library](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto), so you do not need to swap libraries. Accept library updates in your design file as you would for a standard release.

Because the default mode remains `hds`, you can safely update your files without waiting for engineering alignment. Visuals will not change until you switch frames to one of the four Carbon modes.

### Prep your design file

Before migrating, we recommend cleaning up your design files to minimize manual updates:

- Ensure all HDS components and icons are attached to the HDS library.
- Connect all layers to an HDS style or variable.
- Use auto layout properly across the file to prevent unexpected shifting during mode changes.

!!! Insight

Figma released a feature called [Check designs](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma) that can make finding disconnected or hardcoded values much easier. We highly recommend you use this feature to help connect your layers to the appropriate HDS variable.

!!!

### Update existing components

Most changes apply automatically when you accept the library updates. Detached or custom elements require manual migration.

| Component type | Action required |
| -------------- | --------------- |
| Standard HDS components | Accept Figma UI Kit updates to automatically pull in changes. |
| Detached components | Re-link to the HDS component or map to the appropriate HDS variable. |
| Custom components | Manually map tokens and styles to HDS variables. Create a local variables and map them to Carbon tokens is a variable is missing. |

### Switch modes in Figma

Modes can be switched on layers, frames, components and component sets, sections, groups, and even pages.

To switch modes for an **object**:

1. Select the layer, group, or container.
2. In the right sidebar Appearance section, click the "Apply variable mode" icon.
3. Hover over the "Themes" collection and select a mode.

![](/assets/carbonization/designers/switch-modes-object.png)

![Example illustrating the visual difference between icons in hds and icons in cds](/assets/carbonization/designers/hds-cds-icon-comparison.png)

Once you select a mode, a tag with the mode name will appear next to the layer name in the Layers panel.

![](/assets/carbonization/designers/view-current-mode.png)

To switch modes on a **page**:

1. Click an empty spot on the canvas to deselect everything.
2. In the right sidebar Page section, click the "Apply variable mode" icon.
3. Hover over the "Themes" collection and select a mode.

![](/assets/carbonization/designers/switch-modes-page.png)

### Design with themes

Designing with themes introduces a few adjustments to your workflow:

- **Default state**: Files remain in `hds` mode by default.
- **Post-migration**: Work exclusively in `cds-0` (light) or `cds-100` (dark) once your team adopts Carbon.
- **Testing**: Test new designs in both light and dark modes, checking color contrast, hierarchy, and nested surfaces.
- **Custom work**: Build custom components or patterns in both light and dark modes.

## Adoption checklist

1. Duplicate your design file to create a backup copy.
2. Confirm engineering and product teams are ready to support Carbon modes in code.
3. Audit your design file for detached components and re-link them to the main library component. Run [Check designs](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma) in Figma and replace hardcoded local colors and styles with HDS variables or styles.
4. Accept all pending HDS UI Kit updates in Figma.
5. Switch the top-level frame mode from `hds` to `cds-0` (light mode). For high-contrast touchpoints, switch the containing frame to `cds-100`.
6. Duplicate the top-level frame and switch the mode to `cds-100` to test dark mode.
7. Verify nested surfaces and sidebars inherit or apply the correct mode.
8. Review color contrast ratios, accessibility, and hierarchy across `cds-0` and `cds-100`.
9. Collaborate with engineering to ensure consistency during implementation.
10. Archive or delete the backup design file.
