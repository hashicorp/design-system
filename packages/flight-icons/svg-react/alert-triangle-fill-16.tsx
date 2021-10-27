import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconAlertTriangleFill16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 16 16"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M8 1a2.143 2.143 0 00-1.827 1.024l-5.88 9.768a2.125 2.125 0 00.762 2.915c.322.188.687.289 1.06.293h11.77a2.143 2.143 0 001.834-1.074 2.126 2.126 0 00-.006-2.124L9.829 2.028A2.149 2.149 0 008 1zM7 11a1 1 0 011-1h.007a1 1 0 110 2H8a1 1 0 01-1-1zm1.75-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
