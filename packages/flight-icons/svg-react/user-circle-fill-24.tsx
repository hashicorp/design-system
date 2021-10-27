import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconUserCircleFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M.25 12C.25 5.51 5.51.25 12 .25S23.75 5.51 23.75 12 18.49 23.75 12 23.75.25 18.49.25 12zM4 18a4 4 0 014-4h8a4 4 0 014 4v.25a.75.75 0 01-1.5 0V18a2.5 2.5 0 00-2.5-2.5H8A2.5 2.5 0 005.5 18v.25a.75.75 0 01-1.5 0V18zM9 8a3 3 0 116 0 3 3 0 01-6 0zm3-4.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
