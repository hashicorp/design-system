import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBookmarkRemove16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M5.75 6a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z" />
                    <path
                        fillRule="evenodd"
                        d="M4.25 1A2.25 2.25 0 0 0 2 3.25v10.83a1 1 0 0 0 1.478.878l4.403-2.394a.25.25 0 0 1 .238 0l4.403 2.394A1 1 0 0 0 14 14.08V3.25A2.25 2.25 0 0 0 11.75 1zM3.5 3.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 .75.75v9.989l-3.664-1.992a1.75 1.75 0 0 0-1.672 0L3.5 13.239z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
