import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconChevronRight24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.208 5.231A.75.75 0 0 1 9.27 5.21l6.5 6.25a.76.76 0 0 1 .23.54c0 .204-.084.4-.23.54l-6.5 6.25a.753.753 0 0 1-1.06-.02.75.75 0 0 1 .021-1.06L14.168 12 8.23 6.29a.75.75 0 0 1-.022-1.059"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
