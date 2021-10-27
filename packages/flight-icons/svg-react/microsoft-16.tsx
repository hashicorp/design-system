import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMicrosoft16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M1 1h6.5v6.5H1V1zM8.5 1H15v6.5H8.5V1zM1 8.5h6.5V15H1V8.5zM8.5 8.5H15V15H8.5V8.5z" />
                </g>
            </svg>
        );
    }
);
