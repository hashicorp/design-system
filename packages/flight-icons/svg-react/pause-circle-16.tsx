import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconPauseCircle16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M6.25 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 016.25 5zM10.5 5.75a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z" />
                    <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
