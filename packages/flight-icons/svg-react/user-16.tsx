import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUser16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.75 10a3.75 3.75 0 0 1 3.75 3.75v.5a.75.75 0 0 1-1.5 0v-.5a2.25 2.25 0 0 0-2.25-2.25h-5.5A2.25 2.25 0 0 0 3 13.75v.5a.75.75 0 0 1-1.5 0v-.5A3.75 3.75 0 0 1 5.25 10zM8 1a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5"
                />
            </svg>
        );
    }
);
