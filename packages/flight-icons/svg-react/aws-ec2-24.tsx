import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAwsEc224 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M10.002.991l1.995-.99L22 4.97v14.058L11.997 24l-1.995-.99V.99zM8.257 1.857l-1.543.767v18.752l1.543.767V1.857zM4.11 3.918L5.34 3.31v17.382l-1.232-.61V3.919zM3 4.471v15.058l-1-.497V4.968l1-.497z" />
                </g>
            </svg>
        );
    }
);
