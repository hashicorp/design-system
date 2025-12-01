import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconCaret16: TemplateOnlyComponent<CarbonIconSignature> = <template>
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
                d='M8 14L4.5 10.5 5.2 9.8 8 12.6 10.8 9.8 11.5 10.5zM8 2L11.5 5.5 10.8 6.2 8 3.4 5.2 6.2 4.5 5.5z'
            ></path></svg>
    {{/let}}
</template>;

export default CarbonIconCaret16;
