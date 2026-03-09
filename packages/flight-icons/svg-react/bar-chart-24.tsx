import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBarChart24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6 15a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm6-6a1 1 0 011 1v10a1 1 0 11-2 0V10a1 1 0 011-1zm6-6a1 1 0 011 1v16a1 1 0 11-2 0V4a1 1 0 011-1z"
                />
            </svg>
        );
    }
);
