import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHistory24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12a.75.75 0 0 1 1.5 0A8.5 8.5 0 1 0 12 3.5c-2.347 0-4.472.95-6.01 2.49A8.6 8.6 0 0 0 5.124 7H8.25a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 3 7.75v-4.5a.75.75 0 0 1 1.5 0v2.136q.207-.236.429-.457A9.97 9.97 0 0 1 12 2m-.25 4a.75.75 0 0 1 .75.75v5.786l4.085 2.043a.75.75 0 0 1-.67 1.342l-4.5-2.25A.75.75 0 0 1 11 13V6.75a.75.75 0 0 1 .75-.75"
                />
            </svg>
        );
    }
);
