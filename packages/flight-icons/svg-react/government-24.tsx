import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGovernment24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M13.25 1a2 2 0 00-2 2v2.041a6.751 6.751 0 00-6 6.709.75.75 0 001.5 0 5.25 5.25 0 1110.5 0 .75.75 0 001.5 0 6.751 6.751 0 00-6-6.709V3a.5.5 0 01.5-.5h2.25a.75.75 0 000-1.5h-2.25z" />
                    <path
                        fillRule="evenodd"
                        d="M2 14.75a.75.75 0 01.75-.75h18.5a.75.75 0 010 1.5h-2.5v6h2.5a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5h2.5v-6h-2.5a.75.75 0 01-.75-.75zm4.75 6.75h2.5v-6h-2.5v6zm6.5 0v-6h-2.5v6h2.5zm1.5 0h2.5v-6h-2.5v6z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
