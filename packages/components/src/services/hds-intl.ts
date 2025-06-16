import Service from '@ember/service';
import { getOwner } from '@ember/owner';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

import type { IntlService } from 'ember-intl';
import type { FormatMessageParameters } from 'ember-intl/-private/formatjs';

type HdsIntlTOptions = FormatMessageParameters[1] & {
  default: string;
  htmlSafe?: boolean | undefined;
  locale?: string | undefined;
};

export default class HdsIntlService extends Service {
  get intl(): IntlService | undefined {
    const owner = getOwner(this);

    if (
      typeof owner?.factoryFor === 'function' &&
      owner.factoryFor('service:intl')
    ) {
      return owner.lookup('service:intl');
    }

    return undefined;
  }

  t(key: string, options: HdsIntlTOptions): string {
    const { default: defaultString, ...restOptions } = options;

    assert(
      'Hds::T helper requires a key as the first positional argument',
      typeof key === 'string' && isPresent(key)
    );

    // try to use ember-intl if available and a translation key exists
    if (this.intl !== undefined) {
      const localeIsSet = this.intl.locales && this.intl.locales.length > 0;

      if (localeIsSet && this.intl.exists(key)) {
        return this.intl.t(key, restOptions);
      }
    }

    return defaultString;
  }
}
