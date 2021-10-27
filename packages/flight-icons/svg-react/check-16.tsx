import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCheck16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    d="M14.78 4.28a.75.75 0 00-1.06-1.06l-7.97 7.97-3.47-3.47a.75.75 0 00-1.06 1.06l4 4a.75.75 0 001.06 0l8.5-8.5z"
                />
            </svg>
        );
    }
);
