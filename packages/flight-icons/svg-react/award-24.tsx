import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAward24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1a8 8 0 00-4.751 14.437l-1.236 6.676a.75.75 0 001.004.838L12 21.053l4.983 1.898a.75.75 0 001.005-.838l-1.237-6.676A8 8 0 0012 1zM5.5 9a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zm9.877 7.254A7.97 7.97 0 0112 17a7.97 7.97 0 01-3.377-.746l-.892 4.82 4.002-1.525a.75.75 0 01.534 0l4.003 1.525-.893-4.82z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
