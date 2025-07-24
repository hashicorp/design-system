import Service from '@ember/service';
import type { IntlService } from 'ember-intl';
import type { FormatMessageParameters } from 'ember-intl/-private/formatjs';
export type HdsIntlTOptions = FormatMessageParameters[1] & {
    default: string;
    htmlSafe?: boolean | undefined;
    locale?: string | undefined;
};
export default class HdsIntlService extends Service {
    get intl(): IntlService | undefined;
    t(key: string, options: HdsIntlTOptions): string;
}
