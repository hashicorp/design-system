import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTrendUp16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15.25 3c.413.001.75.336.75.75v4.5a.75.75 0 01-1.5 0V5.762l-4.176 4.97a.752.752 0 01-.938.173L5.38 8.681l-4.1 4.1A.751.751 0 01.22 11.72l4.5-4.5a.751.751 0 01.894-.125l3.96 2.199L13.6 4.5H10.75a.75.75 0 010-1.5h4.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
