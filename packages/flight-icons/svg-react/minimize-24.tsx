import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMinimize24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M10.25 13c.203.001.39.083.525.215l.01.01c.068.07.123.153.158.238a.8.8 0 0 1 .057.287v5.5a.754.754 0 0 1-.75.75.75.75 0 0 1-.75-.75v-3.69l-5.22 5.22a.75.75 0 0 1-1.06-1.06l5.22-5.22H4.75a.75.75 0 0 1 0-1.5zm9.47-9.78a.75.75 0 0 1 1.06 0 .754.754 0 0 1 0 1.06L15.56 9.5h3.69c.413.002.75.337.75.75a.754.754 0 0 1-.75.75h-5.5c-.1 0-.2-.02-.287-.056a.76.76 0 0 1-.407-.407.8.8 0 0 1-.056-.287v-5.5a.75.75 0 0 1 1.5 0v3.69z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
