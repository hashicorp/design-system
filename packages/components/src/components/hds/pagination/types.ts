/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { HdsInteractiveSignature } from '../interactive/index.gts';

type HdsIntlLike = {
  t(key: string, options: { default: string; [key: string]: unknown }): string;
};

export enum HdsPaginationDirectionValues {
  Next = 'next',
  Prev = 'prev',
}

export type HdsPaginationDirections = `${HdsPaginationDirectionValues}`;

export type HdsPaginationPage = HdsPaginationDirections | number;

export const HDS_PAGINATION_DIRECTION_ARIA_LABEL_KEYS = {
  [HdsPaginationDirectionValues.Prev]:
    'hds.pagination.nav.arrow.direction.prev',
  [HdsPaginationDirectionValues.Next]:
    'hds.pagination.nav.arrow.direction.next',
} as const;

export function getHdsPaginationDirectionAriaLabel(
  direction: HdsPaginationDirections,
  intl: HdsIntlLike
): string {
  const key =
    HDS_PAGINATION_DIRECTION_ARIA_LABEL_KEYS[
      direction as HdsPaginationDirectionValues
    ];
  const defaults = {
    [HdsPaginationDirectionValues.Prev]: 'Previous page',
    [HdsPaginationDirectionValues.Next]: 'Next page',
  } as const;

  return intl.t(key, {
    default: defaults[direction as HdsPaginationDirectionValues],
  });
}

export const HDS_PAGINATION_DIRECTION_LABEL_KEYS = {
  [HdsPaginationDirectionValues.Prev]: 'hds.pagination.nav.arrow.label.prev',
  [HdsPaginationDirectionValues.Next]: 'hds.pagination.nav.arrow.label.next',
} as const;

export function getHdsPaginationDirectionLabel(
  direction: HdsPaginationDirections,
  intl: HdsIntlLike
): string {
  const key =
    HDS_PAGINATION_DIRECTION_LABEL_KEYS[
      direction as HdsPaginationDirectionValues
    ];
  const defaults = {
    [HdsPaginationDirectionValues.Prev]: 'Previous',
    [HdsPaginationDirectionValues.Next]: 'Next',
  } as const;

  return intl.t(key, {
    default: defaults[direction as HdsPaginationDirectionValues],
  });
}

export enum HdsPaginationDirectionLabelValues {
  Prev = 'Previous',
  Next = 'Next',
}

export type HdsPaginationDirectionLabels =
  `${HdsPaginationDirectionLabelValues}`;

export type HdsPaginationElliptizedPageArrayItem = string | number;

export type HdsPaginationElliptizedPageArray =
  HdsPaginationElliptizedPageArrayItem[];

export type HdsPaginationRoutingProps = Pick<
  HdsInteractiveSignature['Args'],
  'route' | 'model' | 'models' | 'replace'
>;
