import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconServiceNow16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.043 1.708C4.206 1.685 1.034 4.838 1 8.709a7.058 7.058 0 002.2 5.197c.494.474 1.268.52 1.807.097.796-.623 1.82-1 2.996-1 1.177 0 2.2.372 2.995 1a1.38 1.38 0 001.814-.109A7.065 7.065 0 0015 8.766c0-3.883-3.115-7.036-6.957-7.058zm-.046 10.587c-2.08 0-3.501-1.57-3.501-3.518 0-1.947 1.42-3.54 3.501-3.54 2.08 0 3.502 1.599 3.502 3.54 0 1.942-1.421 3.518-3.502 3.518z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
