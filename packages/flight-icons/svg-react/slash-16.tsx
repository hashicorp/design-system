import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSlash16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M11.126 2.601a.75.75 0 00-1.025.273l-5.5 9.5a.75.75 0 001.298.752l5.5-9.5a.75.75 0 00-.273-1.025z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
