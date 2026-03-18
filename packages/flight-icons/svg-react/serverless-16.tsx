import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconServerless16 = forwardRef<SVGSVGElement, IconProps>(
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
                <g fill={color}>
                    <path d="M3.75 11.5a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5z" />
                    <path
                        fillRule="evenodd"
                        d="M1.28.22A.75.75 0 0 0 .22 1.28c-.141.294-.22.623-.22.97v2.5A2.25 2.25 0 0 0 2.25 7h3.69l2 2H2.25A2.25 2.25 0 0 0 0 11.25v2.5A2.25 2.25 0 0 0 2.25 16h11.5c.347 0 .676-.079.97-.22a.75.75 0 0 0 1.06-1.06zm.97 10.28h7.19l4 4H2.25a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75m2.19-5L1.5 2.56v2.19c0 .414.336.75.75.75z"
                        clipRule="evenodd"
                    />
                    <path d="M13.75 0H5a.75.75 0 0 0 0 1.5h8.75a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75H10.5a.75.75 0 0 0 0 1.5h3.25A2.25 2.25 0 0 0 16 4.75v-2.5A2.25 2.25 0 0 0 13.75 0M13 9.75a.75.75 0 0 1 .75-.75A2.25 2.25 0 0 1 16 11.25a.75.75 0 0 1-1.5 0 .75.75 0 0 0-.75-.75.75.75 0 0 1-.75-.75" />
                </g>
            </svg>
        );
    }
);
