import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBottom16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.25 13.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5zM8 1a.75.75 0 0 1 .75.75v7.613l2.955-3.128a.75.75 0 1 1 1.09 1.03l-4.25 4.5-.037.037a.75.75 0 0 1-.496.198h-.024a.75.75 0 0 1-.51-.21l-.025-.026-4.248-4.5a.75.75 0 1 1 1.09-1.029L7.25 9.363V1.75A.75.75 0 0 1 8 1"
                />
            </svg>
        );
    }
);
