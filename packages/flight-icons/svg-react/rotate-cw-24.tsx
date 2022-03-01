import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRotateCw24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M21 1.75a.75.75 0 00-1.5 0v3.636A9.977 9.977 0 0012 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10a.75.75 0 00-1.5 0 8.5 8.5 0 11-2.019-5.5H14.75a.75.75 0 000 1.5h5.5a.75.75 0 00.75-.75v-5.5z"
                />
            </svg>
        );
    }
);
