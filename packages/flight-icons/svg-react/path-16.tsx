import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPath16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13 0a3 3 0 1 1-.229 5.991c-.298.753-.589 1.309-.965 1.857a15 15 0 0 1-.893 1.148q.085.237.087.504a1.5 1.5 0 1 1-2.985-.208 11 11 0 0 0-1.538-.974 11 11 0 0 0-1.918-.756 1.5 1.5 0 0 1-.979.436C2.794 9.7 2.492 11.18 2.33 13.25A1.498 1.498 0 0 1 1.5 16a1.5 1.5 0 0 1-.667-2.844c.173-2.23.508-3.903 1.41-5.839A1.5 1.5 0 1 1 4.95 6.113c.848.255 1.554.532 2.214.872.617.318 1.18.685 1.772 1.124a1.5 1.5 0 0 1 .833-.085c.328-.39.58-.705.8-1.025a7.3 7.3 0 0 0 .78-1.493A3 3 0 0 1 13 0m0 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                />
            </svg>
        );
    }
);
