import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTerraform24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M2 .6v7.197l6.212 3.6V4.2L2 .6zM15.107 8.215L8.893 4.618v7.197l6.214 3.6v-7.2zM15.788 15.414V8.215L22 4.618v7.197l-6.212 3.6zM15.105 23.4l-6.212-3.6v-7.197l6.212 3.6V23.4z" />
                </g>
            </svg>
        );
    }
);
