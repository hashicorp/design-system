import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHeadphones16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 1c1.847 0 3.624.705 4.938 1.967A6.63 6.63 0 0115 7.75v5A2.25 2.25 0 0112.75 15h-.5A2.25 2.25 0 0110 12.75v-2.5A2.25 2.25 0 0112.25 8h1.25v-.25a5.13 5.13 0 00-1.6-3.701A5.636 5.636 0 008 2.5c-1.468 0-2.871.56-3.9 1.549A5.13 5.13 0 002.5 7.75V8h1.25A2.25 2.25 0 016 10.25v2.5A2.25 2.25 0 013.75 15h-.5A2.25 2.25 0 011 12.75v-5c0-1.8.746-3.52 2.062-4.783A7.134 7.134 0 018 1zM2.5 12.75c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75v-2.5a.75.75 0 00-.75-.75H2.5v3.25zm9.75-3.25a.75.75 0 00-.75.75v2.5c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V9.5h-1.25z"
                />
            </svg>
        );
    }
);
