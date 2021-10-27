import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconVolume24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M10.5 6.075a.25.25 0 00-.422-.182l-3.3 3.127a1.75 1.75 0 01-1.204.48H2.75a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h2.824c.448 0 .878.171 1.203.48l3.301 3.127a.25.25 0 00.422-.182V6.075zm-1.454-1.27C10.162 3.747 12 4.537 12 6.074v11.85c0 1.536-1.838 2.327-2.954 1.27l-3.3-3.127A.25.25 0 005.574 16H2.75A1.75 1.75 0 011 14.25v-4.5C1 8.783 1.784 8 2.75 8h2.824a.25.25 0 00.172-.069l3.3-3.127z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
