import type { NavigationNarratorSignature } from 'ember-a11y-refocus/components/navigation-narrator';

export interface HdsAppHeaderSignature {
  Args: {
    /**
     * Set a custom breakpoint to control the page width at which the UI
     * switches from displaying the mobile/small view vs. the desktop/large
     * view.
     *
     * @defaultValue '1088px'
     */
    breakpoint?: string;

    /**
     * Controls whether a "navigator narrator" and a "skip link" are added to
     * the navigation (provided by the [`ember-a11y-refocus` Ember
     * addon](https://github.com/ember-a11y/ember-a11y-refocus)). It can be
     * programmatically turned off by passing `false`.
     *
     * @remarks
     *   **Warning:** If it is set to false, then it will fail Bypass Blocks,
     *   [Success Criteria
     *   2.4.1](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html).
     *   Since this component appears on every page, the application will not be
     *   considered conformant. <br /><br /> _For details about the addon
     *   behavior and functionality, refer to the [official
     *   documentation](https://github.com/ember-a11y/ember-a11y-refocus#readme)._
     * @defaultValue true
     */
    hasA11yRefocus?: boolean;

    /**
     * Pass-through property for the `skipTo` argument - The element ID that
     * should receive focus on skip. The default value matches the default id
     * value on the [`AppFrame::Main` component](/layouts/app-frame#afmain).
     *
     * @defaultValue '#hds-main'
     * @dependsOn hasA11yRefocus
     */
    a11yRefocusSkipTo?: string;

    /**
     * Pass-through property for the `skipText` argument - The text passed in
     * the skip link.
     *
     * @defaultValue 'Skip to main content'
     * @dependsOn hasA11yRefocus
     */
    a11yRefocusSkipText?: string;

    /**
     * Pass-through property for the `navigationText` argument - The text passed
     * in the navigation narrator.
     *
     * @defaultValue 'The page navigation is complete. You may now navigate the page content as you wish.'
     * @dependsOn hasA11yRefocus
     */
    a11yRefocusNavigationText?: string;

    /**
     * Pass-through property for the `routeChangeValidator` argument - Custom
     * function used to define which route changes should trigger the refocusing
     * behavior for the navigator narrator.
     *
     * @remarks
     *   For details see [Customizing the definition of a route
     *   change](https://github.com/ember-a11y/ember-a11y-refocus#customizing-the-definition-of-a-route-change).
     * @dependsOn hasA11yRefocus
     */
    a11yRefocusRouteChangeValidator?: NavigationNarratorSignature['Args']['routeChangeValidator'];

    /**
     * Pass-through property for the `excludeAllQueryParams` argument - Can be
     * used when you need to completely opt out of all transition focus
     * management for all query params.
     *
     * @remarks
     *   Use with caution; you'll typically want to reach for a custom route
     *   change validator function instead.
     * @defaultValue false
     * @dependsOn hasA11yRefocus
     */
    a11yRefocusExcludeAllQueryParams?: boolean;
  };

  Blocks: {
    /**
     * A named block where the main product logo linked to your app’s home page
     * is rendered. The `AppHeader::HomeLink` component should be added here.
     */
    logo?: [
      {
        close: () => void;
      },
    ];
    /**
     * A named block where the global actions will be rendered. Typically, a
     * “context switcher” (e.g., “org switcher” or “project switcher”) control
     * should be added here.
     */
    globalActions?: [
      {
        close: () => void;
      },
    ];
    /**
     * A named block where the utility actions will be rendered. Typically,
     * `Dropdown` or `Button` components should be added here, such as a help
     * menu, user menu, or search button.
     */
    utilityActions?: [
      {
        close: () => void;
      },
    ];
  };

  /** @splattributes */
  Element: HTMLDivElement;
}
