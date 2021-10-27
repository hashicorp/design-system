import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconClock16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M8.5 3.75a.75.75 0 00-1.5 0V8c0 .284.16.544.415.67l2.5 1.25a.75.75 0 10.67-1.34L8.5 7.535V3.75z" />
                    <path
                        fillRule="evenodd"
                        d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
