import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRss24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5 17a2 2 0 110 4 2 2 0 010-4zm-1.25-7A10.25 10.25 0 0114 20.25a.75.75 0 01-1.5 0 8.75 8.75 0 00-8.75-8.75.75.75 0 010-1.5zm0-7A17.25 17.25 0 0121 20.25a.75.75 0 01-1.5 0A15.75 15.75 0 003.75 4.5a.75.75 0 010-1.5z"
                />
            </svg>
        );
    }
);
