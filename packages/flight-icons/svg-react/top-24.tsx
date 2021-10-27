import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconTop24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M3.5 3.5a.75.75 0 010-1.5H20a.75.75 0 010 1.5H3.5zM4.98 13.79a.75.75 0 001.06-.02L11 8.612V21.25a.75.75 0 001.5 0V8.612l4.96 5.158a.75.75 0 101.08-1.04l-6.25-6.5a.75.75 0 00-1.08 0l-6.25 6.5a.75.75 0 00.02 1.06z" />
                </g>
            </svg>
        );
    }
);
