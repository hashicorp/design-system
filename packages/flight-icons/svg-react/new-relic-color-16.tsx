import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNewRelicColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fill="#00AC69"
                    d="M11.692 5.846v4.308L8 12.308V15l6-3.5v-7l-2.308 1.346z"
                />
                <path
                    fill="#1CE783"
                    d="M8 3.693l3.692 2.153L14 4.5 8 1 2 4.5l2.308 1.346L8 3.693z"
                />
                <path
                    fill="#1D252C"
                    d="M5.691 9.347v4.307L8.001 15V8L2 4.5v2.693l3.691 2.154z"
                />
            </svg>
        );
    }
);
