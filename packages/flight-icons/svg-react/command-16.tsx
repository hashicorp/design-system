import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconCommand16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.5 3.75V5h3V3.75a2.75 2.75 0 112.75 2.75H11v3h1.25a2.75 2.75 0 11-2.75 2.75V11h-3v1.25A2.75 2.75 0 113.75 9.5H5v-3H3.75A2.75 2.75 0 116.5 3.75zM3.75 2.5a1.25 1.25 0 100 2.5H5V3.75c0-.69-.56-1.25-1.25-1.25zM11 11v1.25A1.25 1.25 0 1012.25 11H11zM9.5 9.5v-3h-3v3h3zM3.75 11H5v1.25A1.25 1.25 0 113.75 11zM11 5h1.25A1.25 1.25 0 1011 3.75V5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
