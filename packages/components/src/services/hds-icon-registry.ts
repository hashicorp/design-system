import Service from '@ember/service';
import { assert } from '@ember/debug';
import { TrackedMap } from 'tracked-built-ins';
import { ROOT_ID } from '../instance-initializers/load-sprite-empty.ts';
import { HdsIconLibraryValues } from '../components.ts';
import { IconRegistry } from '@hashicorp/flight-icons/symbol-js/registry';

import type { IconName } from '@hashicorp/flight-icons/svg/index';
import type {
  HdsIconLoader,
  HdsIconLibraries,
  HdsIconSizes,
} from '../components';

enum HdsIconRegistryLoadStatusValues {
  Queued = 'queued', // request received and waiting in the queue
  Loaded = 'loaded', // icon has been loaded and injected into the DOM
  Error = 'error', // icon failed to load or inject
}

type HdsIconRegistryEntry = {
  status: HdsIconRegistryLoadStatusValues;
  symbolId: string;
  error?: unknown;
};

export interface HdsIconDefinition {
  name: IconName;
  library: HdsIconLibraries;
  size: HdsIconSizes;
}

const HAS_DOM =
  typeof window !== 'undefined' && typeof document !== 'undefined';

// important: if you update this function, update the identical one in `packages/flight-icons/scripts/build-parts/generateBundleSymbolJS.ts` as well (and vice versa)
function makeDomSafeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, '-');
}

// important: if you update this function, update the identical one in `packages/flight-icons/scripts/build-parts/generateBundleSymbolJS.ts` as well (and vice versa)
function makeSymbolIdFromKey(key: string): string {
  return `hds-icon-${makeDomSafeId(key)}`;
}

// we scale with available CPU cores when possible, clamped to a safe range.
const MAX_CONCURRENT_LOADS_CAP = 32;
const MAX_CONCURRENT_LOADS = Math.min(
  MAX_CONCURRENT_LOADS_CAP,
  Math.max(
    8,
    (typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 0) * 2
  )
);

export default class HdsIconRegistryService extends Service {
  private _entries = new TrackedMap<string, HdsIconRegistryEntry>();

  // queue
  private _queue: Array<{ key: string; loader: HdsIconLoader }> = [];
  private _activeCount = 0;
  private readonly _maxConcurrent = MAX_CONCURRENT_LOADS;

  // batched DOM injection
  private _pendingByKey = new Map<
    string,
    { symbolId: string; markup: string }
  >();
  private _flushScheduled = false;

  private _spriteRoot: SVGSVGElement | null = null;

  private _setEntryStatus(
    key: string,
    symbolId: string,
    status: HdsIconRegistryLoadStatusValues,
    error?: unknown
  ): void {
    this._entries.set(key, {
      symbolId,
      status,
      error,
    });
  }

  private _getSpriteRoot(): SVGSVGElement | null {
    if (!HAS_DOM) {
      return null;
    }

    if (this._spriteRoot) {
      return this._spriteRoot;
    }

    this._spriteRoot = document.getElementById(ROOT_ID) as SVGSVGElement | null;

    if (this._spriteRoot === null) {
      console.warn(
        `HDS Icon Registry: Sprite root element with ID "${ROOT_ID}" not found in DOM.`
      );
    }

    return this._spriteRoot;
  }

  private _makeKey({ library, name, size }: HdsIconDefinition): string {
    return library === HdsIconLibraryValues.Flight
      ? `${library}-${name}-${size}`
      : `${library}-${name}`;
  }

  getSymbolId(definition: HdsIconDefinition): string | null {
    const key = this._makeKey(definition);
    const entry = this._entries.get(key);

    // if loaded, return the ID
    if (entry?.status === HdsIconRegistryLoadStatusValues.Loaded) {
      return entry.symbolId;
    }

    return null;
  }

  requestLoad(definition: HdsIconDefinition): void {
    const key = this._makeKey(definition);

    if (this._entries.has(key)) {
      return;
    }

    const loader = this._resolveLoader(definition);

    // defer the write to a microtask
    void Promise.resolve().then(() => {
      // re-check existence (state might have changed in the microsecond interim)
      if (this._entries.has(key)) {
        return;
      }

      const symbolId = makeSymbolIdFromKey(key);

      if (this._symbolExists(symbolId)) {
        this._setEntryStatus(
          key,
          symbolId,
          HdsIconRegistryLoadStatusValues.Loaded
        );
        return;
      }

      if (!HAS_DOM) {
        return;
      }

      this._setEntryStatus(
        key,
        symbolId,
        HdsIconRegistryLoadStatusValues.Queued
      );

      this._queue.push({ key, loader });
      this._drainQueue();
    });
  }

  private _resolveLoader({
    name,
    library,
    size,
  }: HdsIconDefinition): HdsIconLoader {
    const entry = IconRegistry[name];

    if (library === HdsIconLibraryValues.Carbon) {
      const carbonLoader = entry.carbon;
      assert(`Carbon icon not available for "${name}".`, carbonLoader !== null);
      return carbonLoader;
    } else {
      const flightLoader = entry.flight[size];
      assert(
        `Flight icon not available for "${name}" with size "${size}".`,
        flightLoader !== undefined
      );
      return flightLoader;
    }

  private _drainQueue(): void {
    while (this._activeCount < this._maxConcurrent && this._queue.length > 0) {
      const next = this._queue.shift()!;

      void this._runQueuedLoad(next.key, next.loader);
    }
  }

  private async _runQueuedLoad(
    key: string,
    loader: HdsIconLoader
  ): Promise<void> {
    const entry = this._entries.get(key);

    if (entry === undefined) {
      return;
    }

    const { symbolId } = entry;

    if (this._symbolExists(symbolId)) {
      this._setEntryStatus(
        key,
        symbolId,
        HdsIconRegistryLoadStatusValues.Loaded
      );
      return;
    }

    this._activeCount++;

    try {
      const mod = await loader();
      const markup = mod.default;

      // buffer markup for batched injection
      this._pendingByKey.set(key, { symbolId, markup });
      this._scheduleFlush();
    } catch (error) {
      this._setEntryStatus(
        key,
        symbolId,
        HdsIconRegistryLoadStatusValues.Error,
        error
      );
    } finally {
      this._activeCount--;
      this._drainQueue();
    }
  }

  private _symbolExists(symbolId: string): boolean {
    return HAS_DOM ? document.getElementById(symbolId) !== null : false;
  }

  private _scheduleFlush(): void {
    if (this._flushScheduled || !HAS_DOM) {
      return;
    }

    this._flushScheduled = true;

    // one flush per frame
    window.requestAnimationFrame(() => {
      this._flushScheduled = false;

      const root = this._getSpriteRoot();

      if (root === null || this._pendingByKey.size === 0) {
        return;
      }

      // combine into one insertion
      let combined = '';
      const keysToUpdate: string[] = [];

      for (const [key, { symbolId, markup }] of this._pendingByKey) {
        if (!this._symbolExists(symbolId)) {
          combined += markup;

          keysToUpdate.push(key);
        }
      }

      this._pendingByKey.clear();

      if (combined.length > 0) {
        try {
          root.insertAdjacentHTML('beforeend', combined);

          for (const key of keysToUpdate) {
            const entry = this._entries.get(key);
            if (entry) {
              this._setEntryStatus(
                key,
                entry.symbolId,
                HdsIconRegistryLoadStatusValues.Loaded
              );
            }
          }
        } catch (error) {
          console.error('HDS Icon Registry: Failed to inject batch', error);

          for (const key of keysToUpdate) {
            const entry = this._entries.get(key);

            if (entry) {
              this._setEntryStatus(
                key,
                entry.symbolId,
                HdsIconRegistryLoadStatusValues.Error,
                error
              );
            }
          }
        }
      }
    });
  }
}
