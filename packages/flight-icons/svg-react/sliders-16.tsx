import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSliders16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path d="M2.75 1a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 012.75 1zM2 10.5v3.75a.75.75 0 001.5 0V10.5h1a.75.75 0 000-1.5H1a.75.75 0 000 1.5h1zM8.5 7.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5zM7.75 1a.75.75 0 01.75.75V4.5h1a.75.75 0 010 1.5H6a.75.75 0 010-1.5h1V1.75A.75.75 0 017.75 1zM14.5 10a.75.75 0 010 1.5h-1v2.75a.75.75 0 01-1.5 0V11.5h-1a.75.75 0 010-1.5h3.5zM12.75 1a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5a.75.75 0 01.75-.75z" />
                </g>
            </svg>
        );
    }
);
