import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconRss24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M3.75 3a.75.75 0 000 1.5A15.75 15.75 0 0119.5 20.25a.75.75 0 001.5 0A17.25 17.25 0 003.75 3z" />
                    <path d="M3.75 10a.75.75 0 000 1.5 8.75 8.75 0 018.75 8.75.75.75 0 001.5 0A10.25 10.25 0 003.75 10zM5 17a2 2 0 100 4 2 2 0 000-4z" />
                </g>
            </svg>
        );
    }
);
