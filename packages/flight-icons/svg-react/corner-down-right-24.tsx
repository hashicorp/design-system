import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCornerDownRight24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.25 3a.75.75 0 0 1 .75.75v7c0 .847.357 1.669 1.009 2.282A3.64 3.64 0 0 0 7.5 14h10.878l-4.146-3.957a.75.75 0 0 1 1.036-1.086l5.499 5.25a.75.75 0 0 1 .03 1.056l-.03.03-5.5 5.25a.75.75 0 0 1-1.035-1.086l4.146-3.957H7.5a5.14 5.14 0 0 1-3.52-1.375A4.64 4.64 0 0 1 2.5 10.75v-7A.75.75 0 0 1 3.25 3"
                />
            </svg>
        );
    }
);
