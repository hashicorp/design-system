import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconMinusPlus24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M17.25 12.75a.75.75 0 0 1 .75.75V16h2.5a.75.75 0 0 1 0 1.5H18V20a.75.75 0 0 1-1.5 0v-2.5H14a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 .75-.75m.47-7.53a.75.75 0 1 1 1.06 1.06l-12.5 12.5a.75.75 0 0 1-1.06-1.06zM9.75 6a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
