import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconPieChart24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M7.459 1.979a.75.75 0 0 1 .62 1.366A9.5 9.5 0 0 0 12 21.5a9.5 9.5 0 0 0 8.657-5.58.75.75 0 1 1 1.366.621A11 11 0 0 1 12 23C5.925 23 1 18.075 1 12 1 7.543 3.651 3.707 7.459 1.979M11.75 1a11.25 11.25 0 0 1 10.394 6.944c.565 1.365.856 2.829.856 4.306a.75.75 0 0 1-.75.75h-10.5a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 .75-.75m.75 10.5h8.97a9.75 9.75 0 0 0-5.989-8.258A9.8 9.8 0 0 0 12.5 2.53z"
                />
            </svg>
        );
    }
);
