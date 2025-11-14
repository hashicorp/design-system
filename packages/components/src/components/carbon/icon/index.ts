import Component from '@glimmer/component';

import type { CarbonIcon as CarbonIconType } from './types.ts';

export interface CarbonIconSignature {
  Args: {
    color?: string;
    icon: CarbonIconType;
    title?: string;
  };
  Element: SVGElement;
}

export default class CarbonIcon extends Component<CarbonIconSignature> {
  get ariaHidden(): boolean {
    return this.args.title ? false : true;
  }

  get fillColor(): string {
    return this.args.color ?? 'currentColor';
  }

  get role(): string | undefined {
    return this.args.title ? 'img' : undefined;
  }
}
