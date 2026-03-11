import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFilePlus16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.543 0c.331 0 .65.132.884.366l4.207 4.207c.234.235.366.553.366.884v8.293A2.25 2.25 0 0112.75 16h-9.5A2.25 2.25 0 011 13.75V2.25A2.25 2.25 0 013.25 0h6.293zM3.25 1.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75V6H9.75A.75.75 0 019 5.25V1.5H3.25zM7.75 7a.75.75 0 01.75.75V9h1.25a.75.75 0 010 1.5H8.5v1.25a.75.75 0 01-1.5 0V10.5H5.75a.75.75 0 010-1.5H7V7.75A.75.75 0 017.75 7zm2.75-2.5h1.94L10.5 2.56V4.5z"
                />
            </svg>
        );
    }
);
