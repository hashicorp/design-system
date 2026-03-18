import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconX16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M11.72 3.22a.75.75 0 0 1 1.06 1.06L9.06 8l3.72 3.72a.753.753 0 0 1 0 1.06.753.753 0 0 1-1.06 0L8 9.062l-3.72 3.72a.75.75 0 0 1-1.06-1.06L6.94 8 3.22 4.28a.75.75 0 0 1 1.06-1.06L8 6.94z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
