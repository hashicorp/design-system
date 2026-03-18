import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNode16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.25 4a2.25 2.25 0 0 1 2.25 2.25V7h3.25a.75.75 0 0 1 0 1.5H11.5v.75a2.25 2.25 0 0 1-2.25 2.25h-3A2.25 2.25 0 0 1 4 9.25V8.5H.75a.75.75 0 0 1 0-1.5H4v-.75A2.25 2.25 0 0 1 6.25 4zm-3 1.5a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75z"
                />
            </svg>
        );
    }
);
