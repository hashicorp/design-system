/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { ensureSafeComponent } from '@embroider/util';
import { setComponentTemplate } from '@ember/component';
import { getOwner } from '@ember/owner';
import { compileTemplate } from '@ember/template-compilation';
import { importSync } from '@embroider/macros';

let templateOwnerMap = new Map();

export default class DynamicTemplate extends Component {
  constructor() {
    super(...arguments);

    let owner = getOwner(this);
    let templateMap = templateOwnerMap.get(owner);
    if (templateMap === undefined) {
      templateMap = new Map();
      templateOwnerMap.set(owner, templateMap);
    }
    this.templateMap = templateMap;
  }

  get resolvedComponent() {
    let owner = getOwner(this);

    let factory = owner.factoryFor(`component:${this.args.componentId}`);
    if (factory?.class && typeof factory.class === 'function') {
      return class extends factory.class {};
    }

    // if component couldn't be found the old way try importing it directly
    let module;
    try {
      module = importSync(`./${this.args.componentId}.gts`);
    } catch {
      try {
        module = importSync(`./${this.args.componentId}.js`);
      } catch {
        // backing class doesn't exist so just ignore the error
      }
    }

    let defaultExport = module?.default;
    if (typeof defaultExport === 'function') {
      return defaultExport;
    }

    return null;
  }

  get component() {
    let { componentId } = this.args;
    let { templateString } = this.args;
    let cacheKey = `${componentId || ''}::${templateString || ''}`;

    let component = this.templateMap.get(cacheKey);
    if (component === undefined) {
      if (templateString) {
        // .hbs examples are provided as raw template strings, so we compile
        // them at runtime and attach them to a backing class (if one exists).
        component = this.resolvedComponent;

        let compiledTemplate;
        try {
          compiledTemplate = compileTemplate(templateString);
        } catch (err) {
          console.error(err);
          console.error(templateString);
          compiledTemplate = compileTemplate(`<DynamicTemplateError />`);
        }

        if (!component) {
          component = class extends Component {};
        }

        setComponentTemplate(compiledTemplate, component);
      } else {
        // .gts examples are precompiled modules with their own template + class,
        // so we render the component by id instead of compiling a template string.
        component = componentId || null;
      }

      // eslint-disable-next-line ember/no-side-effects
      this.templateMap.set(cacheKey, component);
    }

    return component;
  }

  <template>{{component (ensureSafeComponent this.component this)}}</template>
}
