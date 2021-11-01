import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUserX16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path
                        fillRule="evenodd"
                        d="M6 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM4 5.5a2 2 0 114 0 2 2 0 01-4 0z"
                        clipRule="evenodd"
                    />
                    <path d="M4.25 10A3.75 3.75 0 00.5 13.75v.5a.75.75 0 001.5 0v-.5a2.25 2.25 0 012.25-2.25h3.5A2.25 2.25 0 0110 13.75v.5a.75.75 0 001.5 0v-.5A3.75 3.75 0 007.75 10h-3.5zM11.22 5.22a.75.75 0 011.06 0l1.22 1.22 1.22-1.22a.75.75 0 111.06 1.06L14.56 7.5l1.22 1.22a.75.75 0 01-1.06 1.06L13.5 8.56l-1.22 1.22a.75.75 0 11-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 010-1.06z" />
                </g>
            </svg>
        );
    }
);
