import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconAward24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M12 1a8 8 0 014.751 14.438l1.236 6.675a.75.75 0 01-1.004.838L12 21.053 7.017 22.95a.75.75 0 01-1.004-.838l1.236-6.675A8 8 0 0112 1zm3.377 15.255A7.972 7.972 0 0112 17a7.971 7.971 0 01-3.377-.745l-.893 4.82 4.003-1.526a.75.75 0 01.534 0l4.003 1.525-.893-4.82zM12 2.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
                />
            </svg>
        );
    }
);
