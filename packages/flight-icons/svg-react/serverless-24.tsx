import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconServerless24 = forwardRef<SVGSVGElement, IconProps>(
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
                    <path d="M5 17.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75" />
                    <path
                        fillRule="evenodd"
                        d="M1.78.72A.75.75 0 0 0 .72 1.78l.629.63A2.74 2.74 0 0 0 1 3.75v4.5A2.75 2.75 0 0 0 3.75 11h6.19l2 2H3.75A2.75 2.75 0 0 0 1 15.75v4.5A2.75 2.75 0 0 0 3.75 23h16.5a2.74 2.74 0 0 0 1.34-.349l.63.63a.75.75 0 1 0 1.06-1.061L2.866 1.806zm.732 2.853a1 1 0 0 0-.012.177v4.5c0 .69.56 1.25 1.25 1.25h4.69zm17.915 17.915L13.439 14.5H3.75c-.69 0-1.25.56-1.25 1.25v4.5c0 .69.56 1.25 1.25 1.25h16.5q.09 0 .177-.012"
                        clipRule="evenodd"
                    />
                    <path d="M6 1a.75.75 0 0 0 0 1.5h14.25c.69 0 1.25.56 1.25 1.25v4.5c0 .69-.56 1.25-1.25 1.25H14.5a.75.75 0 0 0 0 1.5h5.75A2.75 2.75 0 0 0 23 8.25v-4.5A2.75 2.75 0 0 0 20.25 1zM18 13a.75.75 0 0 0 0 1.5h2.25c.69 0 1.25.56 1.25 1.25V18a.75.75 0 0 0 1.5 0v-2.25A2.75 2.75 0 0 0 20.25 13z" />
                </g>
            </svg>
        );
    }
);
