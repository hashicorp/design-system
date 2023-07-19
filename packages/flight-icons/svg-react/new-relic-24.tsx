import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNewRelic24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M11.5 5.847l5.384 3.076v6.154l-5.383 3.077V22l8.75-5V7L11.5 2 2.75 7l-.001 3.847 5.383 3.077v6.154L11.501 22V12L6.116 8.924l5.385-3.076z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
