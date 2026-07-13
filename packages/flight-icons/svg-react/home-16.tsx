import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHome16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M6.92 1.395a1.75 1.75 0 0 1 2.16 0l5.25 4.119c.42.332.67.841.67 1.377v7.36a.755.755 0 0 1-.75.75.75.75 0 0 1-.75-.75V6.89a.26.26 0 0 0-.096-.197l-5.25-4.12a.254.254 0 0 0-.308 0l-5.25 4.12a.25.25 0 0 0-.096.197v7.36a.755.755 0 0 1-.75.75.75.75 0 0 1-.75-.75V6.89c0-.537.247-1.045.67-1.377zM9.75 9c.688.002 1.25.562 1.25 1.25v4a.755.755 0 0 1-.75.75.75.75 0 0 1-.75-.75V10.5h-3v3.75a.755.755 0 0 1-.75.75.75.75 0 0 1-.75-.75v-4C5 9.56 5.56 9 6.25 9z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
