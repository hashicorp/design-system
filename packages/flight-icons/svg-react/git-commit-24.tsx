import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitCommit24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15.93 11a4.001 4.001 0 00-7.86 0H3.75a.75.75 0 000 1.5h4.32a4.001 4.001 0 007.86 0h4.32a.75.75 0 000-1.5h-4.32zM12 9.25a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
