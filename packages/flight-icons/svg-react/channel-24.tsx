import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconChannel24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M16.604 5.5H13c-.69 0-1.25.56-1.25 1.25v4.5h3.604a2.751 2.751 0 110 1.5H11.75v4.5c0 .69.56 1.25 1.25 1.25h3.604a2.751 2.751 0 110 1.5H13a2.75 2.75 0 01-2.75-2.75v-4.5H7.396a2.751 2.751 0 110-1.5h2.854v-4.5A2.75 2.75 0 0113 4h3.604a2.751 2.751 0 110 1.5zM18 4.75a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0zm-13.25 6a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm13.25 0a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm0 8.5a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
