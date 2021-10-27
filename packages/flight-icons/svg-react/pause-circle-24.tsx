import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconPauseCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M9.25 7a.75.75 0 01.75.75v8.5a.75.75 0 01-1.5 0v-8.5A.75.75 0 019.25 7zM15.5 7.75a.75.75 0 00-1.5 0v8.5a.75.75 0 001.5 0v-8.5z" />
                    <path
                        fillRule="evenodd"
                        d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-9.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
