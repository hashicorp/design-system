import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRewind16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.074 3.364A1.25 1.25 0 0 1 9 4.416v1.806l4.039-2.795A1.25 1.25 0 0 1 15 4.454v7.092a1.25 1.25 0 0 1-1.961 1.027L9 9.779v1.806a1.25 1.25 0 0 1-1.926 1.051L1.5 9.051a1.25 1.25 0 0 1 0-2.103zM2.637 8 7.5 11.126V4.874zm6.43 0 4.433 3.069V4.93z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
