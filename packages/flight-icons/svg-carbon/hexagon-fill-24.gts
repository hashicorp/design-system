import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconHexagonFill24: TemplateOnlyComponent<CarbonIconSignature> =
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
                    stroke-width='0'
                    d='m30.8508,15.4487l-6.9641-11.9165c-.1926-.3301-.5437-.5322-.9224-.5322h-13.9287c-.3787,0-.7297.2021-.9224.5322L1.1492,15.4487c-.199.3403-.199.7622,0,1.1025l6.9641,11.9165c.1926.3301.5437.5322.9224.5322h13.9287c.3787,0,.7297-.2021.9224-.5322l6.9641-11.9165c.199-.3403.199-.7622,0-1.1025Z'
                ></path></svg>
        {{/let}}
    </template>;

export default CarbonIconHexagonFill24;
