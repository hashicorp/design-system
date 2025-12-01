import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconSave24: TemplateOnlyComponent<CarbonIconSignature> = <template>
    {{#let (uniqueId) as |id|}}
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
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
                d='M20.8,7L17,3.2C16.9,3.1,16.7,3,16.5,3h-12C3.7,3,3,3.7,3,4.5v15C3,20.3,3.7,21,4.5,21h15c0.8,0,1.5-0.7,1.5-1.5v-12	C21,7.3,20.9,7.1,20.8,7z M9,4.5h6v3H9V4.5z M15,19.5H9v-6h6V19.5z M16.5,19.5v-6c0-0.8-0.7-1.5-1.5-1.5H9c-0.8,0-1.5,0.7-1.5,1.5v6	h-3v-15h3v3C7.5,8.3,8.2,9,9,9h6c0.8,0,1.5-0.7,1.5-1.5V4.8l3,3v11.7H16.5z'
            ></path></svg>
    {{/let}}
</template>;

export default CarbonIconSave24;
