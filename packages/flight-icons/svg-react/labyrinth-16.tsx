import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLabyrinth16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 1.5a6.5 6.5 0 0 0-6.392 5.317.75.75 0 1 1-1.476-.27 8 8 0 1 1 0 2.907.75.75 0 0 1 1.476-.272A6.502 6.502 0 0 0 14.48 8.5h-1.555a4.95 4.95 0 1 1-6.34-5.231.7.7 0 1 1 .4 1.342A3.56 3.56 0 0 0 4.595 7h1.167a2.45 2.45 0 1 1 3.87 2.826.7.7 0 0 1-.933-1.043 1.05 1.05 0 1 0-1.4 0 .7.7 0 0 1-.934 1.043A2.45 2.45 0 0 1 5.601 8.5H4.483a3.55 3.55 0 1 0 4.531-3.89.7.7 0 0 1 .4-1.341 4.96 4.96 0 0 1 3.432 3.73h1.578A6.5 6.5 0 0 0 8 1.5"
                />
            </svg>
        );
    }
);
