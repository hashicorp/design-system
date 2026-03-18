import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconRobot16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M11.75 13.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5zM10.25 1c.605 0 1.109.43 1.225 1h.275A2.25 2.25 0 0 1 14 4.25v1.275a1.25 1.25 0 0 1 0 2.45V10.5a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 2 10.5V7.975a1.25 1.25 0 0 1 0-2.45V4.25A2.25 2.25 0 0 1 4.25 2h.275a1.25 1.25 0 0 1 2.45 0h2.05c.116-.57.62-1 1.225-1m-6 2.5a.75.75 0 0 0-.75.75v6.25c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75V4.25a.75.75 0 0 0-.75-.75zm5.5 5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5zM5.875 5a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25m4.25 0a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25"
                />
            </svg>
        );
    }
);
