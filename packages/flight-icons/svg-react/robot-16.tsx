import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRobot16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M6.25 8.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5zM10.125 5a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM5.875 5a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" />
                    <path
                        fillRule="evenodd"
                        d="M4.525 2a1.25 1.25 0 012.45 0h2.05a1.25 1.25 0 012.45 0h.275A2.25 2.25 0 0114 4.25v1.275a1.25 1.25 0 010 2.45V10.5a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 012 10.5V7.975a1.25 1.25 0 010-2.45V4.25A2.25 2.25 0 014.25 2h.275zM4.25 3.5a.75.75 0 00-.75.75v6.25c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75V4.25a.75.75 0 00-.75-.75h-7.5z"
                        clipRule="evenodd"
                    />
                    <path d="M3.5 14.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z" />
                </g>
            </svg>
        );
    }
);
