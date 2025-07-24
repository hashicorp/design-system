/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsButtonSignature } from '../button';
export interface HdsCodeEditorFullScreenButtonSignature {
    Args: {
        isFullScreen: boolean;
        onToggleFullScreen: () => void;
    };
    Element: HdsButtonSignature['Element'];
}
export default class HdsCodeEditorFullScreenButton extends Component<HdsCodeEditorFullScreenButtonSignature> {
    get state(): 'minimize' | 'maximize';
    get className(): string;
}
