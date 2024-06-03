/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type FlightIcon from './components/flight-icon';

export default interface FlightIconsRegistry {
  // Components
  FlightIcon: typeof FlightIcon;
  'flight-icon': typeof FlightIcon;
}
