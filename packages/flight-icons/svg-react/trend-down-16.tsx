import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconTrendDown16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M1.28 3.22A.75.75 0 00.22 4.28l4.5 4.5a.75.75 0 00.894.126l3.96-2.2L13.6 11.5H10.75a.75.75 0 000 1.5h4.5a.75.75 0 00.75-.75v-4.5a.75.75 0 00-1.5 0v2.489l-4.176-4.971a.75.75 0 00-.938-.174L5.38 7.32l-4.1-4.1z"
                />
            </svg>
        );
    }
);
