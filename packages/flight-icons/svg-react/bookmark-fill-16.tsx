import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBookmarkFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.75 1A2.25 2.25 0 0114 3.25v10.83a1 1 0 01-1.477.878l-4.404-2.393a.25.25 0 00-.238 0l-4.403 2.393A1 1 0 012 14.079V3.25A2.25 2.25 0 014.25 1h7.5z"
                />
            </svg>
        );
    }
);
