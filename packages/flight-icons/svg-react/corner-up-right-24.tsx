import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCornerUpRight24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.207 3.482a.75.75 0 011.06-.025l5.5 5.25a.752.752 0 010 1.085l-5.5 5.25a.75.75 0 11-1.035-1.085L18.378 10H7.5c-.942 0-1.838.353-2.491.968A3.135 3.135 0 004 13.25v7a.75.75 0 01-1.5 0v-7c0-1.275.538-2.488 1.48-3.375A5.139 5.139 0 017.5 8.5h10.878l-4.146-3.958a.75.75 0 01-.025-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
