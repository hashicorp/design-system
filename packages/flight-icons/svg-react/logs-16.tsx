import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLogs16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.25 13.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h6.5zm4-3a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5h10.5zm0-3a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5h10.5zM4.256 1.186a.75.75 0 01.988 1.128L3.89 3.5l1.355 1.186a.75.75 0 01-.988 1.128l-2-1.75a.75.75 0 010-1.128l2-1.75zm2.93.07a.75.75 0 011.058-.07l2 1.75a.75.75 0 010 1.128l-2 1.75a.75.75 0 01-.988-1.128L8.61 3.5 7.256 2.314a.75.75 0 01-.07-1.058z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
