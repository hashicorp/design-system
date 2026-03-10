import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCheckSquareFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M19.25 2A2.75 2.75 0 0122 4.75v14.5A2.75 2.75 0 0119.25 22H4.75A2.75 2.75 0 012 19.25V4.75A2.75 2.75 0 014.75 2h14.5zm-1.47 6.22a.75.75 0 00-1.06 0l-6.97 6.97-2.47-2.47a.75.75 0 10-1.06 1.06l3 3a.75.75 0 001.06 0l7.5-7.5a.75.75 0 000-1.06z"
                />
            </svg>
        );
    }
);
