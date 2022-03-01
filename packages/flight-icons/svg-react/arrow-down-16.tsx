import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowDown16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.5 2.75a.75.75 0 00-1.5 0v8.614L4.045 8.235a.75.75 0 00-1.09 1.03l4.248 4.498a.862.862 0 00.025.026.747.747 0 00.51.21L7.75 14h.012a.747.747 0 00.533-.235l4.25-4.5a.75.75 0 00-1.09-1.03L8.5 11.364V2.75z"
                />
            </svg>
        );
    }
);
