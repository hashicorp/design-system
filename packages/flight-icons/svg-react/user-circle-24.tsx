import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUserCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 .25C18.489.25 23.75 5.51 23.75 12S18.489 23.75 12 23.75C5.51 23.75.25 18.49.25 12S5.51.25 12 .25M8.25 16.5a3.25 3.25 0 0 0-3.24 2.997A10.22 10.22 0 0 0 12 22.25c2.701 0 5.159-1.045 6.99-2.753a3.25 3.25 0 0 0-3.24-2.997zM12 1.75C6.339 1.75 1.75 6.34 1.75 12c0 2.298.757 4.42 2.034 6.129A4.75 4.75 0 0 1 8.25 15h7.5a4.75 4.75 0 0 1 4.465 3.129A10.2 10.2 0 0 0 22.25 12c0-5.66-4.59-10.25-10.25-10.25m0 2.75a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6"
                />
            </svg>
        );
    }
);
