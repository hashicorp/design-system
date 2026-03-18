import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPlayCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M5.5 5.411a1.25 1.25 0 0 1 1.92-1.055l4.07 2.59a1.25 1.25 0 0 1 0 2.109l-4.07 2.589a1.25 1.25 0 0 1-1.92-1.055zM7 10.134 10.354 8 7 5.866z"
                />
            </svg>
        );
    }
);
