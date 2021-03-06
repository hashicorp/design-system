import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMinusPlus24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M17.72 5.22a.75.75 0 111.06 1.06l-12.5 12.5a.75.75 0 01-1.06-1.06l12.5-12.5zM3.5 6.75A.75.75 0 014.25 6h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zM16.5 13.5a.75.75 0 011.5 0V16h2.5a.75.75 0 010 1.5H18V20a.75.75 0 01-1.5 0v-2.5H14a.75.75 0 010-1.5h2.5v-2.5z" />
                </g>
            </svg>
        );
    }
);
