import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTag24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.172 2c.73 0 1.429.29 1.944.806l8 8a2.75 2.75 0 0 1 0 3.888l-6.422 6.422a2.75 2.75 0 0 1-3.888 0l-8-8A2.75 2.75 0 0 1 2 11.172V4.75A2.75 2.75 0 0 1 4.75 2zM4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.422c0 .331.132.65.366.884l8 8a1.25 1.25 0 0 0 1.768 0l6.422-6.422a1.25 1.25 0 0 0 0-1.768l-8-8a1.25 1.25 0 0 0-.884-.366zM6.01 5a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2z"
                />
            </svg>
        );
    }
);
