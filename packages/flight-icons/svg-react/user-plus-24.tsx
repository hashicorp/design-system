import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUserPlus24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.25 14.5A4.75 4.75 0 0118 19.25v1a.75.75 0 01-1.5 0v-1A3.25 3.25 0 0013.25 16h-8.5a3.25 3.25 0 00-3.25 3.25v1a.75.75 0 01-1.5 0v-1a4.75 4.75 0 014.75-4.75h8.5zm6-6.75a.75.75 0 01.75.75v2h2a.75.75 0 010 1.5h-2v2a.75.75 0 01-1.5 0v-2h-2a.75.75 0 010-1.5h2v-2a.75.75 0 01.75-.75zM9 3a5 5 0 110 10A5 5 0 019 3zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
                />
            </svg>
        );
    }
);
