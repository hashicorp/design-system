import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGitBranch24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.25 2.5a.75.75 0 01.75.75v10.83a3.506 3.506 0 012.668 2.661c2.087-.089 3.802-.845 5.015-2.058 1.165-1.165 1.909-2.793 2.044-4.769a3.501 3.501 0 111.503.01c-.142 2.339-1.02 4.352-2.487 5.82-1.52 1.52-3.626 2.407-6.072 2.498A3.501 3.501 0 115.5 14.08V3.25a.75.75 0 01.75-.75zm0 13a2 2 0 100 4 2 2 0 000-4zm11.25-11a2 2 0 100 4 2 2 0 000-4z"
                />
            </svg>
        );
    }
);
