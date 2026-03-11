import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCornerLeftUp24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.25 3c.205 0 .4.084.542.232l5.25 5.5a.75.75 0 11-1.085 1.036L10 5.622V16.5c0 .942.353 1.838.968 2.491A3.135 3.135 0 0013.25 20h7a.75.75 0 010 1.5h-7a4.635 4.635 0 01-3.375-1.48A5.139 5.139 0 018.5 16.5V5.622L4.542 9.768a.75.75 0 11-1.085-1.036l5.25-5.5A.751.751 0 019.25 3z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
