import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLock24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1c1.58 0 3.102.597 4.23 1.67A5.634 5.634 0 0118 6.75v3.354c1.154.326 2 1.387 2 2.646v7.5A2.75 2.75 0 0117.25 23H6.75A2.75 2.75 0 014 20.25v-7.5c0-1.259.846-2.32 2-2.646V6.75c0-1.537.642-3.004 1.77-4.08A6.136 6.136 0 0112 1zM6.75 11.5c-.69 0-1.25.56-1.25 1.25v7.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-7.5c0-.69-.56-1.25-1.25-1.25H6.75zM12 16.25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0v-2a.75.75 0 01.75-.75zM12 2.5a4.637 4.637 0 00-3.195 1.258A4.132 4.132 0 007.5 6.75V10h9V6.75a4.133 4.133 0 00-1.305-2.992A4.637 4.637 0 0012 2.5z"
                />
            </svg>
        );
    }
);
