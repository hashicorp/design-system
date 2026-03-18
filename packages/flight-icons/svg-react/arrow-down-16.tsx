import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowDown16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.749 2a.75.75 0 0 1 .75.75v8.613l2.955-3.128a.75.75 0 0 1 1.09 1.03l-4.25 4.5-.037.037A.76.76 0 0 1 7.76 14h-.024a.75.75 0 0 1-.51-.21l-.025-.026-4.248-4.5a.75.75 0 0 1 1.09-1.029l2.955 3.128V2.75c0-.414.336-.75.75-.75"
                />
            </svg>
        );
    }
);
