import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconList24: TemplateOnlyComponent<CarbonIconSignature> = <template>
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
                d='M10 6H28V8H10zM10 24H28V26H10zM10 15H28V17H10zM4 15H6V17H4zM4 6H6V8H4zM4 24H6V26H4z'
            ></path></svg>
    {{/let}}
</template>;

export default CarbonIconList24;
