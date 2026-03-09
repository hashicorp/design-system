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
                    d="M10.559 1.007a2.75 2.75 0 012.882 0l7.75 4.768c.812.5 1.309 1.389 1.31 2.343v7.765c-.001.954-.498 1.841-1.31 2.342l-7.75 4.77a2.752 2.752 0 01-2.882 0l-7.75-4.77A2.752 2.752 0 011.5 15.883V8.118c0-.954.496-1.842 1.309-2.343l7.75-4.768zm2.096 1.277a1.251 1.251 0 00-1.31 0l-7.75 4.769c-.37.227-.594.632-.595 1.065v7.765c0 .433.226.837.595 1.064l7.75 4.77c.401.246.908.246 1.31 0l7.75-4.77c.369-.227.595-.63.595-1.064V8.118c0-.433-.226-.838-.595-1.065l-7.75-4.769z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
