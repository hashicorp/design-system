import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconExitPoint16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M30 16L23 9 21.5859 10.4141 26.1719 15 9 15 9 17 26.1719 17 21.5859 21.5859 23 23 30 16z'
                ></path><path
                    d='M14,28c-6.6167,0-12-5.3832-12-12S7.3833,4,14,4c2.335,0,4.5986,.6714,6.5461,1.9414l-1.0923,1.6753c-1.6221-1.0576-3.5078-1.6167-5.4539-1.6167-5.5139,0-10,4.486-10,10s4.4861,10,10,10c1.946,0,3.8318-.5591,5.4539-1.6167l1.0923,1.6753c-1.9475,1.27-4.2112,1.9414-6.5461,1.9414Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconExitPoint16;
