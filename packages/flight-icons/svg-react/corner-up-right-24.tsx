import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCornerUpRight24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.232 13.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.036 1.086L18.378 8.5H7.5c-1.312 0-2.579.49-3.52 1.375A4.634 4.634 0 002.5 13.25v7a.75.75 0 001.5 0v-7c0-.847.357-1.669 1.009-2.282A3.639 3.639 0 017.5 10h10.878l-4.146 3.957z"
                />
            </svg>
        );
    }
);
