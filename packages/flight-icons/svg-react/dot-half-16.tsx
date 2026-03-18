import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDotHalf16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 0 10A5 5 0 0 0 8 3m0 1.5v7a3.5 3.5 0 1 0 0-7"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
