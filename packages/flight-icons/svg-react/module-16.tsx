import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconModule16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12.309.123A2.25 2.25 0 0 1 15 2.33v9.44a2.25 2.25 0 0 1-1.809 2.206l-9.5 1.9A2.25 2.25 0 0 1 1 13.67V4.228a2.25 2.25 0 0 1 1.809-2.206zM13.5 2.33a.75.75 0 0 0-.898-.736l-9.5 1.9a.75.75 0 0 0-.602.735v9.44a.75.75 0 0 0 .897.736l9.5-1.9a.75.75 0 0 0 .603-.735zm-2.898 1.684a.752.752 0 0 1 .898.736v5.4a.75.75 0 0 1-.602.735l-5.5 1.1a.75.75 0 0 1-.898-.735v-5.4a.75.75 0 0 1 .603-.736zM6 6.464v3.87l4-.8v-3.87z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
