import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPrinter24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M16.25 1A2.75 2.75 0 0119 3.75V8h1.25A2.75 2.75 0 0123 10.75v5.5A2.75 2.75 0 0120.25 19H19v2.25A1.75 1.75 0 0117.25 23H6.75A1.75 1.75 0 015 21.25V19H3.75A2.75 2.75 0 011 16.25v-5.5A2.75 2.75 0 013.75 8H5V3.75A2.75 2.75 0 017.75 1h8.5zm-9.5 13.5a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25v-6.5a.25.25 0 00-.25-.25H6.75zm-3-5c-.69 0-1.25.56-1.25 1.25v5.5c0 .69.56 1.25 1.25 1.25H5v-2.75c0-.966.784-1.75 1.75-1.75h10.5c.966 0 1.75.784 1.75 1.75v2.75h1.25c.69 0 1.25-.56 1.25-1.25v-5.5c0-.69-.56-1.25-1.25-1.25H3.75zm4-7c-.69 0-1.25.56-1.25 1.25V8h11V3.75c0-.69-.56-1.25-1.25-1.25h-8.5z"
                />
            </svg>
        );
    }
);
