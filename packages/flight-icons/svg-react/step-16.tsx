import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconStep16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.75 2a.75.75 0 0 1 .75.75V5.5c.966 0 1.75.784 1.75 1.75v1.5A1.75 1.75 0 0 1 7.5 10.5v.25a1.75 1.75 0 0 0 1.75 1.75h3a.75.75 0 0 1 0 1.5h-3A3.25 3.25 0 0 1 6 10.75v-.25a1.75 1.75 0 0 1-1.75-1.75v-1.5c0-.966.784-1.75 1.75-1.75V2.75A.75.75 0 0 1 6.75 2M6 7a.25.25 0 0 0-.25.25v1.5c0 .138.112.25.25.25h1.5a.25.25 0 0 0 .25-.25v-1.5A.25.25 0 0 0 7.5 7z"
                />
            </svg>
        );
    }
);
