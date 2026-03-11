import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDuplicate16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 4A2.25 2.25 0 0116 6.25v7.5A2.25 2.25 0 0113.75 16h-7.5A2.25 2.25 0 014 13.75v-7.5A2.25 2.25 0 016.25 4h7.5zm-7.5 1.5a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75v-7.5a.75.75 0 00-.75-.75h-7.5zM9.75 0A2.25 2.25 0 0112 2.25v.25a.75.75 0 01-1.5 0v-.25a.75.75 0 00-.75-.75h-7.5a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h.25a.75.75 0 010 1.5h-.25A2.25 2.25 0 010 9.75v-7.5A2.25 2.25 0 012.25 0h7.5z"
                />
            </svg>
        );
    }
);
