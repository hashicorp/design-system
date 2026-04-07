import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWifi16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M8.007 12a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm-.004-3a4.75 4.75 0 0 1 2.75.878.75.75 0 0 1-.867 1.223 3.25 3.25 0 0 0-3.765 0 .75.75 0 0 1-.87-1.223A4.75 4.75 0 0 1 8.004 9m.023-3.5c1.89 0 3.72.663 5.173 1.872a.75.75 0 1 1-.96 1.152 6.584 6.584 0 0 0-8.427 0 .75.75 0 1 1-.96-1.152A8.1 8.1 0 0 1 8.026 5.5M8 2c2.78 0 5.463 1.015 7.549 2.853a.75.75 0 0 1-.993 1.125 9.916 9.916 0 0 0-13.114 0A.75.75 0 0 1 .45 4.853 11.42 11.42 0 0 1 8 2"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
