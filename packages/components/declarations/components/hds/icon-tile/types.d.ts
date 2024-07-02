/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export declare enum HdsIconTileSizeValues {
    Small = "small",
    Medium = "medium",
    Large = "large"
}
export type HdsIconTileSizes = `${HdsIconTileSizeValues}`;
export declare enum HdsIconTileProductValues {
    Boundary = "boundary",
    Consul = "consul",
    HCP = "hcp",
    Nomad = "nomad",
    Packer = "packer",
    Terraform = "terraform",
    Vagrant = "vagrant",
    Vault = "vault",
    'Vault Secrets' = "vault-secrets",
    'Vault Radar' = "vault-radar",
    Waypoint = "waypoint"
}
export type HdsIconTileProducts = `${HdsIconTileProductValues}`;
export declare enum HdsIconTileColorNeutral {
    Neutral = "neutral"
}
export type HdsIconTileColors = HdsIconTileProductValues | HdsIconTileColorNeutral;
//# sourceMappingURL=types.d.ts.map