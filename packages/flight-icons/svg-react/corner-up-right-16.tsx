import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCornerUpRight16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M9.22 9.22a.75.75 0 101.06 1.06l3.5-3.5a.75.75 0 000-1.06l-3.5-3.5a.75.75 0 10-1.06 1.06l2.22 2.22H5.75A3.25 3.25 0 002.5 8.75v4.5a.75.75 0 001.5 0v-4.5A1.75 1.75 0 015.75 7h5.69L9.22 9.22z"
                />
            </svg>
        );
    }
);
