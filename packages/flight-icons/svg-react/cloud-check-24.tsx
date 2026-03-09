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
                    d="M16.719 14.22a.75.75 0 011.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-3-3a.75.75 0 011.06-1.06l2.47 2.47 6.97-6.97zM8.026 1.046a8.872 8.872 0 014.151.569 8.935 8.935 0 013.437 2.412 9.02 9.02 0 011.801 3.16h.727a5.841 5.841 0 013.697 1.326 5.917 5.917 0 012.037 3.374 5.946 5.946 0 01-.527 3.91 5.882 5.882 0 01-2.858 2.706.75.75 0 01-.607-1.373 4.381 4.381 0 002.129-2.015c.46-.9.6-1.932.394-2.924a4.415 4.415 0 00-1.519-2.517 4.34 4.34 0 00-2.747-.987h-1.288a.751.751 0 01-.727-.564 7.526 7.526 0 00-1.638-3.105 7.433 7.433 0 00-2.86-2.006 7.37 7.37 0 00-6.734.69 7.472 7.472 0 00-2.4 2.55 7.565 7.565 0 00-.338 6.832 7.493 7.493 0 002.138 2.776.75.75 0 01-.941 1.17 8.995 8.995 0 01-2.566-3.335 9.061 9.061 0 01.405-8.188 8.973 8.973 0 012.883-3.06 8.889 8.889 0 013.95-1.401z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
