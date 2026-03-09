import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMainframe24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.25 1A2.75 2.75 0 0120 3.75v16.5A2.75 2.75 0 0117.25 23H6.75A2.75 2.75 0 014 20.25V3.75A2.75 2.75 0 016.75 1h10.5zM6.75 2.5c-.69 0-1.25.56-1.25 1.25v16.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V3.75c0-.69-.56-1.25-1.25-1.25H6.75zm8.25 11a.75.75 0 010 1.5H9a.75.75 0 010-1.5h6zm0-4a.75.75 0 010 1.5H9a.75.75 0 010-1.5h6zm0-4A.75.75 0 0115 7H9a.75.75 0 010-1.5h6z"
                />
            </svg>
        );
    }
);
