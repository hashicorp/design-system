import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconRotateCcw16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    d="M2 .75a.75.75 0 011.5 0v1.888A7 7 0 111 8a.75.75 0 011.5 0 5.5 5.5 0 101.725-4H6.75a.75.75 0 010 1.5h-4A.75.75 0 012 4.75v-4z"
                />
            </svg>
        );
    }
);
