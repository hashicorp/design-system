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
                    d="M13.75 1A2.25 2.25 0 0116 3.25v9a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 12.25v-9A2.25 2.25 0 012.25 1h11.5zM2.25 2.5a.75.75 0 00-.75.75v9c0 .414.336.75.75.75h11.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75H2.25zM5.75 5c.707 0 1.354.268 1.84.707a.75.75 0 01-1.004 1.114 1.25 1.25 0 100 1.857.75.75 0 011.005 1.115A2.75 2.75 0 115.75 5zm5.5 0c.707 0 1.354.268 1.84.707a.75.75 0 01-1.004 1.114 1.25 1.25 0 100 1.857.75.75 0 011.005 1.115A2.75 2.75 0 1111.25 5z"
                />
            </svg>
        );
    }
);
