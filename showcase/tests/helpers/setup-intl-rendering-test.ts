import { setupRenderingTest as upstreamSetupRenderingTest } from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';

export function setupIntlRenderingTest(
  hooks: NestedHooks,
  defaultLocale: string = 'en-us'
): void {
  upstreamSetupRenderingTest(hooks);
  setupIntl(hooks, defaultLocale);
}
