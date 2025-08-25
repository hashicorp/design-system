/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsIconTileSizeValues {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type HdsIconTileSizes = `${HdsIconTileSizeValues}`;

export enum HdsIconTileProductValues {
  Boundary = 'boundary',
  Consul = 'consul',
  HCP = 'hcp',
  Nomad = 'nomad',
  Packer = 'packer',
  Terraform = 'terraform',
  Vagrant = 'vagrant',
  Vault = 'vault',
  'Vault Secrets' = 'vault-secrets',
  'Vault Radar' = 'vault-radar',
  Waypoint = 'waypoint',
}

export type HdsIconTileProducts = `${HdsIconTileProductValues}`;

export enum HdsIconTileColorNeutral {
  Neutral = 'neutral',
}

export type HdsIconTileColors =
  | HdsIconTileProducts
  | `${HdsIconTileColorNeutral}`;
