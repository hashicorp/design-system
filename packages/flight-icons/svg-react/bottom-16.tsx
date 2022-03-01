import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconBottom16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M7.75 1a.75.75 0 01.75.75v7.614l2.955-3.129a.75.75 0 011.09 1.03l-4.25 4.5a.747.747 0 01-.533.235h-.024a.747.747 0 01-.51-.211l-.004-.005a.862.862 0 01-.02-.02l-4.25-4.499a.75.75 0 011.091-1.03L7 9.364V1.75A.75.75 0 017.75 1zM2.5 13.5a.75.75 0 000 1.5H13a.75.75 0 000-1.5H2.5z" />
                </g>
            </svg>
        );
    }
);
