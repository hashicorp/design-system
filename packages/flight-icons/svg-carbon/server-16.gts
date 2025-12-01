import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconServer16: TemplateOnlyComponent<CarbonIconSignature> =
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
                <circle cx='9' cy='6' r='1'></circle><path
                    d='M26,10H6A2.0021,2.0021,0,0,1,4,8V4A2.0021,2.0021,0,0,1,6,2H26a2.0021,2.0021,0,0,1,2,2V8A2.0021,2.0021,0,0,1,26,10ZM6,4V8H26V4Z'
                ></path><circle cx='9' cy='16' r='1'></circle><path
                    d='M26,20H6a2.0021,2.0021,0,0,1-2-2V14a2.0021,2.0021,0,0,1,2-2H26a2.0021,2.0021,0,0,1,2,2v4A2.0021,2.0021,0,0,1,26,20ZM6,14v4H26V14Z'
                ></path><circle cx='9' cy='26' r='1'></circle><path
                    d='M26,30H6a2.0021,2.0021,0,0,1-2-2V24a2.0021,2.0021,0,0,1,2-2H26a2.0021,2.0021,0,0,1,2,2v4A2.0021,2.0021,0,0,1,26,30ZM6,24v4H26V24Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconServer16;
