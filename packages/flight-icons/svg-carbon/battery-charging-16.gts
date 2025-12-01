import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconBatteryCharging16: TemplateOnlyComponent<CarbonIconSignature> =
    <template>
        {{#let (uniqueId) as |id|}}
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 32 32'
                fill={{if @color @color 'currentColor'}}
                width='16'
                height='16'
                aria-labelledby={{if @title (concat 'title-' id)}}
                aria-hidden={{unless @title 'true'}}
                ...attributes
            >
                {{#if @title}}
                    <title id='title-{{id}}'>{{@title}}</title>
                {{/if}}
                <path
                    d='M27 11H26V10a2 2 0 00-2-2H20v2h4v3h3v6H24v3H19v2h5a2 2 0 002-2V21h1a2 2 0 002-2V13A2 2 0 0027 11zM11 22H6V10h6V8H6a2 2 0 00-2 2V22a2 2 0 002 2h5z'
                ></path><path
                    d='M14.81 23.58L13.19 22.42 17.06 17 9.37 17 16.22 8.38 17.78 9.62 13.51 15 20.94 15 14.81 23.58z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconBatteryCharging16;
