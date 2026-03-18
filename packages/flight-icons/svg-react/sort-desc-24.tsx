import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSortDesc24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.25 9a.75.75 0 0 1 .75.75v8.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06l2.72 2.72V9.75a.75.75 0 0 1 .75-.75m-10 8a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5zm2-4a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5zm4-4a.75.75 0 0 1 0 1.5h-9.5a.75.75 0 0 1 0-1.5zm7-4a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1 0-1.5z"
                />
            </svg>
        );
    }
);
