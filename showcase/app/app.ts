/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import compatModules from '@embroider/virtual/compat-modules';
import config from 'showcase/config/environment';
import { isDevelopingApp, macroCondition } from '@embroider/macros';
import setupInspector from '@embroider/legacy-inspector-support/ember-source-4.12';
// Keep Prism on globalThis for HDS modules that read a global Prism.
import 'showcase/utils/prism-global';

if (macroCondition(isDevelopingApp())) {
  await import('./deprecation-workflow');
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.withModules(compatModules);

  inspector = setupInspector(this);
}

loadInitializers(App, config.modulePrefix, compatModules);
