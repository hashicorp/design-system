import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconRotateCw16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14 .75a.75.75 0 00-1.5 0v1.888A7 7 0 1015 8a.75.75 0 00-1.5 0 5.5 5.5 0 11-1.725-4H9.25a.75.75 0 000 1.5h4a.75.75 0 00.75-.75v-4z"
                />
            </svg>
        );
    }
);
