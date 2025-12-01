import { guidFor } from '@ember/object/internals';
import { concat } from '@ember/helper';

import type TemplateOnlyComponent from '@ember/component/template-only';
import type { CarbonIconSignature } from './types';

const uniqueId = () => guidFor({});

const CarbonIconPause16: TemplateOnlyComponent<CarbonIconSignature> = <template>
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
                d='M6 4v8H4V4H6M6 3H4C3.4 3 3 3.4 3 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C7 3.4 6.6 3 6 3zM12 4v8h-2V4H12M12 3h-2C9.4 3 9 3.4 9 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C13 3.4 12.6 3 12 3z'
            ></path></svg>
    {{/let}}
</template>;

export default CarbonIconPause16;
