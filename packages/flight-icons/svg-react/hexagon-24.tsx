import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHexagon24 = forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', title, ...props }, svgRef) => {
        const titleId = useMemo(
            () =>
                title
                    ? 'title-' + Math.random().toString(36).substr(2, 9)
                    : undefined,
            [title]
        );
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
                    d="M10.559 1.006a2.75 2.75 0 012.882 0l7.75 4.77A2.75 2.75 0 0122.5 8.118v7.764a2.75 2.75 0 01-1.309 2.342l-7.75 4.77a2.75 2.75 0 01-2.882 0l-7.75-4.77A2.75 2.75 0 011.5 15.882V8.118a2.75 2.75 0 011.309-2.342l7.75-4.77zm2.096 1.278a1.25 1.25 0 00-1.31 0l-7.75 4.77A1.25 1.25 0 003 8.117v7.764c0 .435.225.838.595 1.065l7.75 4.77a1.25 1.25 0 001.31 0l7.75-4.77c.37-.227.595-.63.595-1.065V8.118a1.25 1.25 0 00-.595-1.065l-7.75-4.77z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
