import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconKeyValues16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.25 12.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5zm11 0a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5zM2.25 9a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5zm10 0a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5zm-9-3.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5zm7 0a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5zM2.75 2a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1 0-1.5zm10.5 0a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5z"
                />
            </svg>
        );
    }
);
