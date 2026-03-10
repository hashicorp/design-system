import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconEvent24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M16.25 1.25A.75.75 0 0117 2v1h2.25A2.75 2.75 0 0122 5.75v14.5A2.75 2.75 0 0119.25 23H4.75A2.75 2.75 0 012 20.25V5.75A2.75 2.75 0 014.75 3H7V2a.75.75 0 011.5 0v1h7V2a.75.75 0 01.75-.75zM4.75 4.5c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25H17V6a.75.75 0 01-1.5 0V4.5h-7V6A.75.75 0 017 6V4.5H4.75zM12 7.25a.75.75 0 01.673.418l1.524 3.09 3.411.499a.75.75 0 01.415 1.28l-2.467 2.402.583 3.395a.75.75 0 01-1.09.791L12 17.52l-3.05 1.605a.75.75 0 01-1.089-.791l.583-3.394-2.467-2.404a.75.75 0 01.415-1.28l3.41-.498 1.525-3.09A.75.75 0 0112 7.25zm-1.027 4.525a.75.75 0 01-.564.41l-2.298.335 1.662 1.62a.75.75 0 01.216.664l-.392 2.286 2.054-1.08a.75.75 0 01.698 0l2.054 1.08-.392-2.286a.75.75 0 01.216-.664l1.662-1.62-2.298-.335a.75.75 0 01-.564-.41L12 9.695l-1.027 2.08z"
                />
            </svg>
        );
    }
);
