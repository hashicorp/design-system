## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium"/>
  <C.Property @name="color" @type="enum" @values={{array "primary" "secondary" "tertiary" "critical" }} @default="primary"/>
  <C.Property @name="text" @required="true" @type="string">
    Text of the button or value of `aria-label` if `isIconOnly` is set to `true`. If no text value is defined an error will be thrown.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Used to show an icon. Any [icon](/icons/library) name is accepted.
    <br/><br/>
    Tertiary buttons have transparent backgrounds, and interactive elements must communicate interactivity with more than just color. Therefore, a leading or trailing icon is required when using the `tertiary` color. [WCAG 2.2 Criterion 1.4.1: Use of Color (Level A)](https://www.w3.org/WAI/WCAG22/quickref/?showtechniques=141#use-of-color)
  </C.Property>
  <C.Property @name="iconPosition" @type="enum" @values={{array "leading" "trailing" }} @default="leading">
    Positions the icon before or after the text.
  </C.Property>
  <C.Property @name="isIconOnly" @type="boolean" @default="false">
    Indicates if the button will only contain an icon. An internal check is in place to ensure that accessible text is still applied to the component.
  </C.Property>
  <C.Property @name="isFullWidth" @type="boolean" @default="false">
    Indicates that a button should take up the full width of the parent container.
  </C.Property>
  <C.Property @name="isInline" @type="boolean" @default="false">
    If an `@isInline` parameter is provided, then the element will be displayed as `inline-block` (useful to achieve specific layouts). Otherwise, it will have a `block` layout.
  </C.Property>
  <C.Property @name="href">
    URL parameter that is passed down to the `<a>` element.
  </C.Property>
  <C.Property @name="isHrefExternal" @type="boolean" @default="false">
    Controls if the `<a>` link is external and so for security reasons we need to add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it.
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo/LinkToExternal>` component.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @default="false">
    Controls if the `<LinkTo>` is external to the Ember engine ([more details here](https://ember-engines.com/docs/link-to-external)) in which case it will use a `<LinkToExternal>` instead of a simple `<LinkTo>` for the `@route`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
