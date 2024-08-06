## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="name" @type="string" @required="true">
    The name of the icon you wish to use. If the value does not match an existing icon name, an error will be thrown. Search for existing icon names in [the Icon library](/icons/library).
  </C.Property>
  <C.Property @name="size" @type="number" @default="16" @values={{array "16" "24"}}>
    Sets the size of the icon in pixels. Only two sizes are supported. (Setting a non-standard size will cause the SVG to render at the specified size but it will be invisible.)
  </C.Property>
  <C.Property @name="color" @type="string | CSS color" @values={{array "primary" "strong" "faint" "disabled" "high-contrast" "action" "action-hover" "action-active" "highlight" "highlight-on-surface" "highlight-high-contrast" "success" "success-on-surface" "success-high-contrast" "warning" "warning-on-surface" "warning-high-contrast" "critical" "critical-on-surface" "critical-high-contrast" }}>
    The color of the icon expressed as one of the possible [foreground color](/foundations/colors?tab=palette#foreground-1) names. As a fallback solution to handle special cases, a valid CSS color string (hex, rgb, rgba, etc.) is also accepted (in this case it works by setting the value of the icon SVG’s `fill` property). If no `@color` argument is provided, the component will inherit its color from the parent container/context (`fill="currentColor"`).
  </C.Property>
  <C.Property @name="stretched" @type="boolean" @default="false">
    Determines whether the icon will stretch to fill the parent container. Setting it to `true` will make the icon have a height and width of 100%.
  </C.Property>
  <C.Property @name="isInline" @type="boolean" @default="false">
    Sets the `display` style for the icon. Setting it to `true` will make the icon have a display of `inline-block`.
  </C.Property>
  <C.Property @name="title" @type="string">
    Use to add accessible text to standalone icons. This will also change the `aria-hidden` value to `false` instead of the default value of `true`.
  </C.Property>
</Doc::ComponentApi>
