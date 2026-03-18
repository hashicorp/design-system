import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSortAsc16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = useMemo(
            () =>
                title
                    ? 'title-' + Math.random().toString(36).substr(2, 9)
                    : undefined,
            [title]
        );
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
                    d="M13 12a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 3 12zM9 9a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 3 9zm3.252-6.5a.75.75 0 0 1 .528.22l3 3a.75.75 0 1 1-1.06 1.06L13 5.06v4.69a.75.75 0 0 1-1.5 0V5.06L9.78 6.78a.75.75 0 1 1-1.06-1.06l3-3a.75.75 0 0 1 .528-.22zM6 6a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 3 6zm0-3a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 3 3z"
                />
            </svg>
        );
    }
);
