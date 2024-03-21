declare module '@hashicorp/ember-flight-icons/components/flight-icon' {
  import Component from '@glimmer/component';

  export interface FlightIconSignature {
    Args: {
      size?: string;
      color?: string;
      name?: string;
      stretched?: boolean;
      isInlineBlock?: boolean;
    };
    Element: SVGElement;
  }

  export class FlightIcon extends Component<FlightIconSignature> {}

  // Temporary until FlightIcon exposes glint types
  module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
      FlightIcon: typeof FlightIcon;
    }
  }

  export default FlightIcon;
}
