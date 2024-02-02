import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWaypointFillColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#14C6CB"
                    fillRule="evenodd"
                    d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm4.334 6.32H5.5l2.083 3.61-.833 1.445L3 4.875h4.167L9.25 8.486l.416-.722L8 4.875h1.666l1.668 2.89-2.084 3.61L6.334 6.32zM13 4.875l-1.249 2.164-1.248-2.164H13z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
