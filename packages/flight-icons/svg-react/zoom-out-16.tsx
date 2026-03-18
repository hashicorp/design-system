import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZoomOut16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.25 1a6.25 6.25 0 0 1 4.918 10.107l2.612 2.613a.75.75 0 1 1-1.06 1.06l-2.613-2.612A6.25 6.25 0 1 1 7.25 1m0 1.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5m2.5 4a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1 0-1.5z"
                />
            </svg>
        );
    }
);
