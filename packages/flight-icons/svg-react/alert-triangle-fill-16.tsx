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
                    d="M8 1a2.146 2.146 0 011.83 1.028l5.883 9.774a2.127 2.127 0 01-.768 2.904c-.321.188-.687.29-1.06.294H2.116A2.146 2.146 0 01.28 13.926a2.126 2.126 0 01.012-2.134l5.88-9.768A2.136 2.136 0 018 1zm0 9a1 1 0 000 2h.007a1 1 0 000-2H8zm0-5a.75.75 0 00-.75.75v2.5a.75.75 0 001.5 0v-2.5A.75.75 0 008 5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
