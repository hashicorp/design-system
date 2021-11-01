import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconQueue24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M3.19 3.892a.75.75 0 10-.88 1.216L5.97 7.75l-3.66 2.642a.75.75 0 00.88 1.216l4.5-3.25a.75.75 0 000-1.216l-4.5-3.25zM11.75 7a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zM8 12.75a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75zM8.75 17a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H8.75z" />
                </g>
            </svg>
        );
    }
);
