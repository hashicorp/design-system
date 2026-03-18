import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconWall24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.25 2A2.75 2.75 0 0 1 23 4.75v14.5A2.75 2.75 0 0 1 20.25 22H3.75A2.75 2.75 0 0 1 1 19.25V4.75A2.75 2.75 0 0 1 3.75 2zM2.5 19.25c0 .69.56 1.25 1.25 1.25H6.5V16h-4zM8 20.5h8V16H8zm9.5 0h2.75c.69 0 1.25-.56 1.25-1.25V16h-4zm-15-6H11v-5H2.5zm10 0h9v-5h-9zm-8.75-11c-.69 0-1.25.56-1.25 1.25V8h4V3.5zM8 8h8V3.5H8zm9.5 0h4V4.75c0-.69-.56-1.25-1.25-1.25H17.5z"
                />
            </svg>
        );
    }
);
