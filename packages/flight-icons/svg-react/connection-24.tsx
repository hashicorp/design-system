import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconConnection24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M1 11.75A3.5 3.5 0 017.92 11h8.16a3.501 3.501 0 016.92.75 3.5 3.5 0 01-6.92.75H7.92A3.501 3.501 0 011 11.75zm3.5-2a2 2 0 100 4 2 2 0 000-4zm15 0a2 2 0 100 4 2 2 0 000-4z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
