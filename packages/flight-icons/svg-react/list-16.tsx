import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconList16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.25 11a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5h.5zm10 0a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h6.5zm-10-4a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5h.5zm10 0a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h6.5zm-10-4a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5h.5zm10 0a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h6.5z"
                />
            </svg>
        );
    }
);
