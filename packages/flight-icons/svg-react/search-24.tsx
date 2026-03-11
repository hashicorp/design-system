import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSearch24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.5 2a8.5 8.5 0 016.518 13.957l4.762 4.762a.75.75 0 11-1.06 1.061l-4.763-4.763A8.472 8.472 0 0110.5 19C5.807 18.998 2 15.193 2 10.5 2 5.806 5.807 2 10.5 2zm0 1.5a7.003 7.003 0 00-7 7 7 7 0 107-7z"
                />
            </svg>
        );
    }
);
