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
                    d="M20.25 7A2.75 2.75 0 0 1 23 9.75v10.5A2.75 2.75 0 0 1 20.25 23H9.75A2.75 2.75 0 0 1 7 20.25V9.75A2.75 2.75 0 0 1 9.75 7zM9.75 8.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V9.75c0-.69-.56-1.25-1.25-1.25zm4.5-7.5A2.75 2.75 0 0 1 17 3.75v1a.75.75 0 0 1-1.5 0v-1c0-.69-.56-1.25-1.25-1.25H3.75c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h1a.75.75 0 0 1 0 1.5h-1A2.75 2.75 0 0 1 1 14.25V3.75A2.75 2.75 0 0 1 3.75 1z"
                />
            </svg>
        );
    }
);
