import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconPlus24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    d="M13 5a.75.75 0 00-1.5 0v6.5H5A.75.75 0 005 13h6.5v6.5a.75.75 0 001.5 0V13h6.5a.75.75 0 000-1.5H13V5z"
                />
            </svg>
        );
    }
);
