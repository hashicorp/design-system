import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBookmark16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.75 1A2.25 2.25 0 0 1 14 3.25v10.83a1 1 0 0 1-1.477.878l-4.404-2.393a.25.25 0 0 0-.238 0l-4.403 2.393A1 1 0 0 1 2 14.079V3.25A2.25 2.25 0 0 1 4.25 1zm-7.5 1.5a.75.75 0 0 0-.75.75v9.988l3.664-1.992a1.75 1.75 0 0 1 1.672 0l3.664 1.992V3.25a.75.75 0 0 0-.75-.75z"
                />
            </svg>
        );
    }
);
