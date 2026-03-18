import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconArrowUpRight24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M18.25 5c.205 0 .393.084.528.218l.004.004A.75.75 0 0 1 19 5.75v9.5a.75.75 0 0 1-1.5 0V7.56L6.28 18.78a.751.751 0 0 1-1.06-1.06L16.44 6.5H8.75a.75.75 0 0 1 0-1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
