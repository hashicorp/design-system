import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNavigationAlt16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 1c.302 0 .574.181.691.46l5.25 12.5a.75.75 0 0 1-1.027.96L8 12.458 3.086 14.92a.75.75 0 0 1-1.028-.961l5.25-12.5A.75.75 0 0 1 8 1M4.226 12.67l3.438-1.722a.75.75 0 0 1 .672 0l3.437 1.723L8 3.686z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
