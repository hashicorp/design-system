import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { ROOT_ID } from '../instance-initializers/load-sprite-empty.ts';
import { HdsIconLibraryValues } from '../components.ts';

import type { HdsIconLoader, HdsIconLibraries } from '../components';

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

class HdsIconRegistryServiceKeySignal {
  @tracked version = 0;
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

export function makeIconKey(args: {
  library: HdsIconLibraries;
  name: string;
  size: string | number;
}): string {
  const { library, name, size } = args;

  return library === HdsIconLibraryValues.Flight
    ? `${library}-${name}-${size}`
    : `${library}-${name}`;
}

export function makeSymbolIdFromKey(key: string): string {
  return `hds-icon-${makeDomSafeId(key)}`;
}

export default class HdsIconRegistryService extends Service {
  private _entries = new Map<string, HdsIconRegistryEntry>();

  private _signals = new Map<string, HdsIconRegistryServiceKeySignal>();

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

  private _bumpKey(key: string): void {
    let signal = this._signals.get(key);

    if (signal === undefined) {
      signal = new HdsIconRegistryServiceKeySignal();
      this._signals.set(key, signal);
    }

    signal.version++;
  }

  // if we already know the symbol is loaded, return its symbolId
  getSymbolId(key: string): string | null {
    let signal = this._signals.get(key);

    if (signal === undefined) {
      signal = new HdsIconRegistryServiceKeySignal();

      this._signals.set(key, signal);
    }

    // this read is the subscription
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    signal.version;

    const entry = this._entries.get(key);

    // if loaded, return the ID
    if (entry?.status === HdsIconRegistryLoadStatusValues.Loaded) {
      return entry.symbolId;
    }

    return null;
  }

  requestLoad(key: string, loader: HdsIconLoader): void {
    const entry = this._entries.get(key);

    // if we already have an entry do nothing
    if (entry !== undefined) {
      return;
    }

    // if it's new, set up the entry and queue it.
    const symbolId = makeSymbolIdFromKey(key);

    if (this._symbolExists(symbolId)) {
      this._entries.set(key, {
        symbolId,
        status: HdsIconRegistryLoadStatusValues.Loaded,
      });

      window.requestAnimationFrame(() => {
        this._bumpKey(key);
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

      this._entries.set(key, {
        symbolId,
        status: HdsIconRegistryLoadStatusValues.Loaded,
      });
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
      const keysToBump: string[] = [];

      for (const [key, { symbolId, markup }] of this._pendingByKey) {
        if (!this._symbolExists(symbolId)) {
          combined += markup;

          keysToBump.push(key);
        }
      }

      this._pendingByKey.clear();

      if (combined.length > 0) {
        root.insertAdjacentHTML('beforeend', combined);

        for (const key of keysToBump) {
          this._bumpKey(key);
        }
      }
    });
  }
}
