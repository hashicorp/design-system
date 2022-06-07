import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconClockFilled24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11.5-6.25a.75.75 0 00-1.5 0V12c0 .284.16.544.415.67l4.5 2.25a.75.75 0 10.67-1.34L12.5 11.536V5.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
