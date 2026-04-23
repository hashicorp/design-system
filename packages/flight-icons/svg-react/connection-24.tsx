import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconConnection24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M19.5 8.25a3.5 3.5 0 1 1-3.42 4.25H7.92A3.502 3.502 0 0 1 1 11.75 3.5 3.5 0 0 1 7.92 11h8.16a3.5 3.5 0 0 1 3.42-2.75m-15 1.5a2 2 0 1 0 .001 4.001A2 2 0 0 0 4.5 9.75m15 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 19.5 9.75"
                />
            </svg>
        );
    }
);
