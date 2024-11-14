/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { EditorView } from '@codemirror/view';

const hdsDark = EditorView.theme(
  {
    '&': {
      color: 'white',
      backgroundColor: '#0d0e12',
    },
  },
  { dark: true }
);

export default hdsDark;
