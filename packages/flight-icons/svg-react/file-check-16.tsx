import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconFileCheck16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M9.543 0c.331 0 .65.132.884.366l4.207 4.207c.234.234.366.553.366.884V6.75a.75.75 0 0 1-1.5 0V6H9.75A.75.75 0 0 1 9 5.25V1.5H3.25a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h4a.75.75 0 0 1 0 1.5h-4A2.25 2.25 0 0 1 1 13.75V2.25A2.25 2.25 0 0 1 3.25 0zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m2.288 2.727a.75.75 0 0 0-1.06-.015l-1.884 1.827-.572-.555a.75.75 0 0 0-1.045 1.077l1.094 1.06a.75.75 0 0 0 1.045 0l2.406-2.333a.75.75 0 0 0 .016-1.06M10.5 4.5h1.94L10.5 2.56z"
                />
            </svg>
        );
    }
);
