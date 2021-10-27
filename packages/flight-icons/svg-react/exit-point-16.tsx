import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconExitPoint16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M1 8a6 6 0 018.514-5.45.75.75 0 01-.629 1.363 4.5 4.5 0 100 8.175.75.75 0 11.63 1.361A6 6 0 011 8z" />
                    <path d="M11.245 4.695a.75.75 0 00-.05 1.06l1.36 1.495H6.75a.75.75 0 000 1.5h5.805l-1.36 1.495a.75.75 0 001.11 1.01l2.5-2.75a.748.748 0 00-.002-1.012l-2.498-2.748a.75.75 0 00-1.06-.05z" />
                </g>
            </svg>
        );
    }
);
