import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconChevronUp24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M5.23 15.79a.75.75 0 001.06-.02L12 9.832l5.71 5.938a.75.75 0 101.08-1.04l-6.25-6.5a.75.75 0 00-1.08 0l-6.25 6.5a.75.75 0 00.02 1.06z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
