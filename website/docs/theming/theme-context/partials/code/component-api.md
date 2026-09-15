## Component API

### ThemeContext

<Doc::ComponentApi as |C|>
  <C.Property @name="context" @type="enum" @required={{true}} @values={{array "default" "system" "light" "dark" "cds-g0" "cds-g10" "cds-g90" "cds-g100" }}>
    The theme or mode to apply to the content rendered inside the "theme context" wrapper:
    <!-- we intentionally use plain text instead of a markdown list to maintain it as compact as possible -->
    <br>
    • `default` - classic HDS theme
    <br>
    • `light` - IBM Carbon's light theme
    <br>
    • `dark` - IBM Carbon's dark theme
    <br>
    • `system` - IBM Carbon's light or dark theme, based on the user's system preference
    <br>
    • `cds-g0` - IBM Carbon's lightest and most common light mode
    <br>
    • `cds-g10` - IBM Carbon's subtle off-white light mode
    <br>
    • `cds-g90` - IBM Carbon's dark mode with medium contrast
    <br>
    • `cds-g100` - IBM Carbon's darkest, highest-contrast dark mode
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

!!! Insight

**Layout behavior**

The component uses `display: contents`, so its wrapper does not create a layout box or impose a display style on the surrounding content. You can use it in any page layout without changing or impacting the layout of its parent or children.

!!!
