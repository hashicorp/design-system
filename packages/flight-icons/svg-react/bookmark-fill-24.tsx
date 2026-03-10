import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBookmarkFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.25 2A2.75 2.75 0 0120 4.75v16.376a1 1 0 01-1.383.924l-6.521-2.698a.25.25 0 00-.192 0L5.383 22.05A1 1 0 014 21.126V4.75A2.75 2.75 0 016.75 2h10.5z"
                />
            </svg>
        );
    }
);
