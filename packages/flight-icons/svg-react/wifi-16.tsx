import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconWifi16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <g fill={color}>
                    <path d="M1.443 5.978a9.917 9.917 0 0113.114 0 .75.75 0 00.992-1.126 11.417 11.417 0 00-15.098 0 .75.75 0 10.992 1.126z" />
                    <path d="M3.813 8.525a6.583 6.583 0 018.427 0 .75.75 0 00.96-1.153 8.083 8.083 0 00-10.347 0 .75.75 0 00.96 1.153z" />
                    <path d="M8.003 10.5a3.25 3.25 0 00-1.882.6.75.75 0 01-.869-1.222 4.75 4.75 0 015.502 0 .75.75 0 11-.868 1.223 3.25 3.25 0 00-1.883-.601zM8 12a1 1 0 100 2h.007a1 1 0 100-2H8z" />
                </g>
            </svg>
        );
    }
);
