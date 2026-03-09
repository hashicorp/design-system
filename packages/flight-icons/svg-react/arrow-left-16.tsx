import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowLeft16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6.735 2.955a.75.75 0 011.03 1.09L4.637 7h8.613a.751.751 0 010 1.5H4.637l3.128 2.955a.75.75 0 01-1.03 1.09l-4.5-4.25a.752.752 0 01.001-1.092l4.5-4.248z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
