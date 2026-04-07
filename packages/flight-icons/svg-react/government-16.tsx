import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGovernment16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M14.25 9a.75.75 0 0 1 0 1.5H13v4h2.25a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1 0-1.5H3v-4H1.75a.75.75 0 0 1 0-1.5zM4.5 14.5h2.75v-4H4.5zm4.25 0h2.75v-4H8.75zM10.25 0a.75.75 0 0 1 0 1.5h-1.5v1.056a5 5 0 0 1 4.241 4.653.75.75 0 1 1-1.497.086 3.5 3.5 0 0 0-6.988 0 .75.75 0 0 1-1.497-.086A5 5 0 0 1 7.25 2.556V1.25C7.25.56 7.81 0 8.5 0z"
                />
            </svg>
        );
    }
);
