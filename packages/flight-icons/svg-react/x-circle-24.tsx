import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconXCircle24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M16.78 7.22a.75.75 0 010 1.06L13.06 12l3.72 3.72a.75.75 0 11-1.06 1.06L12 13.06l-3.72 3.72a.75.75 0 01-1.06-1.06L10.94 12 7.22 8.28a.75.75 0 011.06-1.06L12 10.94l3.72-3.72a.75.75 0 011.06 0z" />
                    <path
                        fillRule="evenodd"
                        d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12zM12 2.75a9.25 9.25 0 100 18.5 9.25 9.25 0 000-18.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
