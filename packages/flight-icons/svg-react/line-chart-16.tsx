import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLineChart16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M13.75 1A2.25 2.25 0 0116 3.25v9.5A2.25 2.25 0 0113.75 15H2.25A2.25 2.25 0 010 12.75v-9.5A2.25 2.25 0 012.25 1h11.5zM2.25 2.5a.75.75 0 00-.75.75v6.39l4.025-3.221a.754.754 0 01.753-.115l3.586 1.344 2.167-1.734a.75.75 0 01.938 1.172l-2.488 1.99a.751.751 0 01-.758.121L6.136 7.852 1.5 11.56v1.19c0 .414.336.75.75.75H5V13a.75.75 0 011.5 0v.5h3V13a.75.75 0 011.5 0v.5h2.75a.75.75 0 00.75-.75v-9.5a.75.75 0 00-.75-.75H2.25z"
                />
            </svg>
        );
    }
);
