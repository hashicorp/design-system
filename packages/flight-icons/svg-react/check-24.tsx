import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCheck24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.721 5.22a.75.75 0 0 1 1.06 1.061l-12.5 12.5a.755.755 0 0 1-1.06 0l-6-6a.75.75 0 0 1 1.06-1.06l5.47 5.47z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
