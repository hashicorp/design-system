import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDuo16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M5.513 8.125H1V10.5h2.259c1.208 0 2.195-1.051 2.254-2.375zM3.259 5.5H1v2.375h4.515C5.455 6.551 4.467 5.5 3.259 5.5zM12.744 5.5c-1.21 0-2.198 1.054-2.257 2.375h4.51C14.943 6.551 13.953 5.5 12.745 5.5zM15 8.125h-4.513c.059 1.324 1.046 2.375 2.257 2.375 1.208 0 2.198-1.051 2.256-2.375zM5.741 5.5V8c0 1.339.95 2.433 2.147 2.498V5.5H5.741zM10.259 5.5H8.114v5h2.145v-5z" />
                </g>
            </svg>
        );
    }
);
