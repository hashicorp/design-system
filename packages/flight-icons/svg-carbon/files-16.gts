import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconFiles16: TemplateOnlyComponent<CarbonIconSignature> = <template>
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
            <path d='M18,31H6c-1.1,0-2-0.9-2-2V12h2v17h12V31z'></path><path
                d='M22,27H10c-1.1,0-2-0.9-2-2V8h2v17h12V27z'
            ></path><path d='M16 16H24V18H16z'></path><path
                d='M27.7,9.3l-7-7C20.5,2.1,20.3,2,20,2h-6c-1.1,0-2,0.9-2,2v17c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10	C28,9.7,27.9,9.5,27.7,9.3z M20,4.4l5.6,5.6H20V4.4z M26,21H14V4h4v6c0,1.1,0.9,2,2,2h6V21z'
            ></path></svg>
    {{/let}}
</template>;

export default CarbonIconFiles16;
