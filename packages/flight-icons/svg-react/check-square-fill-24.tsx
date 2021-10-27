import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCheckSquareFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4.75 2A2.75 2.75 0 002 4.75v14.5A2.75 2.75 0 004.75 22h14.5A2.75 2.75 0 0022 19.25V4.75A2.75 2.75 0 0019.25 2H4.75zm11.97 6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l2.47 2.47 6.97-6.97z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
