import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDuplicate24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.25 7A2.75 2.75 0 0123 9.75v10.5A2.75 2.75 0 0120.25 23H9.75A2.75 2.75 0 017 20.25V9.75A2.75 2.75 0 019.75 7h10.5zM9.75 8.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V9.75c0-.69-.56-1.25-1.25-1.25H9.75zm4.5-7.5A2.75 2.75 0 0117 3.75v1a.75.75 0 01-1.5 0v-1c0-.69-.56-1.25-1.25-1.25H3.75c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h1a.75.75 0 010 1.5h-1A2.75 2.75 0 011 14.25V3.75A2.75 2.75 0 013.75 1h10.5z"
                />
            </svg>
        );
    }
);
