/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { ensureSafeComponent } from '@embroider/util';
import { setComponentTemplate } from '@ember/component';
import { getOwner } from '@ember/owner';
import { compileTemplate } from '@ember/template-compilation';

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

  get backingComponentClass() {
    let owner = getOwner(this);
    let factory = owner.factoryFor(`component:${this.args.componentId}`);

    if (factory?.class && typeof factory.class === 'function') {
      return class extends factory.class {};
    }

    return null;
  }

  get component() {
    const { componentId, templateString } = this.args;
    const cacheKey = `${componentId || ''}::${templateString || ''}`;

    let component = this.templateMap.get(cacheKey);
    if (component === undefined) {
      if (templateString) {
        // Runtime template mode (classic Ember component): compile provided template text and attach it to a backing class when one exists for the provided component id.
        component = this.backingComponentClass;

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
        // Component module mode (single file component): render a precompiled component by id.
        component = componentId
          ? getOwner(this).factoryFor(`component:${componentId}`)?.class || null
          : null;
      }

      // eslint-disable-next-line ember/no-side-effects
      this.templateMap.set(cacheKey, component);
    }

    return component;
  }

  <template>{{component (ensureSafeComponent this.component this)}}</template>
}
