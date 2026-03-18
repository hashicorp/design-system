import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRotateCw16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.25 0a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75h-4a.75.75 0 0 1 0-1.5h2.525A5.5 5.5 0 1 0 13.5 8 .75.75 0 0 1 15 8a7 7 0 1 1-2.5-5.362V.75a.75.75 0 0 1 .75-.75"
                />
            </svg>
        );
    }
);
