import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconClosedCaption16 = forwardRef<SVGSVGElement, IconProps>(
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
                    fillRule="evenodd"
                    d="M0 3.25A2.25 2.25 0 012.25 1h11.5A2.25 2.25 0 0116 3.25v9a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 12.25v-9zm2.25-.75a.75.75 0 00-.75.75v9c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75H2.25zm3.5 4a1.25 1.25 0 10.836 2.179.75.75 0 011.005 1.114 2.75 2.75 0 110-4.086.75.75 0 01-1.005 1.114A1.243 1.243 0 005.75 6.5zM10 7.75a1.25 1.25 0 012.086-.929.75.75 0 101.005-1.114 2.75 2.75 0 100 4.086.75.75 0 00-1.005-1.114A1.25 1.25 0 0110 7.75z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
