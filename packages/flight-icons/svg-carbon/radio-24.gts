import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconRadio24: TemplateOnlyComponent<CarbonIconSignature> = <template>
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
                d='M15 12H17V30H15zM11.33 18.22a7 7 0 010-10.44l1.34 1.49a5 5 0 000 7.46zM20.67 18.22l-1.34-1.49a5 5 0 000-7.46l1.34-1.49a7 7 0 010 10.44z'
            ></path><path
                d='M8.4 21.8a11 11 0 010-17.6L9.6 5.8a9 9 0 000 14.4zM23.6 21.8l-1.2-1.6a9 9 0 000-14.4l1.2-1.6a11 11 0 010 17.6z'
            ></path></svg>
    {{/let}}
</template>;

export default CarbonIconRadio24;
