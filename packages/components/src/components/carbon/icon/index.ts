import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

import type { CarbonIcon as CarbonIconType } from './types';

export interface CarbonIconSignature {
  Args: {
    icon: CarbonIconType;
    title?: string;
  };
  Element: SVGElement;
}

export default class CarbonIcon extends Component<CarbonIconSignature> {
  private _titleId = 'title-' + guidFor(this);

  get ariaHidden(): 'true' | 'false' {
    return this.args.title ? 'false' : 'true';
  }

  get ariaLabelledby(): string | null {
    return this.args.title ? this._titleId : null;
  }

  get role(): 'img' | undefined {
    return this.args.title ? 'img' : undefined;
  }
}
