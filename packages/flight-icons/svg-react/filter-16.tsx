import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFilter16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.25 11a.75.75 0 010 1.5h-2.5a.75.75 0 010-1.5h2.5zm2.5-4a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h7.5zm2.5-4a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5h12.5z"
                />
            </svg>
        );
    }
);
