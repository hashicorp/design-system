import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconConnectionGateway24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M20.5 1.75a3 3 0 1 1-1.665 5.496l-2.477 2.216c.092.245.142.511.142.788v3c0 .277-.05.543-.142.788l2.477 2.216a3 3 0 1 1-1 1.117l-2.441-2.183a2.24 2.24 0 0 1-1.144.312h-3A2.25 2.25 0 0 1 9 13.25v-.75H6.405A3.001 3.001 0 0 1 .5 11.75 3 3 0 0 1 6.405 11H9v-.75A2.25 2.25 0 0 1 11.25 8h3c.418 0 .808.115 1.144.313l2.441-2.185A3 3 0 0 1 20.5 1.75m0 15.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11.25 9.5a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75zm-7.75.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m17-7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                />
            </svg>
        );
    }
);
