import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCircleFill16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path fill={color} d="M8 0a8 8 0 100 16A8 8 0 008 0z" />
            </svg>
        );
    }
);
