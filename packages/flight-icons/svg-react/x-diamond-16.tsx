import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconXDiamond16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M10.78 5.22a.75.75 0 010 1.06L9.06 8l1.72 1.72a.75.75 0 11-1.06 1.06L8 9.06l-1.72 1.72a.75.75 0 11-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 011.06-1.06L8 6.94l1.72-1.72a.75.75 0 011.06 0z" />
                    <path
                        fillRule="evenodd"
                        d="M.75 6.41L6.407.753a2.25 2.25 0 013.182 0l5.657 5.657a2.25 2.25 0 010 3.182l-5.657 5.656a2.25 2.25 0 01-3.182 0L.75 9.592a2.25 2.25 0 010-3.182zm6.718-4.597L1.81 7.47a.75.75 0 000 1.06l5.657 5.658a.75.75 0 001.06 0l5.657-5.657a.75.75 0 000-1.06L8.528 1.812a.75.75 0 00-1.06 0z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
