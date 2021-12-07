import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWaypoint16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M4 5.312h1.334L10 13.4l3.334-5.777L10.666 3H8l2.666 4.623L10 8.778 6.667 3H0l6 10.4 1.333-2.31L4 5.311zM14.002 6.463L16 3h-3.996l1.998 3.463z" />
                </g>
            </svg>
        );
    }
);
