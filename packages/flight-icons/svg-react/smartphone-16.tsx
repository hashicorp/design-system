import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSmartphone16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.75 0A2.25 2.25 0 0114 2.25v11.5A2.25 2.25 0 0111.75 16h-7.5A2.25 2.25 0 012 13.75V2.25A2.25 2.25 0 014.25 0h7.5zm-7.5 1.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75V2.25a.75.75 0 00-.75-.75h-7.5zM8.007 12a1 1 0 010 2H8a1 1 0 110-2h.007z"
                />
            </svg>
        );
    }
);
