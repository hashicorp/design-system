/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { HdsInteractiveSignature } from '../interactive/index.gts';
import type HdsIntlService from '../../../services/hds-intl.ts';

type HdsIntlLike = Pick<HdsIntlService, 't'>;

export enum HdsPaginationDirectionValues {
  Next = 'next',
  Prev = 'prev',
}

export type HdsPaginationDirections = `${HdsPaginationDirectionValues}`;

export type HdsPaginationPage = HdsPaginationDirections | number;

// Aria labels for nav arrow buttons
export const HDS_PAGINATION_DIRECTION_ARIA_LABEL_KEYS = {
  [HdsPaginationDirectionValues.Prev]:
    'hds.components.pagination.nav.arrow.aria-label.direction.prev',
  [HdsPaginationDirectionValues.Next]:
    'hds.components.pagination.nav.arrow.aria-label.direction.next',
} as const;

export function getHdsPaginationDirectionAriaLabel(
  direction: HdsPaginationDirections,
  intl: HdsIntlLike
): string {
  return direction === HdsPaginationDirectionValues.Prev
    ? intl.t('hds.components.pagination.nav.arrow.aria-label.direction.prev', {
        default: 'Previous page',
      })
    : intl.t('hds.components.pagination.nav.arrow.aria-label.direction.next', {
        default: 'Next page',
      });
}

// Display "label" text for nav arrow buttons
export const HDS_PAGINATION_DIRECTION_LABEL_KEYS = {
  [HdsPaginationDirectionValues.Prev]:
    'hds.components.pagination.nav.arrow.label.direction.prev',
  [HdsPaginationDirectionValues.Next]:
    'hds.components.pagination.nav.arrow.label.direction.next',
} as const;

export function getHdsPaginationDirectionLabel(
  direction: HdsPaginationDirections,
  intl: HdsIntlLike
): string {
  return direction === HdsPaginationDirectionValues.Prev
    ? intl.t('hds.components.pagination.nav.arrow.label.direction.prev', {
        default: 'Previous',
      })
    : intl.t('hds.components.pagination.nav.arrow.label.direction.next', {
        default: 'Next',
      });
}

export type HdsPaginationElliptizedPageArrayItem = string | number;

export type HdsPaginationElliptizedPageArray =
  HdsPaginationElliptizedPageArrayItem[];

export type HdsPaginationRoutingProps = Pick<
  HdsInteractiveSignature['Args'],
  'route' | 'model' | 'models' | 'replace'
>;
