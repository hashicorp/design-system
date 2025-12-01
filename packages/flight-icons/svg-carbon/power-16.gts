import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconPower16: TemplateOnlyComponent<CarbonIconSignature> = <template>
    {{#let (uniqueId) as |id|}}
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
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
                d='M11.2,2.9l-0.5,0.9c2.6,1.5,3.5,4.9,2,7.5s-4.9,3.5-7.5,2s-3.5-4.9-2-7.5c0.5-0.8,1.2-1.5,2-2L4.8,2.9	c-3.1,1.8-4.2,5.8-2.4,8.9s5.8,4.2,8.9,2.4s4.2-5.8,2.4-8.9C13.1,4.3,12.2,3.4,11.2,2.9z'
            ></path><path d='M7.5 1H8.5V8H7.5z'></path></svg>
    {{/let}}
</template>;

export default CarbonIconPower16;
