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
                    fillRule="evenodd"
                    d="M7.3 2.054a11 11 0 0 1 7.2-.766 11 11 0 0 1 6.116 3.875A11 11 0 0 1 23 12v1.024c0 1.914-1.507 3.975-3.825 3.977-1.52 0-2.606-.865-3.186-1.984A5 5 0 1 1 15.5 8.43v-.678c0-.414.337-.75.75-.75s.75.337.75.75v5.273c0 1.333.889 2.476 2.175 2.477 1.329-.002 2.325-1.22 2.325-2.477V12a9.5 9.5 0 0 0-2.058-5.905 9.5 9.5 0 0 0-5.283-3.346 9.5 9.5 0 0 0-6.217.662 9.5 9.5 0 0 0-4.46 4.384A9.5 9.5 0 0 0 2.713 14a9.5 9.5 0 0 0 3.255 5.338 9.5 9.5 0 0 0 5.87 2.16 9.5 9.5 0 0 0 5.939-1.956.75.75 0 0 1 1.05.14.753.753 0 0 1-.138 1.05 11 11 0 0 1-6.878 2.266 11 11 0 0 1-6.795-2.5A11.006 11.006 0 0 1 2.137 7.13 11 11 0 0 1 7.3 2.054M12 8.501A3.5 3.5 0 0 0 8.5 12c.001 1.931 1.568 3.5 3.5 3.5a3.504 3.504 0 0 0 3.5-3.5A3.503 3.503 0 0 0 12 8.5"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
