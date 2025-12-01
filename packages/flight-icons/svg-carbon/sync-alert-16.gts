import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconSyncAlert16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='m23.2156,4h2.7844v-2h-7v6h2v-2.9038c4.2354,1.9346,7,6.1523,7,10.9038,0,6.6167-5.3833,12-12,12v2c7.7197,0,14-6.2803,14-14,0-5.0088-2.6318-9.5122-6.7844-12Z'
                ></path><path
                    d='M16 20c-.8284 0-1.5.6716-1.5 1.5s.6716 1.5 1.5 1.5 1.5-.6716 1.5-1.5-.6716-1.5-1.5-1.5h0zM15 9H17V18H15z'
                ></path><path
                    d='m16,4v-2C8.2803,2,2,8.2803,2,16c0,4.9766,2.6074,9.4937,6.7842,12h-2.7842v2h7v-6h-2v2.9033c-4.2634-1.9556-7-6.186-7-10.9033,0-6.6167,5.3833-12,12-12Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconSyncAlert16;
