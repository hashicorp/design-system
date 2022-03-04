import Controller from '@ember/controller';

export default class ColorsController extends Controller {
  get colors() {
    const colors = {
      palette: {},
      semantic: {},
      branding: {},
    };

    this.model.TOKENS_RAW.forEach((token) => {
      if (token.attributes.category === 'color' && !token.deprecated) {
        if (token.group) {
          if (token.group === 'palette') {
            // notice: we expect the color name to always follow a specific naming pattern (eg. 'blue-200')
            const tone = token.path[2].match(/^(\w+)-(\d+)$/)[1];
            if (!colors['palette'][tone]) {
              colors['palette'][tone] = [];
            }
            colors['palette'][tone].push({
              colorName: token.path[2],
              cssVariable: token.name,
              value: token.value,
            });
          } else if (token.group === 'semantic') {
            const context = token.path[1];
            if (!colors['semantic'][context]) {
              colors['semantic'][context] = [];
            }
            const tokenObj = {
              colorName: `${token.path[1]}-${token.path[2]}`,
              cssVariable: token.name,
              value: token.value,
            };
            if (['foreground', 'page', 'surface', 'border'].includes(context)) {
              const name = token.path[2];
              tokenObj.cssHelper = `hds-${context}-${name}`;
            }
            colors['semantic'][context].push(tokenObj);
          } else if (token.group === 'branding') {
            const brand = token.path[1];
            if (!colors['branding'][brand]) {
              colors['branding'][brand] = [];
            }
            colors['branding'][brand].push({
              colorName: `${token.path[1]}-${token.path[2]}`,
              cssVariable: token.name,
              value: token.value,
            });
          } else {
            console.log(
              `Notice: the color ${token.name} has a 'group' that is not handled by this page.`
            );
          }
        } else {
          console.log(
            `Notice: the color ${token.name} is missing the 'group' attribute in the JSON definition.`
          );
        }
      }
    });

    return colors;
  }
}
