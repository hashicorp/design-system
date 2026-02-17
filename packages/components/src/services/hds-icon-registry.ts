import Service from '@ember/service';
import { TrackedMap } from 'tracked-built-ins';
import { ROOT_ID } from '../instance-initializers/load-sprite-empty.ts';
import { HdsIconLibraryValues } from '../components.ts';

import type {
  HdsIconLoader,
  HdsIconLibraries,
  HdsIconSizes,
} from '../components';

enum HdsIconRegistryLoadStatusValues {
  Queued = 'queued',
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}

type HdsIconRegistryEntry = {
  status: HdsIconRegistryLoadStatusValues;
  symbolId: string;
  error?: unknown;
};

export interface HdsIconDefinition {
  name: string;
  library: HdsIconLibraries;
  size: HdsIconSizes;
}

function hasDOM(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function makeDomSafeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, '-');
}

// we scale with available CPU cores when possible, clamped to a safe range.
const MAX_CONCURRENT_LOADS_CAP = 32;
const MAX_CONCURRENT_LOADS = Math.min(
  MAX_CONCURRENT_LOADS_CAP,
  Math.max(
    8,
    (typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 0) * 2
  ) || MAX_CONCURRENT_LOADS_CAP
);

export function makeSymbolIdFromKey(key: string): string {
  return `hds-icon-${makeDomSafeId(key)}`;
}

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

  requestLoad(definition: HdsIconDefinition, loader: HdsIconLoader): void {
    const key = this._makeKey(definition);

    if (this._entries.has(key)) {
      return;
    }

    // defer the write to a microtask
    void Promise.resolve().then(() => {
      // re-check existence (state might have changed in the microsecond interim)
      if (this._entries.has(key)) {
        return;
      }

      const symbolId = makeSymbolIdFromKey(key);

      if (this._symbolExists(symbolId)) {
        this._entries.set(key, {
          symbolId,
          status: HdsIconRegistryLoadStatusValues.Loaded,
        });
        return;
      }

      if (!hasDOM()) {
        return;
      }

      this._entries.set(key, {
        symbolId,
        status: HdsIconRegistryLoadStatusValues.Queued,
      });

      this._queue.push({ key, loader });
      this._drainQueue();
    });
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
      this._entries.set(key, {
        symbolId,
        status: HdsIconRegistryLoadStatusValues.Loaded,
      });
      return;
    }

    this._entries.set(key, {
      ...entry,
      status: HdsIconRegistryLoadStatusValues.Loading,
    });
    this._activeCount++;

    try {
      const mod = await loader();
      const markup = mod.default(symbolId);

      // buffer markup for batched injection
      this._pendingByKey.set(key, { symbolId, markup });
      this._scheduleFlush();
    } catch (e) {
      this._entries.set(key, {
        symbolId,
        status: HdsIconRegistryLoadStatusValues.Error,
        error: e,
      });
    } finally {
      this._activeCount--;
      this._drainQueue();
    }
  }

  private _symbolExists(symbolId: string): boolean {
    return hasDOM() ? document.getElementById(symbolId) !== null : false;
  }

  private _scheduleFlush(): void {
    if (this._flushScheduled || !hasDOM()) {
      return;
    }

    this._flushScheduled = true;

    // one flush per frame
    window.requestAnimationFrame(() => {
      this._flushScheduled = false;

      const root = document.getElementById(ROOT_ID) as SVGSVGElement | null;

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
        root.insertAdjacentHTML('beforeend', combined);

        // update entries to `Loaded`
        for (const key of keysToUpdate) {
          const entry = this._entries.get(key);
          if (entry) {
            this._entries.set(key, {
              ...entry,
              status: HdsIconRegistryLoadStatusValues.Loaded,
            });
          }
        }
      }
    });
  }
}
