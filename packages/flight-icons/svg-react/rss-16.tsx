import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconRss16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M2.75 1a.75.75 0 000 1.5A10.75 10.75 0 0113.5 13.25a.75.75 0 001.5 0A12.25 12.25 0 002.75 1z" />
                    <path d="M2.75 6a.75.75 0 000 1.5 5.75 5.75 0 015.75 5.75.75.75 0 001.5 0A7.25 7.25 0 002.75 6zM3.5 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </g>
            </svg>
        );
    }
);
