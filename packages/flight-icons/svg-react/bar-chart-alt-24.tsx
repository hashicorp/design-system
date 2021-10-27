import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBarChartAlt24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M12 3a1 1 0 011 1v16a1 1 0 11-2 0V4a1 1 0 011-1zM18 9a1 1 0 011 1v10a1 1 0 11-2 0V10a1 1 0 011-1zM7 14a1 1 0 10-2 0v6a1 1 0 102 0v-6z" />
                </g>
            </svg>
        );
    }
);
