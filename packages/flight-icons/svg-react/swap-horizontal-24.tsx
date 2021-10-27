import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSwapHorizontal24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M18.265 5.455a.75.75 0 00-1.03 1.09L20.364 9.5H11.75a.75.75 0 000 1.5h8.614l-3.129 2.955a.75.75 0 001.03 1.09l4.5-4.25a.75.75 0 000-1.09l-4.5-4.25zM3.636 13l3.129-2.955a.75.75 0 00-1.03-1.09l-4.5 4.25a.75.75 0 000 1.09l4.5 4.25a.75.75 0 001.03-1.09L3.636 14.5h8.614a.75.75 0 000-1.5H3.636z" />
                </g>
            </svg>
        );
    }
);
