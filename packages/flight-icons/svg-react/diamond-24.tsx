import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDiamond24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.056 1.925a2.75 2.75 0 0 1 3.89 0l8.131 8.13a2.753 2.753 0 0 1 0 3.89l-8.132 8.132a2.75 2.75 0 0 1-3.888 0l-8.132-8.132a2.75 2.75 0 0 1 0-3.89zm2.829 1.06a1.25 1.25 0 0 0-1.768 0l-8.132 8.132a1.25 1.25 0 0 0 0 1.768l8.132 8.13c.488.488 1.28.488 1.768 0l8.13-8.13a1.25 1.25 0 0 0 0-1.768z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
