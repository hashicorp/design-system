import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSortAsc24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.25 17a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5h16.5zm-7-4a.75.75 0 010 1.5h-9.5a.75.75 0 010-1.5h9.5zm4-10a.748.748 0 01.53.22l4 4a.75.75 0 11-1.06 1.06L18 5.56v8.19a.75.75 0 01-1.5 0V5.56l-2.72 2.72a.75.75 0 11-1.06-1.06l4-4a.748.748 0 01.53-.22zm-8 6a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5h5.5zm-2-4a.75.75 0 010 1.5h-3.5a.75.75 0 010-1.5h3.5z"
                />
            </svg>
        );
    }
);
