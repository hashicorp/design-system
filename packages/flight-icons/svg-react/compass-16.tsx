import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCompass16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13m3.028 2.586a.701.701 0 0 1 .886.886l-1.625 4.875a.7.7 0 0 1-.443.442l-4.874 1.625a.701.701 0 0 1-.886-.886L5.71 6.154a.7.7 0 0 1 .442-.443zm-4.1 2.843-1.072 3.215L9.071 9.07l1.072-3.214z"
                />
            </svg>
        );
    }
);
