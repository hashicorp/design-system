import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNewRelicColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#00AC69"
                    d="M16.884 8.923v6.154l-5.383 3.077V22l8.75-5V7l-3.367 1.923z"
                />
                <path
                    fill="#1CE783"
                    d="M11.5 5.847l5.384 3.076L20.25 7 11.5 2 2.75 7l3.366 1.923 5.385-3.076z"
                />
                <path
                    fill="#1D252C"
                    d="M8.133 13.924v6.154L11.501 22V12L2.75 7v3.847l5.383 3.077z"
                />
            </svg>
        );
    }
);
