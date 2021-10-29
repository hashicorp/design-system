import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCaret16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path d="M8.55 2.24a.75.75 0 00-1.1 0L4.2 5.74a.75.75 0 101.1 1.02L8 3.852l2.7 2.908a.75.75 0 101.1-1.02l-3.25-3.5zM7.45 13.76a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02L8 12.148 5.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5z" />
                </g>
            </svg>
        );
    }
);
