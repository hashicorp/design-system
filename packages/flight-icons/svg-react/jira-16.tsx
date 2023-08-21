import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconJira16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M15.323 7.558L7.99 0 .677 7.536c-.236.243-.236.64 0 .906l4.589 4.73L7.989 16l7.334-7.558a.64.64 0 000-.884zM7.99 10.365L5.695 8l2.294-2.365L10.284 8l-2.295 2.365z"
                />
            </svg>
        );
    }
);
