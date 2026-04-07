import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlertTriangleFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 1a2.15 2.15 0 0 1 1.83 1.028l5.883 9.773a2.13 2.13 0 0 1-.768 2.905c-.321.188-.687.29-1.06.293H2.116a2.15 2.15 0 0 1-1.833-1.074 2.13 2.13 0 0 1 .011-2.133l5.88-9.768A2.14 2.14 0 0 1 8 1m0 9a1 1 0 0 0 0 2h.007a1 1 0 0 0 0-2zm0-5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8 5"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
