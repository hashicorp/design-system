import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAlignCenter16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M1.75 3a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H1.75zM3.75 6a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM1 9.75A.75.75 0 011.75 9h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 9.75zM3.75 12a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z" />
                </g>
            </svg>
        );
    }
);
