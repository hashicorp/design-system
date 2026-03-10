import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPipeline24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5.75 4.5a2.25 2.25 0 012.236 2H9.82a3.25 3.25 0 013.25 3.25v4.5c0 .966.784 1.75 1.75 1.75h1.195a2.25 2.25 0 012.236-2h1a2.25 2.25 0 012.25 2.25v1a2.25 2.25 0 01-2.25 2.25h-1a2.25 2.25 0 01-2.236-2h-1.195a3.25 3.25 0 01-3.25-3.25v-4.5A1.75 1.75 0 009.82 8H7.986a2.25 2.25 0 01-2.236 2h-1A2.25 2.25 0 012.5 7.75v-1A2.25 2.25 0 014.75 4.5h1zm12.5 11a.75.75 0 00-.75.75v1c0 .414.336.75.75.75h1a.75.75 0 00.75-.75v-1a.75.75 0 00-.75-.75h-1zM4.75 6a.75.75 0 00-.75.75v1c0 .414.336.75.75.75h1a.75.75 0 00.75-.75v-1A.75.75 0 005.75 6h-1z"
                />
            </svg>
        );
    }
);
