import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSidebarHide24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M19.25 2A2.75 2.75 0 0122 4.75v14.5A2.75 2.75 0 0119.25 22H4.75A2.75 2.75 0 012 19.25V4.75A2.75 2.75 0 014.75 2h14.5zM4.75 3.5c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25H7v-17H4.75zm3.75 17h10.75c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25H8.5v17zm7.235-13.295a.75.75 0 111.03 1.09L12.843 12l3.922 3.705a.75.75 0 11-1.03 1.09l-4.5-4.25a.75.75 0 010-1.09l4.5-4.25z"
                />
            </svg>
        );
    }
);
