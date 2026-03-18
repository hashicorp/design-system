import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTerminalScreen24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.25 2A2.75 2.75 0 0 1 23 4.75v14.5A2.75 2.75 0 0 1 20.25 22H3.75A2.75 2.75 0 0 1 1 19.25V4.75A2.75 2.75 0 0 1 3.75 2zM3.75 3.5c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25zM17.25 16a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5zM6.174 7.27a.75.75 0 0 1 1.056-.096l4.5 3.75a.75.75 0 0 1 0 1.152l-4.5 3.75a.75.75 0 0 1-.96-1.152l3.808-3.174L6.27 8.326a.75.75 0 0 1-.096-1.056"
                />
            </svg>
        );
    }
);
