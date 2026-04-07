import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloudCheck24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M16.719 14.22a.75.75 0 0 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l2.47 2.47zM8.026 1.046a8.9 8.9 0 0 1 4.151.569 8.94 8.94 0 0 1 3.437 2.412 9 9 0 0 1 1.801 3.16h.727a5.84 5.84 0 0 1 3.697 1.326 5.92 5.92 0 0 1 2.037 3.374 5.95 5.95 0 0 1-.527 3.91 5.88 5.88 0 0 1-2.858 2.706.75.75 0 0 1-.607-1.373 4.38 4.38 0 0 0 2.129-2.015c.46-.9.6-1.933.394-2.924a4.4 4.4 0 0 0-1.519-2.517 4.34 4.34 0 0 0-2.747-.987h-1.288a.75.75 0 0 1-.727-.564 7.5 7.5 0 0 0-1.638-3.105 7.4 7.4 0 0 0-2.86-2.007 7.37 7.37 0 0 0-6.734.692 7.5 7.5 0 0 0-2.4 2.549 7.55 7.55 0 0 0-.337 6.832 7.5 7.5 0 0 0 2.137 2.776.75.75 0 0 1-.941 1.17 9 9 0 0 1-2.566-3.335 9.06 9.06 0 0 1 .405-8.188 9 9 0 0 1 2.883-3.06 8.9 8.9 0 0 1 3.95-1.401"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
