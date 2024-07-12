/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsFormTextInputTypeValues {
  Text = 'text',
  Email = 'email',
  Password = 'password',
  Url = 'url',
  Date = 'date',
  Time = 'time',
  DateTimeLocal = 'datetime-local',
  Search = 'search',
}

export type HdsFormTextInputTypes = `${HdsFormTextInputTypeValues}`;
