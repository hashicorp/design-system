/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const templatesNoResultsFunction = ({ searchType }) => {
  () => {
    return `No results (search type: ${searchType})`;
  };
};
