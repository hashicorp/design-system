import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDelete24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M21.25 3A2.75 2.75 0 0124 5.75v12.5A2.75 2.75 0 0121.25 21H8.676a2.752 2.752 0 01-2.097-.97L.178 12.484a.752.752 0 010-.97L6.579 3.97A2.752 2.752 0 018.676 3H21.25zM8.676 4.5c-.367 0-.716.162-.953.441L1.733 12l5.99 7.059c.237.28.586.44.953.441H21.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25H8.676zm9.044 3.72a.75.75 0 011.06 1.06L16.06 12l2.72 2.72a.75.75 0 01-1.06 1.06L15 13.06l-2.72 2.72a.75.75 0 01-1.06-1.06L13.94 12l-2.72-2.72a.75.75 0 011.06-1.06L15 10.94l2.72-2.72z"
                />
            </svg>
        );
    }
);
