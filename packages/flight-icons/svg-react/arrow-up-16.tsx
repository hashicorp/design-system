import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowUp16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.749 2c.206 0 .404.086.545.235l4.25 4.5a.75.75 0 01-1.09 1.03L8.5 4.637v8.613a.75.75 0 01-1.5 0V4.637L4.044 7.765a.75.75 0 01-1.09-1.03l4.25-4.5A.754.754 0 017.75 2z"
                />
            </svg>
        );
    }
);
