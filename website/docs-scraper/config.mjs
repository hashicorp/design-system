/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import path from 'path';

const TOKENS_JSON_FILEPATH =
  '../packages/tokens/dist/docs/products/tokens.json';
const FLIGHT_ICONS_JSON_FILEPATH = '../packages/flight-icons/catalog.json';

export const config = {
  distDocsFolder: path.resolve('dist/docs'), // path.resolve(__dirname, '../dist/docs');
  tokensJsonFilePath: path.resolve(TOKENS_JSON_FILEPATH),
  flightIconsJsonFilePath: path.resolve(FLIGHT_ICONS_JSON_FILEPATH),
};
