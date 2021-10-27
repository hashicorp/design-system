import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCrosshair16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8.75 6.457V12.75a.75.75 0 00-1.5 0v1.707A6.503 6.503 0 011.543 8.75H3.25a.75.75 0 000-1.5H1.543A6.503 6.503 0 017.25 1.543V3.25a.75.75 0 001.5 0V1.543a6.503 6.503 0 015.707 5.707H12.75a.75.75 0 000 1.5h1.707a6.503 6.503 0 01-5.707 5.707z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
