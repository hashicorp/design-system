import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCollections24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.25 2c.854 0 1.617.39 2.121 1h.879c.854 0 1.617.39 2.121 1h.879A2.75 2.75 0 0123 6.75v10.5A2.75 2.75 0 0120.25 20h-.879c-.504.61-1.267 1-2.121 1h-.879c-.504.61-1.267 1-2.121 1H3.75A2.75 2.75 0 011 19.25V4.75A2.75 2.75 0 013.75 2h10.5zM3.75 3.5c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25H3.75zM17 4.75v14.5c0 .084-.003.168-.01.25h.26c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25h-.26c.007.082.01.166.01.25zm3 1v12.5c0 .084-.003.168-.01.25h.26c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25h-.26c.007.082.01.166.01.25zM10.25 9a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5h4.5zm2-3a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h6.5z"
                />
            </svg>
        );
    }
);
