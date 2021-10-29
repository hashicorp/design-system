import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBookmarkAdd16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    <path d="M7.75 4a.75.75 0 01.75.75V6h1.25a.75.75 0 010 1.5H8.5v1.25a.75.75 0 01-1.5 0V7.5H5.75a.75.75 0 010-1.5H7V4.75A.75.75 0 017.75 4z" />
                    <path
                        fillRule="evenodd"
                        d="M2 3.25A2.25 2.25 0 014.25 1h7.5A2.25 2.25 0 0114 3.25v10.83a1 1 0 01-1.478.878L8.12 12.564a.25.25 0 00-.238 0l-4.403 2.394A1 1 0 012 14.08V3.25zm2.25-.75a.75.75 0 00-.75.75v9.989l3.664-1.992a1.75 1.75 0 011.672 0l3.664 1.992V3.25a.75.75 0 00-.75-.75h-7.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
