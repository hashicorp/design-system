import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCloud24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5.835 3.558a8.87 8.87 0 0 1 9.252 1.925 9 9 0 0 1 2.325 3.705h.725c1.556 0 3.05.625 4.148 1.732a5.934 5.934 0 0 1 0 8.348A5.85 5.85 0 0 1 18.137 21H8.928a8.9 8.9 0 0 1-4.72-1.36 9 9 0 0 1-3.295-3.676 9.07 9.07 0 0 1 .953-9.47A8.94 8.94 0 0 1 5.828 3.56zm4.591 1.096a7.37 7.37 0 0 0-4.074.312l-.008.003a7.44 7.44 0 0 0-3.288 2.439 7.55 7.55 0 0 0-1.518 3.835 7.57 7.57 0 0 0 .723 4.065 7.5 7.5 0 0 0 2.744 3.06 7.4 7.4 0 0 0 3.93 1.132h9.202a4.35 4.35 0 0 0 3.083-1.288 4.437 4.437 0 0 0 0-6.236 4.35 4.35 0 0 0-3.083-1.288H16.85a.75.75 0 0 1-.726-.565 7.5 7.5 0 0 0-2.075-3.558 7.4 7.4 0 0 0-3.622-1.911"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
