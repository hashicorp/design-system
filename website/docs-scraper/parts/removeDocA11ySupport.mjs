/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const removeDocA11ySupport = (markdownContent) =>
  //eg. <Doc::A11ySupport />
  markdownContent.replace(/<Doc::A11ySupport \/>/gi, '');
