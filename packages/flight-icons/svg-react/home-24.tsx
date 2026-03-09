import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHome24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M10.927 1.635a1.752 1.752 0 012.146 0l8.25 6.408c.427.331.677.842.677 1.382V21.25a.751.751 0 01-1.5 0V9.425a.251.251 0 00-.097-.197l-8.25-6.408a.252.252 0 00-.306 0l-8.25 6.408a.255.255 0 00-.097.197V21.25a.751.751 0 01-1.5 0V9.425c0-.54.251-1.05.677-1.382l8.25-6.408zM14.25 14c.966 0 1.75.784 1.75 1.75v5.5a.751.751 0 01-1.5 0v-5.5a.25.25 0 00-.25-.25h-4.5a.252.252 0 00-.25.25v5.5a.751.751 0 01-1.5 0v-5.5c0-.965.785-1.749 1.75-1.75h4.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
