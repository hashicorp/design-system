import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconCaret24: TemplateOnlyComponent<CarbonIconSignature> = <template>
    {{#let (uniqueId) as |id|}}
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 32 32'
            fill={{if @color @color 'currentColor'}}
            width='24'
            height='24'
            aria-labelledby={{if @title (concat 'title-' id)}}
            aria-hidden={{unless @title 'true'}}
            ...attributes
        >
            {{#if @title}}
                <title id='title-{{id}}'>{{@title}}</title>
            {{/if}}
            <path
                d='M16 28L9 21 10.41 19.59 16 25.17 21.59 19.59 23 21 16 28zM16 4L23 11 21.59 12.41 16 6.83 10.41 12.41 9 11 16 4z'
            ></path></svg>
    {{/let}}
</template>;

export default CarbonIconCaret24;
