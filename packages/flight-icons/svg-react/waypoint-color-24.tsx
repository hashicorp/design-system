import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWaypointColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#14C6CB">
                    <path d="M24 5l-2.997 5.194L18.006 5H24zM8 8.468H6l5 8.666L9 20.6 0 5h10l5 8.667 1-1.733L12 5h4l2 3.468 2 3.466-5 8.666L8 8.468z" />
                </g>
            </svg>
        );
    }
);
