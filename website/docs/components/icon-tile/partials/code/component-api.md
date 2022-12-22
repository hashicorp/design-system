## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium"/>
  <C.Property @name="logo" @type="enum" @values={{array "hcp" "boundary" "consul" "nomad" "packer" "terraform" "vagrant" "vault" "waypoint" }}>
    Use this parameter to show a product logo.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Use this parameter to show an icon. Any [icon name](/foundations/icons) is acceptable.
  </C.Property>
  <C.Property @name="iconSecondary" @type="string">
    Use this parameter to show an extra "badge" with icon on top of the tile. Any [icon name](/foundations/icons) is acceptable. _Note: the color of the secondary icon is predefined and can't be changed._
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "boundary" "consul" "nomad" "packer" "terraform" "vagrant" "vault" "waypoint" }} @default="neutral">
    _Note: the `@color` parameter is overwritten if a `@logo` parameter is passed, in which case the product "brand" color is used._
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of `...attributes`.
  </C.Property>
</Doc::ComponentApi>