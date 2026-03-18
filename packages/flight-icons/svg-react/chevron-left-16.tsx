import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconChevronLeft16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.735 3.204a.75.75 0 0 1 1.03 1.09L6.843 8l3.922 3.704a.75.75 0 0 1-1.03 1.09l-4.5-4.25a.75.75 0 0 1 0-1.09z"
                />
            </svg>
        );
    }
);
