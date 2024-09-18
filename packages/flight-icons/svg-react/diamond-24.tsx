import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconDiamond24 = forwardRef<SVGSVGElement, IconProps>(
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
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden={!title}
                ref={svgRef}
                aria-labelledby={titleId}
                {...props}
            >
                {title ? <title id={titleId}>{title}</title> : null}
                <path
                    fill={color}
                    fillRule="evenodd"
                    d="M11.116 2.985l-8.131 8.132a1.25 1.25 0 000 1.767l8.131 8.132a1.25 1.25 0 001.768 0l8.132-8.132a1.25 1.25 0 000-1.768l-8.132-8.131a1.25 1.25 0 00-1.768 0zm-9.192 7.07l8.132-8.13a2.75 2.75 0 013.889 0l8.131 8.13a2.75 2.75 0 010 3.89l-8.131 8.131a2.75 2.75 0 01-3.89 0l-8.131-8.131a2.75 2.75 0 010-3.89z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
