import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconTrendUp24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M24 12.25a.75.75 0 01-1.5 0V7.56l-8.22 8.22a.75.75 0 01-1.005.05L8.3 11.76l-7.02 7.02a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.005-.05l4.975 4.07 7.74-7.74h-4.69a.75.75 0 010-1.5h6.5a.75.75 0 01.75.75v6.5z"
                />
            </svg>
        );
    }
);
