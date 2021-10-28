import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconChevronsDown24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M7.293 5.232a.75.75 0 00-1.086 1.036l5.25 5.5a.75.75 0 001.085 0l5.25-5.5a.75.75 0 10-1.085-1.036L12 10.164 7.293 5.232z" />
                    <path d="M7.293 12.232a.75.75 0 00-1.086 1.036l5.25 5.5a.75.75 0 001.085 0l5.25-5.5a.75.75 0 00-1.085-1.036L12 17.164l-4.707-4.932z" />
                </g>
            </svg>
        );
    }
);
