/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

// TODO understand if it's possible to generalize this
// import { getTocSectionsBundle } from '../app/components/doc/page/sidebar.js';
const ABOUT = ['about', 'whats-new', 'getting-started'];
const FOUNDATIONS = ['foundations', 'icons'];
const COMPONENTS = ['components', 'layouts', 'overrides', 'utilities'];
const PATTERNS = ['patterns'];
const TESTING = ['testing'];

export const getPageTopRoute = (section) => {
  if (ABOUT.includes(section)) {
    return ABOUT[0];
  } else if (FOUNDATIONS.includes(section)) {
    return FOUNDATIONS[0];
  } else if (COMPONENTS.includes(section)) {
    return COMPONENTS[0];
  } else if (PATTERNS.includes(section)) {
    return PATTERNS[0];
  } else if (TESTING.includes(section)) {
    return TESTING[0];
  } else {
    // eg. the website "root" index page
    return [];
  }
};
