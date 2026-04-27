/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import sinon from 'sinon';

import HdsIconRegistryService, {
  type HdsIconDefinition,
} from '@hashicorp/design-system-components/services/hds-icon-registry';
import {
  HdsIconLibraryValues,
  HdsIconSizeValues,
  type HdsIconLoader,
} from '@hashicorp/design-system-components/components/hds/icon/types';

import type { IconName } from '@hashicorp/flight-icons/svg/index';

const ROOT_ID = 'flight-sprite-empty-container';

const makeSymbolIdFromDefinition = ({
  library,
  name,
  size,
}: HdsIconDefinition): string => {
  const key =
    library === HdsIconLibraryValues.Flight
      ? `${library}-${name}-${size}`
      : `${library}-${name}`;

  return `hds-icon-${key.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
};

const makeDefinition = (
  overrides: Partial<HdsIconDefinition> = {},
): HdsIconDefinition => ({
  library: HdsIconLibraryValues.Flight,
  name: 'alert' as IconName,
  size: HdsIconSizeValues.Sixteen,
  ...overrides,
});

const ensureRoot = (): SVGSVGElement => {
  let root = document.getElementById(ROOT_ID) as SVGSVGElement | null;

  if (root === null) {
    root = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    root.id = ROOT_ID;

    document.body.appendChild(root);
  }

  return root;
};

const removeRoot = (): void => {
  document.getElementById(ROOT_ID)?.remove();
};

// awaits the full icon load: promises, DOM flush, and state updates
const waitForRegistryCycle = async (): Promise<void> => {
  // wait for icon loaders to resolve
  await settled();

  // wait for batched DOM injection via requestAnimationFrame
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });

  // wait for final @tracked state updates
  await settled();
};

interface HdsIconRegistryServicePrivate {
  _resolveLoader(definition: HdsIconDefinition): HdsIconLoader;
}

const stubResolveLoader = (
  service: HdsIconRegistryService,
  getLoader: (definition: HdsIconDefinition) => HdsIconLoader,
) => {
  return sinon
    .stub(service as unknown as HdsIconRegistryServicePrivate, '_resolveLoader')
    .callsFake((definition: HdsIconDefinition) => {
      return getLoader(definition);
    });
};

module('Unit | Service | hds-icon-registry', function (hooks) {
  setupTest(hooks);

  let service: HdsIconRegistryService;

  hooks.beforeEach(function () {
    service = this.owner.lookup(
      'service:hds-icon-registry',
    ) as HdsIconRegistryService;

    removeRoot();
    ensureRoot();
  });

  hooks.afterEach(function () {
    sinon.restore();
    removeRoot();
  });

  test('it exists', function (assert) {
    assert.ok(service, 'service is registered');
    assert.ok(service.requestLoad.bind(service), 'requestLoad exists');
    assert.ok(service.getSymbolId.bind(service), 'getSymbolId exists');
  });

  test('it loads a requested icon and returns the symbol id', async function (assert) {
    const definition = makeDefinition();
    const symbolId = makeSymbolIdFromDefinition(definition);
    const loader = sinon
      .stub()
      .resolves({ default: `<symbol id="${symbolId}"></symbol>` });

    stubResolveLoader(service, () => loader as HdsIconLoader);

    service.requestLoad(definition);

    assert.strictEqual(
      service.getSymbolId(definition),
      null,
      'returns null before icon is loaded',
    );

    await waitForRegistryCycle();

    assert.ok(loader.calledOnce, 'loader called once');
    assert.strictEqual(
      service.getSymbolId(definition),
      symbolId,
      'returns generated symbol id after load',
    );
    assert.ok(
      document.getElementById(symbolId),
      'symbol is injected in the sprite root',
    );
  });

  test('it de-duplicates queued loads for the same icon key', async function (assert) {
    const definition = makeDefinition({ name: 'airport' as IconName });
    const symbolId = makeSymbolIdFromDefinition(definition);

    let resolveLoaderPromise:
      | ((value: { default: string }) => void)
      | undefined;
    const loaderPromise = new Promise<{ default: string }>((resolve) => {
      resolveLoaderPromise = resolve;
    });
    const loader = sinon.stub().returns(loaderPromise);

    stubResolveLoader(service, () => loader as HdsIconLoader);

    service.requestLoad(definition);
    service.requestLoad(definition);

    await settled();

    assert.ok(loader.calledOnce, 'only one queued loader run is started');

    resolveLoaderPromise?.({ default: `<symbol id="${symbolId}"></symbol>` });
    await waitForRegistryCycle();

    assert.strictEqual(
      document.querySelectorAll(`#${symbolId}`).length,
      1,
      'symbol is injected only once',
    );
  });

  test('it batches different icons into a single frame flush', async function (assert) {
    const root = ensureRoot();
    const definitions = [
      makeDefinition({ name: 'add-circle' as IconName }),
      makeDefinition({ name: 'api' as IconName }),
      makeDefinition({ name: 'archive' as IconName }),
    ];

    const rafCallbacks: FrameRequestCallback[] = [];
    const rafStub = sinon
      .stub(window, 'requestAnimationFrame')
      .callsFake((callback: FrameRequestCallback) => {
        rafCallbacks.push(callback);
        return 1;
      });

    stubResolveLoader(service, (definition: HdsIconDefinition) => {
      return () =>
        Promise.resolve({
          default: `<symbol id="${makeSymbolIdFromDefinition(definition)}"></symbol>`,
        });
    });

    for (const definition of definitions) {
      service.requestLoad(definition);
    }

    await settled();

    assert.ok(
      rafStub.calledOnce,
      'only one animation frame flush is scheduled',
    );

    rafCallbacks[0]?.(0);
    await settled();

    assert.strictEqual(
      root.children.length,
      3,
      'all unique symbols are injected',
    );
    for (const definition of definitions) {
      assert.strictEqual(
        service.getSymbolId(definition),
        makeSymbolIdFromDefinition(definition),
        'each icon resolves to its symbol id',
      );
    }
  });

  test('it enforces max concurrent loads and drains queued work', async function (assert) {
    const total = 40;
    const definitions = Array.from({ length: total }, (_, index) => {
      return makeDefinition({
        name: `icon-${index}` as IconName,
      });
    });

    const pendingResolvers: Array<(value: { default: string }) => void> = [];

    let startedLoads = 0;

    stubResolveLoader(service, () => {
      return () => {
        startedLoads++;
        return new Promise<{ default: string }>((resolve) => {
          pendingResolvers.push((value) => {
            resolve(value);
          });
        });
      };
    });

    for (const definition of definitions) {
      service.requestLoad(definition);
    }

    await settled();

    const maxConcurrent = (service as unknown as { _maxConcurrent: number })
      ._maxConcurrent;

    assert.strictEqual(
      startedLoads,
      maxConcurrent,
      'only max concurrent loads start immediately',
    );

    while (startedLoads < total) {
      const activeBatch = pendingResolvers.splice(0);

      for (const [index, resolve] of activeBatch.entries()) {
        const symbolId = `hds-icon-concurrency-${startedLoads}-${index}`;

        resolve({ default: `<symbol id="${symbolId}"></symbol>` });
      }

      await settled();
    }

    const remaining = pendingResolvers.splice(0);

    for (const [index, resolve] of remaining.entries()) {
      const symbolId = `hds-icon-concurrency-final-${index}`;

      resolve({ default: `<symbol id="${symbolId}"></symbol>` });
    }

    await settled();

    assert.strictEqual(
      startedLoads,
      total,
      'queued work is fully drained after active loads resolve',
    );
  });

  test('it uses an existing symbol in the DOM without invoking the loader', async function (assert) {
    const definition = makeDefinition({ name: 'api' as IconName });
    const symbolId = makeSymbolIdFromDefinition(definition);
    const root = ensureRoot();
    const existing = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'symbol',
    );

    existing.id = symbolId;

    root.appendChild(existing);

    const loader = sinon.stub().resolves({ default: '<symbol></symbol>' });

    stubResolveLoader(service, () => loader as HdsIconLoader);

    service.requestLoad(definition);

    await settled();

    assert.ok(loader.notCalled, 'loader is not called for existing symbols');
    assert.strictEqual(
      service.getSymbolId(definition),
      symbolId,
      'returns existing symbol id as loaded',
    );
  });

  test('it marks a failed load as error and keeps symbol unresolved', async function (assert) {
    const definition = makeDefinition({ name: 'apps' as IconName });
    const loader = sinon.stub().rejects(new Error('load failed'));

    stubResolveLoader(service, () => loader as HdsIconLoader);

    service.requestLoad(definition);

    await waitForRegistryCycle();

    assert.ok(loader.calledOnce, 'loader was attempted');
    assert.strictEqual(
      service.getSymbolId(definition),
      null,
      'returns null after a failed load',
    );

    service.requestLoad(definition);

    await settled();

    assert.ok(
      loader.calledOnce,
      'failed key is not re-queued once entry exists in the registry',
    );
  });

  test('it warns when sprite root is not available and icon remains unresolved', async function (assert) {
    removeRoot();

    const definition = makeDefinition({ name: 'apps' as IconName });
    const symbolId = makeSymbolIdFromDefinition(definition);
    const loader = sinon
      .stub()
      .resolves({ default: `<symbol id="${symbolId}"></symbol>` });

    stubResolveLoader(service, () => loader as HdsIconLoader);

    const consoleWarnStub = sinon.stub(console, 'warn');

    service.requestLoad(definition);

    await waitForRegistryCycle();

    assert.ok(loader.calledOnce, 'loader still runs');
    assert.ok(
      consoleWarnStub.calledOnce,
      'warns once when sprite root is missing',
    );
    assert.strictEqual(
      service.getSymbolId(definition),
      null,
      'icon remains unresolved when no sprite root exists',
    );
  });

  test('it generates a symbol id key without size for carbon library icons', async function (assert) {
    const definition = makeDefinition({
      library: HdsIconLibraryValues.Carbon,
      name: 'calendar' as IconName,
    });
    const symbolId = makeSymbolIdFromDefinition(definition);
    const loader = sinon
      .stub()
      .resolves({ default: `<symbol id="${symbolId}"></symbol>` });

    stubResolveLoader(service, () => loader as HdsIconLoader);

    service.requestLoad(definition);

    await waitForRegistryCycle();

    assert.strictEqual(
      service.getSymbolId(definition),
      symbolId,
      'carbon key excludes size from the generated symbol id',
    );
  });
});
