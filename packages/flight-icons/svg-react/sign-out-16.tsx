import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSignOut16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5.75 1a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h2.5a.75.75 0 0 1 0 1.5h-2.5A2.25 2.25 0 0 1 1 12.75v-9.5A2.25 2.25 0 0 1 3.25 1zm4.22 2.72a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H6A.75.75 0 0 1 6 7h6.19L9.97 4.78a.75.75 0 0 1 0-1.06"
                />
            </svg>
        );
    }
);
