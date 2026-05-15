import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTrendDown16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M.22 3.22a.75.75 0 0 1 1.06 0l4.1 4.1 4.006-2.226a.75.75 0 0 1 .938.174l4.176 4.97V7.75a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.85L9.574 6.706l-3.959 2.2a.75.75 0 0 1-.894-.126l-4.5-4.5a.75.75 0 0 1 0-1.06"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
