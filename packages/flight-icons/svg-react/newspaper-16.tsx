import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNewspaper16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.25 0a2.25 2.25 0 0 1 2.25 2.25v11.5A2.25 2.25 0 0 1 13.25 16H2.75A2.25 2.25 0 0 1 .5 13.75v-8A2.25 2.25 0 0 1 2.75 3.5h.75V2.25A2.25 2.25 0 0 1 5.75 0zM2.75 5a.75.75 0 0 0-.75.75v8a.75.75 0 0 0 1.5 0V5zm3-3.5a.75.75 0 0 0-.75.75v11.5q-.002.396-.128.75h8.378a.75.75 0 0 0 .75-.75V2.25a.75.75 0 0 0-.75-.75zM9.25 12a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5zm2-2.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5zm.5-7c.69 0 1.25.56 1.25 1.25v3.5c0 .69-.56 1.25-1.25 1.25h-4.5C6.56 8.5 6 7.94 6 7.25v-3.5c0-.69.56-1.25 1.25-1.25zM7.5 7h4V4h-4z"
                />
            </svg>
        );
    }
);
