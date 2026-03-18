import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAlertTriangle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 1a2.15 2.15 0 0 1 1.827 1.024l.002.004 5.884 9.774a2.127 2.127 0 0 1-.768 2.904c-.321.188-.687.29-1.06.294H2.116A2.15 2.15 0 0 1 .28 13.926a2.13 2.13 0 0 1 .006-2.124l.006-.01 5.878-9.764.002-.004A2.14 2.14 0 0 1 8 1m0 1.5a.65.65 0 0 0-.545.304L1.581 12.56a.626.626 0 0 0 .23.852.65.65 0 0 0 .316.088h11.744a.636.636 0 0 0 .628-.633.6.6 0 0 0-.082-.307L8.546 2.805l-.001-.001A.64.64 0 0 0 8 2.5m.007 7.5a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zM8 5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 5"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
