import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMinusPlus16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M11.72 3.22a.75.75 0 111.06 1.06l-8.5 8.5a.75.75 0 01-1.06-1.06l8.5-8.5zM2.25 4a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM10 10a.75.75 0 000 1.5h1.5V13a.75.75 0 001.5 0v-1.5h1.5a.75.75 0 000-1.5H13V8.5a.75.75 0 00-1.5 0V10H10z" />
                </g>
            </svg>
        );
    }
);
