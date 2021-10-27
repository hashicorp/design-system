import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSignIn16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M9.5 1.75a.75.75 0 01.75-.75h2.5A2.25 2.25 0 0115 3.25v9.5A2.25 2.25 0 0112.75 15h-2.5a.75.75 0 010-1.5h2.5a.75.75 0 00.75-.75v-9.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 01-.75-.75z" />
                    <path d="M5.97 3.72a.75.75 0 011.06 0l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06-1.06L8.19 8.5H2A.75.75 0 012 7h6.19L5.97 4.78a.75.75 0 010-1.06z" />
                </g>
            </svg>
        );
    }
);
