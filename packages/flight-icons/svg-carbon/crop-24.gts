import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconCrop24: TemplateOnlyComponent<CarbonIconSignature> = <template>
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
            <path d='M25,20H23V9H12V7H23a2,2,0,0,1,2,2Z'></path><path
                d='M9,23V2H7V7H2V9H7V23a2,2,0,0,0,2,2H23v5h2V25h5V23Z'
            ></path></svg>
    {{/let}}
</template>;

export default CarbonIconCrop24;
