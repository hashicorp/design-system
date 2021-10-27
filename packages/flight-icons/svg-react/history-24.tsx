import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconHistory24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M12 3.5c-2.347 0-4.471.95-6.01 2.49A8.55 8.55 0 005.125 7H8.25a.75.75 0 010 1.5h-4.5A.75.75 0 013 7.75v-4.5a.75.75 0 011.5 0v2.135A9.971 9.971 0 0112 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12a.75.75 0 011.5 0A8.5 8.5 0 1012 3.5z" />
                    <path d="M11.75 6a.75.75 0 01.75.75v5.787l4.085 2.042a.75.75 0 11-.67 1.342l-4.5-2.25A.75.75 0 0111 13V6.75a.75.75 0 01.75-.75z" />
                </g>
            </svg>
        );
    }
);
