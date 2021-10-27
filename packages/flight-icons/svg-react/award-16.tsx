import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAward16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M8 0a6 6 0 00-4.214 10.27.756.756 0 00-.027.113l-.75 4.75a.75.75 0 00.99.824L8 14.545l4 1.412a.75.75 0 00.99-.824l-.75-4.75a.764.764 0 00-.026-.112A6 6 0 008 0zM3.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm7.363 5.274A5.974 5.974 0 018 12a5.973 5.973 0 01-2.863-.726l-.45 2.85 3.063-1.081a.75.75 0 01.5 0l3.063 1.08-.45-2.849z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
