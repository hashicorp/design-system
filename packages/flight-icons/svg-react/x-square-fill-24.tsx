import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconXSquareFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M2 4.806A2.806 2.806 0 014.806 2h14.388A2.806 2.806 0 0122 4.806v14.388A2.806 2.806 0 0119.194 22H4.806A2.806 2.806 0 012 19.194V4.806zM8.28 7.22a.75.75 0 00-1.06 1.06L10.94 12l-3.72 3.72a.75.75 0 101.06 1.06L12 13.06l3.72 3.72a.75.75 0 101.06-1.06L13.06 12l3.72-3.72a.75.75 0 00-1.06-1.06L12 10.94 8.28 7.22z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
