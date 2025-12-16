import Component from '@glimmer/component';
import { compileTemplate } from '@ember/template-compilation';
import { getOwner } from '@ember/owner';
import { importSync } from '@embroider/macros';
import { setComponentTemplate } from '@ember/component';
import { ensureSafeComponent } from '@embroider/util';
import type Owner from '@ember/owner';

import DynamicTemplateError from 'website/components/dynamic-template-error';

const templateOwnerMap = new Map();

interface DynamicTemplateSignature {
  Args: {
    templateString: string;
    componentId: string;
  };
}

export default class DynamicTemplate extends Component<DynamicTemplateSignature> {
  constructor(owner: Owner, args: DynamicTemplateSignature['Args']) {
    super(owner, args);

    let templateMap = templateOwnerMap.get(owner);
    if (templateMap === undefined) {
      templateMap = templateOwnerMap.set(owner, new Map());
    }
    this.templateMap = templateMap;
  }

  get component() {
    const owner = getOwner(this);

    const { templateString } = this.args;
    if (!templateString) {
      return null;
    }

    let component = this.templateMap.get(templateString);
    if (component === undefined) {
      let compiledTemplate;
      try {
        compiledTemplate = compileTemplate(templateString);
      } catch (err) {
        console.error(err);
        console.error(templateString);
        compiledTemplate = compileTemplate(`<DynamicTemplateError />`);
      }

      component = owner?.factoryFor(`component:${this.args.componentId}`);

      if (component) {
        component = class extends component.class {};
      } else {
        // if component couldn't be found the old way try importing it directly
        let module;
        try {
          module = importSync(`./docs/${this.args.componentId}.js`);
        } catch {
          // backing class doesn't exist so just ignore the error
        }

        component = module?.default;
      }

      if (!component) {
        component = class extends Component {};
      }

      setComponentTemplate(compiledTemplate, component);

      // eslint-disable-next-line ember/no-side-effects
      this.templateMap.set(templateString, component);
    }

    return ensureSafeComponent(component, this);
  }

  <template>
    {{#let (component this.component) as |Component|}}
      <Component />
    {{/let}}
  </template>
}
