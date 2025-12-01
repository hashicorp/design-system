import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconEntryPoint16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M18,28c-3.5928,0-6.9666-1.5903-9.2566-4.3632l1.542-1.2737c1.9087,2.3113,4.7207,3.6368,7.7146,3.6368,5.5139,0,10-4.486,10-10s-4.4861-10-10-10c-2.9939,0-5.8059,1.3256-7.7146,3.6368l-1.542-1.2737c2.29-2.7728,5.6638-4.3632,9.2566-4.3632,6.6169,0,12,5.3832,12,12s-5.3831,12-12,12Z'
                ></path><path
                    d='M23 16L16 9 14.5859 10.4141 19.1719 15 2 15 2 17 19.1719 17 14.5859 21.5859 16 23 23 16z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconEntryPoint16;
