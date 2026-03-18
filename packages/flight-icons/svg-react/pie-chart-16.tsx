import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPieChart16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M4.452.828a.75.75 0 0 1 .666 1.344 6.5 6.5 0 1 0 8.71 8.71.75.75 0 0 1 1.344.666A8 8 0 1 1 4.452.828M7.75.05a8.2 8.2 0 0 1 8.2 8.2.7.7 0 0 1-.7.7h-7.5a.7.7 0 0 1-.7-.7V.75a.7.7 0 0 1 .7-.7m.7 7.5h6.064A6.8 6.8 0 0 0 8.45 1.486z"
                />
            </svg>
        );
    }
);
