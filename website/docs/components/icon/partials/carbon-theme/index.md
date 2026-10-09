## Icons in Carbon

Moving from the Helios visual language to IBM Carbon also involves updating the icons too. We had to go to great lengths, both in Figma and in code, to support switching an icon’s glyph (the SVG vector itself) depending on the theme applied. See below for details about how this has been made possible and how it will impact our consumers.

### Flight-Carbon mapping

Currently, about half of the Flight icons have a Carbon equivalent. If there is no equivalent, the Flight icon will be used instead. As a result, pages using a Carbon theme may show a mix of HDS and Carbon icons. See the [Icon library](/icons/library) for current mappings.

#### Icon sizes

HDS and Carbon treat icon sizes differently. HDS provides icons at 16px and 24px, while Carbon provides a single icon that is scaled to the requested size. As a result, the visual weight of an icon may change when the theme is switched.

### For designers

TODO add content

### For engineers

`Hds::Icon` will automatically render the Carbon glyphs when a Carbon theme is active. Component invocation remains the same and the switching is fully automated.

Making this possible required changing how icons are delivered and rendered.

#### What has changed under the hood

Before `v7.0`, icons were delivered as a single ~1MB SVG sprite injected in the page at load time. Now that two variants need to be supported per icon, this approach is unsustainable. 

To improve this, icon delivery and resolution now work as follows:

- Each icon is now loaded individually, the first time it’s rendered, and reused from then on: your application only downloads the icons it actually displays.
- The loading is asynchronous, so an icon may take a moment to appear the first time it’s rendered, while any subsequent usage is immediate.
- The library is resolved at render time, combining two conditions: if a Carbon theme is applied, and if the icon has a Carbon equivalent. When both are true the Carbon glyph is rendered, otherwise the Flight one is used as fallback.
- The resolution is reactive, so switching theme at runtime swaps the glyphs of the icons already rendered on the page.
- Loading and switching are handled entirely by the component, so no configuration is required.

#### What has changed in the public APIs

Most of the existing behavior in `Hds::Icon` is preserved:

- The API of the component has not changed. Existing `Hds::Icon` invocations stay the same and glyph switching is automatic.
- The icons are still declared by `@name`, using the same names as before. There is no separate name or argument for the Carbon variant.
- The rendered markup is still an inline `<svg>` element with the same classes, sizing, coloring, and accessibility behavior.

There are, however, a few changes and implications to be aware of:

- The symbol IDs are different, changing from `#flight-[name]-[size]` to `#hds-icon-flight-[name]-[size]` and `#hds-icon-carbon-[name]`. Any code or test targeting the old IDs will need to be updated.
- Two more `data` attributes have been added (`data-has-carbon-equivalent` and `data-is-carbon`). See [Ember test selectors](/components/icon?tab=code#ember-test-selectors) for details.
- The SVG sprite is not injected in the application’s `index.html` anymore, so the `flightIconsSpriteLazyEmbed` setting is obsolete. It is therefore safe to remove it from the `config/environment.js` file. See [Getting started for engineers](/getting-started/for-engineers).
- The rendering is now asynchronous, so tests asserting on the content of an icon may need to wait for the loading to be completed.
- The glyph switching is driven by the theme applied **at application level**. If you use [ThemeContext](/theming/theme-context) to apply a scoped theme to a portion of the page, the glyphs within it will not change.
