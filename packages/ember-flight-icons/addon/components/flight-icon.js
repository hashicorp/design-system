import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class FlightIconComponent extends Component {
  iconId = 'icon-' + guidFor(this);
  iconName = null;
  iconSize = 'small';
  iconFill = 'black';
  iconSizeNumber = this.getIconSizeNumber(this);

  isAriaHidden = 'true';
  isFocusable = false;

  getIconSizeNumber() {
    const iconSizeMap = {
      small: 16,
      large: 24,
    };

    let defaultIconSize = 'small';
    let iconSizeNumber;

    if (this.args.iconSize && iconSizeMap[this.args.iconSize]) {
      iconSizeNumber = iconSizeMap[this.args.iconSize];
    } else {
      iconSizeNumber = iconSizeMap[defaultIconSize];
    }

    return iconSizeNumber;
  }

  get iconFileName() {
    let pathRoot = `/ember-flight-icons/icons/`;
    let fileName = `${this.args.iconName}`;

    let iconPath = `${pathRoot}-${this.iconSizeNumber}.svg`;

    console.log(iconPath);
    return iconPath;
  }

  // get the contents if the iconFileName
  // strip it down to only the `<g>` element (and its children)
  // return it as an object that can be placed into the template for rendering
  get iconFileContents() {
    return this.iconFileName.html();
  }
}
