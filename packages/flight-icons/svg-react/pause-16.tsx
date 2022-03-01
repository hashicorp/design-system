import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPause16 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M6 3.75a.75.75 0 00-1.5 0v8.5a.75.75 0 001.5 0v-8.5zM11.5 3.75a.75.75 0 00-1.5 0v8.5a.75.75 0 001.5 0v-8.5z" />
                </g>
            </svg>
        );
    }
);
