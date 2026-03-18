import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTrash16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.75 0A2.25 2.25 0 0 1 12 2.25V3h2.25a.75.75 0 0 1 0 1.5H14v9.25A2.25 2.25 0 0 1 11.75 16h-7.5A2.25 2.25 0 0 1 2 13.75V4.5h-.25a.75.75 0 0 1 0-1.5H4v-.75A2.25 2.25 0 0 1 6.25 0zM3.5 13.75c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75V4.5h-9zM6.25 6a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5A.75.75 0 0 1 6.25 6m3.5 0a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5A.75.75 0 0 1 9.75 6m-3.5-4.5a.75.75 0 0 0-.75.75V3h5v-.75a.75.75 0 0 0-.75-.75z"
                />
            </svg>
        );
    }
);
