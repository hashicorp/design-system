import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMoreVertical16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 11a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                />
            </svg>
        );
    }
);
