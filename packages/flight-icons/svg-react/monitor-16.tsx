import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconMonitor16 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
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
                    d="M0 3.25A2.25 2.25 0 012.25 1h11.5A2.25 2.25 0 0116 3.25v6.5A2.25 2.25 0 0113.75 12H8.5v1.5H11a.75.75 0 010 1.5H5a.75.75 0 010-1.5h2V12H2.25A2.25 2.25 0 010 9.75v-6.5zm13.75 7.25a.75.75 0 00.75-.75v-6.5a.75.75 0 00-.75-.75H2.25a.75.75 0 00-.75.75v6.5c0 .414.336.75.75.75h11.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
