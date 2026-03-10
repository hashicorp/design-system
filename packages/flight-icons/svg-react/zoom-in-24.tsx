import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZoomIn24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.75 2a8.75 8.75 0 018.75 8.75 8.717 8.717 0 01-2.055 5.634l4.335 4.335a.75.75 0 11-1.06 1.061l-4.335-4.335A8.724 8.724 0 0110.75 19.5C5.92 19.498 2 15.58 2 10.75 2 5.919 5.92 2.002 10.75 2zm0 1.5a7.254 7.254 0 00-7.25 7.25 7.25 7.25 0 107.25-7.25zm0 3a.75.75 0 01.75.75V10h2.75a.75.75 0 010 1.5H11.5v2.75a.75.75 0 01-1.5 0V11.5H7.25a.754.754 0 01-.75-.75c0-.413.338-.748.75-.75H10V7.25c0-.413.338-.748.75-.75z"
                />
            </svg>
        );
    }
);
