import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZoomIn24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M10.75 6.5a.75.75 0 01.75.75V10h2.75a.75.75 0 010 1.5H11.5v2.75a.75.75 0 01-1.5 0V11.5H7.25a.75.75 0 010-1.5H10V7.25a.75.75 0 01.75-.75z" />
                    <path
                        fillRule="evenodd"
                        d="M10.75 2a8.75 8.75 0 105.634 15.445l4.336 4.335a.75.75 0 101.06-1.06l-4.335-4.336A8.75 8.75 0 0010.75 2zM3.5 10.75a7.25 7.25 0 1114.5 0 7.25 7.25 0 01-14.5 0z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
