import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLogs24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.25 20.5a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5h10.5zm6-4.5a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5h16.5zm0-4.5a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5h16.5zM6.787 2.16a.75.75 0 11.926 1.18L4.963 5.5l2.75 2.16a.75.75 0 01-.926 1.18l-3.5-2.75a.751.751 0 010-1.18l3.5-2.75zm4.373.126a.75.75 0 011.053-.126l3.5 2.75a.75.75 0 010 1.18l-3.5 2.75a.75.75 0 01-.926-1.18l2.75-2.16-2.75-2.16a.75.75 0 01-.127-1.054z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
