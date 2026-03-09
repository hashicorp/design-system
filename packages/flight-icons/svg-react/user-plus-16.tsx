import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconUserPlus16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.75 10a3.75 3.75 0 013.75 3.75v.5a.75.75 0 01-1.5 0v-.5a2.25 2.25 0 00-2.25-2.25h-3.5A2.25 2.25 0 002 13.75v.5a.75.75 0 01-1.5 0v-.5A3.75 3.75 0 014.25 10h3.5zm5-4.25a.75.75 0 01.75.75v1h1a.75.75 0 010 1.5h-1v1a.75.75 0 01-1.5 0V9h-1a.75.75 0 010-1.5h1v-1a.75.75 0 01.75-.75zM6 2a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 1.5a2 2 0 100 4 2 2 0 000-4z"
                />
            </svg>
        );
    }
);
