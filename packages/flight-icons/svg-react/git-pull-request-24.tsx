import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitPullRequest24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.75 3a3.5 3.5 0 0 1 .75 6.92v10.83a.75.75 0 0 1-1.5 0V9.92A3.502 3.502 0 0 1 6.75 3m8.5 3A2.75 2.75 0 0 1 18 8.75v5.58a3.502 3.502 0 0 1-.75 6.92 3.5 3.5 0 0 1-.75-6.92V8.75c0-.69-.56-1.25-1.25-1.25H13A.75.75 0 0 1 13 6zm2 9.75a2 2 0 1 0 0 4 2 2 0 0 0 0-4M6.75 4.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
                />
            </svg>
        );
    }
);
