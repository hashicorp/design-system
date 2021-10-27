import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBarChartAlt16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8 2a1 1 0 011 1v10a1 1 0 11-2 0V3a1 1 0 011-1zM12 6a1 1 0 011 1v6a1 1 0 11-2 0V7a1 1 0 011-1zM5 9a1 1 0 00-2 0v4a1 1 0 102 0V9z" />
                </g>
            </svg>
        );
    }
);
