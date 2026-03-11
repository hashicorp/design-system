import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMaximize24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.72 14.22a.75.75 0 111.06 1.06L4.56 20.5h3.69a.75.75 0 010 1.5h-5.5a.723.723 0 01-.287-.057A.749.749 0 012 21.25v-5.5a.75.75 0 011.5 0v3.69l5.22-5.22zM21.25 2a.748.748 0 01.75.75v5.5a.75.75 0 01-1.5 0V4.56l-5.22 5.22a.75.75 0 11-1.06-1.06l5.22-5.22h-3.69a.75.75 0 010-1.5h5.5z"
                />
            </svg>
        );
    }
);
