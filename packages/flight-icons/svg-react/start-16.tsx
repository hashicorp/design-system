import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconStart16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M1.75 2a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V2.75A.75.75 0 011.75 2zM8.793 3.155A.75.75 0 019.818 4.24l-.053.055-3.13 2.955h7.615a.75.75 0 010 1.5H6.636l3.129 2.955.053.055a.75.75 0 01-1.025 1.085l-.058-.05-4.5-4.25a.75.75 0 01-.053-1.034l.053-.056 4.5-4.25.058-.05z" />
                </g>
            </svg>
        );
    }
);
