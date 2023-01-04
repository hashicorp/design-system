## Component API

<!-- fill this out based on the API found in the scrappy site -->
<Doc::ComponentApi as |C|>
  <C.Property @name="type" @required="true" @type="enum" @values={{array "page" "inline" "compact"}}>
    Sets the type of alert.
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "highlight" "success" "warning" "critical"}} @default="neutral">
    Sets the color scheme for `background`, `border`, `title`, and `description`, which **cannot** be overridden.<br/><br/>`color` results in a default `icon`, which **can** be overridden.
  </C.Property>
  <C.Property @name="icon" @type="string | false">
    Override the default `icon` name, which is determined by the `color` argument.<br/><br/>Accepts any [icon](/foundations/icons) name, or `false`, for no icon.
  </C.Property>
  <C.Property @name="onDismiss" @type="function">
    The alert can be dismissed by the user. When a function is passed, the "dismiss" button is displayed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
