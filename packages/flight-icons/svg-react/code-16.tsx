import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconCode16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M8.52 2.576a.75.75 0 011.46.348l-2.5 10.5a.75.75 0 01-1.46-.348l2.5-10.5zM3.74 4.2a.751.751 0 011.02 1.1L1.854 8l2.908 2.7a.751.751 0 01-1.022 1.1L.24 8.55a.751.751 0 010-1.1l3.5-3.25zm7.46.04a.751.751 0 011.06-.04l3.5 3.25a.751.751 0 010 1.1l-3.5 3.25a.75.75 0 01-1.02-1.1L14.147 8l-2.909-2.7a.751.751 0 01-.039-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
