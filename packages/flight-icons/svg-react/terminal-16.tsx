import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTerminal16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.25 12a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5zM2.174 3.27a.75.75 0 0 1 1.056-.096l4.5 3.75a.75.75 0 0 1 0 1.152l-4.5 3.75a.75.75 0 0 1-.96-1.152L6.078 7.5 2.27 4.326a.75.75 0 0 1-.096-1.056"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
