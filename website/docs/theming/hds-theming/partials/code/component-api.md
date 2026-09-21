## Component API

The service exposes a `setTheme` method to apply a theme:

<Doc::ComponentApi as |C|>
  <C.Property @name="setTheme" @type="function">
    Applies a theme to the page by adding/removing the `hds-theme-*`/`hds-mode-*` classes on the `<html>` element. Takes an object with the following keys:
    <Doc::ComponentApi as |C|>
      <C.Property @name="theme" @type="string" @values={{array "default" "system" "light" "dark" "undefined" }} @required={{true}}>
        The theme to apply. Pass `undefined` to remove theming.
      </C.Property>
      <C.Property @name="options" @type="object">
        An object with `lightTheme`/`darkTheme` keys, used to map the `light`/`dark` themes to specific Carbon modes (`cds-g0`/`cds-g10` for `lightTheme`, `cds-g90`/`cds-g100` for `darkTheme`). Defaults to `cds-g0` and `cds-g100`, and is relevant only if you import the ["advanced"](/foundations/theming/code#themed-tokens-files) tokens file.
      </C.Property>
      <C.Property @name="onSetTheme" @type="function">
        A callback, invoked with the resolved `currentTheme` and `currentMode`, that you can use to run your own logic (eg. persisting the user's choice, analytics, logging/debugging, etc).
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
</Doc::ComponentApi>

!!! Warning

**Imported tokens and available themes**

The `hdsTheming` service can apply any supported theme value, but the visual result depends on the themed tokens file imported by your application. For example, the `with-css-selectors` file doesn't include the `default` theme, so setting `theme: 'default'` won't restore the classic HDS visual language. For details about which token files support the different themes and modes, see [Foundations/Theming](/foundations/theming#themed-tokens).

!!!

The service also exposes a set of reactive properties (getters) to read the current theme/mode:

<Doc::ComponentApi as |C|>
  <C.Property @name="currentTheme" @type="string">
    The theme currently applied (`default`, `system`, `light`, `dark`, or `undefined`).
  </C.Property>
  <C.Property @name="currentMode" @type="string">
    The Carbon mode currently applied (`cds-g0`, `cds-g10`, `cds-g90`, `cds-g100`, or `undefined`).
  </C.Property>
  <C.Property @name="currentLightTheme" @type="string">
    The Carbon mode currently mapped to the `light` theme (`cds-g0` or `cds-g10`).
  </C.Property>
  <C.Property @name="currentDarkTheme" @type="string">
    The Carbon mode currently mapped to the `dark` theme (`cds-g90` or `cds-g100`).
  </C.Property>
  <C.Property @name="isCarbonThemeEnabled" @type="boolean">
    Whether the currently applied theme is one of `system`, `light`, or `dark` (ie. the "carbonized" HDS is active).
  </C.Property>
</Doc::ComponentApi>
