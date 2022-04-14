import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGovernment16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8.75 1a1.5 1.5 0 00-1.5 1.5v1.059c-2.267.36-4 2.323-4 4.691a.75.75 0 001.5 0 3.25 3.25 0 116.5 0 .75.75 0 001.5 0 4.751 4.751 0 00-4-4.691V2.5h1.5a.75.75 0 000-1.5h-1.5z" />
                    <path
                        fillRule="evenodd"
                        d="M1 10.75a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5h-1.5v3h1.5a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5h1.5v-3h-1.5a.75.75 0 01-.75-.75zm3.75 3.75h2.5v-3h-2.5v3zm4 0h2.5v-3h-2.5v3z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
