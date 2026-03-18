import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTwitchColor16 = forwardRef<SVGSVGElement, IconProps>(
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
                <path fill="#fff" d="m13 7.5-2 2H9l-1.75 1.75V9.5H5V2h8z" />
                <path
                    fill="#9146ff"
                    d="M4.5 1 2 3.5v9h3V15l2.5-2.5h2L14 8V1zM13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8z"
                />
                <path fill="#9146ff" d="M11.5 3.75h-1v3h1zM8.75 3.75h-1v3h1z" />
            </svg>
        );
    }
);
