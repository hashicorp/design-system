/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsAppFooterIndexComponent extends Component {
  get termsUrl() {
    return (
      this.args.termsUrl ??
      'https://portal.cloud.hashicorp.com/terms-of-service'
    );
  }
}
