import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconSocket16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 0A2.25 2.25 0 0 1 16 2.25v11.5A2.25 2.25 0 0 1 13.75 16H2.25A2.25 2.25 0 0 1 0 13.75V2.25A2.25 2.25 0 0 1 2.25 0zM2.25 1.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h11.5a.75.75 0 0 0 .75-.75V2.25a.75.75 0 0 0-.75-.75zM8 2.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8M6.01 7a1 1 0 0 1 0 2H6a1 1 0 1 1 0-2zm4.01 0a1 1 0 1 1 0 2h-.01a1 1 0 0 1 0-2z"
                />
            </svg>
        );
    }
);
