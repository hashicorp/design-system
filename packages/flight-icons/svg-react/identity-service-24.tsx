import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconIdentityService24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15.25 1c.966 0 1.75.784 1.75 1.75V3h3.25A2.75 2.75 0 0 1 23 5.75v12.5A2.75 2.75 0 0 1 20.25 21H3.75A2.75 2.75 0 0 1 1 18.25V5.75A2.75 2.75 0 0 1 3.75 3H7v-.25C7 1.784 7.784 1 8.75 1zM3.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h16.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25H17v.25a1.75 1.75 0 0 1-1.75 1.75h-6.5A1.75 1.75 0 0 1 7 4.75V4.5zM12 7.25a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5M7.78 13.5a4.25 4.25 0 0 0 2.51 3.392A8.4 8.4 0 0 1 9.274 13.5zm6.946 0a8.4 8.4 0 0 1-1.016 3.392 4.25 4.25 0 0 0 2.51-3.392zm-3.946 0A6.9 6.9 0 0 0 12 16.804a6.9 6.9 0 0 0 1.22-3.304zm-.49-4.392A4.26 4.26 0 0 0 7.868 12H9.33a8.4 8.4 0 0 1 .961-2.892m1.71.088A6.9 6.9 0 0 0 10.847 12h2.306A6.9 6.9 0 0 0 12 9.196m1.71-.088c.493.895.82 1.875.96 2.892h1.462a4.26 4.26 0 0 0-2.422-2.892M8.75 2.5a.25.25 0 0 0-.25.25v2c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25v-2a.25.25 0 0 0-.25-.25z"
                />
            </svg>
        );
    }
);
