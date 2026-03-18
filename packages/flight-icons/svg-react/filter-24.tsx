import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFilter24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.25 16a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5zm3-5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1 0-1.5zm3-5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1 0-1.5z"
                />
            </svg>
        );
    }
);
