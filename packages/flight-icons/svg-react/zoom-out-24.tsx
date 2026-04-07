import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZoomOut24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.75 2a8.75 8.75 0 0 1 8.75 8.75 8.72 8.72 0 0 1-2.055 5.634l4.335 4.336a.75.75 0 1 1-1.06 1.06l-4.335-4.335A8.72 8.72 0 0 1 10.75 19.5C5.92 19.498 2 15.58 2 10.75 2 5.919 5.92 2.002 10.75 2m0 1.5a7.254 7.254 0 0 0-7.25 7.25 7.25 7.25 0 1 0 7.25-7.25m3.5 6.5a.75.75 0 0 1 0 1.5h-7a.754.754 0 0 1-.75-.75c0-.413.338-.748.75-.75z"
                />
            </svg>
        );
    }
);
