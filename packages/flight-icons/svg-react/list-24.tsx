import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconList24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4.25 17a.75.75 0 010 1.5h-1a.75.75 0 010-1.5h1zm16.5 0a.75.75 0 010 1.5h-13a.75.75 0 010-1.5h13zm-16.5-6a.75.75 0 010 1.5h-1a.75.75 0 010-1.5h1zm16.5 0a.75.75 0 010 1.5h-13a.75.75 0 010-1.5h13zM4.25 5a.75.75 0 010 1.5h-1a.75.75 0 010-1.5h1zm16.5 0a.75.75 0 010 1.5h-13a.75.75 0 010-1.5h13z"
                />
            </svg>
        );
    }
);
