import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAtSign16 = forwardRef<SVGSVGElement, IconProps>(
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
                height={17}
                fill="none"
                viewBox="0 0 16 17"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M4.581.769A8 8 0 0 1 9.818.21a8 8 0 0 1 4.448 2.817 8 8 0 0 1 1.733 4.973v1.001c0 1.46-.963 2.998-2.75 3a2.62 2.62 0 0 1-2.3-1.298 4 4 0 0 1-2.95 1.298 4.003 4.003 0 0 1-4-4 4.001 4.001 0 0 1 6.5-3.123v-.127c0-.414.337-.75.75-.75.413.002.75.337.75.75v4.25c0 .462.144.847.357 1.1.202.24.495.4.893.4.709-.002 1.25-.595 1.25-1.5V8.001a6.5 6.5 0 0 0-1.408-4.04 6.5 6.5 0 0 0-3.614-2.29 6.5 6.5 0 0 0-4.255.454 6.504 6.504 0 0 0-1.35 10.898 6.5 6.5 0 0 0 4.016 1.478 6.5 6.5 0 0 0 4.064-1.339.753.753 0 0 1 1.051.14c.25.328.187.8-.14 1.052a8 8 0 0 1-5 1.646 8 8 0 0 1-4.943-1.817A8 8 0 0 1 .18 9.687 8.006 8.006 0 0 1 4.58.769M8 5.502c-1.38 0-2.5 1.12-2.5 2.5a2.503 2.503 0 0 0 2.5 2.5 2.505 2.505 0 0 0 2.5-2.5 2.503 2.503 0 0 0-2.5-2.5"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
