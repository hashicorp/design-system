import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconOrg16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.75 1A2.25 2.25 0 0112 3.25v2.112l2.05 1.452A2.25 2.25 0 0115 8.65v5.1c0 .69-.56 1.25-1.25 1.25h-2.5a.748.748 0 01-.75-.75v-11a.75.75 0 00-.75-.75h-6.5a.75.75 0 00-.75.75v11a.75.75 0 01-1.5 0v-11A2.25 2.25 0 013.25 1h6.5zm-1.5 9.55a.7.7 0 01.7.7v3a.7.7 0 01-1.4 0v-2.3h-2.1v2.3a.7.7 0 01-1.4 0v-3a.7.7 0 01.7-.7h3.5zM12 13.5h1.5V8.65a.75.75 0 00-.316-.61L12 7.2v6.3zM5.25 8a.75.75 0 010 1.5H5A.75.75 0 015 8h.25zM8 8a.75.75 0 010 1.5h-.25a.75.75 0 010-1.5H8zM5.25 6a.75.75 0 010 1.5H5A.75.75 0 015 6h.25zM8 6a.75.75 0 010 1.5h-.25a.75.75 0 010-1.5H8zM5.25 4a.75.75 0 010 1.5H5A.75.75 0 015 4h.25zM8 4a.75.75 0 010 1.5h-.25a.75.75 0 010-1.5H8z"
                />
            </svg>
        );
    }
);
