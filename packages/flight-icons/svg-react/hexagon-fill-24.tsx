import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHexagonFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M10.559 1.007a2.75 2.75 0 0 1 2.882 0l7.75 4.768c.813.5 1.31 1.389 1.31 2.343v7.765c-.001.954-.497 1.841-1.31 2.342l-7.75 4.77a2.75 2.75 0 0 1-2.882 0l-7.75-4.77A2.75 2.75 0 0 1 1.5 15.883V8.118c0-.954.496-1.842 1.309-2.343z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
