import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconThumbsDown24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M20.25 1A2.754 2.754 0 0 1 23 3.75v7.5A2.754 2.754 0 0 1 20.25 14h-2.513l-3.71 8.349c-.175.394-.572.649-1.003.651A3.525 3.525 0 0 1 9.5 19.476V16.25a.254.254 0 0 0-.25-.25H4.077a2.75 2.75 0 0 1-2.72-3.163l1.443-9.5A2.75 2.75 0 0 1 5.52 1zM5.52 2.5c-.619 0-1.144.452-1.237 1.063l-1.443 9.5A1.25 1.25 0 0 0 4.077 14.5H9.25c.964.003 1.75.785 1.75 1.75v3.226c0 1.031.771 1.883 1.769 2.008l3.73-8.393V2.5zM18 12.5h2.25a1.254 1.254 0 0 0 1.25-1.25v-7.5c0-.689-.562-1.247-1.25-1.25H18z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
