import HdsAlertTitle from './title.gts';
import HdsAlertDescription from './description.gts';
import HdsLinkStandalone from '../link/standalone.gts';
import HdsButton from '../button/index.gts';
import HdsYield from '../yield/index.gts';

import type { WithBoundArgs } from '@glint/template';
import type { HdsAlertColors, HdsAlertTypes } from './types.ts';
import type { HdsIconSignature } from '../icon/index.gts';

export interface HdsAlertSignature {
  Args: {
    /** Sets the type of alert. */
    type: HdsAlertTypes;

    /**
     * Sets the color scheme for `background`, `border`, `title`, and
     * `description`, which **cannot** be overridden.
     *
     * @remarks
     *   - `color` results in a default `icon`, which **can** be overridden.
     *   - For the “success”, “warning”, and “critical” colors, either
     *       `role="alert"` or “success”, “warning”, and “critical” colors,
     *       either `role="alert"` or `role="alertdialog"` and
     *       `aria-live="polite"` will be included by default which can be
     *       overridden if necessary.
     *   - The “neutral” and “highlight” colors do not include a role attribute or
     *       `aria-live="polite"` by default.
     */
    color?: HdsAlertColors;

    /**
     * Override the default `icon` name, which is determined by the `color`
     * argument.
     *
     * @remarks
     *   Accepts any [icon](/icons/library) name, or `false`, for no icon.
     */
    icon?: HdsIconSignature['Args']['name'] | false;

    /**
     * The alert can be dismissed by the user. When a function is passed, the
     * "dismiss" button is displayed.
     */
    onDismiss?: (event: MouseEvent, ...args: unknown[]) => void;
  };
  Blocks: {
    default: [
      {
        Title?: typeof HdsAlertTitle;
        Description?: typeof HdsAlertDescription;
        Generic?: typeof HdsYield;
        LinkStandalone?: WithBoundArgs<typeof HdsLinkStandalone, 'size'>;
        Button?: WithBoundArgs<typeof HdsButton, 'size'>;
      },
    ];
  };
  Element: HTMLDivElement;
}
