import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDashboard24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color} fillRule="evenodd" clipRule="evenodd">
                    <path d="M2 3.75C2 2.784 2.784 2 3.75 2h5.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 019.25 22h-5.5A1.75 1.75 0 012 20.25V3.75zm1.75-.25a.25.25 0 00-.25.25v16.5c0 .138.112.25.25.25h5.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25h-5.5zM13 3.75c0-.966.784-1.75 1.75-1.75h5.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0120.25 11h-5.5A1.75 1.75 0 0113 9.25v-5.5zm1.75-.25a.25.25 0 00-.25.25v5.5c0 .138.112.25.25.25h5.5a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25h-5.5zM14.75 13A1.75 1.75 0 0013 14.75v5.5c0 .966.784 1.75 1.75 1.75h5.5A1.75 1.75 0 0022 20.25v-5.5A1.75 1.75 0 0020.25 13h-5.5zm-.25 1.75a.25.25 0 01.25-.25h5.5a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-5.5a.25.25 0 01-.25-.25v-5.5z" />
                </g>
            </svg>
        );
    }
);
