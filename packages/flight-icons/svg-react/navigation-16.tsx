import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconNavigation16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.928 1.074a.75.75 0 0 1 .852.147.75.75 0 0 1 .147.852l-5.92 12.5a.76.76 0 0 1-.753.424.76.76 0 0 1-.653-.564L6.394 9.607 1.568 8.4a.76.76 0 0 1-.565-.654.755.755 0 0 1 .425-.752zm-9.964 6.38 3.23.806a.76.76 0 0 1 .546.546l.807 3.23 4.125-8.708z"
                />
            </svg>
        );
    }
);
