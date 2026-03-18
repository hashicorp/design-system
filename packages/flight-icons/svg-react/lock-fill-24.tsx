import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLockFill24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M6 10.104V6.75c0-1.537.641-3.003 1.77-4.079A6.14 6.14 0 0 1 12 1c1.58 0 3.102.597 4.23 1.671A5.63 5.63 0 0 1 18 6.75v3.354c1.154.326 2 1.387 2 2.646v7.5A2.75 2.75 0 0 1 17.25 23H6.75A2.75 2.75 0 0 1 4 20.25v-7.5c0-1.259.846-2.32 2-2.646m2.805-6.346A4.64 4.64 0 0 1 12 2.5c1.205 0 2.354.456 3.195 1.258.84.8 1.305 1.877 1.305 2.992V10h-9V6.75c0-1.115.465-2.192 1.305-2.992M12 16.25a.75.75 0 0 0-.75.75v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 0-.75-.75"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
