import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRss16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.5 11a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m-.75-5A7.25 7.25 0 0 1 10 13.25a.75.75 0 0 1-1.5 0A5.75 5.75 0 0 0 2.75 7.5a.75.75 0 0 1 0-1.5m0-5A12.25 12.25 0 0 1 15 13.25a.75.75 0 0 1-1.5 0A10.75 10.75 0 0 0 2.75 2.5a.75.75 0 0 1 0-1.5"
                />
            </svg>
        );
    }
);
