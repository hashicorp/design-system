/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { modifier } from 'ember-modifier';
import Clipboard from './clipboard-js/clipboard';
import { macroCondition, dependencySatisfies } from '@embroider/macros';

function clipboard(trigger, params, hash) {
  const { target, text, onSuccess, onError } = hash;

  const clipboard = new Clipboard(trigger, text, target, onSuccess, onError);

  return () => clipboard.destroy();
}

let clipboardModifier;

if (macroCondition(dependencySatisfies('ember-modifier', '4.x'))) {
  clipboardModifier = modifier(clipboard, { eager: false });
} else {
  clipboardModifier = modifier(clipboard);
}

export default clipboardModifier;
