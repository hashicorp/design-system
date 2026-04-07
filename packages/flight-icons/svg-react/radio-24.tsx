import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRadio24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4.222 4.22a.75.75 0 0 1 1.06 1.06 9.504 9.504 0 0 0 0 13.436.751.751 0 0 1-1.06 1.06 11.004 11.004 0 0 1 0-15.557m14.496 0a.75.75 0 0 1 1.06 0 11.004 11.004 0 0 1 0 15.557.751.751 0 0 1-1.06-1.06 9.505 9.505 0 0 0 0-13.436.75.75 0 0 1 0-1.06M15.89 6.977a.75.75 0 0 1 1.06.008 7.1 7.1 0 0 1 1.517 2.304 7.2 7.2 0 0 1 0 5.432 7.1 7.1 0 0 1-1.517 2.306.75.75 0 0 1-1.068-1.053 5.6 5.6 0 0 0 1.196-1.82 5.7 5.7 0 0 0 0-4.298 5.6 5.6 0 0 0-1.196-1.818.75.75 0 0 1 .008-1.061m-8.842-.003a.75.75 0 1 1 1.068 1.053 5.6 5.6 0 0 0-1.196 1.818 5.7 5.7 0 0 0 0 4.3c.278.68.685 1.299 1.196 1.818a.75.75 0 0 1-1.068 1.053 7.1 7.1 0 0 1-1.517-2.305 7.2 7.2 0 0 1 0-5.432A7.1 7.1 0 0 1 7.05 6.974M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
