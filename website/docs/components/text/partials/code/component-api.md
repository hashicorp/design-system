## Component API

The `Text` component is used through these specialized variants: `Hds::Text::Display`, `Hds::Text::Body`, and `Hds::Text::Code`.

### Text::Display

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="string" @values={{array "500" "400" "300" "200" "100" }} @default="200">
    The size of the `Display` text style.
  </C.Property>
  <C.Property @name="tag" @type="string" @default="span">
    HTML tag to be used to render the text element.
  </C.Property>
  <C.Property @name="weight" @type="string" @values={{array "medium" "semibold" "bold" }}>
    The font weight of the text. If no `@weight` argument is provided, the component will inherit its weight from the parent container/context.<br><br>
    **Notice**: not all the font weights can be used for all the font sizes (refer to the [Typography](/foundations/typography?tab=code#style-and-weight) section for details.). Below are the allowed combinations:<br/>
    `Display-500` → `bold`<br/>
    `Display-400` → `medium`, `semibold`, `bold`<br/>
    `Display-300` → `medium`, `semibold`, `bold`<br/>
    `Display-200` → `semibold`<br/>
    `Display-100` → `medium`
  </C.Property>
  <C.Property @name="align" @type="string" @values={{array "left" "center" "right" }}>
    The alignment of the text. If no `@align` argument is provided, the component will inherit its alignment from the parent container/context.
  </C.Property>
  <C.Property @name="color" @type="string | CSS color" @values={{array "primary" "strong" "faint" "disabled" "high-contrast" "action" "action-hover" "action-active" "highlight" "highlight-on-surface" "highlight-high-contrast" "success" "success-on-surface" "success-high-contrast" "warning" "warning-on-surface" "warning-high-contrast" "critical" "critical-on-surface" "critical-high-contrast" }}>
    The color of the text expressed as one of the possible [foreground color](/foundations/colors?tab=palette#foreground-1) names. As a fallback solution to handle special cases, a valid CSS color string (hex, rgb, rgba, etc.) is also accepted (in this case the color will be applied via an inline style). If no `@color` argument is provided, the component will inherit its color from the parent container/context.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<[@tag]>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Text::Body

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="string" @values={{array "300" "200" "100" }} @default="200">
    The size of the `Body` text style.
  </C.Property>
  <C.Property @name="tag" @type="string" @default="span">
    HTML tag to be used to render the text element.
  </C.Property>
  <C.Property @name="weight" @type="string" @values={{array "regular" "medium" "semibold" }} @default="regular">
    The font weight of the text. If no `@weight` argument is provided, the component will inherit its weight from the parent container/context.
  </C.Property>
  <C.Property @name="align" @type="string" @values={{array "left" "center" "right" }}>
    The alignment of the text. If no `@align` argument is provided, the component will inherit its alignment from the parent container/context.
  </C.Property>
  <C.Property @name="color" @type="string | CSS color" @values={{array "primary" "strong" "faint" "disabled" "high-contrast" "action" "action-hover" "action-active" "highlight" "highlight-on-surface" "highlight-high-contrast" "success" "success-on-surface" "success-high-contrast" "warning" "warning-on-surface" "warning-high-contrast" "critical" "critical-on-surface" "critical-high-contrast" }}>
    The color of the text expressed as one of the possible [foreground color](/foundations/colors?tab=palette#foreground-1) names. As a fallback solution to handle special cases, a valid CSS color string (hex, rgb, rgba, etc.) is also accepted (in this case the color will be applied via an inline style). If no `@color` argument is provided, the component will inherit its color from the parent container/context.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<[@tag]>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Text::Code

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="string" @values={{array "300" "200" "100" }} @default="200">
    The size of the `Code` text style.
  </C.Property>
  <C.Property @name="tag" @type="string" @default="span">
    HTML tag to be used to render the text element.
  </C.Property>
  <C.Property @name="weight" @type="string" @values={{array "regular" "bold" }} @default="regular">
    The font weight of the text. If no `@weight` argument is provided, the component will inherit its weight from the parent container/context.
  </C.Property>
  <C.Property @name="align" @type="string" @values={{array "left" "center" "right" }}>
    The alignment of the text. If no `@align` argument is provided, the component will inherit its alignment from the parent container/context.
  </C.Property>
  <C.Property @name="color" @type="string | CSS color" @values={{array "primary" "strong" "faint" "disabled" "high-contrast" "action" "action-hover" "action-active" "highlight" "highlight-on-surface" "highlight-high-contrast" "success" "success-on-surface" "success-high-contrast" "warning" "warning-on-surface" "warning-high-contrast" "critical" "critical-on-surface" "critical-high-contrast" }}>
    The color of the text expressed as one of the possible [foreground color](/foundations/colors?tab=palette#foreground-1) names. As a fallback solution to handle special cases, a valid CSS color string (hex, rgb, rgba, etc.) is also accepted (in this case the color will be applied via an inline style). If no `@color` argument is provided, the component will inherit its color from the parent container/context.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<[@tag]>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
