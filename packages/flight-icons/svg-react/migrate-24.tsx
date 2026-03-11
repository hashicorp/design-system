import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMigrate24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.207 5.982a.75.75 0 011.06-.025l5.5 5.25a.751.751 0 010 1.085l-5.5 5.25a.75.75 0 11-1.035-1.085l4.146-3.957H4A.75.75 0 014 11h8.378L8.232 7.042a.75.75 0 01-.025-1.06zm6 0a.75.75 0 011.06-.025l5.5 5.25a.751.751 0 010 1.085l-5.5 5.25a.75.75 0 11-1.035-1.085l4.932-4.707-4.932-4.708a.75.75 0 01-.025-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
