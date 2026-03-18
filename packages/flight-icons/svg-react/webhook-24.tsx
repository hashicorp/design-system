import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWebhook24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M.886 14.624a.75.75 0 0 1 1.299.752A3.25 3.25 0 1 0 8.25 17a.75.75 0 0 1 .75-.75h8.145A2 2 0 0 1 19 15h.01a2 2 0 0 1 0 4H19a2 2 0 0 1-1.855-1.25H9.691a4.752 4.752 0 1 1-8.805-3.126M12.01 4a2 2 0 0 1 1.623 3.169l3.481 5.47a4.75 4.75 0 1 1 .7 8.961.75.75 0 0 1 .372-1.453q.39.102.814.103a3.25 3.25 0 1 0-1.744-5.993.75.75 0 0 1-1.036-.23L12.364 7.97A2 2 0 0 1 12.01 8H12a2 2 0 1 1 0-4zM12 1.25c1.79 0 3.347.99 4.156 2.448a.75.75 0 0 1-1.312.728 3.25 3.25 0 1 0-4.588 4.317.75.75 0 0 1 .23 1.034l-3.853 6.054A2 2 0 0 1 5.01 19H5a2 2 0 1 1 0-4h.01q.181 0 .354.031L8.85 9.555A4.75 4.75 0 0 1 12 1.25"
                />
            </svg>
        );
    }
);
