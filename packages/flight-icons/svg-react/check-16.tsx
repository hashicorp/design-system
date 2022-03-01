import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCheck16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.78 4.28a.75.75 0 00-1.06-1.06l-7.97 7.97-3.47-3.47a.75.75 0 00-1.06 1.06l4 4a.75.75 0 001.06 0l8.5-8.5z"
                />
            </svg>
        );
    }
);
