import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconQueue16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M2.23 2.674a.75.75 0 00-.96 1.152L3.578 5.75 1.27 7.674a.75.75 0 00.96 1.152l3-2.5a.75.75 0 000-1.152l-3-2.5zM8.25 5a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zM5.5 9.25a.75.75 0 01.75-.75h8a.75.75 0 010 1.5h-8a.75.75 0 01-.75-.75zM6.25 12a.75.75 0 000 1.5h8a.75.75 0 000-1.5h-8z" />
                </g>
            </svg>
        );
    }
);
