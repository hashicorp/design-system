import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconToggleRight24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M16 8a4 4 0 110 8 4 4 0 010-8zm2.5 4a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z" />
                    <path d="M16 5a7 7 0 110 14H8A7 7 0 118 5h8zm5.5 7A5.5 5.5 0 0016 6.5H8a5.5 5.5 0 100 11h8a5.5 5.5 0 005.5-5.5z" />
                </g>
            </svg>
        );
    }
);
