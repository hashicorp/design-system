import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconMinimizeAlt24: TemplateOnlyComponent<CarbonIconSignature> =
    <template>
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
                    d='M4 18L4 20 10.586 20 2 28.582 3.414 30 12 21.414 12 28 14 28 14 18 4 18zM30 3.416L28.592 2 20 10.586 20 4 18 4 18 14 28 14 28 12 21.414 12 30 3.416z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconMinimizeAlt24;
