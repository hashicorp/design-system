import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMoon24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.82 2.382a.75.75 0 01-.05.814 6.46 6.46 0 009.034 9.034.75.75 0 011.193.672 10.02 10.02 0 11-10.9-10.899.75.75 0 01.723.379zm-2.12 1.4A8.52 8.52 0 1020.217 14.3 7.96 7.96 0 019.7 3.783z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
