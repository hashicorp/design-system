import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconBarChart16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M12 2a1 1 0 011 1v10a1 1 0 11-2 0V3a1 1 0 011-1zM8 6a1 1 0 011 1v6a1 1 0 11-2 0V7a1 1 0 011-1zM5 10a1 1 0 00-2 0v3a1 1 0 102 0v-3z" />
                </g>
            </svg>
        );
    }
);
