import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMap24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M6.926 1.607a1.75 1.75 0 011.614-.064L16.099 5.1a.25.25 0 00.23-.01l5.053-2.886C22.548 1.537 24 2.379 24 3.724V17.42a1.75 1.75 0 01-.882 1.52l-6.044 3.453a1.75 1.75 0 01-1.614.064L7.901 18.9a.25.25 0 00-.23.01l-5.053 2.886C1.452 22.463 0 21.621 0 20.276V6.58c0-.628.337-1.208.882-1.52l6.044-3.453zm-5.3 4.756L7 3.293v14.274l-.074.04-5.052 2.887a.25.25 0 01-.374-.217V6.58a.25.25 0 01.126-.217zm6.914 11.18a1.557 1.557 0 00-.04-.018V3.182l6.96 3.275.04.018v14.343l-6.96-3.275zM17 20.708l5.374-3.071a.25.25 0 00.126-.217V3.723a.25.25 0 00-.374-.217l-5.052 2.887a1.755 1.755 0 01-.074.04v14.275z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
