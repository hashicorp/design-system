import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRedirect24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 5.786c0-1.046 1.209-1.63 2.028-.978l7.45 5.922c.627.498.63 1.45.005 1.952l-7.45 5.997c-.817.659-2.033.076-2.033-.974v-2.753a7.316 7.316 0 00-2.824.427c-1.306.456-2.918 1.342-5.295 2.98-.436.301-.973.288-1.37.03a1.168 1.168 0 01-.479-1.327c.591-1.999 1.91-4.124 3.743-5.754C7.444 9.823 9.571 8.72 12 8.529V5.786zm1.5.518V9.25a.75.75 0 01-.75.75c-2.296 0-4.35.98-5.978 2.428-1.36 1.21-2.393 2.723-2.994 4.188 2.031-1.356 3.565-2.186 4.903-2.653 1.53-.535 2.769-.584 4.137-.46a.75.75 0 01.682.747v2.933l6.8-5.474-6.8-5.405z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
