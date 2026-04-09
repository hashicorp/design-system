import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSearch16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.344.969a5.375 5.375 0 0 1 4.294 8.608l4.174 4.174a.75.75 0 1 1-1.061 1.06l-4.174-4.174A5.375 5.375 0 1 1 6.344.968m0 1.5a3.875 3.875 0 1 0 0 7.75 3.875 3.875 0 0 0 0-7.75"
                />
            </svg>
        );
    }
);
