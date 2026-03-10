import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconIdentityUser24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15.25 1c.966 0 1.75.784 1.75 1.75V3h3.25A2.75 2.75 0 0123 5.75v12.5A2.75 2.75 0 0120.25 21H3.75A2.75 2.75 0 011 18.25V5.75A2.75 2.75 0 013.75 3H7v-.25C7 1.784 7.784 1 8.75 1h6.5zM3.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25H17v.25a1.75 1.75 0 01-1.75 1.75h-6.5A1.75 1.75 0 017 4.75V4.5H3.75zM14.125 14c.748 0 1.474.28 2.017.79.543.512.858 1.216.858 1.96v.5a.75.75 0 01-1.5 0v-.5c0-.316-.133-.63-.387-.868a1.445 1.445 0 00-.988-.382h-4.25c-.379 0-.733.142-.988.382a1.193 1.193 0 00-.387.868v.5a.75.75 0 01-1.5 0v-.5c0-.744.315-1.448.858-1.96A2.945 2.945 0 019.875 14h4.25zM12 7.5a3 3 0 110 6 3 3 0 010-6zM12 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM8.75 2.5a.25.25 0 00-.25.25v2c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25v-2a.25.25 0 00-.25-.25h-6.5z"
                />
            </svg>
        );
    }
);
