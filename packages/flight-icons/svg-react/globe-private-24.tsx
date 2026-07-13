import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconGlobePrivate24 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M18 10a3.96 3.96 0 0 1 2.835 1.203A4.13 4.13 0 0 1 22 14.083v.93a2.25 2.25 0 0 1 2 2.237v4.5A2.25 2.25 0 0 1 21.75 24h-7.5A2.25 2.25 0 0 1 12 21.75v-4.5a2.25 2.25 0 0 1 2-2.236v-.931c0-1.077.417-2.113 1.165-2.88A3.96 3.96 0 0 1 18 10m-6-9c5.15 0 9.473 3.54 10.67 8.317a.75.75 0 0 1-1.454.366 9.51 9.51 0 0 0-7.543-7.037 16.6 16.6 0 0 1 2.597 5.675.75.75 0 0 1-1.457.358A15.1 15.1 0 0 0 12 2.916 15.15 15.15 0 0 0 8.804 11H12.5a.75.75 0 0 1 0 1.5H8.769a15.2 15.2 0 0 0 1.923 6.633.75.75 0 0 1-1.307.734A16.7 16.7 0 0 1 7.267 12.5H2.513c.223 4.303 3.31 7.85 7.391 8.769a.75.75 0 1 1-.329 1.462C4.667 21.627 1 17.243 1 12 1 5.925 5.925 1 12 1m2.25 15.5a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75zM18 19a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 18 19m0-7.5c-.657 0-1.29.268-1.76.75a2.63 2.63 0 0 0-.74 1.833V15h5v-.917c0-.691-.268-1.35-.74-1.833A2.46 2.46 0 0 0 18 11.5m-7.673-8.854A9.51 9.51 0 0 0 2.552 11h4.747a16.7 16.7 0 0 1 3.028-8.354"
                />
            </svg>
        );
    }
);
