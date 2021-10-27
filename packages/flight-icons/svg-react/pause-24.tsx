import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconPause24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M9 5.25a.75.75 0 00-1.5 0v13.5a.75.75 0 001.5 0V5.25zM16.5 5.25a.75.75 0 00-1.5 0v13.5a.75.75 0 001.5 0V5.25z" />
                </g>
            </svg>
        );
    }
);
