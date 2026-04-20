import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconShare16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M5 7a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75H11A.75.75 0 0 1 11 7h.75A2.25 2.25 0 0 1 14 9.25v3.5A2.25 2.25 0 0 1 11.75 15h-7.5A2.25 2.25 0 0 1 2 12.75v-3.5A2.25 2.25 0 0 1 4.25 7zm3-6a.75.75 0 0 1 .55.239l3.25 3.5a.751.751 0 0 1-1.1 1.022L8.75 3.66v6.59a.75.75 0 0 1-1.5 0V3.66L5.3 5.76A.751.751 0 0 1 4.2 4.74l3.25-3.5A.75.75 0 0 1 8 .999"
                />
            </svg>
        );
    }
);
