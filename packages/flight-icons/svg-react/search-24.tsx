import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSearch24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M10.5 2a8.5 8.5 0 105.457 15.017l4.763 4.763a.75.75 0 101.06-1.06l-4.763-4.763A8.5 8.5 0 0010.5 2zm-7 8.5a7 7 0 1114 0 7 7 0 01-14 0z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
