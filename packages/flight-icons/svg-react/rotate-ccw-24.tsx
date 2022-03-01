import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRotateCcw24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3 1.75a.75.75 0 011.5 0v3.636A9.977 9.977 0 0112 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12a.75.75 0 011.5 0 8.5 8.5 0 102.019-5.5H9.25a.75.75 0 010 1.5h-5.5A.75.75 0 013 7.25v-5.5z"
                />
            </svg>
        );
    }
);
