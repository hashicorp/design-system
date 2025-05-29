import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconEnd24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M21.25 3a.75.75 0 01.746.673L22 3.75v16.5a.75.75 0 01-1.5 0V3.75l.004-.077A.75.75 0 0121.25 3zM10.209 5.23a.75.75 0 011.003-.07l.058.049 6.5 6.25a.751.751 0 010 1.082l-6.5 6.25-.058.05a.75.75 0 01-1.034-1.075l.052-.057 5.157-4.959H2.75a.75.75 0 010-1.5h12.637L10.23 6.291l-.052-.057a.75.75 0 01.031-1.004z" />
                </g>
            </svg>
        );
    }
);
