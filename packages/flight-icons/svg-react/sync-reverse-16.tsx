import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSyncReverse16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M.75 7.25A.75.75 0 011.5 8a6.5 6.5 0 0011.19 4.5h-1.44a.75.75 0 010-1.5h3a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-.94A8 8 0 010 8a.75.75 0 01.75-.75zM8 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 003.31 3.5h1.44a.75.75 0 010 1.5h-3A.75.75 0 011 4.25v-3a.75.75 0 011.5 0v.94A7.975 7.975 0 018 0z"
                />
            </svg>
        );
    }
);
