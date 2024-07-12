## Component API

### IconTile

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "small" "medium" "large" }} @default="medium"/>
  <C.Property @name="color" @type="enum" @values={{array "neutral" "boundary" "consul" "nomad" "packer" "terraform" "vagrant" "vault" "vault-secrets" "waypoint" }} @default="neutral">
    The `@color` parameter is overwritten if a `@logo` parameter is passed, in which case the product “brand“ color is used.
  </C.Property>
  <C.Property @name="logo" @type="enum" @values={{array "hcp" "boundary" "consul" "nomad" "packer" "terraform" "vagrant" "vault" "vault-secrets" "vault-radar" "waypoint" }}>
    Use this parameter to show a product logo.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Use this parameter to show an icon. Any [icon](/icons/library) name is acceptable.
  </C.Property>
  <C.Property @name="iconSecondary" @type="string">
    Use this parameter to show an extra “badge” with icon on top of the tile. Any [icon](/icons/library) name is acceptable. The color of the secondary icon is predefined and can’t be changed.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
