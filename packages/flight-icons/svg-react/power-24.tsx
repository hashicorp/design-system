import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPower24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M18.004 6.234a.751.751 0 011.058.067A9.716 9.716 0 0121.5 12.75c0 5.385-4.365 9.75-9.75 9.75C6.366 22.499 2 18.134 2 12.75A9.72 9.72 0 014.438 6.3a.75.75 0 011.125.992A8.252 8.252 0 0011.75 21a8.25 8.25 0 006.187-13.706.753.753 0 01.066-1.059zM11.75 1.25a.75.75 0 01.75.75v10a.75.75 0 01-1.5 0V2c0-.414.337-.749.75-.75z"
                />
            </svg>
        );
    }
);
