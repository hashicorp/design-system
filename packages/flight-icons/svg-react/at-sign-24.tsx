import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAtSign24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.3 2.054a11 11 0 0 1 7.2-.767A11.008 11.008 0 0 1 23 12v1.024C23 14.938 21.493 17 19.175 17c-1.52 0-2.606-.864-3.186-1.983A5 5 0 0 1 7 12a5.002 5.002 0 0 1 8.5-3.571V7.75c.001-.413.337-.75.75-.75.413.001.75.337.75.75v5.273c0 1.334.888 2.476 2.175 2.477 1.329-.002 2.325-1.22 2.325-2.477V12a9.51 9.51 0 0 0-7.34-9.251 9.5 9.5 0 0 0-6.218.662 9.5 9.5 0 0 0-4.46 4.384 9.506 9.506 0 0 0 2.486 11.545 9.5 9.5 0 0 0 5.87 2.159 9.5 9.5 0 0 0 5.939-1.956.75.75 0 0 1 1.05.14.753.753 0 0 1-.138 1.05 11 11 0 0 1-6.878 2.266 11 11 0 0 1-6.795-2.5A11.005 11.005 0 0 1 2.137 7.13 11 11 0 0 1 7.3 2.054M12 8.5A3.5 3.5 0 0 0 8.5 12c.001 1.932 1.568 3.5 3.5 3.5a3.503 3.503 0 0 0 3.5-3.5A3.503 3.503 0 0 0 12 8.5"
                />
            </svg>
        );
    }
);
