import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconXCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M11.28 4.72a.75.75 0 010 1.06L9.06 8l2.22 2.22a.75.75 0 11-1.06 1.06L8 9.06l-2.22 2.22a.75.75 0 01-1.06-1.06L6.94 8 4.72 5.78a.75.75 0 011.06-1.06L8 6.94l2.22-2.22a.75.75 0 011.06 0z" />
                    <path
                        fillRule="evenodd"
                        d="M.25 8a7.75 7.75 0 1115.5 0A7.75 7.75 0 01.25 8zM8 1.75a6.25 6.25 0 100 12.5 6.25 6.25 0 000-12.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
