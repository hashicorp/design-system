import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSidebarHide16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.75 1A2.25 2.25 0 0 1 15 3.25v9.5A2.25 2.25 0 0 1 12.75 15h-9.5A2.25 2.25 0 0 1 1 12.75v-9.5A2.25 2.25 0 0 1 3.25 1zm-9.5 1.5a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h1.3v-11zm2.7 11h6.8a.75.75 0 0 0 .75-.75v-9.5a.75.75 0 0 0-.75-.75h-6.8zm4.823-9.263a.7.7 0 0 1 .954 1.026L8.778 8l2.949 2.737a.7.7 0 0 1-.954 1.026l-3.5-3.25a.7.7 0 0 1 0-1.026z"
                />
            </svg>
        );
    }
);
