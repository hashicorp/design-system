import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconVagrant24 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path
                        fillRule="evenodd"
                        d="M19.983.6l-4.96 2.877v1.767L12 12.384v2.49L9.988 16.04l-4.03-9.044V5.227l3.02-1.75L4.016.6 1 2.352v2.034l6.719 16.532L12 23.4v-6.193l2.012-1.167 4.027-9.044V5.227L23 2.352 19.983.6z"
                        clipRule="evenodd"
                    />
                    <path
                        d="M23 2.352l-4.96 2.875v1.769l-4.028 9.044L12 17.207V23.4l4.281-2.482L23 4.385V2.352zM8.977 5.244V3.477l-3.019 1.75v1.77l4.03 9.043L12 14.873v-2.488L8.977 5.244z"
                        opacity={0.7}
                    />
                </g>
            </svg>
        );
    }
);
