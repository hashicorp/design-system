Here is the API for the component:

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium"/>
  <C.Property @name="logo" @type="enum" @values={{array "hcp" "boundary" "consul" "nomad" "packer" "terraform" "vagrant" "vault" "waypoint" }}>
    Use this parameter to show a product logo.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Use this parameter to show an icon. Acceptable value: any Flight icon name.
  </C.Property>
  <C.Property @name="iconSecondary" @type="string">
    Use this parameter to show an extra "badge" with icon on top of the tile. Acceptable value: any Flight icon name. _Notice: the color of the secondary icon is predefined and can't be changed._
  </C.Property>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "boundary" "consul" "nomad" "packer" "terraform" "vagrant" "vault" "waypoint" }} @default="neutral">
    _Notice: if it's a "logo" then we overwrite any @color parameter passed and just use the product "brand" color._
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>