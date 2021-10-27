import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconHexagonFill24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    d="M13.441 1.006a2.75 2.75 0 00-2.882 0l-7.75 4.77A2.75 2.75 0 001.5 8.118v7.764a2.75 2.75 0 001.309 2.342l7.75 4.77a2.75 2.75 0 002.882 0l7.75-4.77a2.75 2.75 0 001.309-2.342V8.118a2.75 2.75 0 00-1.309-2.342l-7.75-4.77z"
                />
            </svg>
        );
    }
);
