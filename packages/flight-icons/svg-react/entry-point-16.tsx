import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconEntryPoint16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8 2.5a5.494 5.494 0 00-4.558 2.42.75.75 0 01-1.242-.84 7 7 0 110 7.841.75.75 0 111.242-.841A5.5 5.5 0 108 2.5z" />
                    <path d="M7.245 4.695a.75.75 0 00-.05 1.06l1.36 1.495H1.75a.75.75 0 000 1.5h6.805l-1.36 1.495a.75.75 0 001.11 1.01l2.5-2.75a.75.75 0 000-1.01l-2.5-2.75a.75.75 0 00-1.06-.05z" />
                </g>
            </svg>
        );
    }
);
