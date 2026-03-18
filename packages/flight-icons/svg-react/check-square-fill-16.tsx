import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCheckSquareFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.75 1A2.25 2.25 0 0 1 15 3.25v9.5A2.25 2.25 0 0 1 12.75 15h-9.5A2.25 2.25 0 0 1 1 12.75v-9.5A2.25 2.25 0 0 1 3.25 1zm-.97 4.22a.75.75 0 0 0-1.06 0L6.75 9.19 5.28 7.72a.75.75 0 1 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5a.75.75 0 0 0 0-1.06"
                />
            </svg>
        );
    }
);
