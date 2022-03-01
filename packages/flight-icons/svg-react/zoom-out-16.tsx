import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconZoomOut16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M4.75 6.5a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z" />
                    <path
                        fillRule="evenodd"
                        d="M1 7.25a6.25 6.25 0 1111.168 3.857l2.612 2.613a.75.75 0 11-1.06 1.06l-2.613-2.612A6.25 6.25 0 011 7.25zM7.25 2.5a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5z"
                        clipRule="evenodd"
                    />
                </g>
            </svg>
        );
    }
);
