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
                <path
                    fill={color}
                    d="M9.25 2c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 9.25 22h-5.5A1.75 1.75 0 0 1 2 20.25V3.75C2 2.784 2.784 2 3.75 2zm11 11c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 20.25 22h-5.5A1.75 1.75 0 0 1 13 20.25v-5.5c0-.966.784-1.75 1.75-1.75zM3.75 3.5a.25.25 0 0 0-.25.25v16.5c0 .138.112.25.25.25h5.5a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25zm11 11a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h5.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25zM20.25 2c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 20.25 11h-5.5A1.75 1.75 0 0 1 13 9.25v-5.5c0-.966.784-1.75 1.75-1.75zm-5.5 1.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h5.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25z"
                />
            </svg>
        );
    }
);
