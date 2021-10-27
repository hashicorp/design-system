import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconTerminal16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M3.23 3.174a.75.75 0 00-.96 1.152L6.078 7.5 2.27 10.674a.75.75 0 10.96 1.152l4.5-3.75a.75.75 0 000-1.152l-4.5-3.75zM7.75 12a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z" />
                </g>
            </svg>
        );
    }
);
