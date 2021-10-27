import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMicrosoft24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M3 3h8.5v8.5H3V3zM12.5 3H21v8.5h-8.5V3zM3 12.5h8.5V21H3v-8.5zM12.5 12.5H21V21h-8.5v-8.5z" />
                </g>
            </svg>
        );
    }
);
