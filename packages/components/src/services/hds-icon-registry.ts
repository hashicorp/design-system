import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { DEFS_ID } from '../instance-initializers/mount-icon-defs-host.ts';

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
  return `${args.library}:${args.name}:${args.size}`;
}

export function makeSymbolIdFromKey(key: string): string {
  return `hds-icon-${makeDomSafeId(key)}`;
}

export default class HdsIconRegistryService extends Service {
  private entries = new Map<string, HdsIconRegistryEntry>();

  private signals = new Map<string, HdsIconRegistryServiceKeySignal>();

  // queue
  private queue: Array<{ key: string; loader: HdsIconLoader }> = [];
  private activeCount = 0;
  private readonly maxConcurrent = MAX_CONCURRENT_LOADS;

  // batched DOM injection
  private pendingByKey = new Map<
    string,
    { symbolId: string; markup: string }
  >();
  private flushScheduled = false;

  track(key: string): void {
    let signal = this.signals.get(key);

    if (signal === undefined) {
      signal = new HdsIconRegistryServiceKeySignal();
      this.signals.set(key, signal);
    }

    // this read is the subscription
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    signal.version;
  }

  private bumpKey(key: string): void {
    let signal = this.signals.get(key);

    if (signal === undefined) {
      signal = new HdsIconRegistryServiceKeySignal();
      this.signals.set(key, signal);
    }

    signal.version++;
  }

  // if we already know the symbol is loaded, return its symbolId
  getSymbolId(key: string): string | null {
    this.track(key);

    const entry = this.entries.get(key);

    // if loaded, return the ID
    if (entry?.status === HdsIconRegistryLoadStatusValues.Loaded) {
      return entry.symbolId;
    }

    return null;
  }

  requestLoad(key: string, loader: HdsIconLoader): void {
    const entry = this.entries.get(key);

    // if we already have an entry do nothing
    if (entry !== undefined) {
      return;
    }

    // if it's new, set up the entry and queue it.
    const symbolId = makeSymbolIdFromKey(key);

    if (hasDOM() && this.symbolExists(symbolId)) {
      this.entries.set(key, {
        symbolId,
        status: HdsIconRegistryLoadStatusValues.Loaded,
      });

      this.bumpKey(key);

      return;
    }

    if (!hasDOM()) {
      return;
    }

    this.entries.set(key, {
      symbolId,
      status: HdsIconRegistryLoadStatusValues.Queued,
    });

    this.queue.push({ key, loader });

    this.drainQueue();
  }

  private drainQueue(): void {
    while (this.activeCount < this.maxConcurrent && this.queue.length > 0) {
      const next = this.queue.shift()!;

      void this.runQueuedLoad(next.key, next.loader);
    }
  }

  private async runQueuedLoad(
    key: string,
    loader: HdsIconLoader
  ): Promise<void> {
    const entry = this.entries.get(key);

    if (entry === undefined) {
      return;
    }

    const { symbolId } = entry;

    if (hasDOM() && this.symbolExists(symbolId)) {
      this.entries.set(key, {
        symbolId,
        status: HdsIconRegistryLoadStatusValues.Loaded,
      });
      return;
    }

    this.entries.set(key, {
      ...entry,
      status: HdsIconRegistryLoadStatusValues.Loading,
    });
    this.activeCount++;

    try {
      const mod = await loader();
      const markup = mod.default(symbolId);

      // buffer markup for batched injection
      this.pendingByKey.set(key, { symbolId, markup });
      this.scheduleFlush();

      this.entries.set(key, {
        symbolId,
        status: HdsIconRegistryLoadStatusValues.Loaded,
      });
    } catch (e) {
      this.entries.set(key, {
        symbolId,
        status: HdsIconRegistryLoadStatusValues.Error,
        error: e,
      });
    } finally {
      this.activeCount--;
      this.drainQueue();
    }
  }

  private getDefsElement(): SVGDefsElement | null {
    // inserted by mount-icon-defs-host initializer
    return hasDOM()
      ? (document.getElementById(DEFS_ID) as SVGDefsElement | null)
      : null;
  }

  private symbolExists(symbolId: string): boolean {
    return hasDOM() ? document.getElementById(symbolId) !== null : false;
  }

  private scheduleFlush(): void {
    if (this.flushScheduled) {
      return;
    }

    if (!hasDOM()) {
      return;
    }

    this.flushScheduled = true;

    // one flush per frame
    window.requestAnimationFrame(() => {
      this.flushScheduled = false;
      this.flushPendingSymbols();
    });
  }

  private flushPendingSymbols(): void {
    const defs = this.getDefsElement();

    if (defs === null) {
      if (this.pendingByKey.size > 0) {
        this.scheduleFlush();
      }

      return;
    }

    if (this.pendingByKey.size === 0) {
      return;
    }

    // combine into one insertion
    let combined = '';
    const keysToBump: string[] = [];

    for (const [key, { symbolId, markup }] of this.pendingByKey) {
      if (!this.symbolExists(symbolId)) {
        combined += markup;
        keysToBump.push(key);
      }
    }

    this.pendingByKey.clear();
    if (combined.length > 0) {
      defs.insertAdjacentHTML('beforeend', combined);

      for (const key of keysToBump) {
        this.bumpKey(key);
      }
    }
  }
}
