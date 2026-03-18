import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOutline24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M18.25 1A2.75 2.75 0 0 1 21 3.75v16.5A2.75 2.75 0 0 1 18.25 23H5.75A2.75 2.75 0 0 1 3 20.25V3.75A2.75 2.75 0 0 1 5.75 1zM5.75 2.5c-.69 0-1.25.56-1.25 1.25v16.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V3.75c0-.69-.56-1.25-1.25-1.25zM7.26 17a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1 0-1.5zm6.49 0a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5zm-6.49-4a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1 0-1.5zm9.49 0a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5zM7.26 9a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1 0-1.5zm7.49 0a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5zM7.26 5a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1 0-1.5zm9.49 0a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5z"
                />
            </svg>
        );
    }
);
