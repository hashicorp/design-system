import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconServer16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 9A2.25 2.25 0 0116 11.25v2.5A2.25 2.25 0 0113.75 16H2.25A2.25 2.25 0 010 13.75v-2.5A2.25 2.25 0 012.25 9h11.5zm-11.5 1.5a.75.75 0 00-.75.75v2.5c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75v-2.5a.75.75 0 00-.75-.75H2.25zm2 1a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5h.5zM13.75 0A2.25 2.25 0 0116 2.25v2.5A2.25 2.25 0 0113.75 7H2.25A2.25 2.25 0 010 4.75v-2.5A2.25 2.25 0 012.25 0h11.5zM2.25 1.5a.75.75 0 00-.75.75v2.5c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75v-2.5a.75.75 0 00-.75-.75H2.25zm2 1a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5h.5z"
                />
            </svg>
        );
    }
);
