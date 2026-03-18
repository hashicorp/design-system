import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconServer24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.25 13A2.75 2.75 0 0 1 23 15.75v4.5A2.75 2.75 0 0 1 20.25 23H3.75A2.75 2.75 0 0 1 1 20.25v-4.5A2.75 2.75 0 0 1 3.75 13zm-16.5 1.5c-.69 0-1.25.56-1.25 1.25v4.5c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25v-4.5c0-.69-.56-1.25-1.25-1.25zm2.5 2.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5zm14-16A2.75 2.75 0 0 1 23 3.75v4.5A2.75 2.75 0 0 1 20.25 11H3.75A2.75 2.75 0 0 1 1 8.25v-4.5A2.75 2.75 0 0 1 3.75 1zM3.75 2.5c-.69 0-1.25.56-1.25 1.25v4.5c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25v-4.5c0-.69-.56-1.25-1.25-1.25zM6.25 5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5z"
                />
            </svg>
        );
    }
);
