import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRotateCw24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.25 1a.75.75 0 01.75.75v5.5a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h3.731A8.5 8.5 0 1020.5 12a.75.75 0 011.5 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2a9.977 9.977 0 017.5 3.386V1.75a.75.75 0 01.75-.75z"
                />
            </svg>
        );
    }
);
