import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitPullRequest16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4.25 1A3 3 0 0 1 5 6.905V14a.75.75 0 0 1-1.5 0V6.905A3.001 3.001 0 0 1 4.25 1m6 2a2.25 2.25 0 0 1 2.25 2.25v3.595a3.001 3.001 0 1 1-1.5 0V5.25a.75.75 0 0 0-.75-.75H9A.75.75 0 0 1 9 3zm1.5 7.25a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M4.25 2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                />
            </svg>
        );
    }
);
