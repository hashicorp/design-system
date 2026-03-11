import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUserCheck24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.25 14.5A4.75 4.75 0 0118 19.25v1a.75.75 0 01-1.5 0v-1A3.25 3.25 0 0013.25 16h-8.5a3.25 3.25 0 00-3.25 3.25v1a.75.75 0 01-1.5 0v-1a4.75 4.75 0 014.75-4.75h8.5zm8.97-5.78a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06l1.47 1.47 3.47-3.47zM9 3a5 5 0 110 10A5 5 0 019 3zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
                />
            </svg>
        );
    }
);
