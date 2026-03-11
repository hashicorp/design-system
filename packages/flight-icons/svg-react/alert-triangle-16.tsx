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
                    d="M8 1a2.146 2.146 0 011.827 1.024l.002.004 5.884 9.774a2.127 2.127 0 01-.768 2.904c-.321.188-.687.29-1.06.294H2.116A2.146 2.146 0 01.28 13.926a2.126 2.126 0 01.006-2.124l.006-.01 5.878-9.764.002-.004A2.136 2.136 0 018 1zm0 1.5a.645.645 0 00-.545.304L1.581 12.56a.626.626 0 00.23.852.647.647 0 00.316.088h11.744a.636.636 0 00.628-.633.625.625 0 00-.082-.307L8.546 2.805l-.001-.001A.635.635 0 008 2.5zm.007 7.5a1 1 0 010 2H8a1 1 0 010-2h.007zM8 5a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 018 5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
