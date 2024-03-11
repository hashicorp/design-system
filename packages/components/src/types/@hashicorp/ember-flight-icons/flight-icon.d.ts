/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

declare module '@hashicorp/ember-flight-icons/components/flight-icon' {
  import Component from '@ember/component';

  export interface FlightIconSignature {
    Args: {
      size?: string;
      color?: string;
      name: string | null;
      stretched?: boolean;
    };
    Element: SVGElement;
  }

  export class FlightIcon extends Component<FlightIconSignature> {}


  // Temporary until FlightIcon exposes glint types
  module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
      'FlightIcon': typeof FlightIcon;
    }
  }

  export default FlightIcon;
}