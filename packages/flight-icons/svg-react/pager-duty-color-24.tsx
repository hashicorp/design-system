import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPagerDutyColor24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill="#048A24">
                    <path d="M7.946 16.592H5.244v5.405h2.702v-5.405zM16.056 2.964C14.52 2.134 13.446 2 10.924 2h-5.68v11.89h5.658c2.24 0 3.921-.134 5.4-1.12 1.613-1.065 2.454-2.847 2.454-4.909 0-2.219-1.031-4-2.7-4.897zm-4.493 8.438h-3.44V4.544l3.25-.023c2.957-.022 4.436 1.01 4.436 3.374 0 2.543-1.837 3.507-4.246 3.507z" />
                </g>
            </svg>
        );
    }
);
