/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsFormTextInputTypeValues {
  Text = 'text',
  Email = 'email',
  Password = 'password',
  Url = 'url',
  Tel = 'tel',
  Time = 'time',
  Date = 'date',
  DateTimeLocal = 'datetime-local',
  Month = 'month',
  Week = 'week',
  Search = 'search',
}

export type HdsFormTextInputTypes = `${HdsFormTextInputTypeValues}`;
