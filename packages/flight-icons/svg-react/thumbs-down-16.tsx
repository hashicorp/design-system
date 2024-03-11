import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconThumbsDown16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8.403 14.484l2.56-5.759V1.5H3.49a.75.75 0 00-.741.637l-.995 6.55a.75.75 0 00.742.862h3.767c.69 0 1.25.56 1.25 1.25v2.626c0 .53.385.972.891 1.06zM12.463 1.5v6.634h1.287a.75.75 0 00.75-.75V2.25a.75.75 0 00-.75-.75h-1.287zm-.262 8.134l-2.511 5.65A1.206 1.206 0 018.587 16a2.575 2.575 0 01-2.575-2.575v-2.376H2.495A2.25 2.25 0 01.27 8.46l.995-6.549A2.25 2.25 0 013.489 0h10.26A2.25 2.25 0 0116 2.25v5.134a2.25 2.25 0 01-2.25 2.25H12.2z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
