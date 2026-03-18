import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCornerDownRight16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.25 2a.75.75 0 0 1 .75.75v4.5A1.75 1.75 0 0 0 5.75 9h5.69L9.22 6.78a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H5.75A3.25 3.25 0 0 1 2.5 7.25v-4.5A.75.75 0 0 1 3.25 2"
                />
            </svg>
        );
    }
);
