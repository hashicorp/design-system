import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconNewspaper16: TemplateOnlyComponent<CarbonIconSignature> =
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
                    d='M4 24H14V26H4zM4 18H14V20H4zM26 14H6a2 2 0 01-2-2V6A2 2 0 016 4H26a2 2 0 012 2v6A2 2 0 0126 14zM6 6v6H26V6zM26 28H20a2 2 0 01-2-2V20a2 2 0 012-2h6a2 2 0 012 2v6A2 2 0 0126 28zm-6-8v6h6V20z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconNewspaper16;
