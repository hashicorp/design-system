import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNetwork24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 2.5c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 01-1.75 1.75H12.5V11H21a.75.75 0 010 1.5h-3.5v2h1.25c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 01-1.75 1.75h-3.5a1.75 1.75 0 01-1.75-1.75v-3.5c0-.966.784-1.75 1.75-1.75H16v-2H8v2h.75c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 01-1.75 1.75h-3.5a1.75 1.75 0 01-1.75-1.75v-3.5c0-.966.784-1.75 1.75-1.75H6.5v-2H3A.75.75 0 013 11h8V9.5h-.75A1.75 1.75 0 018.5 7.75v-3.5c0-.966.784-1.75 1.75-1.75h3.5zM5.25 16a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h3.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25h-3.5zm10 0a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h3.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25h-3.5zm-5-12a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h3.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25h-3.5z"
                />
            </svg>
        );
    }
);
