/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
export default class HdsRevealComponent extends Component {
  contentId = 'content-' + guidFor(this);
}
