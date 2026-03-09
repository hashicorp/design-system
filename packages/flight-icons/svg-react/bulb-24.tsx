import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBulb24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 21.5a.75.75 0 010 1.5h-3.5a.75.75 0 010-1.5h3.5zM12 5.5a6 6 0 016 6c0 2.092-1.296 3.351-2.462 4.483l-.122.119a.723.723 0 00-.216.52v.628a2.25 2.25 0 01-2.25 2.25H11.05a2.25 2.25 0 01-2.25-2.249v-.658a.703.703 0 00-.196-.494l-.316-.318C7.186 14.68 6 13.493 6 11.5a6 6 0 016-6zM12 7a4.5 4.5 0 00-4.5 4.5c0 1.348.74 2.096 1.91 3.28l.263.268a2.2 2.2 0 01.626 1.544v.658c0 .414.336.75.75.75h1.901a.75.75 0 00.75-.75v-.629c0-.596.237-1.173.67-1.595 1.28-1.245 2.13-2.09 2.13-3.526A4.5 4.5 0 0012 7zm-8.25 4a.75.75 0 010 1.5h-1.5a.75.75 0 010-1.5h1.5zm18 0a.75.75 0 010 1.5h-1.5a.75.75 0 010-1.5h1.5zM4.47 4.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.47 5.28a.75.75 0 010-1.06zm14 0a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06zM12 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 1z"
                />
            </svg>
        );
    }
);
