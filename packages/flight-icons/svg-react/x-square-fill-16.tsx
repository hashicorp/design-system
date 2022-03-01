import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconXSquareFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1 3.139C1 1.958 1.958 1 3.139 1h9.722C14.042 1 15 1.958 15 3.139v9.722A2.139 2.139 0 0112.861 15H3.14A2.139 2.139 0 011 12.861V3.14zm4.28 1.08A.75.75 0 004.22 5.28L6.94 8l-2.72 2.72a.75.75 0 101.06 1.06L8 9.06l2.72 2.72a.75.75 0 101.06-1.06L9.06 8l2.72-2.72a.75.75 0 00-1.06-1.06L8 6.94 5.28 4.22z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
