import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitMerge24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7 3a3.5 3.5 0 01.597 6.95c.1.41.283.886.55 1.405a11.743 11.743 0 001.809 2.541c1.35 1.457 3.015 2.56 4.636 2.803a3.502 3.502 0 016.908.801 3.5 3.5 0 01-6.928.71c-2.178-.252-4.217-1.677-5.716-3.294A13.892 13.892 0 017.5 13.202v7.548a.75.75 0 01-1.5 0V9.855A3.502 3.502 0 017 3zm11 12.5a2 2 0 100 4 2 2 0 000-4zM7 4.5a2 2 0 100 4 2 2 0 000-4z"
                />
            </svg>
        );
    }
);
