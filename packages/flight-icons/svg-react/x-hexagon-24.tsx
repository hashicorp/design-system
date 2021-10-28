import { forwardRef } from 'react';
import { IconProps } from './types';

export const IconXHexagon24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M15.78 8.22a.75.75 0 010 1.06L13.06 12l2.72 2.72a.75.75 0 11-1.06 1.06L12 13.06l-2.72 2.72a.75.75 0 01-1.06-1.06L10.94 12 8.22 9.28a.75.75 0 011.06-1.06L12 10.94l2.72-2.72a.75.75 0 011.06 0z" />
                    <path
                        fillRule="evenodd"
                        d="M10.559 1.006a2.75 2.75 0 012.882 0l7.75 4.77A2.75 2.75 0 0122.5 8.116v7.765a2.75 2.75 0 01-1.309 2.342l-7.75 4.77a2.75 2.75 0 01-2.882 0l-7.75-4.77A2.75 2.75 0 011.5 15.882V8.117a2.75 2.75 0 011.309-2.342l7.75-4.769zm2.096 1.278a1.25 1.25 0 00-1.31 0l-7.75 4.769A1.25 1.25 0 003 8.117v7.765c0 .434.225.837.595 1.065l7.75 4.769a1.25 1.25 0 001.31 0l7.75-4.77c.37-.227.595-.63.595-1.064V8.117a1.25 1.25 0 00-.595-1.064l-7.75-4.77z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
