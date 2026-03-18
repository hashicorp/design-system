import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPipeline16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M3.75 2.5A1.75 1.75 0 0 1 5.482 4H6.5a2.25 2.25 0 0 1 2.25 2.25v3.5c0 .414.336.75.75.75h1.018A1.75 1.75 0 0 1 12.25 9h1c.966 0 1.75.784 1.75 1.75v1a1.75 1.75 0 0 1-1.75 1.75h-1a1.75 1.75 0 0 1-1.732-1.5H9.5a2.25 2.25 0 0 1-2.25-2.25v-3.5a.75.75 0 0 0-.75-.75H5.482A1.75 1.75 0 0 1 3.75 7h-1A1.75 1.75 0 0 1 1 5.25v-1c0-.966.784-1.75 1.75-1.75zm8.5 8a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25v-1a.25.25 0 0 0-.25-.25zM2.75 4a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25h1A.25.25 0 0 0 4 5.25v-1A.25.25 0 0 0 3.75 4z"
                />
            </svg>
        );
    }
);
