---
title: IconTile
category: components
component: icon-tile
section: component-api
---

Here is the API for the component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `size` | enum | `small` `medium` `large` |  |
| `logo` | enum | `hcp` `boundary` `consul` `nomad` `packer` `terraform` `vagrant` `vault` `waypoint` |  |
| `icon` | string |  | Use this parameter to show an icon. Acceptable value: any Flight icon name. |
| `iconSecondary` | string |  | Use this parameter to show an extra "badge" with icon on top of the tile. Acceptable value: any Flight icon name. _Notice: the color of the secondary icon is predefined and can't be changed._ |
| `color` | enum | `neutral` `boundary` `consul` `nomad` `packer` `terraform` `vagrant` `vault` `waypoint` | _Notice: if it's a "logo" then we overwrite any @color parameter passed and just use the product "brand" color._ |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |