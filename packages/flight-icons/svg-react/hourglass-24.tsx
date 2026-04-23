import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconHourglass24 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M17.438 1c1.798.002 2.87 2.009 1.869 3.503l-4.748 7.079a.75.75 0 0 0 0 .836l4.748 7.08c1 1.493-.071 3.5-1.87 3.502H6.564c-1.8 0-2.872-2.008-1.87-3.503l4.749-7.079a.75.75 0 0 0 0-.836l-4.749-7.08C3.691 3.009 4.763 1 6.563 1zM6.563 2.5a.75.75 0 0 0-.623 1.168l4.748 7.08a2.25 2.25 0 0 1 0 2.505L5.94 20.332a.75.75 0 0 0 .623 1.168h10.875a.752.752 0 0 0 .623-1.168l-4.748-7.08a2.25 2.25 0 0 1 0-2.505l4.748-7.079a.752.752 0 0 0-.623-1.168zM15.25 19c.413.001.75.337.75.75a.75.75 0 0 1-.75.75h-6.5a.75.75 0 0 1 0-1.5zm-3-11c.413.001.75.337.75.75a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
