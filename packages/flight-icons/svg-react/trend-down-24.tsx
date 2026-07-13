import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTrendDown24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M.22 5.22a.75.75 0 0 1 1.06 0l7.02 7.02 4.974-4.07a.75.75 0 0 1 1.006.05l8.22 8.22v-4.69a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-.75.75h-6.5a.75.75 0 0 1 0-1.5h4.69L13.7 9.76l-4.975 4.07a.75.75 0 0 1-1.005-.05l-7.5-7.5a.75.75 0 0 1 0-1.06"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
