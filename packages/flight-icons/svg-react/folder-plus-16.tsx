import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFolderPlus16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.629 1a2.25 2.25 0 0 1 1.59.66l1.122 1.12c.14.14.331.22.53.22h3.879A2.25 2.25 0 0 1 16 5.25v7.5A2.25 2.25 0 0 1 13.75 15H2.25A2.25 2.25 0 0 1 0 12.75v-9.5A2.25 2.25 0 0 1 2.25 1zM2.25 2.5a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h11.5a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-.75-.75H9.871a2.25 2.25 0 0 1-1.59-.66L7.158 2.72a.75.75 0 0 0-.53-.22zM7.75 6a.75.75 0 0 1 .75.75V8h1.25a.75.75 0 0 1 0 1.5H8.5v1.25a.75.75 0 0 1-1.5 0V9.5H5.75a.75.75 0 0 1 0-1.5H7V6.75A.75.75 0 0 1 7.75 6"
                />
            </svg>
        );
    }
);
