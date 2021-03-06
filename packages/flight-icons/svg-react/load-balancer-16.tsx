import { forwardRef, useMemo } from 'react';
import { IconProps } from './types';

export const IconLoadBalancer16 = forwardRef<SVGSVGElement, IconProps>(
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
                    d="M8 1a.75.75 0 01.75.75V7h3.69l-.97-.97a.75.75 0 011.06-1.06l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 11-1.06-1.06l.97-.97H8.75v4.08l1.002-.89a.75.75 0 01.996 1.12l-2.25 2a.75.75 0 01-.996 0l-2.25-2a.75.75 0 01.996-1.12l1.002.89V8.5H3.56l.97.97a.75.75 0 11-1.06 1.06L1.22 8.28a.75.75 0 010-1.06l2.25-2.25a.75.75 0 011.06 1.06L3.56 7h3.69V1.75A.75.75 0 018 1z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
);
