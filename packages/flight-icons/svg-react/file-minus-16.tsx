import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFileMinus16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.543 0c.331 0 .65.132.884.366l4.207 4.207c.234.235.366.553.366.884v8.293A2.25 2.25 0 0 1 12.75 16h-9.5A2.25 2.25 0 0 1 1 13.75V2.25A2.25 2.25 0 0 1 3.25 0zM3.25 1.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h9.5a.75.75 0 0 0 .75-.75V6H9.75A.75.75 0 0 1 9 5.25V1.5zm7 7.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5zm.25-4.5h1.94L10.5 2.56z"
                />
            </svg>
        );
    }
);
