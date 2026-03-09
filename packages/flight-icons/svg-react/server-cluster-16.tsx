import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconServerCluster16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a2.25 2.25 0 01.75 4.372v.465c.722.17 1.35.582 1.797 1.144l.626-.366a2.25 2.25 0 111.037 1.13l-1.025.602a3.26 3.26 0 010 1.306l1.025.6a2.25 2.25 0 11-1.037 1.13l-.626-.364a3.252 3.252 0 01-1.797 1.144v.465A2.251 2.251 0 018 16a2.25 2.25 0 01-.75-4.372v-.465a3.251 3.251 0 01-1.797-1.144l-.626.366a2.25 2.25 0 11-1.037-1.13l1.026-.602a3.262 3.262 0 010-1.306l-1.026-.6a2.25 2.25 0 111.037-1.13l.626.364A3.25 3.25 0 017.25 4.837v-.465A2.251 2.251 0 018 0zm0 13a.75.75 0 100 1.5.75.75 0 000-1.5zm-5.25-2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm10.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zM8 6.25a1.75 1.75 0 100 3.501A1.75 1.75 0 008 6.25zM2.75 4a.75.75 0 100 1.5.75.75 0 000-1.5zm10.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zM8 1.5A.75.75 0 108 3a.75.75 0 000-1.5z"
                />
            </svg>
        );
    }
);
