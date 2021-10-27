import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconChevronRight24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                    d="M8.21 18.77a.75.75 0 01.02-1.06L14.168 12 8.23 6.29a.75.75 0 111.04-1.08l6.5 6.25a.75.75 0 010 1.08l-6.5 6.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
