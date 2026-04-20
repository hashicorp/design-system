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
                    fillRule="evenodd"
                    d="M13.93 1.073a.75.75 0 0 1 .85.147.755.755 0 0 1 .148.852l-5.92 12.5a.755.755 0 0 1-.753.425.755.755 0 0 1-.653-.565L6.395 9.606 1.57 8.4a.755.755 0 0 1-.565-.653.75.75 0 0 1 .425-.752zm-9.965 6.38 3.23.806a.76.76 0 0 1 .546.546l.807 3.23 4.125-8.707z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
