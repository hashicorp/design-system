import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconSliders24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M3.75 2.5a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75zM3 14.5v6.25a.75.75 0 001.5 0V14.5h2a.75.75 0 000-1.5H1a.75.75 0 000 1.5h2zM12.5 11.75a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9zM11.75 2.5a.75.75 0 01.75.75V7.5h2a.75.75 0 010 1.5H9a.75.75 0 010-1.5h2V3.25a.75.75 0 01.75-.75zM22.5 15a.75.75 0 010 1.5h-2v4.25a.75.75 0 01-1.5 0V16.5h-2a.75.75 0 010-1.5h5.5zM19.75 2.5a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0v-9a.75.75 0 01.75-.75z" />
                </g>
            </svg>
        );
    }
);
