import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDuo24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M8.447 12.174H2V15.5h3.227c1.726 0 3.136-1.472 3.22-3.326zM5.227 8.5H2v3.326h6.45C8.363 9.972 6.953 8.5 5.227 8.5zM18.777 8.5c-1.727 0-3.14 1.475-3.224 3.326h6.444c-.08-1.854-1.494-3.326-3.22-3.326zM22 12.174h-6.447c.084 1.854 1.494 3.326 3.224 3.326 1.726 0 3.14-1.472 3.223-3.326zM8.773 8.5V12c0 1.874 1.357 3.406 3.067 3.497V8.5H8.773zM15.227 8.5h-3.064v7h3.064v-7z" />
                </g>
            </svg>
        );
    }
);
