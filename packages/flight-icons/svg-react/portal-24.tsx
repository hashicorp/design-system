import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPortal24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M21.173 4.254A.75.75 0 0 1 22 5v14a.75.75 0 0 1-.827.746l-7.25-.75a.75.75 0 0 1 .154-1.492l6.423.664V5.831l-6.423.665a.75.75 0 0 1-.154-1.492z" />
                    <path d="M13.885 2.009a.75.75 0 0 1 .865.741v18.5a.75.75 0 0 1-.865.741l-11.25-1.75A.75.75 0 0 1 2 19.5v-15c0-.37.27-.684.635-.741zM3.5 5.142v13.715l9.75 1.517V3.625z" />
                </g>
            </svg>
        );
    }
);
