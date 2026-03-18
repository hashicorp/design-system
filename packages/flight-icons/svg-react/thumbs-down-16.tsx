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
                    d="M13.75 0A2.253 2.253 0 0 1 16 2.25v5.134a2.253 2.253 0 0 1-2.25 2.25H12.2l-2.511 5.65A1.21 1.21 0 0 1 8.587 16a2.577 2.577 0 0 1-2.576-2.575v-2.376H2.495A2.25 2.25 0 0 1 .27 8.46l.994-6.549A2.25 2.25 0 0 1 3.49 0zM3.489 1.5a.75.75 0 0 0-.741.638l-.996 6.549a.752.752 0 0 0 .743.862H6.26c.69.001 1.25.56 1.25 1.25v2.626c0 .53.386.971.892 1.06l2.56-5.76V1.5zm8.973 6.634h1.287a.753.753 0 0 0 .75-.75V2.25a.753.753 0 0 0-.75-.75h-1.287z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
