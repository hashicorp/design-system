import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconDiscussionCircle16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M28,6H8C6.8,6,6,6.8,6,8v14c0,1.2,0.8,2,2,2h8v-2H8V8h20v14h-7.2L16,28.8l1.6,1.2l4.2-6H28c1.2,0,2-0.8,2-2V8	C30,6.8,29.2,6,28,6z'
                ></path><path
                    d='M4,18H2V5c0-1.7,1.3-3,3-3h13v2H5C4.4,4,4,4.4,4,5V18z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconDiscussionCircle16;
