## Icons in Carbon

Moving from the Helios visual language to the IBM Carbon one doesn’t only mean changing the colors of a UI: it means changing its icons too. We had to go to great lengths, both in Figma and in code, to support switching an icon’s glyph (the SVG vector itself) depending on the theme applied to a page. See below for details about how this has been made possible and how it will impact our consumers.

### Flight-Carbon mapping

Not every Flight icon has a Carbon equivalent and the two libraries don’t overlap completely: currently about half of them have a Carbon counterpart, while the remaining ones keep their Flight glyph in every theme. You can look at the [Icon library](/icons/library) to see which icons are mapped, and how the two glyphs compare.

This means that under a Carbon theme a page will usually show a mix of Carbon and Flight glyphs.

It’s also worth knowing that the two libraries treat sizes differently: Flight provides artwork drawn specifically for each size (16 and 24), while Carbon provides a single drawing that is scaled to the requested size. As a consequence, the optical weight of an icon may change slightly when the theme is switched.

### For designers

TODO add content

### For engineers

When a Carbon theme is applied to the application, `Hds::Icon` automatically renders the Carbon version of a glyph in place of the Flight one. You keep invoking the component exactly as before: the switching is handled internally.

Making this possible required changing how icons are delivered and rendered.

#### What has changed under the hood

Icons used to be delivered as a single SVG sprite (~1MB) injected in the page upfront. Having to support two variants per icon made that approach unsustainable, so the way icons are delivered and resolved has changed:

- Each icon is now loaded individually, the first time it’s rendered, and reused from then on: your application only downloads the icons it actually displays.
- The loading is asynchronous, so an icon may take a moment to appear the first time it’s rendered, while any subsequent usage is immediate.
- The library is resolved at render time, combining two conditions: if a Carbon theme is applied, and if the icon has a Carbon equivalent. When both are true the Carbon glyph is rendered, otherwise the Flight one is used as fallback.
- The resolution is reactive, so switching theme at runtime swaps the glyphs of the icons already rendered on the page.
- There is nothing to configure on your side: the loading and the switching are entirely handled by the component.

#### What has changed in its public APIs

Most of the existing behavior is preserved:

- The API of the component has not changed: existing `Hds::Icon` invocations keep working as they are, and the glyph switching happens automatically.
- The icons are still declared by `@name`, using the same names as before: there is no separate name or argument for the Carbon variant.
- The rendered markup is still an inline `<svg>` element with the same classes and the same sizing, coloring, and accessibility behavior.

There are, however, a few changes and implications to be aware of:

- The symbol IDs are different (from `#flight-[name]-[size]` to `#hds-icon-flight-[name]-[size]` and `#hds-icon-carbon-[name]`). Any code or test targeting the old IDs needs to be updated.
- Two more `data` attributes have been added (`data-has-carbon-equivalent` and `data-is-carbon`), see [Ember test selectors](/components/icon?tab=code#ember-test-selectors) for details.
- The SVG sprite is not injected in the application’s `index.html` anymore, so the `flightIconsSpriteLazyEmbed` setting is obsolete and can be removed from the `config/environment.js` file (see [Getting started for engineers](/getting-started/for-engineers)).
- The rendering is now asynchronous, so tests asserting on the content of an icon may need to wait for the loading to be completed.
- The glyph switching is driven by the theme applied at application level (if you use [ThemeContext](/theming/theme-context) to apply a scoped theme to a portion of the page, the glyphs of the icons within it will not change).
