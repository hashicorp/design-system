import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCast24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1.016 15.93a.75.75 0 0 1 .884-.584A6.1 6.1 0 0 1 6.655 20.1a.75.75 0 0 1-1.47.298 4.6 4.6 0 0 0-3.584-3.584.75.75 0 0 1-.585-.884m.817-4.925a10.374 10.374 0 0 1 9.162 9.162.75.75 0 1 1-1.49.166 8.87 8.87 0 0 0-7.838-7.838.75.75 0 0 1 .166-1.49M20.25 3A2.75 2.75 0 0 1 23 5.75v12.5A2.75 2.75 0 0 1 20.25 21H14a.75.75 0 0 1 0-1.5h6.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25H3.75c-.69 0-1.25.56-1.25 1.25V8A.75.75 0 0 1 1 8V5.75A2.75 2.75 0 0 1 3.75 3z"
                />
            </svg>
        );
    }
);
