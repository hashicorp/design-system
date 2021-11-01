import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMoreHorizontal24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M5 10a2 2 0 100 4 2 2 0 000-4zM12 10a2 2 0 100 4 2 2 0 000-4zM19 10a2 2 0 100 4 2 2 0 000-4z" />
                </g>
            </svg>
        );
    }
);
