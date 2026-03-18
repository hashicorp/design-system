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
                        d="M6 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7M4 5.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
                        clipRule="evenodd"
                    />
                    <path d="M4.25 10A3.75 3.75 0 0 0 .5 13.75v.5a.75.75 0 0 0 1.5 0v-.5a2.25 2.25 0 0 1 2.25-2.25h3.5A2.25 2.25 0 0 1 10 13.75v.5a.75.75 0 0 0 1.5 0v-.5A3.75 3.75 0 0 0 7.75 10zM11.22 5.22a.75.75 0 0 1 1.06 0l1.22 1.22 1.22-1.22a.75.75 0 1 1 1.06 1.06L14.56 7.5l1.22 1.22a.75.75 0 0 1-1.06 1.06L13.5 8.56l-1.22 1.22a.75.75 0 1 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 0-1.06" />
                </g>
            </svg>
        );
    }
);
