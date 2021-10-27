import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBottom24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path d="M11.75 2a.75.75 0 01.75.75v12.638l4.96-5.158a.75.75 0 111.08 1.04l-6.25 6.5a.75.75 0 01-1.08 0l-6.25-6.5a.75.75 0 111.08-1.04L11 15.388V2.75a.75.75 0 01.75-.75zM3.5 20.5a.75.75 0 000 1.5H20a.75.75 0 000-1.5H3.5z" />
                </g>
            </svg>
        );
    }
);
