import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArchive16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.25 1c.966 0 1.75.784 1.75 1.75v1.5a1.75 1.75 0 0 1-1 1.582v6.918A2.25 2.25 0 0 1 12.75 15h-9.5A2.25 2.25 0 0 1 1 12.75V5.832A1.75 1.75 0 0 1 0 4.25v-1.5C0 1.784.784 1 1.75 1zM2.5 12.75c0 .414.336.75.75.75h9.5a.75.75 0 0 0 .75-.75V6h-11zM9.25 8a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5zm-7.5-5.5a.25.25 0 0 0-.25.25v1.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-1.5a.25.25 0 0 0-.25-.25z"
                />
            </svg>
        );
    }
);
