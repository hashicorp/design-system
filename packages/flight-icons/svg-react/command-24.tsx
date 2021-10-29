import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCommand24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = title
            ? 'title-' + Math.random().toString(36).substr(2, 9)
            : undefined;
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M9.5 5.75V8h5V5.75a3.75 3.75 0 113.75 3.75H16v5h2.25a3.75 3.75 0 11-3.75 3.75V16h-5v2.25a3.75 3.75 0 11-3.75-3.75H8v-5H5.75A3.75 3.75 0 119.5 5.75zM5.75 3.5a2.25 2.25 0 000 4.5H8V5.75A2.25 2.25 0 005.75 3.5zM16 16v2.25A2.25 2.25 0 1018.25 16H16zm-1.5-1.5v-5h-5v5h5zM5.75 16H8v2.25A2.25 2.25 0 115.75 16zM16 8h2.25A2.25 2.25 0 1016 5.75V8z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
