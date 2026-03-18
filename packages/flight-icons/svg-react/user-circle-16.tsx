import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUserCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 .25a7.75 7.75 0 1 1 0 15.5A7.75 7.75 0 0 1 8 .25M5.5 11.5c-.495 0-.953.172-1.275.453-.31.27-.427.445-.462.64A6.23 6.23 0 0 0 8 14.25a6.23 6.23 0 0 0 4.237-1.656c-.035-.196-.152-.372-.462-.64A1.95 1.95 0 0 0 10.5 11.5zM8 1.75a6.25 6.25 0 0 0-5.274 9.605c.15-.195.325-.37.514-.535.615-.534 1.43-.82 2.26-.82h5c.83 0 1.645.286 2.26.82.189.165.365.34.514.534A6.25 6.25 0 0 0 8 1.75M8 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                />
            </svg>
        );
    }
);
