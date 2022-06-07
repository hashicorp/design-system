import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconClockFilled16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8.5-4.25a.75.75 0 00-1.5 0V8c0 .284.16.544.415.67l2.5 1.25a.75.75 0 10.67-1.34L8.5 7.535V3.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
