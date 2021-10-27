import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconUsers24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path
                        fillRule="evenodd"
                        d="M9 3a5 5 0 100 10A5 5 0 009 3zM5.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                        clipRule="evenodd"
                    />
                    <path d="M4.75 14.5A4.75 4.75 0 000 19.25v1a.75.75 0 001.5 0v-1A3.25 3.25 0 014.75 16h8.5a3.25 3.25 0 013.25 3.25v1a.75.75 0 001.5 0v-1a4.75 4.75 0 00-4.75-4.75h-8.5zM18.25 15.25a.75.75 0 01.75-.75h.25A4.75 4.75 0 0124 19.25v1a.75.75 0 01-1.5 0v-1A3.25 3.25 0 0019.25 16H19a.75.75 0 01-.75-.75zM15 3a.75.75 0 000 1.5 3.5 3.5 0 110 7 .75.75 0 000 1.5 5 5 0 000-10z" />
                </g>
            </svg>
        );
    }
);
